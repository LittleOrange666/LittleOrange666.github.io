import os
import time
from datetime import datetime
from threading import Thread

import requests
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
os.chdir(os.path.dirname(__file__))
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
cur_data = {}
if os.path.exists("data.json"):
    cur_data = json.load(open("data.json", "r"))


def get_cookie():
    session = requests.Session()
    session.get("https://judgegirl.csie.org/login")
    login_info = json.load(open("login_info.json", "r"))
    session.post("https://judgegirl.csie.org/login", data=login_info)
    return session.cookies.get_dict()


def update_cookie():
    print("Updating cookie...")
    if os.path.exists("cookie.txt") and os.path.getmtime("cookie.txt") + 3000 > time.time():
        print(f"cookie just updated {time.time()-os.path.getmtime('cookie.txt')} seconds before")
        return False
    cookie = get_cookie()
    open("cookie.txt", "w").write("; ".join([f"{k}={v}" for k, v in cookie.items()]))
    print("cookie updated")
    return True


def update_data():
    global cur_data
    print("Updating data...")
    data = {}
    if "data" in cur_data:
        data = cur_data["data"].copy()
    url = "https://judgegirl.csie.org/ranklist?page="
    cookie = open("cookie.txt").read()
    headers = {
        "cookie": cookie,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0"
    }
    update_time = datetime.now().strftime("%Y/%m/%d %H:%M:%S")
    cnt = 100
    for i in range(1, cnt + 1):
        link = url + str(i)
        res = requests.get(link, headers=headers)
        text = res.text
        print("get " + link)
        it = text.find("pure-table-bordered")
        ta = text.find("<tr class", it)
        if ta == -1:
            if i == 1:
                if update_cookie():
                    update_data()
                return
            break
        while ta != -1:
            ed = text.find("</tr>", ta)
            cur = text[ta:ed + 5]
            texts = cur.split("<td>")
            name = texts[2]
            name = name[name.find(">") + 1:]
            name = name[:name.find("<")]
            score = texts[4]
            score = score[:score.find("<")]
            if name.startswith("B13"):
                score = int(score)
                old_score = data.get(name, 0)
                data[name] = max(score, old_score)
            it = ed + 5
            ta = text.find("<tr class", it)
    cur_data = {"update_time": update_time, "data": data}
    json.dump(cur_data, open("data.json", "w"))


def updater():
    update_cookie()
    while True:
        update_data()
        time.sleep(3600)


@app.get("/")
def read_root():
    return json.load(open("data.json", "r"))


if __name__ == '__main__':
    Thread(target=updater, daemon=True).start()
    uvicorn.run(app="main:app", host="127.0.0.1", port=9325)
