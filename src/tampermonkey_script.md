---
title: Tampermonkey script
---

## 使用方法：

1. 下載 Tampermonkey 插件
2. 建立一個新的腳本
3. 貼上代碼
4. 可能需要填入一些常數


:::spoiler Codeforces
1. 隱藏解題人數
2. 在problemset頁面可以戳題
```js
// ==UserScript==
// @name         Codeforces
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://codeforces.com/*
// @icon         https://codeforces.org/s/56111/favicon-96x96.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // hide solved
    $("a[title~='solved']").remove();
    if (location.pathname.includes("/standings"))$(".cell-passed-system-test:contains('Accepted')").parent().parent().remove();

    // random problem
    if (location.pathname.startsWith("/problemset")){
        var page_cnt = +$(".pagination span:last").text();
        function do_random(){
            location.href = "/problemset/page/"+(Math.floor(page_cnt*Math.random())+1)+location.search+"#random";
        }
        let btn = $("<input type='button' value='random'>");
        btn.click(do_random);
        $("._FilterByTagsFrame_button").append(btn);
        if (location.hash=="#random"){
            let o = $(".problems tr:not(.accepted-problem)");
            if (o.length==0) do_random();
            else{
                location.href = o[Math.floor(Math.random()*o.length)].querySelector("a").href + "#pick";
            }
        }
    }
    if(location.hash=="#pick"){
        $("#sidebar>div:first-child").remove();
        if (!$("#sidebar>div:first-child").hasClass("ContestVirtualFrame"))$("#sidebar>div:first-child").remove();
        $("#header>div").first().remove();
        $(".sidebar-menu").remove();
    }
})();
```
:::

