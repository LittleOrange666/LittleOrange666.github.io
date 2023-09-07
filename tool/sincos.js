

var formula = [];
var real_formula = [];
var cnt = 0;
function executeScript(src) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    document.body.appendChild(script);
    script.src = src;
    document.body.removeChild(script);
}
function updatetext() {
    let e = document.querySelector("#text_line");
    let s = "";
    for (let o of formula) for (let o0 of o) {
        try {
            Fraction(o0["connect"].value);
        } catch {
            return;
        }
    }
    real_formula = formula.slice();
    for (let i = 0; i < formula.length; i++) {
        if (i > 0) s += " + ";
        for (let o of formula[i]) {
            let v = Fraction(o["connect"].value).toFraction();
            v = (v == "1") ? "" : ("" + v);
            s += "\\" + o["type"] + " " + v + "x";
        }
    }
    e.textContent = "$" + s + "$";
    MathJax.typeset();
    run();
}
function add(tp) {
    if (tp == "add") {
        formula.push([]);
        let a = document.createElement("span");
        a.className = "input-group-text col";
        a.textContent = "+";
        let e = document.querySelector("#input_area");
        if (cnt % 6 == 0) {
            let d = document.createElement("div");
            d.className = "row";
            e.appendChild(d);
        }
        e.lastChild.appendChild(a);
        updatetext();
        cnt++;
        return;
    }
    if (formula.length == 0) {
        formula.push([]);
    }
    let o = document.createElement("div");
    o.className = "input-group mb-3 col";
    let a = document.createElement("span");
    a.className = "input-group-text";
    a.textContent = tp;
    let b = document.createElement("span");
    b.className = "input-group-text";
    b.textContent = "x";
    let c = document.createElement("input");
    c.className = "form-control";
    c.value = "1";
    c.addEventListener("input", updatetext);
    o.appendChild(a);
    o.appendChild(c);
    o.appendChild(b);
    let e = document.querySelector("#input_area");
    if (cnt % 6 == 0) {
        let d = document.createElement("div");
        d.className = "row";
        e.appendChild(d);
    }
    e.lastChild.appendChild(o);
    let l = formula[formula.length - 1];
    l.push({ "type": tp, "connect": c });
    updatetext();
    cnt++;
}
function adding(o, a) {
    for (k in a) {
        if (o[k]) o[k] = o[k].add(a[k]);
        else o[k] = a[k];
    }
}
function muling(o, a) {
    let r = {};
    let t0 = o[0].substring(0,3);
    let t1 = a.substring(0,3);
    let f0 = Fraction(o[0].substring(3));
    let f1 = Fraction(a.substring(3));
    if (f0.compare(f1)<0){
        [t0,t1,f0,f1] = [t1,t0,f1,f0];
    }
    let f = o[1].mul(Fraction("1/2"));
    let A,B;
    if (t0 == "sin"){
        if (t1 == "sin"){
            A=["cos"+(f0.sub(f1)),f];
            B=["cos"+(f0.add(f1)),f.neg()];
        }else{
            A=["sin"+(f0.add(f1)),f];
            B=["sin"+(f0.sub(f1)),f];
        }
    }else{
        if (t1 == "sin"){
            A=["sin"+(f0.add(f1)),f];
            B=["sin"+(f0.sub(f1)),f.neg()];
        }else{
            A=["cos"+(f0.sub(f1)),f];
            B=["cos"+(f0.add(f1)),f];
        }
    }
    if (A[0]==B[0]){
        r[A[0]] = A[1].add(B[1]);
    }else{
        r[A[0]] = A[1];
        r[B[0]] = B[1];
    }
    return r;
}
function mul(o, a) {
    let r = {};
    for (k in o){
        adding(r,muling([k,o[k]],a));
    }
    return r;
}
function out(o){
    let s = "";
    let z = Fraction(0);
    for(let k in o){
        let v = o[k];
        if (k=="sin0" || v.toFraction()=="0") continue;
        if (k=="cos0"){
            s += (v.compare(z)<0?"":"+")+v.toFraction();
            continue;
        }
        let t = k.substring(0,3);
        let f = Fraction(k.substring(3));
        if (f.compare(z)<0){
            if (t == "sin"){
                //v = v.neg();
            }
           // f = f.neg();
        }
        let vt = "";
        if (v.compare(z)<0){
            vt = "-";
            v = v.neg();
        }else{
            vt = "+";
        }
        if (v.toFraction()!="1")vt += v.toFraction();
        s += vt+t+f.toFraction()+"x";
    }
    if (s.startsWith("+")) s = s.substring(1);
    return s;
}
function run() {
    let o = {};
    for (let line of formula) {
        let cur = null;
        for (let e of line) {
            let v = Fraction(e["connect"].value);
            let k = e["type"]+v.toFraction();
            if (cur) cur = mul(cur, k);
            else {
                cur = {};
                cur[k] = Fraction("1")
            }
        }
        adding(o,cur);
    }
    let s = out(o);
    document.querySelector("#out_line").textContent = "$\\int " + s + "\\,dx$";
    let ow = {};
    for(k in o){
        let t = k.substring(0,3);
        let f = Fraction(k.substring(3));
        if (k.substring(3)=="0"){
            
        }
        let v = o[k].div(f);
        if (t == "sin"){
            v = v.neg();
            t = "cos";
        }else{
            t = "sin";
        }
        let cur = {};
        cur[t+f] = v;
        adding(ow,cur);
    }
    let sw = out(ow);
    document.querySelector("#ans_line").textContent = "$= " + sw + "$";
    MathJax.typeset();
}
document.querySelector("#sin_btn").addEventListener("click", function () {
    add("sin");
});
document.querySelector("#cos_btn").addEventListener("click", function () {
    add("cos");
});
document.querySelector("#add_btn").addEventListener("click", function () {
    add("add");
});
