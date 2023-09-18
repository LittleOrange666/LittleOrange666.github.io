---
title: Tampermonkey script
---

## 使用方法：

1. 下载 Tampermonkey 插件
2. 建立一個新的腳本
3. 貼上代碼
4. 可能需要填入一些常數


:::spoiler Codeforces Polygon
1. 自動登入
2. 自動刷新頁面
```js
// ==UserScript==
// @name         Codeforces Polygon
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://polygon.codeforces.com/*
// @icon         https://polygon.codeforces.com/image/favicon-32x32.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const account = ""; // 帳號
    const password = ""; // 密碼
    const reload_delay = 5000; // 刷新延遲(毫秒)
    function inputevt(o,value){
        let evt = document.createEvent('HTMLEvents');
        evt.initEvent('input', true, true);
        o.value = value;
        o.dispatchEvent(evt);
    }
    // Your code here...
    if (location.pathname == "/login"){
        inputevt(document.querySelector("input[name='login']"),account);
        inputevt(document.querySelector("input[name='password']"),password);
        window.setTimeout(function(){document.querySelector("input[name='submit']").click()},1000);
    }
    let doreload = false;
    if (location.pathname == "/package"){
        for(let o of document.querySelectorAll("table.grid.tablesorter td")){
            if (o.textContent=="RUNNING"){
                doreload = true;
                break;
            }
        }
    }
    if (location.pathname == "/tests"){
        for(let o of document.querySelectorAll(".msiefix pre")){
            if (o.textContent=='Generating...\nReload the page.'){
                doreload = true;
                break;
            }
        }
    }
    if (location.pathname == "/invocation"){
        for(let o of document.querySelectorAll("span[title='Verdict'] a")){
            if (o.textContent=='TS' || o.textContent=='NO'){
                doreload = true;
                break;
            }
        }
    }
    if (location.pathname == "/run"){
        for(let o of document.querySelectorAll("tr td span")){
            if (o.textContent=='TS' || o.textContent=='NO'){
                doreload = true;
                break;
            }
        }
    }
    if (doreload) {
        window.setTimeout(function(){
            history.go(0);
        },reload_delay);
    }
})();
```
:::

:::spoiler CSES
1. 自動登入
2. 複製按鈕
3. 戳題按鈕
```js
// ==UserScript==
// @name         CSES
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cses.fi/*
// @icon         https://cses.fi/logo.png?1
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const account = ""; // 帳號
    const password = ""; // 密碼
    function inputevt(o,value){
        let evt = document.createEvent('HTMLEvents');
        evt.initEvent('input', true, true);
        o.value = value;
        o.dispatchEvent(evt);
    }
    if (location.pathname == "/login"){
        inputevt(document.querySelector("#nick"),account);
        inputevt(document.querySelector("input[name='pass']"),password);
        document.querySelector("input[type='submit']").click();
    }else{
        if (document.querySelectorAll("a[href='/login']").length){
            localStorage.lastpath = location.href;
            location.href = "/login";
        }else{
            if (localStorage.lastpath){
                let link = localStorage.lastpath;
                delete localStorage.lastpath;
                location.href = link;
            }
            if (location.pathname.startsWith("/problemset/")){
                function temp(){
                    let l = [];
                    for(let e of this.querySelectorAll(".task")){
                        if (e.querySelectorAll(".full").length==0) l.push([e.querySelector("a").href,e.querySelector(".detail").textContent]);
                    }
                    let sum = 0;
                    for (let i in l){
                        l[i][1] = Number(l[i][1].split(" / ")[1]);
                        l[i][1] = Math.sqrt(10000/l[i][1]);
                        sum += l[i][1];
                    }
                    let i = 0;
                    let x = Math.random()*sum;
                    while (x>l[i][1]){
                        x-=l[i][1];
                        i++;
                    }
                    console.log(l[i][0]);
                    location.href = l[i][0];
                }
                function f(o){
                    let a = document.createElement("a");
                    a.onclick = temp.bind(o);
                    a.href = "#";
                    a.textContent = "戳";
                    o.parentNode.insertBefore(a,o);
                }
                if(document.querySelectorAll(".task-list").length){
                    for(let o of document.querySelectorAll(".task-list")) f(o);
                    f(document.querySelector(".content"));
                }
                var copyer = document.createElement("textarea");
                document.body.appendChild(copyer);
                copyer.hidden = true;
                let start = false;
                let ok = false;
                for(let o of document.querySelector(".content").childNodes){
                    if (o.id == "example") start = true;
                    if(start && (o.textContent.includes("Input") || o.textContent.includes("Output"))) ok = true;
                    if (!start || !ok || o.nodeName!="CODE") continue;
                    let container = document.createElement("div");
                    o.parentNode.insertBefore(container,o);
                    let copy = document.createElement("button");
                    copy.style = "background-color: rgba(255, 255, 255, 0.2);right: 0px;top: 0px;font-size: 10px;padding: 0px;margin: 0px;border: 0px;";
                    copy.textContent = "copy"
                    container.appendChild(copy);
                    container.appendChild(document.createElement("br"));
                    container.appendChild(o);
                    let text = o.textContent;
                    if (!text.endsWith("\n")) text = text+"\n";
                    copy.onclick = function(){
                        copyer.value = text;
                        copyer.select();
                        copyer.setSelectionRange(0, 99999);
                        navigator.clipboard.writeText(copyer.value);
                    };
                    ok = false;
                }
            }
        }
    }
})();
```
:::