:::spoiler Codeforces mashup creater
建立mashup後可在add problems頁面看到操作UI
可依難度挑題
```js
// ==UserScript==
// @name         Codeforces mashup creater
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://codeforces.com/*
// @icon         https://codeforces.org/s/56111/favicon-96x96.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function inputevt(o,value){
        let evt = document.createEvent('HTMLEvents');
        evt.initEvent('input', true, true);
        o.value = value;
        o.dispatchEvent(evt);
    }
    function changeevt(o,value){
        let evt = document.createEvent('HTMLEvents');
        evt.initEvent('change', true, true);
        o.value = value;
        o.dispatchEvent(evt);
    }
    function evt(o,value){
        let evt = document.createEvent('HTMLEvents');
        evt.initEvent(value, true, true);
        o.dispatchEvent(evt);
    }
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    if(location.pathname.endsWith("problems/new")){
        let input = $(".problemTable .ac_input")[0];
        let area1 = $("<input>").addClass("ac_input");
        let area2 = $("<input>").addClass("ac_input");
        $("#pageContent").append("ranges:").append(area1).append("<br>");
        $("#pageContent").append("participants:").append(area2).append("<br>");
        let btn = $("<button>").text("run mashup creater");
        $("#pageContent").append(btn);
        btn.click(function(){
            let ranges = area1.val().split(",");
            let participants = area2.val().split(",");
            console.log(ranges, participants);
            localStorage.ranges = JSON.stringify(ranges);
            localStorage.participants = JSON.stringify(participants);
            localStorage.completed = JSON.stringify([]);
            localStorage.page_cnt = JSON.stringify({});
            window.open("https://codeforces.com/#mashup_run","_blank");
            var inter_id;
            inter_id = window.setInterval(function(){
                let completed = JSON.parse(localStorage.completed);
                if (completed.length == ranges.length){
                    window.clearInterval(inter_id);
                    shuffle(completed);
                    let idx = 0;
                    window.setInterval(function(){
                        if (idx==completed.length){
                            $("._MashupContestEditFrame_saveMashup .submit").click();
                        }else{
                            inputevt(input,completed[idx]);
                            idx++;
                            $("._MashupContestEditFrame_addProblem").submit();
                        }
                    },2000);
                }
            },1000);
        });
    }
    if (location.hash == "#mashup_run"){
        sessionStorage.mashup_run = 1;
        location.hash = "";
        sessionStorage.state = "prepare";
    }
    if (sessionStorage.mashup_run){
        function do_action(){
            window.setTimeout(function(){
                let ranges = JSON.parse(localStorage.ranges);
                let completed = JSON.parse(localStorage.completed);
                let participants = JSON.parse(localStorage.participants);
                let page_cnt = JSON.parse(localStorage.page_cnt);
                switch(sessionStorage.state){
                    case "prepare":
                        if (completed.length<ranges.length){
                            let cur = ranges[completed.length];
                            if (cur in page_cnt){
                                sessionStorage.state = "choose";
                                location.href = "/problemset/page/"+(Math.floor(page_cnt[cur]*Math.random())+1)+"?tags="+cur;
                            }else{
                                sessionStorage.state = "count";
                                location.href = "https://codeforces.com/problemset?tags="+cur;
                            }
                        }else{
                            window.close();
                        }
                        break;
                    case "count":
                        page_cnt[location.search.substr(6)]=Math.max(1,+$(".pagination span:last").text()-1);
                        localStorage.page_cnt = JSON.stringify(page_cnt);
                        sessionStorage.state = "prepare";
                        do_action();
                        break;
                    case "choose":
                        {
                            let problems = $(".problems tr:not(.accepted-problem)");
                            let cur = ranges[completed.length];
                            if (problems.length==0) location.href = "/problemset/page/"+(Math.floor(page_cnt[cur]*Math.random())+1)+"?tags="+cur;
                            else{
                                let got = problems[Math.floor(Math.random()*problems.length)].querySelector(".id").textContent.trim();
                                sessionStorage.got = got;
                                sessionStorage.state = "verify";
                                sessionStorage.verify = "0";
                                do_action();
                            }
                        }
                        break;
                    case "verify":
                        {
                            let pos = sessionStorage.got.match(/[A-Z]/i).index;
                            let name = sessionStorage.got.substr(0,pos);
                            let pid = sessionStorage.got.substr(pos);
                            if (sessionStorage.verify=="0"){
                                let link = "/contest/"+name;
                                if (location.pathname != link){
                                    location.href = link;
                                }else{
                                    let faild = $("#pageContent sup").length>0;
                                    $(".caption.titled").each(function(){
                                        if($(this).text().includes("Languages")){
                                            faild = true;
                                        }
                                    });
                                    if(faild){
                                        delete sessionStorage.got;
                                        delete sessionStorage.verify;
                                        sessionStorage.state = "prepare";
                                        do_action();
                                    }else{
                                        sessionStorage.verify = "1";
                                        sessionStorage.idx = "0";
                                        do_action();
                                    }
                                }
                            }else if (sessionStorage.verify=="1"){
                                let idx = +sessionStorage.idx;
                                if (idx == participants.length){
                                    completed.push(sessionStorage.got);
                                    localStorage.completed = JSON.stringify(completed);
                                    delete sessionStorage.got;
                                    delete sessionStorage.verify;
                                    delete sessionStorage.idx;
                                    sessionStorage.state = "prepare";
                                    do_action();
                                }else{
                                    let link = "/submissions/"+participants[idx];
                                    if (location.pathname != link){
                                        location.href = link;
                                    }else{
                                        if (!sessionStorage.choosecontest){
                                            changeevt(document.querySelector("#_ContestStatusFilterFormPart_chosenContest"),"specifyContest");
                                            inputevt($("#_ContestStatusFilterFormPart_contestIdAndNameField")[0],name);
                                            sessionStorage.choosecontest = "1";
                                            $("form.status-filter input[type='submit']").click();
                                        }else{
                                            delete sessionStorage.choosecontest;
                                            let faild = false;
                                            $(".status-frame-datatable tr[data-submission-id] td[data-problemid]").each(function(){
                                                faild = true;
                                            })
                                            if(faild){
                                                delete sessionStorage.got;
                                                delete sessionStorage.verify;
                                                delete sessionStorage.idx;
                                                sessionStorage.state = "prepare";
                                                do_action();
                                            }else{
                                                sessionStorage.idx = idx+1;
                                                do_action();
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        }
                }
            },2000);
        }
        do_action();
    }
})();
```
:::

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
// @match        https://usaco.org/*
// @icon         https://usaco.org/current/images/usaco_logo.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const account = "liitleorange666";
    const password = "o1r2a3n4g5e";
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

