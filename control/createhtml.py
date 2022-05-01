import markdown
from html.parser import HTMLParser
from pygments import highlight
from pygments.lexers import PythonLexer
from pygments.formatters import HtmlFormatter
import re
import shutil
import os

prepares = ["language-python"]


class Codehightlighter(HTMLParser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.text: list[str] = []
        self.prepare = ""
        self.makeindex = True
        self.index = 0
        self.indexs: list[list[int|list[int|list[int]]]] = []
        self.names = []
        self.wait = ""

    def handle_starttag(self, tag, attrs):
        attrs = {k: v for k, v in attrs}
        if tag == "code":
            for k, v in attrs.items():
                if k == "class" and v in prepares:
                    self.prepare = v
        if self.prepare == "":
            waiting = self.makeindex
            if self.makeindex:
                if tag == "h1":
                    self.indexs.append([self.index])
                elif tag == "h2":
                    if len(self.indexs) == 0:
                        self.indexs.append([-1])
                    self.indexs[-1].append([self.index])
                elif tag == "h3":
                    if len(self.indexs) == 0:
                        self.indexs.append([-1])
                    if len(self.indexs[-1]) == 1:
                        self.indexs[-1].append([-1])
                    self.indexs[-1][-1].append([self.index])
                else:
                    waiting = False
            if waiting:
                attrs["id"] = f"item-{self.index}"
                self.wait = tag
                self.names.append("")
                self.index += 1
            atl = ' '.join(k if v is None else k + '="' + v + '"' for k, v in attrs.items() if k is not None)
            if len(attrs):
                atl = ' ' + atl
            if tag != "br" or len(self.text) == 0 or self.text[-1] != "<br>":
                self.text.append(f"<{tag}{atl}>")

    def handle_endtag(self, tag):
        self.wait = ""
        if self.prepare != "":
            self.prepare = ""
        else:
            self.text.append(f"</{tag}>")

    def handle_data(self, data):
        if self.prepare == "":
            self.text.append(data)
            if self.wait != "":
                self.names[-1] = data
        else:
            if self.prepare == "language-python":
                self.text.append(highlight(data, PythonLexer(), HtmlFormatter()))

    def solve(self, text: str, makeindex: bool = True):
        self.text = []
        self.prepare = ""
        self.makeindex = makeindex
        self.wait = ""
        self.index = 0
        self.indexs: list[list[int | list[int | list[int]]]] = []
        self.names = []
        self.wait = ""
        self.feed(text)
        r = "".join(self.text)
        if makeindex:
            lines = ['<nav id="indexbar" class="navbar navbar-light bg-light flex-column align-items-stretch">',
                     '<a class="navbar-brand" href="#">索引</a>', '<nav class="nav nav-pills flex-column">']
            for l1 in self.indexs:
                if l1[0] != -1:
                    lines.append(f'<a class="nav-link" href="#item-{l1[0]}">{self.names[l1[0]]}</a>')
                if len(l1) > 1:
                    lines.append('<nav class="nav nav-pills flex-column">')
                    for l2 in l1[1:]:
                        if l2[0] != -1:
                            lines.append(f'<a class="nav-link" href="#item-{l2[0]}">{self.names[l2[0]]}</a>')
                        if len(l2) > 1:
                            lines.append('<nav class="nav nav-pills flex-column">')
                            for l3 in l2[1:]:
                                lines.append(f'<a class="nav-link" href="#item-{l3[0]}">{self.names[l3[0]]}</a>')
                            lines.append('</nav>')
                    lines.append('</nav>')
            lines.append('</nav>')
            lines.append('</nav>')
            linejoin = "\n".join(lines)
            r = f"""<div class="container">
  <div class="row">
    <div class="col">{linejoin}
    </div>
    <div class="col">
      <div data-bs-spy="scroll" data-bs-target="#indexbar" data-bs-offset="0" tabindex="0">
{r}
      </div>
    <div class="col">
    </div>
    </div>
  </div>"""
        return r


parse = Codehightlighter()
template: str = open("template.html", encoding="utf8").read()


def run_markdown(source: str, makeindex: bool = True) -> str:
    # 處理參數
    args: dict[str, str] = {"title": "LittleOrange's page"}
    if source.startswith("---"):
        end = source.find("---", 3)
        li: list[str] = source[source.find("\n") + 1:source.rfind("\n", 0, end)].split("\n")
        for t in li:
            if ":" in t:
                k, v = t.split(":")[:2]
                while v.startswith(" "):
                    v = v[1:]
                args[k] = v
        source = source[end + 4:]
    # 主要部分
    html = markdown.markdown(source, extensions=['tables', 'md_in_html', 'fenced_code', 'attr_list', 'def_list', 'toc',
                                                 'codehilite', 'mdx_math', 'nl2br'])
    # spoiler轉成details
    html = html.replace("<br />", "<br>").replace("<br/>", "<br>").replace("</br>", "<br>").replace("<br>",
                                                                                                    " NEXTLINE ")
    reg = re.compile(":::spoiler\\s(\\S+)\\s", re.M)
    reg0 = re.compile(":::", re.M)
    get = reg.search(html)
    spoiler_count = 0
    while get:
        # html = f"{html[:get.span()[0]]}<details><summary>{get.group(1)}</summary>{html[get.span()[1] - 1:]}" #old
        spoiler_count += 1
        i = spoiler_count
        html = f"""{html[:get.span()[0]]}<div class="accordion accordion-flush" id="accordion_{i}">
  <div class="accordion-item">
    <p class="accordion-header" id="heading_{i}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_{i}" aria-expanded="false" aria-controls="collapse_{i}"> 
        {get.group(1)}
      </button>
    </p>
    <div id="collapse_{i}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion_{i}">
      <div class="accordion-body">
        {html[get.span()[1] - 1:]}
      </div>
    </div>
  </div>
</div>"""
        get = reg.search(html)
    get = reg0.search(html)
    while get:
        # html = f"{html[:get.span()[0]]}</details>{html[get.span()[1]:]}" #old
        html = f"{html[:get.span()[0]]}</div></div></div></div>{html[get.span()[1]:]}"
        get = reg0.search(html)
    html = html.replace(" NEXTLINE ", "<br>")
    #
    html = parse.solve(html, makeindex)
    # 載入模板
    html = template.replace("MAIN_HTML", html).replace("THE_TITLE", args["title"])
    html = re.sub("<br>\\s*<br>", "<br>", html.replace("</br>", "<br>"))
    return html


for dirPath, dirNames, fileNames in os.walk(os.path.join(os.pardir, "source")):
    for f in fileNames:
        name = os.path.join(dirPath, f)
        new_name = os.path.join(dirPath.replace(os.path.join(os.pardir, "source"), os.pardir), f)
        if os.path.splitext(name)[-1] == ".md":
            new_name = new_name[:-3] + ".html"
            dat = run_markdown(open(name, encoding="utf8").read(), False)
            try:
                open(new_name, "w", encoding="utf8").write(dat)
            except FileNotFoundError:
                os.mkdir(new_name[:new_name.rfind("\\")])
                open(new_name, "w", encoding="utf8").write(dat)
        else:
            try:
                shutil.copyfile(name, new_name)
            except FileNotFoundError:
                os.mkdir(new_name[:new_name.rfind("\\")])
                shutil.copyfile(name, new_name)
        print(f"create {os.path.abspath(new_name)} from {os.path.abspath(name)}")
