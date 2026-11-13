var d=`import sys\r
import io\r
import json\r
import builtins\r
import traceback\r
import linecache\r
\r
if "/home/pyodide" not in sys.path:\r
    sys.path.insert(0, "/home/pyodide")\r
\r
import gen  # noqa: E402\r
\r
sys.setrecursionlimit(10000)\r
\r
\r
def _wtm_format_exc(exc, filename):\r
    tb = exc.__traceback__\r
    # 跳過 bootstrap 自身的堆疊，只留下使用者程式的部分\r
    while tb is not None and tb.tb_frame.f_code.co_filename != filename:\r
        tb = tb.tb_next\r
    lines = traceback.format_exception(type(exc), exc, tb)\r
    return "".join(lines).strip()\r
\r
\r
def _wtm_run(code, req_json):\r
    req = json.loads(req_json)\r
    role = req["role"]\r
    filename = req.get("filename") or "main.py"\r
    stdin_text = req.get("stdin") or ""\r
    # 用 BytesIO 包裝，讓 sys.stdin.buffer / sys.stdout.buffer 也能使用\r
    out_bytes = io.BytesIO()\r
    out_buf = io.TextIOWrapper(out_bytes, encoding="utf-8", newline="\\n", write_through=True)\r
    err_buf = io.StringIO()\r
    saved = (sys.stdout, sys.stderr, sys.stdin, sys.argv)\r
    sys.stdout, sys.stderr = out_buf, err_buf\r
    sys.stdin = io.TextIOWrapper(io.BytesIO(stdin_text.encode("utf-8")), encoding="utf-8")\r
    sys.argv = [filename] + [str(a) for a in (req.get("argv") or [])]\r
    gen._reset(req.get("seed") or 0, stdin_text)\r
\r
    ns = {"__name__": "__main__", "__builtins__": builtins, "__file__": filename}\r
    for name in gen.__all__:\r
        ns[name] = getattr(gen, name)\r
    extra = req.get("extra") or {}\r
    if role == "checker":\r
        ns["input_data"] = extra.get("input", "")\r
        ns["output_data"] = extra.get("output", "")\r
        ns["answer_data"] = extra.get("answer", "")\r
\r
    plan_lines = []\r
    if role == "plan":\r
        ns["subtask"] = lambda name: plan_lines.append(f"@subtask {name}")\r
        ns["include"] = lambda *names: plan_lines.append("@include " + " ".join(names))\r
        ns["manual"] = lambda file: plan_lines.append(f"manual {file}")\r
\r
        def test(gen_name, *args, seed=None):\r
            parts = [str(gen_name)] + [" ".join(map(str, a)) if isinstance(a, (list, tuple)) else str(a) for a in args]\r
            if seed is not None:\r
                parts.append(f"seed={seed}")\r
            plan_lines.append(" ".join(parts))\r
\r
        ns["test"] = test\r
\r
    # 讓錯誤訊息能顯示原始碼行\r
    linecache.cache[filename] = (len(code), None, code.splitlines(True), filename)\r
    res = {"status": "ok"}\r
    try:\r
        exec(compile(code, filename, "exec"), ns)\r
        if role == "checker":\r
            res["verdict"] = "AC"\r
    except SystemExit as e:\r
        if e.code not in (None, 0):\r
            res["status"] = "error"\r
            res["message"] = f"程式以結束碼 {e.code} 結束"\r
        elif role == "checker":\r
            res["verdict"] = "AC"\r
    except gen.CheckerResult as e:\r
        if role == "checker":\r
            res["verdict"] = e.verdict\r
            res["message"] = e.msg\r
        else:\r
            res["status"] = "error"\r
            res["message"] = "accept()/wrong() 只能在 checker 中使用"\r
    except gen.ValidationError as e:\r
        res["status"] = "error"\r
        res["message"] = str(e)\r
    except BaseException as e:  # noqa: BLE001\r
        res["status"] = "error"\r
        res["message"] = _wtm_format_exc(e, filename)\r
    finally:\r
        sys.stdout, sys.stderr, sys.stdin, sys.argv = saved\r
\r
    try:\r
        out_buf.flush()\r
    except ValueError:\r
        pass  # 使用者關閉了 stdout\r
    res["stdout"] = "\\n".join(plan_lines) + "\\n" if role == "plan" else out_bytes.getvalue().decode("utf-8", errors="replace")\r
    res["out2"] = gen.out.buf.getvalue()\r
    res["stderr"] = err_buf.getvalue()\r
    return json.dumps(res)\r
`,f=`"""WebTaskMaker 內建函式庫（Python 版），與 JavaScript 版功能對等。

所有亂數皆使用由參數表決定的種子，同一行參數每次產生相同結果。
"""
import io as _io
import random as _random
import re as _re
import string as _string

__all__ = [
    "rand_int", "rand_float", "choice", "shuffle", "sample", "rand_array",
    "distinct_array", "permutation", "rand_string", "rand_partition",
    "rand_tree", "rand_graph", "rand_weights", "relabel",
    "print_array", "print_edges", "print_matrix",
    "Reader", "read_int", "read_ints", "read_token", "read_line",
    "read_space", "read_eoln", "read_eof", "ensure",
    "accept", "wrong", "tokens", "float_equal",
    "out", "CheckerResult", "ValidationError",
]

_rng = _random.Random(0)


class CheckerResult(Exception):
    def __init__(self, verdict, msg=""):
        super().__init__(msg)
        self.verdict = verdict
        self.msg = msg


class ValidationError(Exception):
    pass


class _Out:
    """直接生成輸入輸出模式下，寫入 .out 的物件"""

    def __init__(self):
        self.buf = _io.StringIO()

    def print(self, *args, **kwargs):
        kwargs["file"] = self.buf
        print(*args, **kwargs)

    def write(self, s):
        self.buf.write(str(s))


out = _Out()


# ---------- 亂數 ----------

def rand_int(lo, hi):
    if lo > hi:
        raise ValueError(f"rand_int: lo ({lo}) > hi ({hi})")
    return _rng.randint(lo, hi)


def rand_float(lo, hi):
    return _rng.uniform(lo, hi)


def choice(seq):
    return _rng.choice(seq)


def shuffle(seq):
    _rng.shuffle(seq)
    return seq


def sample(seq, k):
    return _rng.sample(list(seq), k)


def rand_array(n, lo, hi):
    return [_rng.randint(lo, hi) for _ in range(n)]


def distinct_array(n, lo, hi):
    size = hi - lo + 1
    if n > size:
        raise ValueError(f"distinct_array: 範圍內只有 {size} 個數，無法取 {n} 個")
    return _rng.sample(range(lo, hi + 1), n)


def permutation(n):
    return shuffle(list(range(1, n + 1)))


def rand_string(n, alphabet=_string.ascii_lowercase):
    return "".join(_rng.choice(alphabet) for _ in range(n))


def rand_partition(total, k):
    if k < 1 or total < k:
        raise ValueError(f"rand_partition: 無法把 {total} 拆成 {k} 個正整數")
    cuts = sorted(distinct_array(k - 1, 1, total - 1))
    parts, prev = [], 0
    for c in cuts:
        parts.append(c - prev)
        prev = c
    parts.append(total - prev)
    return parts


# ---------- 圖與樹 ----------

def rand_tree(n, type="random"):
    edges = []
    spine = max(1, n // 2)
    for i in range(2, n + 1):
        if type == "random":
            p = _rng.randint(1, i - 1)
        elif type == "line":
            p = i - 1
        elif type == "star":
            p = 1
        elif type == "binary":
            p = i // 2
        elif type == "caterpillar":
            p = i - 1 if i <= spine else _rng.randint(1, spine)
        else:
            raise ValueError(f"rand_tree: 未知的樹種類 {type}")
        edges.append([p, i])
    return edges


def relabel(edges, n):
    p = [0] + permutation(n)
    return shuffle([[p[e[0]], p[e[1]], *e[2:]] for e in edges])


def rand_graph(n, m, connected=False, simple=True, directed=False):
    max_m = n * (n - 1) if directed else n * (n - 1) // 2
    if simple and m > max_m:
        raise ValueError(f"rand_graph: 簡單圖最多 {max_m} 條邊")
    if connected and m < n - 1:
        raise ValueError(f"rand_graph: 連通圖至少需要 {n - 1} 條邊")
    edges, seen = [], set()

    def add(u, v):
        if simple:
            if u == v:
                return
            key = (u, v) if directed or u < v else (v, u)
            if key in seen:
                return
            seen.add(key)
        edges.append([u, v])

    if connected and n > 1:
        for u, v in relabel(rand_tree(n), n):
            if directed and _rng.random() < 0.5:
                add(v, u)
            else:
                add(u, v)
    while len(edges) < m:
        add(_rng.randint(1, n), _rng.randint(1, n))
    return shuffle(edges)


def rand_weights(edges, lo, hi):
    return [[*e, _rng.randint(lo, hi)] for e in edges]


# ---------- 輸出輔助 ----------

def print_array(arr, sep=" "):
    print(sep.join(map(str, arr)))


def print_edges(edges):
    for e in edges:
        print(" ".join(map(str, e)))


def print_matrix(mat):
    for row in mat:
        print(" ".join(map(str, row)))


# ---------- 驗證器輔助（嚴格讀取） ----------

_INT_RE = _re.compile(r"-?(0|[1-9][0-9]*)")


class Reader:
    def __init__(self, text):
        self.s = text
        self.p = 0

    def _where(self):
        before = self.s[: self.p]
        line = before.count("\\n") + 1
        col = self.p - (before.rfind("\\n") + 1) + 1
        return f"第 {line} 行第 {col} 字"

    def _fail(self, msg):
        raise ValidationError(f"{self._where()}：{msg}")

    def _show(self):
        return "EOF" if self.p >= len(self.s) else repr(self.s[self.p])

    def read_token(self):
        start = self.p
        while self.p < len(self.s) and not self.s[self.p].isspace():
            self.p += 1
        if self.p == start:
            self._fail(f"預期一個 token，但遇到 {self._show()}")
        return self.s[start: self.p]

    def read_int(self, lo=None, hi=None):
        start = self.p
        t = self.read_token()
        if not _INT_RE.fullmatch(t) or t == "-0":
            self.p = start
            self._fail(f"預期整數，但讀到 {t!r}")
        v = int(t)
        if (lo is not None and v < lo) or (hi is not None and v > hi):
            self.p = start
            self._fail(f"整數 {t} 超出範圍 [{lo}, {hi}]")
        return v

    def read_ints(self, n, lo=None, hi=None):
        res = []
        for i in range(n):
            if i:
                self.read_space()
            res.append(self.read_int(lo, hi))
        return res

    def read_line(self):
        idx = self.s.find("\\n", self.p)
        if idx < 0:
            self._fail("預期換行，但遇到 EOF")
        line = self.s[self.p: idx]
        self.p = idx + 1
        return line

    def read_space(self):
        if self.p >= len(self.s) or self.s[self.p] != " ":
            self._fail(f"預期空白，但遇到 {self._show()}")
        self.p += 1

    def read_eoln(self):
        if self.p >= len(self.s) or self.s[self.p] != "\\n":
            self._fail(f"預期換行，但遇到 {self._show()}")
        self.p += 1

    def read_eof(self):
        if self.p != len(self.s):
            self._fail(f"預期檔案結尾，但遇到 {self._show()}")


_reader = Reader("")


def read_int(lo=None, hi=None):
    return _reader.read_int(lo, hi)


def read_ints(n, lo=None, hi=None):
    return _reader.read_ints(n, lo, hi)


def read_token():
    return _reader.read_token()


def read_line():
    return _reader.read_line()


def read_space():
    _reader.read_space()


def read_eoln():
    _reader.read_eoln()


def read_eof():
    _reader.read_eof()


def ensure(cond, msg="ensure 失敗"):
    if not cond:
        raise ValidationError(msg)


# ---------- checker 輔助 ----------

def accept(msg=""):
    raise CheckerResult("AC", msg)


def wrong(msg=""):
    raise CheckerResult("WA", msg)


def tokens(text):
    return str(text).split()


def float_equal(a, b, eps=1e-6):
    a, b = float(a), float(b)
    return abs(a - b) <= eps * max(1.0, abs(b))


def _reset(seed, stdin):
    """每次執行前由 WebTaskMaker 呼叫"""
    global _rng, _reader
    _rng = _random.Random(seed)
    _random.seed(seed)
    _reader = Reader(stdin)
    out.buf = _io.StringIO()
`;const _="0.27.2",i=`https://cdn.jsdelivr.net/pyodide/v${_}/full/`;let a=null;function o(){return a||(a=(async()=>{const{loadPyodide:t}=await import(i+"pyodide.mjs"),n=await t({indexURL:i});return n.FS.mkdirTree("/home/pyodide"),n.FS.writeFile("/home/pyodide/gen.py",f),n.runPython(d),n})()),a}self.onmessage=async t=>{const n=t.data;if(n.type==="init")try{await o(),self.postMessage({type:"ready"})}catch(r){self.postMessage({type:"init-error",error:String(r?.message||r)})}else if(n.type==="run"){const r=await o(),l=performance.now();let s;try{const e=r.globals.get("_wtm_run");s=JSON.parse(e(n.req.code,JSON.stringify(n.req))),e.destroy?.()}catch(e){s={status:"error",message:String(e?.message||e),stdout:"",out2:"",stderr:""}}s.time=performance.now()-l,self.postMessage({type:"result",id:n.id,result:s})}};