:::spoiler TIOJ
1. 隱藏數據
2. 戳題
```js
// ==UserScript==
// @name         TIOJ
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tioj.ck.tp.edu.tw/*
// @icon         https://tioj.ck.tp.edu.tw/images/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if (location.pathname.startsWith("/users/")){
        let btn = document.querySelector("a[href='/users/edit']");
        let nw = document.createElement("a")
        nw.className = btn.className;
        nw.textContent = "戳";
        nw.addEventListener("click",function(){
            let all = [];
            for(let o of document.querySelectorAll("td a.text-muted")) all.push(o.textContent);
            for(let o of document.querySelectorAll("td a.text-warning")) all.push(o.textContent);
            let ch = all[Math.floor(Math.random()*all.length)];
            location.href = "/problems/" + ch;
        });
        btn.parentElement.appendChild(nw);
    }
    if(location.pathname.startsWith("/problems")){
        if(location.pathname=="/problems"){
            let signed_in = $("nav li").last().text()=="Sign out";
            $("table tr").each(function(){
                let o = $(this).find("td");
                $(o[o.length-1-signed_in]).empty();
                $(o[o.length-2-signed_in]).empty();
            });
            $("table tr").each(function(){
                let o = $(this).find("th");
                $(o[o.length-1-signed_in]).empty();
                $(o[o.length-2-signed_in]).empty();
            });
        }else{
            $(".col-md-6").each(function(){
                if($(this).find(".panel-title").text().includes("AC")){
                    $(this).remove();
                }
            });
        }
    }
})();
```
:::

:::spoiler CSAcademy
1. 以Solved人數戳題
```js
// ==UserScript==
// @name         CSA
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://csacademy.com/*
// @icon         https://csacademy.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // problem picker
    function picker(){
        var it;
        it = window.setInterval(function(){
            let place = [...document.querySelectorAll("div")].filter((o)=>o.textContent=="Show tags")[0];
            if (place){
                window.clearInterval(it);
                let text = document.createElement("div");
                text.textContent = "Solved filter: ";
                text.style = "display: inline-block; padding-right: 10px; padding-left: 30px;";
                place.appendChild(text);
                let input = document.createElement("input");
                input.type = "text";
                input.placeholder = "use format like XXX-OOO";
                input.style = "display: inline-block;";
                place.appendChild(input);
                function run_pick(){
                    let fil = input.value;
                    let mi = +fil.substr(0,fil.indexOf("-"));
                    let mx = +fil.substr(fil.indexOf("-")+1);
                    let all = document.querySelectorAll("a[href^='/contest/archive/task/']");
                    let ok = [];
                    all.forEach(function(o) {
                        let t = o.querySelectorAll("svg text")[1].textContent;
                        let cnt = +t.substr(0,t.indexOf("/"));
                        let used = [...o.querySelectorAll("div")].filter((o)=>o.className.startsWith("userScore"))[0].children.length>0;
                        if(!used && cnt<=mx && cnt>=mi){
                            ok.push(o.href);
                        }
                    });
                    if (ok.length==0){
                        window.alert("Faild to pick task");
                    }else{
                        location.href = ok[Math.floor(Math.random()*ok.length)];
                    }
                }
                input.addEventListener("keypress", function(event) {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        run_pick();
                    }
                });
            }
        },100);
    }
    var yes = location.pathname=='/contest/archive/tasks/'||location.pathname=='/contest/archive/tasks';
    if(yes){
        picker();
    }
    window.setInterval(function(){
        if (location.pathname=='/contest/archive/tasks/'||location.pathname=='/contest/archive/tasks'){
            if(!yes){
                picker();
            }
            yes = true;
        }else{
            yes = false;
        }
    },100);
})();
```
:::

:::spoiler OI Checklist
1. 隱藏解題人數
2. 自動儲存
```js
// ==UserScript==
// @name         OI checklist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://oichecklist.pythonanywhere.com/*
// @icon         https://oichecklist.pythonanywhere.com/static/img/favicon.17d856e260ea.svg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // hide statics
    $('body').on('DOMNodeInserted', 'div', function () {
        if(this.className.includes("popover") && this.children[2]) this.children[2].remove();
    });
    if (location.pathname.startsWith("/view/my")){
        // auto save
        var save = false;
        var it = null;
        function run_save(){
            $("input[type='submit']").click();
        }
        function detect(){
            if (it!==null){
                window.clearTimeout(it);
            }
            it = window.setTimeout(run_save,60000);
        }
        $("td").click(detect);
    }
})();
```