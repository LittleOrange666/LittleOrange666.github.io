filename = input("filename=")
prefix = "##### "
tp = "cpp"
with open(filename, encoding="utf8") as f:
  text = f.read()
import re
if tp=="py":
  reg = re.compile("^\\*\\*(([A-Za-z]+)\\([^*]*)\\*\\*$", re.M)
if tp=="cpp":
  reg = re.compile("^\\*\\*([A-Za-z*:_&]+ ([A-Za-z*:_&]+)\\([^*]*)\\*\\*$", re.M)
get = reg.search(text)
while get is not None:
  text = text[:get.span()[0]] + prefix + get.group(2) + "\n" + "```" + tp + "\n" + get.group(1) + "\n```" + text[get.span()[1]:]
  get = reg.search(text)
with open(filename+"_", "w", encoding="utf8") as f:
  f.write(text)
