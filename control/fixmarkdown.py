import os
import re

replaces = (("\n\n", "\n"), ("```python=", "```python"), (" | ", "|"),  ("\n\n#", "\n#"),
            ("\n#", "\n\n#"), ("\n```python", "\n\n```python"))


def run(name):
    text: str = open(name, encoding="utf8").read()
    for old, new in replaces:
        text = text.replace(old, new)
    reg = re.compile("^:::spoiler\\s(\\S+)\\s", re.M)
    reg0 = re.compile("^:::$", re.M)
    get = reg.search(text)
    while get:
        text = f"{text[:get.span()[0]]}<details><summary>{get.group(1)}</summary>{text[get.span()[1] - 1:]}"
        get = reg.search(text)
    get = reg0.search(text)
    while get:
        text = f"{text[:get.span()[0]]}</details>{text[get.span()[1]:]}"
        get = reg0.search(text)
    open(name, "w", encoding="utf8").write(text)


for dirPath, dirNames, fileNames in os.walk(os.getcwd()):
    for f in fileNames:
        fn = os.path.join(dirPath, f)
        if fn.endswith(".md"):
            print(f"run {fn}")
            run(fn)
