var A=`# WebEditor 的 Python 執行環境（spec §6.2.2）
import sys
import io
import os
import codecs
import shutil
import runpy
import traceback
import importlib

import _wed  # 由 Worker 以 registerJsModule 提供：read(n) / write(fd, text)

PROJECT_ROOT = "/home/pyodide/project"
sys.setrecursionlimit(10000)


class _Raw(io.RawIOBase):
    def __init__(self, fd):
        self.fd = fd
        self._dec = codecs.getincrementaldecoder("utf-8")("replace")

    def readable(self):
        return self.fd == 0

    def writable(self):
        return self.fd != 0

    def readinto(self, b):
        data = _wed.read(len(b)).to_bytes()
        n = len(data)
        b[:n] = data
        return n

    def write(self, b):
        text = self._dec.decode(bytes(b))
        if text:
            _wed.write(self.fd, text)
        return len(b)

    def isatty(self):
        return False


def _setup_streams(interactive):
    sys.stdin = io.TextIOWrapper(io.BufferedReader(_Raw(0)), encoding="utf-8", errors="replace")
    # 終端機模式逐行送出，讓 input() 前的提示能先顯示；測資模式整批緩衝較快
    sys.stdout = io.TextIOWrapper(io.BufferedWriter(_Raw(1)), encoding="utf-8", errors="replace",
                                  line_buffering=interactive, write_through=interactive)
    sys.stderr = io.TextIOWrapper(io.BufferedWriter(_Raw(2)), encoding="utf-8", errors="replace",
                                  line_buffering=True, write_through=True)


def _write_project(files):
    if os.path.exists(PROJECT_ROOT):
        shutil.rmtree(PROJECT_ROOT)
    os.makedirs(PROJECT_ROOT)
    for f in files:
        full = os.path.join(PROJECT_ROOT, f["path"])
        os.makedirs(os.path.dirname(full), exist_ok=True)
        with open(full, "w", encoding="utf-8", newline="") as fp:
            fp.write(f["content"])


def _format_exc(exc):
    te = traceback.TracebackException.from_exception(exc)
    # 只留下使用者程式的堆疊（去掉 runpy 等內部呼叫）
    te.stack = traceback.StackSummary.from_list(
        [fr for fr in te.stack if fr.filename.startswith(PROJECT_ROOT)]
    )
    text = "".join(te.format())
    return text.replace(PROJECT_ROOT + "/", "")


def _wed_run(path, files, interactive):
    files = files.to_py() if hasattr(files, "to_py") else files
    _write_project(files)
    importlib.invalidate_caches()
    script = os.path.join(PROJECT_ROOT, path)
    workdir = os.path.dirname(script)
    before = set(sys.modules)
    saved_path = list(sys.path)
    saved = (sys.stdin, sys.stdout, sys.stderr, sys.argv)
    _setup_streams(bool(interactive))
    sys.argv = [path]
    sys.path.insert(0, workdir)
    os.chdir(workdir)
    code, message = 0, ""
    try:
        runpy.run_path(script, run_name="__main__")
    except SystemExit as e:
        if e.code is None:
            code = 0
        elif isinstance(e.code, int):
            code = e.code
        else:
            sys.stderr.write(str(e.code) + "\\n")
            code = 1
    except BaseException as e:  # noqa: BLE001
        code = 1
        if isinstance(e, RecursionError):
            message = _format_exc(e) + "\\n（遞迴太深：瀏覽器中的 Python 遞迴深度有限，在評測機上可能正常）"
        else:
            message = _format_exc(e)
    finally:
        for s in (sys.stdout, sys.stderr):
            try:
                s.flush()
            except Exception:  # noqa: BLE001
                pass
        sys.stdin, sys.stdout, sys.stderr, sys.argv = saved
        sys.path[:] = saved_path
        os.chdir("/home/pyodide")
        # 清掉這次匯入的使用者模組，下次執行重新載入
        for name in set(sys.modules) - before:
            mod = sys.modules.get(name)
            f = getattr(mod, "__file__", None) or ""
            if f.startswith(PROJECT_ROOT) or name == "__main__":
                sys.modules.pop(name, None)
    return [code, message]
`;const L="0.27.2",B=`https://cdn.jsdelivr.net/pyodide/v${L}/full/`,j=32*1024,D=30;function W({stdin:y="",interactive:o=!1,sab:n=null,outputLimit:a=1/0}){const b=new TextEncoder,f={1:new TextDecoder,2:new TextDecoder};let r=[],d=0,_=0,c=performance.now(),u=!1;function h(){r.length&&(self.postMessage({type:"out",chunks:r}),r=[],d=0),c=performance.now()}function C(e,s){if(u)return;const t=typeof s=="string",l=t?s.length:s.byteLength;if(!l)return;if(_+=l,_>a){u=!0,h(),self.postMessage({type:"output-limit"});return}const O=t?s:f[e].decode(s,{stream:!0}),R=r[r.length-1];R&&R[0]===e?R[1]+=O:r.push([e,O]),d+=l,(d>=j||performance.now()-c>=D)&&h()}let P=o?null:b.encode(y??""),w=0,k=!1,p=null;const m=n?new Int32Array(n.ctrl):null,M=n?new Uint8Array(n.data):null;function x(e){if(!o){const l=Math.min(e,P.length-w),O=P.subarray(w,w+l);return w+=l,O}if(p){const l=p.subarray(0,e);return p=p.length>e?p.subarray(e):null,l}if(k||!m)return new Uint8Array(0);h(),self.postMessage({type:"stdin-wait"}),Atomics.wait(m,0,0);const s=Atomics.load(m,0);let t=new Uint8Array(0);return s===1?t=M.slice(0,m[1]):k=!0,Atomics.store(m,0,0),t.length>e&&(p=t.subarray(e),t=t.subarray(0,e)),t}const v=new TextDecoder;let i="",g=!1;function I(){for(;;){const e=i.indexOf(`
`);if(e>=0){let t=i.slice(0,e);return i=i.slice(e+1),t.endsWith("\r")&&(t=t.slice(0,-1)),t}if(g){if(!i)return null;const t=i;return i="",t}const s=x(65536);s.length?i+=v.decode(s,{stream:!0}):g=!0}}function S(){let e=i;if(i="",!g){for(;;){const s=x(1048576);if(!s.length)break;e+=v.decode(s,{stream:!0})}g=!0}return e}return{write:C,flush:h,read:x,readLine:I,readAll:S,get overLimit(){return u}}}let E=null,T=null;function J(){return E||(E=(async()=>{const{loadPyodide:y}=await import(B+"pyodide.mjs"),o=await y({indexURL:B});return o.registerJsModule("_wed",{read:n=>T.read(n),write:(n,a)=>T.write(n,a)}),o.runPython(A),o})()),E}self.onmessage=async y=>{const o=y.data;if(o.type==="init")try{await J(),self.postMessage({type:"ready"})}catch(n){self.postMessage({type:"init-error",error:String(n?.message||n)})}else if(o.type==="run"){const n=await J(),a=o.req;T=W(a),self.postMessage({type:"started"});const b=performance.now();let f;try{const r=n.globals.get("_wed_run"),d=n.toPy(a.files),_=r(a.path,d,!!a.interactive),[c,u]=_.toJs();_.destroy?.(),d.destroy?.(),r.destroy?.(),f={status:c===0&&!u?"ok":"error",exitCode:c,message:u||(c?`程式以結束碼 ${c} 結束`:"")}}catch(r){f={status:"error",exitCode:1,message:`Python 執行環境錯誤：${r?.message||r}`,fatal:!0}}f.time=performance.now()-b,T.flush(),self.postMessage({type:"done",result:f})}};