:::spoiler oj.uz
1. 自動登入
2. 隱藏數據
```js
// ==UserScript==
// @name         ojuz
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://oj.uz/*
// @icon         https://oj.uz/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const account = ""; // 帳號
    const password = ""; // 密碼
    function inputevt(o,value){
        let evt = document.createEvent('HTMLEvents');
        evt.initEvent('input', true, true);
        o.value = value;
        o.dispatchEvent(evt);
    }
    if(location.pathname == "/login"){
        inputevt(document.querySelector("input[name='email']"),account);
        inputevt(document.querySelector("input[name='password']"),password);
        document.querySelector("input[name='submit']").click();
    }else{
        let login = document.querySelector(".login-bar a");
        if (login && login.textContent=="Sign in"){
            login.click();
        }else{
            if (location.pathname.startsWith("/problem/view/")){
                let l = document.querySelectorAll("#content table")[0].querySelectorAll("tbody tr td");
                for(let i in l){
                    if(i>=2) l[i].textContent = "???";
                }
            }
            for(let o of document.querySelectorAll("th")){
                if (o.textContent == "Solved"){
                    let t = o.parentElement.parentElement.nextElementSibling;
                    for(let line of t.children){
                        line.children[line.children.length-1].textContent = "???";
                    }
                }
            }
        }
    }
})();
```
:::

:::spoiler USACO
1. 自動登入
2. 複製按鈕
```js
// ==UserScript==
// @name         USACO
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.usaco.org/*
// @icon         http://www.usaco.org/current/images/usaco_logo.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const account = ""; // 帳號
    const password = ""; // 密碼
    function copyToClipboard(textToCopy) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(textToCopy);
        } else {
            let textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((res, rej) => {
                document.execCommand('copy') ? res() : rej();
                textArea.remove();
            });
        }
    }
    function inputevt(o,value){
        let evt = document.createEvent('HTMLEvents');
        evt.initEvent('input', true, true);
        o.value = value;
        o.dispatchEvent(evt);
    }
    window.setTimeout(function(){
        var copyer = document.createElement("textarea");
        document.body.appendChild(copyer);
        copyer.hidden = true;
        for(let o of document.querySelectorAll("pre")){
            let container = document.createElement("div");
            o.parentNode.insertBefore(container,o);
            let copy = document.createElement("button");
            o.style = "padding: 0px;margin: 0px;border: 0px;";
            copy.textContent = "copy"
            container.appendChild(copy);
            container.appendChild(document.createElement("br"));
            container.appendChild(o);
            let text = o.textContent;
            copy.onclick = function(){
                copyer.value = text;
                copyer.select();
                copyer.setSelectionRange(0, 99999);
                copyToClipboard(copyer.value);
            };
        }
        if(document.querySelector("b") && document.querySelector("b").textContent == "Log in to allow submissions in analysis mode"){
            localStorage.oldlink = location.href;
            location.href = "/index.php";
        }else if(location.pathname == "/index.php"||location.pathname == "/"){
            if(document.querySelector("#login")){
                inputevt(document.querySelector("input[name='uname']"), account);
                inputevt(document.querySelector("input[name='password']"), password);
                document.querySelector("input[type='submit'][value='Login']").click();
            }
            else if (localStorage.oldlink){
                let target = localStorage.oldlink;
                delete localStorage.oldlink;
                location.href = target;
            }

        }
    },1000);
})();
```
:::

:::spoiler ZeroJudge
1. 自動登入(僅支持Google登入)
2. 新增"我的狀況"按鈕，並在提交後自動篩選出自己的submission
```js
// ==UserScript==
// @name         ZeroJudge
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://zerojudge.tw/*
// @icon         https://zerojudge.tw/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if(location.pathname == '/'){
        if(localStorage.getItem("lastpage")){
            let link = localStorage.getItem("lastpage");
            localStorage.removeItem("lastpage");
            location.href = link;
        }
    }
    if(location.pathname == '/Login'){
        location.href = "./InsertGoogleUser";
    }else if (document.querySelectorAll("a[href='/Login']").length){
        localStorage.setItem("lastpage",location.href);
        window.setTimeout(function(){
            location.href = "/Login";
        },1000);
        return;
    }
    let handle = document.querySelector(".img-rounded").nextSibling.textContent.replace(/\t/g,"").replace(/ /g,"").replace(/\n/g,"");
    if(location.pathname == '/ShowProblem'){
        let e = document.querySelector("a.btn[href^='./Submissions']");
        let nw = e.cloneNode();
        nw.textContent = " 我的狀況 ";
        nw.href += "&account="+handle;
        e.insertAdjacentElement('afterend', nw);
        let o = document.createElement("span");
        o.textContent = " ";
        e.insertAdjacentElement('afterend', o);
    }
    if(location.pathname == '/Submissions'){
        let s = document.referrer;
        if (location.search == "" && s.startsWith("https://zerojudge.tw/ShowProblem")){
            location.href = "/Submissions?problemid="+s.substr(s.indexOf("=")+1)+"&account="+handle;
        }
    }
})();
```
:::