from typing import Callable

import markdown
import mdx_math
from html.parser import HTMLParser
from pygments import highlight, lexers
from pygments.formatters import HtmlFormatter
import re
import shutil
import os

prepares = {"language-" + k: lexers.get_lexer_by_name(k) for lexer in lexers.get_all_lexers() for k in lexer[1]}
the_headers = ("h1", "h2", "h3")
the_contents = ("h1", "h2", "h3", "h4", "h5", "h6", "p", "pre", "ol", "ul")


def addattr(attrs: dict[str, str], name: str, new: str):
    if name in attrs:
        attrs[name] += " " + new
    else:
        attrs[name] = new


class Codehightlighter(HTMLParser):
    __slots__ = ("text", "prepare", "index")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.text: list[str] = []
        self.prepare: str = ""

    def init(self):
        self.text = []
        self.prepare = ""

    def handle_starttag(self, tag, attrs):
        attrs = {k: v for k, v in attrs}
        if tag == "code":
            for k, v in attrs.items():
                if k == "class" and v in prepares:
                    self.prepare = v
        if self.prepare == "":
            atl = ''.join(' ' + (k if v is None else k + '="' + v + '"') for k, v in attrs.items() if k is not None)
            if tag != "br" or len(self.text) == 0 or self.text[-1] != "<br>":
                self.text.append(f"<{tag}{atl}>")

    def handle_endtag(self, tag):
        if self.prepare != "":
            self.prepare = ""
        else:
            self.text.append(f"</{tag}>")

    def handle_data(self, data):
        if self.prepare == "":
            self.text.append(data)
        else:
            self.text.append(highlight(data, prepares[self.prepare](), HtmlFormatter()))

    def solve(self, text: str):
        self.text = []
        self.prepare = ""
        self.feed(text)
        r = "".join(self.text)
        return r


parse = Codehightlighter()
template: str = open("template.html", encoding="utf8").read()


def run_markdown(source: str) -> str:
    # ????????????
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
    # ?????????spoiler
    reg1 = re.compile("^:::spoiler(?:_template|_repeat)?\\s+(\\S+ +.*)$", re.M)
    get = reg1.search(source)
    while get:
        source = f"{source[:get.span(1)[0]]}{get.group(1).replace(' ', '&nbsp;')}{source[get.span(1)[1]:]}"
        get = reg1.search(source)
    # ????????????
    html = markdown.markdown(source, extensions=['tables', 'md_in_html', 'fenced_code', 'attr_list', 'def_list', 'toc',
                                                 'codehilite', 'nl2br', mdx_math.makeExtension(enable_dollar_delimiter=True)])
    # spoiler??????details
    html = html.replace("<br />", "<br>").replace("<br/>", "<br>").replace("</br>", "<br>").replace("<br>",
                                                                                                    " NEXTLINE ")
    reg = re.compile(":::spoiler\\s(\\S+)", re.M)
    reg1 = re.compile(":::spoiler_template\\s(\\S+)", re.M)
    reg2 = re.compile(":::spoiler_repeat\\s(\\S+)", re.M)
    reg0 = re.compile(":::", re.M)

    get = reg.search(html)
    while get:
        html = f"{html[:get.span()[0]]}<details><summary>{get.group(1)}</summary>{html[get.span()[1]:]}"
        get = reg.search(html)

    get = reg1.search(html)
    while get:
        html = f"{html[:get.span()[0]]}<details class='spoiler_template'><summary>{get.group(1)}</summary>{html[get.span()[1]:]}"
        get = reg1.search(html)

    get = reg2.search(html)
    while get:
        html = f"{html[:get.span()[0]]}<div class='spoiler_repeat'>{get.group(1)}</div>{html[get.span()[1]:]}"
        get = reg2.search(html)

    get = reg0.search(html)
    while get:
        html = f"{html[:get.span()[0]]}</details>{html[get.span()[1]:]}"
        get = reg0.search(html)
    html = html.replace(" NEXTLINE ", "<br>")
    #
    html = parse.solve(html)
    # ????????????
    html = template.replace("MAIN_HTML", html).replace("THE_TITLE", args["title"])
    html = re.sub("<br>\\s*<br>", "<br>", html.replace("</br>", "<br>"))
    return html


def main(logger: Callable[[str], None]):
    for dirPath, dirNames, fileNames in os.walk(os.path.join(os.pardir, "src")):
        for f in fileNames:
            name = os.path.join(dirPath, f)
            new_name = os.path.join(dirPath.replace(os.path.join(os.pardir, "src"), os.pardir), f)
            if os.path.splitext(name)[-1] == ".md":
                new_name = new_name[:-3] + ".html"
                dat = run_markdown(open(name, encoding="utf8").read())
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
            logger(f"create {os.path.abspath(new_name)} from {os.path.abspath(name)}")


if __name__ == '__main__':
    main(print)
