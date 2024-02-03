var smallerscale = 0;
var fl = Math.round;

function make(ty, inner) {
    let e = document.createElement(ty);
    e.innerText = inner;
    return e;
}
//position class
class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(x, y) {
        if (y === undefined) {
            return new Pos(this.x + x.x, this.y + x.y);
        }
        return new Pos(this.x + x, this.y + y);
    }
    sub(x, y) {
        if (y === undefined) {
            return new Pos(this.x - x.x, this.y - x.y);
        }
        return new Pos(this.x - x, this.y - y);
    }
    mul(m) {
        return new Pos(this.x * m, this.y * m);
    }
    equal(pos) {
        return this.x == pos.x && this.y == pos.y;
    }
    toPolar() {
        return new PolarPos(Math.sqrt(this.x * this.x + this.y * this.y), Math.atan2(this.y, this.x) / PolarPos.mul);
    }
    copy() {
        return new Pos(this.x, this.y)
    }
    ud() {
        return new Pos(this.x, -this.y);
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set length(v) {
        let m = v / this.length;
        this.x *= m;
        this.y *= m;
    }
    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
    toPt() {
        return "(" + Math.round(this.x) + "pt, " + Math.round(-this.y) + "pt)";
    }
}
class PolarPos extends Pos { //極座標
    constructor(r, theta) {
        super(r * Math.cos(theta * PolarPos.mul), r * Math.sin(theta * PolarPos.mul));
        this.r = r;
        this.theta = theta;
    }
    setXY(x, y) {
        this.r = Math.sqrt(x * x + y * y);
        this.theta = Math.atan2(y, x) / PolarPos.mul;
    }
    get x() {
        return this.r * Math.cos(this.theta * PolarPos.mul);
    }
    get y() {
        return this.r * Math.sin(this.theta * PolarPos.mul);
    }
    set x(value) {
        this.setXY(value, this.y);
    }
    set y(value) {
        this.setXY(this.x, value);
    }
    get length() {
        return this.r;
    }
    set length(v) {
        this.r = v;
    }
}
PolarPos.mul = (Math.PI / 180);

function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
//part class
class Parts { //元件列表
    constructor() {
        this.arr = [];
    }
    add(part) {
        this.arr.push(part);
        updatelister();
    }
    remove(part) {
        this.arr.splice(this.arr.indexOf(part), 1);
        updatelister();
    }
    get(uuid) {
        for (let part of this.arr) {
            if (part.uuid == uuid) {
                return part;
            }
        }
        return null;
    }
    find(pos) {
        for (let part of this.arr) {
            if (part.contains(pos)) {
                return part;
            }
        }
        return null;
    }
    findpoint(pos) {
        for (let part of this.arr) {
            if (part.ispoint() && part.contains(pos)) {
                return part;
            }
        }
        return null;
    }
    findnontag(pos) {
        for (let part of this.arr) {
            if (!part.istag() && part.contains(pos)) {
                return part;
            }
        }
        return null;
    }
    draws() {
        for (let i = this.arr.length - 1; i >= 0; i--) {
            this.arr[i].draw();
        }
    }
    updatepos() {
        for (let part of this.arr) {
            part.updatepos()
        }
        updatelister();
    }
    forEach(func) {
        for (let part of this.arr) {
            func(part);
        }
    }
}
var parts = new Parts();

function textSize(fontSize, text) {
    let span = document.createElement("span");
    let result = new Pos(0, 0);
    result.width = span.offsetWidth;
    result.height = span.offsetHeight;
    span.style.visibility = "hidden";
    span.style.fontSize = fontSize;
    span.style.display = "inline-block";
    document.body.appendChild(span);
    if (typeof span.textContent != "undefined") {
        span.textContent = text;
    } else {
        span.innerText = text;
    }
    result.x = parseFloat(window.getComputedStyle(span).width) - result.width;
    result.y = parseFloat(window.getComputedStyle(span).height) - result.height;
    document.body.removeChild(span);
    return result;
}
class Part { //元件
    constructor(center, size) {
        this._center = center;
        this.size = size;
        this.children = [];
        this.important = false;
        this.tag = null;
        parts.add(this);
        this.destroyed = false;
        this._name = "";
        if (!this.istag()) {
            this.tag = new Tag(this, this.name, 15);
            this.tag.moveto(this.canvaspos.add(new Pos(0, -10)));
        }
        this.parttype = "Part";
        this.display = true;
        this.uuid = _uuid();
    }
    set name(s) {
        this._name = s;
        if (!this.istag()) {
            this.tag.text = s;
            if (!this.usingnamer) updatelister();
            else updatename();
        }
    }
    get name() {
        return this._name;
    }
    set center(center) {
        let old = this.canvaspos;
        this._center = center;
        for (let child of this.children) {
            if (!child.destroyed) {
                child.moveto(child.canvaspos.add(this.canvaspos).sub(old));
                child.updatepos();
            }
        }
        if (this.tag) {
            this.tag.moveto(this.tag.canvaspos.add(this.canvaspos).sub(old));
            this.tag.updatepos();
        }
    }
    get center() {
        return this._center;
    }
    get canvaspos() {
        return this._center.ud().add(new Pos(1, 1)).mul(size / 2);
    }
    set canvaspos(cp) {
        this.center = cp.mul(2 / size).sub(new Pos(1, 1)).ud();
    }
    get realpos() {
        let repos = this.center.sub(reference_center()).toPolar();
        repos.r = repos.r * reallength();
        repos.theta = repos.theta - north() + 90;
        return reference_pos().add(repos);
    }
    set readpos(pos) {

    }
    contains(pos) {
        let p = pos.sub(this.canvaspos);
        return Math.abs(p.x) < this.size.x / 2 && Math.abs(p.y) < this.size.y / 2;
    }
    moveto(pos) {
        this.canvaspos = pos;
        this.children.forEach((p) => p.updatepos());
        if (this.standardable || this.important) parts.updatepos();
    }
    addchild(child) {
        this.children.push(child);
    }
    updatepos() {}
    draw() {}
    selected() {}
    ispoint() {
        return false;
    }
    candestroy() {
        return false;
    }
    destroy() {
        this.destroyed = true;
        parts.remove(this);
    }
    lowercolor(c) {
        let r = Math.floor((parseInt(c.substr(1, 2), 16) + 510) / 3);
        let g = Math.floor((parseInt(c.substr(3, 2), 16) + 510) / 3);
        let b = Math.floor((parseInt(c.substr(5, 2), 16) + 510) / 3);
        return "#" + r.toString(16) + g.toString(16) + b.toString(16);
    }
    istag() {
        return false;
    }
    tikz() {
        return "";
    }
}
class Segment extends Part {
    constructor(point1, point2, color) {
        super(point1.center.add(point2.center).mul(0.5), new Pos(1, 1));
        if (color == undefined) {
            color = "#000000";
        }
        this.color = color;
        this.point1 = point1;
        this.point2 = point2;
        this.parttype = "Segment";
    }
    get length() {
        let v = this.point1.center.sub(this.point2.center);
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }
    set length(v) {}
    draw() {
        if (this.point1.destroyed || this.point2.destroyed) {
            this.destroy();
        }
        if (this.color != undefined) {
            ctx.strokeStyle = this.color;
        }
        ctx.lineWidth = 2;
        drawline(this.point1.canvaspos.x, this.point1.canvaspos.y, this.point2.canvaspos.x, this.point2.canvaspos.y);
    }
    selected() {
        if (this.point1.destroyed || this.point2.destroyed) {
            this.destroy();
        }
        if (this.color != undefined) {
            ctx.strokeStyle = this.lowercolor(this.color);
        }
        ctx.lineWidth = 6;
        drawline(this.point1.canvaspos.x, this.point1.canvaspos.y, this.point2.canvaspos.x, this.point2.canvaspos.y);
    }
    moveto(pos) {}
    contains(pos) {
        let d = 3;
        let p1 = this.point1.canvaspos;
        let p2 = this.point2.canvaspos;
        let x1 = Math.min(p1.x, p2.x) - d;
        let x2 = Math.max(p1.x, p2.x) + d;
        let y1 = Math.min(p1.y, p2.y) - d;
        let y2 = Math.max(p1.y, p2.y) + d;
        if (pos.x >= x1 && pos.x <= x2 && pos.y >= y1 && pos.y <= y2) {
            let a = p1.y - p2.y;
            let b = p2.x - p1.x;
            let c = p1.y * p2.x - p2.y * p1.x;
            let l = Math.abs(a * pos.x + b * pos.y - c) / Math.sqrt(a * a + b * b);
            return l <= d;
        }
        return false;
    }
    ispoint() {
        return false;
    }
    candestroy() {
        return true;
    }
}
class Curve extends Part {
    constructor(parts, color) {
        super(new Pos(0, 0), new Pos(0, 0));
        if (color == undefined) {
            color = "#0000FF";
        }
        this.color = color;
        this.parts = parts;
        this.length = parts.length;
        this.parttype = "Curve";
        this.power = 0;
        this.ok = false;
        this.data = null;
        for (let i = 0; i < this.length; i++) {
            this.parts[i].addchild(this);
        }
    }
    candestroy() {
        return true;
    }
    draw() {
        for(let o of this.parts) {
            if (o.destroyed) this.destroy();
        }
        if (this.color != undefined) {
            ctx.strokeStyle = this.color;
        }
        if (!this.ok) {
            this.ok = true;
            this.data = createcurve(this.parts, this.power);
        }
        ctx.lineWidth = 2;
        justdrawcurve(this.data);
    }
    updatepos() {
        this.ok = false;
    }
    tikz(){
        let ret = "\\draw[thick]  plot [smooth,tension=0.8]\ncoordinates {";
        for(let o of this.parts) ret += o.canvaspos.toPt() + " ";
        return ret+"};\n"
    }
}
class Polygon extends Part {
    constructor(parts, color) {
        super(new Pos(0, 0), new Pos(0, 0));
        if (color == undefined) {
            color = "#0000FF";
        }
        this.color = color;
        this.parts = parts;
        this.length = parts.length;
        this.parts[this.length] = this.parts[0];
        this.segs = [];
        for (let i = 0; i < this.length; i++) {
            this.segs[i] = new Segment(this.parts[i], this.parts[i + 1], color);
            this.segs[i].inpolygon = true;
            this.parts[i].addchild(this);
        }
        this.parttype = "Polygon";
    }
    getarea() {
        let sum = 0;
        for (let i = 0; i < this.length; i++) {
            sum += this.parts[i].center.x * this.parts[i + 1].center.y;
            sum -= this.parts[i].center.y * this.parts[i + 1].center.x;
        }
        return Math.abs(sum) / 2;
    }
    destroy() {
        this.destroyed = true;
        parts.remove(this);
        for (let seg of this.segs) {
            if (!seg.destroyed) seg.destroy();
        }
    }
    candestroy() {
        return true;
    }
    draw() {
        if (this.color != undefined) {
            ctx.strokeStyle = this.color;
        }
        let x = this.color;
        let a = fl(255 - (255 - parseInt(x.substr(1, 2), 16)) / 3);
        let b = fl(255 - (255 - parseInt(x.substr(3, 2), 16)) / 3);
        let c = fl(255 - (255 - parseInt(x.substr(5, 2), 16)) / 3);
        ctx.fillStyle = "#" + a.toString(16) + b.toString(16) + c.toString(16);
        ctx.beginPath();
        ctx.moveTo(fl(this.parts[0].canvaspos.x), fl(this.parts[0].canvaspos.y));
        for (let i = 1; i < this.parts.length; i++) {
            ctx.lineTo(fl(this.parts[i].canvaspos.x), fl(this.parts[i].canvaspos.y));
        }
        ctx.fill();
    }
}
class Point extends Part {
    constructor(center, radius, color) {
        super(center, new Pos(radius * 2, radius * 2));
        this.radius = radius;
        this.color = color;
        this.parttype = "Point";
    }
    draw() {
        ctx.strokeStyle = "#000000";
        if (this.color != undefined) {
            ctx.fillStyle = this.color;
        }
        ctx.lineWidth = 0.5;
        drawcircle(this.canvaspos.x, this.canvaspos.y, this.radius);
    }
    selected() {
        if (this.color != undefined) {
            ctx.fillStyle = this.lowercolor(this.color);
        }
        ctx.lineWidth = 0.1;
        drawcircle(this.canvaspos.x, this.canvaspos.y, this.radius * 2);
    }
    ispoint() {
        return true;
    }
    candestroy() {
        return this.is_new_point === true;
    }
    tikz(){
        if(this.is_control_point) return "";
        return "\\fill "+this.canvaspos.toPt()+" circle ("+this.radius+"pt);\n";
    }
}
class FixedPoint extends Point {
    constructor(center, radius, color, getpos) {
        super(center, radius, color);
        this.getpos = getpos;
        this.parttype = "FixedPoint";
    }
    moveto(pos) {}
    updatepos() {
        if (this.getpos != undefined) {
            this.center = this.getpos(this);
        }
    }
}
class NorthPoint extends FixedPoint {
    constructor(center, radius, color, getpos) {
        super(center, radius, color, getpos);
    }
    moveto(pos) {
        if (drag.northing) {
            let d = pos.sub(midpoint.canvaspos).toPolar().theta - this.canvaspos.sub(midpoint.canvaspos).toPolar().theta;
            let ps = parts.arr;
            for (let i in ps) {
                if (ps[i].parttype == "Point" && !ps[i].isnorth) {
                    let v = ps[i].canvaspos.sub(midpoint.canvaspos).toPolar();
                    v.theta += d;
                    ps[i].moveto(midpoint.canvaspos.add(v));
                }
            }
        }
    }
}
class Tag extends Part {
    constructor(parent, text, tsize) {
        super(parent.center.copy(), textSize(tsize, text));
        this.parent = parent;
        this._text = text;
        this.tsize = tsize;
        parent.tag = this;
        this.parttype = "Tag";
        this.display = false;
    }
    set text(t) {
        this._text = t;
        this.size = textSize(this.tsize, t);
    }
    get text() {
        return this._text;
    }
    moveto(pos) {
        let p = pos.sub(this.parent.canvaspos);
        let dis = p.x * p.x + p.y * p.y;
        let d2 = this.tsize * this.tsize * 10;
        if (dis > d2) {
            p = p.mul(Math.sqrt(d2 / dis));
            this.canvaspos = this.parent.canvaspos.add(p);
        } else {
            this.canvaspos = pos;
        }
    }
    updatepos() {
        if (isNaN(this.center.x) || isNaN(this.center.y)) {
            this.center = this.parent.center.copy();
            return;
        }
        let p = this.parent.canvaspos.sub(this.canvaspos);
        let dis = p.x * p.x + p.y * p.y;
        let d2 = this.tsize * this.tsize * 10;
        if (dis > d2) {
            p = p.mul(Math.sqrt(d2 / dis));
            this.canvaspos = this.parent.canvaspos.sub(p);
        }
    }
    draw() {
        if (this.parent.destroyed) {
            this.destroy();
        }
        ctx.font = this.tsize + 'px 標楷體'; // 文字字號、字型
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.fillText(this.text, this.canvaspos.x, this.canvaspos.y);
    }
    istag() {
        return true;
    }
    tikz(){
        return "\\node[above] at "+this.parent.canvaspos.add(0,-10).toPt()+"{"+this.text+"};\n";
    }
}

function intersect(a1, b1, c1, a2, b2, c2) {
    let d = a1 * b2 - a2 * b1;
    let dx = c1 * b2 - c2 * b1;
    let dy = a1 * c2 - a2 * c1;
    return new Pos(dx / d, dy / d);
}

function posfinder(pos1, pos2, angle1, angle2) {
    let n = north();
    let p1 = pos1;
    let p2 = p1.add(new PolarPos(1, n - angle1));
    let a1 = p1.y - p2.y;
    let b1 = p2.x - p1.x;
    let c1 = p1.y * p2.x - p2.y * p1.x;
    let q1 = pos2;
    let q2 = q1.add(new PolarPos(1, n - angle2));
    let a2 = q1.y - q2.y;
    let b2 = q2.x - q1.x;
    let c2 = q1.y * q2.x - q2.y * q1.x;
    return intersect(a1, b1, c1, a2, b2, c2);
}
class ThePoint extends FixedPoint {
    constructor(angle1, angle2, name, p1, p2, color) {
        super(new Pos(0, 0), 5, color, function(self) {
            return posfinder(self.part1.center, self.part2.center, self.angle1, self.angle2)
        });
        this.part1 = p1;
        this.part2 = p2;
        this.name = name;
        this.angle1 = angle1;
        this.angle2 = angle2;
        this.updatepos();
        this.parttype = "ThePoint";
    }
    candestroy() {
        return !this.standardable;
    }
}
// canvas format
let canvaspos = new Pos(0, 0);
var size = 0;
var ctx;
var canvaschecker = {
    size1: 0,
    size2: 0,
}

function checkcanvaspos() {
    if (document.body.clientWidth != canvaschecker.size1) {
        updatecanvaspos();
    } else if (window.screen.height - 160 - uparea.clientHeight - smallerscale != canvaschecker.size2) {
        updatecanvaspos();
    }
}

function updatecanvaspos() { //修正排版
    let size1 = document.body.clientWidth;
    let size2 = window.screen.height - 160 - uparea.clientHeight - smallerscale;
    size = Math.min(size1, size2);
    canvas.width = size;
    canvas.height = size;
    if (size1 < size2) {
        canvaspos.x = 0;
        canvaspos.y = fl((size2 - size) / 2) + uparea.clientHeight;
    } else {
        canvaspos.x = fl((size1 - size) / 2);
        canvaspos.y = uparea.clientHeight;
    }
    ctx = canvas.getContext("2d");
    ctx.textAlign = 'center';
    canvaschecker.size1 = size1;
    canvaschecker.size2 = size2;
}
updatecanvaspos();
window.setInterval(refresh, 30);
var mouse = new Pos(0, 0);
mouse.incanvas = function() {
    return this.x > 0 && this.y > 0 && this.x < size && this.y < size;
}
window.addEventListener('mousemove', (event) => {
    clicker.curveok = false;
    mouse.x = event.pageX - canvaspos.x - 0 + ((rightarea.clientWidth - leftarea.clientWidth) / 2);
    mouse.y = event.pageY - canvaspos.y - 2;
    if (drag.isdraging) {
        draging();
    }
});

function drawline(x1, y1, x2, y2) { //畫直線
    ctx.beginPath();
    ctx.moveTo(fl(x1), fl(y1));
    ctx.lineTo(fl(x2), fl(y2));
    ctx.stroke();
}

function drawcircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(fl(x), fl(y), fl(r), 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

function drawcurve(partlist, power) { //畫曲線
    justdrawcurve(createcurve(partlist, power));
}

function createcurve(partlist, power) {
    if (power === undefined) power = 0;
    let l = partlist.length;
    let poslist = [];
    for (let i = 0; i < l; i++) {
        if (partlist[i].canvaspos) {
            poslist[i] = partlist[i].canvaspos;
        } else {
            poslist[i] = partlist[i];
        }
    }
    let ds = [];
    let tl = 0;
    ds[0] = 0;
    let truelen = 0;
    for (let i = 1; i < l; i++) {
        tl += Math.pow(poslist[i].sub(poslist[i - 1]).length, power);
        truelen += poslist[i].sub(poslist[i - 1]).length;
        ds[i] = tl;
    }
    let len = ds[l - 1];
    truelen = Math.ceil(truelen / 2);
    for (let i = 1; i < l; i++) {
        ds[i] /= len;
    }
    let x = [];
    let y = [];
    for (let i = 0; i < l; i++) {
        x[i] = [];
        y[i] = [];
        for (let j = 0; j < l; j++) {
            x[i][j] = Math.pow(ds[i], j);
            y[i][j] = Math.pow(ds[i], j);
        }
        x[i][l] = poslist[i].x;
        y[i][l] = poslist[i].y;
    }
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l; j++) {
            if (j != i) {
                let mx = x[j][i] / x[i][i];
                let my = y[j][i] / y[i][i];
                for (let t = 0; t <= l; t++) {
                    x[j][t] -= mx * x[i][t];
                    y[j][t] -= my * y[i][t];
                }
            }
        }
    }
    let a = [];
    let b = [];
    for (let i = 0; i < l; i++) {
        a[i] = x[i][l] / x[i][i];
        b[i] = y[i][l] / y[i][i];
    }
    let curves = [];
    let currect = false;
    for (let i = 0; i <= truelen; i++) {
        let x = 0;
        let y = 0;
        let t = i / truelen;
        let mul = 1;
        for (let j = 0; j < l; j++) {
            x += a[j] * mul;
            y += b[j] * mul;
            mul *= t;
        }
        curves.push(new Pos(x, y));
        if (x > 0 && y > 0 && x < size && y < size) {
            currect = true;
        }
    }
    if (!currect) {
        curves = [curves[0]];
    }
    return curves;
}

function justdrawcurve(curvedata) {
    ctx.beginPath();
    ctx.moveTo(curvedata[0].x, curvedata[0].y);
    for (let i = 1; i < curvedata.length; i++) {
        ctx.lineTo(curvedata[i].x, curvedata[i].y);
    }
    ctx.stroke();
}
//drag system
var drag = {
    isdraging: false,
    part: null,
    previous: new Pos(0, 0),
    lc: new Pos(0, 0),
    northing: false
};

function startdrag() {
    drag.previous = mouse.copy();
    drag.part = parts.find(mouse);
    drag.isdraging = true;
    if (drag.part) {
        drag.lc = drag.part.canvaspos;
    }
}

function draging() {
    if (mouse.incanvas()) {
        if (drag.part) {
            drag.lc = drag.lc.add(mouse).sub(drag.previous);
            //if (drag.part.uuid == northpoint.uuid) drag.northing = true;
            drag.part.moveto(drag.lc);
            drag.northing = false;
        } else {
            let ps = parts.arr;
            for (let i in ps) {
                if (ps[i].parttype == "Point" && !ps[i].isnorth) {
                    ps[i].moveto(ps[i].canvaspos.add(mouse).sub(drag.previous));
                }
            }
        }
        drag.previous = mouse.copy();
        refresh_attributes();
    } else {
        enddrag();
    }
}

function enddrag() {
    drag.isdraging = false;
}
canvas.onmousedown = (event) => startdrag();
canvas.onmouseup = (event) => enddrag();
//zoom system
function zoom(event) {
    event.preventDefault();
    let delta = Math.pow(2, event.deltaY * -0.001);
    let ps = parts.arr;
    for (let i in ps) {
        if (ps[i].parttype == "Point" && !ps[i].isnorth) {
            ps[i].moveto(ps[i].canvaspos.sub(mouse).mul(delta).add(mouse));
        }
    }
}
canvas.onwheel = zoom;
//click system
var clicker = {
    isseging: false,
    ismoving: false,
    curvedata: null,
    curveok: false,
    polypoints: [],
    polysegs: [],
    selected: null,
    method: "select",
    refreshbtn: function() {
        clicker.isseging = false;
        clicker.ismoving = false;
        btn_select.innerHTML = "選取";
        btn_point.innerHTML = "新點";
        btn_segment.innerHTML = "新邊";
        btn_color.innerHTML = "改顏色";
        clicker.polypoints = [];
        for (let seg of clicker.polysegs) {
            seg.destroy();
        }
        clicker.polysegs = [];
    },
    lp() {
        return clicker.polypoints[clicker.polypoints.length - 1];
    }
}
btn_select.addEventListener("click", function() {
    if (clicker.method == "select") return;
    clicker.refreshbtn();
    clicker.method = "select";
    btn_select.innerHTML += "√";
});
btn_point.addEventListener("click", function() {
    if (clicker.method == "point") return;
    clicker.refreshbtn();
    clicker.method = "point";
    btn_point.innerHTML += "√";
    clicker.selected = null;
});
btn_segment.addEventListener("click", function() {
    if (clicker.method == "segment") return;
    clicker.refreshbtn();
    clicker.method = "segment";
    btn_segment.innerHTML += "√";
    if (clicker.selected && !clicker.isseging) {
        clicker.isseging = true;
    }
});
btn_color.addEventListener("click", function() {
    if (clicker.method == "color") return;
    clicker.refreshbtn();
    clicker.method = "color";
    btn_color.innerHTML += "√";
    if (clicker.selected) {
        clicker.selected.color = input_color.value;
    }
});
input_color.addEventListener("change", function() {
    if (clicker.selected && clicker.method == "color") {
        clicker.selected.color = input_color.value;
    }
})
btn_destroy.addEventListener("click", function() {
    if (clicker.selected) {
        if (clicker.selected.candestroy()) clicker.selected.destroy();
        clicker.selected = null;
    }
});

function onmouseclick() {
    if (clicker.method == "point") {
        let p = new Point(new Pos(0, 0), 10, input_color.value);
        p.moveto(mouse);
        p.is_new_point = true;
        //clicker.refreshbtn();
        //clicker.method = "select";
        //btn_select.innerHTML += "√";
        updatelister();
    }
    if (clicker.method == "segment") {
        if (!clicker.isseging) {
            clicker.selected = parts.findpoint(mouse);
            if (clicker.selected != null) {
                clicker.isseging = true;
            }
            refresh_attributes();
        } else {
            clicker.isseging = false;
            let endpart = parts.findpoint(mouse);
            if (endpart != null) {
                let p = new Point(clicker.selected.center.add(endpart.center).mul(0.5), 5, input_color.value);
                p.is_new_point = true;
                p.is_control_point = true;
                new Curve([clicker.selected, p, endpart], input_color.value);
                updatelister();
            }
            clicker.selected = null;
            refresh_attributes();
        }
    }
    if (clicker.method == "polygon") {
        if (clicker.polypoints.length == 0) {
            clicker.selected = parts.findpoint(mouse);
            if (clicker.selected != null) {
                clicker.polypoints[0] = clicker.selected;
            }
            refresh_attributes();
        } else {
            let nextpart = parts.findpoint(mouse);
            if (nextpart != null) {
                if (nextpart == clicker.polypoints[0]) {
                    new Polygon(clicker.polypoints, input_color.value);
                    clicker.polypoints = [];
                    for (let seg of clicker.polysegs) {
                        seg.destroy();
                    }
                    clicker.polysegs = [];
                } else {
                    clicker.polysegs.push(new Segment(clicker.lp(), nextpart, input_color.value));
                    clicker.polypoints.push(nextpart);
                }
                updatelister();
            }
        }
    }
    if (clicker.method == "curve") {
        if (clicker.polypoints.length == 0) {
            clicker.selected = parts.findpoint(mouse);
            if (clicker.selected != null) {
                clicker.polypoints[0] = clicker.selected;
            }
            refresh_attributes();
        } else {
            let nextpart = parts.findpoint(mouse);
            if (nextpart != null) {
                clicker.polypoints.push(nextpart);
            } else {
                if (clicker.polypoints.length > 1) new Curve(clicker.polypoints, input_color.value);
                clicker.polypoints = [];
                updatelister();
            }
        }
    }
    if (clicker.method == "move") {
        if (!clicker.ismoving) {
            clicker.selected = parts.findpoint(mouse);
            if (clicker.selected != null) {
                clicker.ismoving = true;
            }
            refresh_attributes();
        } else {
            clicker.ismoving = false;
            clicker.selected.moveto(mouse);
            clicker.selected = null;
            refresh_attributes();
        }
    }
    if (clicker.method == "color") {
        clicker.selected = parts.findnontag(mouse);
        if (clicker.selected != null) {
            clicker.selected.color = input_color.value;
        }
        refresh_attributes();
    }
    if (clicker.method == "select") {
        clicker.selected = parts.findnontag(mouse);
        refresh_attributes();
    }
}
canvas.onclick = (event) => onmouseclick();

function onseging() {
    ctx.strokeStyle = input_color.value;
    ctx.lineWidth = 2;
    drawline(clicker.selected.canvaspos.x, clicker.selected.canvaspos.y, mouse.x, mouse.y);
}

function onpoly() {
    let x = input_color.value;
    let a = fl(255 - (255 - parseInt(x.substr(1, 2), 16)) / 3);
    let b = fl(255 - (255 - parseInt(x.substr(3, 2), 16)) / 3);
    let c = fl(255 - (255 - parseInt(x.substr(5, 2), 16)) / 3);
    ctx.fillStyle = "#" + a.toString(16) + b.toString(16) + c.toString(16);
    ctx.strokeStyle = input_color.value;
    ctx.lineWidth = 2;
    drawline(clicker.lp().canvaspos.x, clicker.lp().canvaspos.y, mouse.x, mouse.y);
    ctx.beginPath();
    ctx.moveTo(fl(clicker.polypoints[0].canvaspos.x), fl(clicker.polypoints[0].canvaspos.y));
    for (let i = 1; i < clicker.polypoints.length; i++) {
        ctx.lineTo(fl(clicker.polypoints[i].canvaspos.x), fl(clicker.polypoints[i].canvaspos.y));
    }
    ctx.lineTo(mouse.x, mouse.y);
    ctx.fill();
}

function oncurve() {
    if (!clicker.curveok) {
        let ps = clicker.polypoints.concat();
        ps.push(mouse);
        clicker.curvedata = createcurve(ps, 0);
        clicker.curveok = true;
    }
    ctx.strokeStyle = input_color.value;
    ctx.lineWidth = 2;
    justdrawcurve(clicker.curvedata);
}
btn_download.addEventListener("click", function() {
    let a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = new Date().toISOString().replace(":", "_") + ".png";
    a.click();
});
btn_tikz.addEventListener("click", function() {
    let txt = "\\begin{tikzpicture}\n";
    for(let o of parts.arr) txt += o.tikz();
    txt+="\\end{tikzpicture}";
    saveTextAsFile("graph.tex", txt);
});
btn_copy.addEventListener("click", function() {
    const ccanvas = document.createElement('canvas');
    const cctx = ccanvas.getContext('2d');
    const img = new Image();
    ccanvas.width = canvas.width;
    ccanvas.height = canvas.height;
    img.crossOrigin = "Anonymous";
    img.src = canvas.toDataURL();
    img_copy.src = canvas.toDataURL();
    img_copy.onload = () => {
        let r = new Range();
        r.selectNode = img_copy;
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        console.log(r);
    }
    img.onload = () => {
        cctx.clearRect(0, 0, cctx.canvas.width, cctx.canvas.height);
        cctx.drawImage(img, 0, 0); // 将canvas转为blob   
        ccanvas.toBlob(blob_copyer);
    }
});
function blob_copyer(blob) {
    console.log(blob);
    const data = [new ClipboardItem({
        [blob.type]: blob,
    }), ]; // https://w3c.github.io/clipboard-apis/#dom-clipboard-write   
    navigator.clipboard.write(data).then(() => { console.log("Copied to clipboard successfully!"); }, () => { console.error("Unable to write to clipboard."); });
}

function getTimeStr(date) { //顯示時間
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function saveTextAsFile(_fileName, _text) {
    var textFileAsBlob = new Blob([_text], { type: 'text/plain' });

    var downloadLink = document.createElement("a");
    downloadLink.download = _fileName;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}

function refresh_attributes() {
    if (clicker.selected) {
        main_attributes.hidden = false;
        let type = clicker.selected.parttype;
        if (type == "ThePoint") type = "所求點";
        if (type == "FixedPoint") type = "固定點";
        if (type == "Point") type = "動點";
        if (type == "Segment") type = "線段";
        if (type == "Polygon") type = "多邊形";
        if (type == "Curve") type = "曲線";
        label_objtype.innerHTML = "物件類型：" + type;
        attribute_name.value = clicker.selected.name;
        attribute_color.value = clicker.selected.color;
        let rp = clicker.selected.realpos;
        attribute_x.value = Math.round(rp.x * 10000000000) * 0.0000000001;
        attribute_y.value = Math.round(rp.y * 10000000000) * 0.0000000001;
        attribute_x.oldvalue = attribute_x.value;
        attribute_y.oldvalue = attribute_y.value;
        attribute_x.disabled = true //(type != "動點");
        attribute_y.disabled = true //(type != "動點");
        //tp_attributes.hidden = (type != "所求點");
        if (type == "所求點") {
            attribute_named1.innerHTML = "相對於" + clicker.selected.part1.name + "的方向角：";
            attribute_named2.innerHTML = "相對於" + clicker.selected.part2.name + "的方向角：";
        }
        //seg_attributes.hidden = (type != "線段");
        //pos_attributes.hidden = (type == "線段" || type == "多邊形");
        //poly_attributes.hidden = (type != "多邊形");
        //curve_attributes.hidden = (type != "曲線");
        //attribute_facing1.value = clicker.selected.angle1;
        //attribute_facing2.value = clicker.selected.angle2;
        //if (type == "線段") attribute_length.value = clicker.selected.length * reallength();
        //if (type == "多邊形") attribute_area.value = clicker.selected.getarea() * reallength() * reallength();
        attribute_delete.disabled = !clicker.selected.candestroy();
        //standardable_attributes.hidden = !(type == "所求點" || (type == "動點" && clicker.selected.is_new_point));
        /*
        if (!standardable_attributes.hidden) {
            attribute_standardable.checked = clicker.selected.standardable;
            attribute_standardable.disabled = false;
            if (clicker.selected.standardable) {
                for (let part of parts.arr) {
                    if (part.parttype == "ThePoint" && (part.part1.uuid == clicker.selected.uuid || part.part2.uuid == clicker.selected.uuid)) {
                        attribute_standardable.disabled = true;
                        break;
                    }
                }
            } else {
                for (let part of parts.arr) {
                    if (part.standardable && part.name == clicker.selected.name) {
                        attribute_standardable.disabled = true;
                        break;
                    }
                }
            }
        }
        */
    } else {
        main_attributes.hidden = true;
        label_objtype.innerHTML = "尚未選取物件";
    }
}
//attribute controller
attribute_name.addEventListener("input", function() {
    if (clicker.selected) {
        clicker.selected.name = attribute_name.value;
        updatename();
    }
});
attribute_color.addEventListener("input", function() {
    if (clicker.selected) {
        clicker.selected.color = attribute_color.value;
    }
});
attribute_x.addEventListener("input", function() {
    if (clicker.selected) {
        let old = clicker.selected.center;
        let data = Number(attribute_x.value);
        if (data > 1 || data < -1 || isNaN(data)) {
            data = old.x;
            attribute_x.value = old.x;
        }
        clicker.selected.center = new Pos(data, old.y);
        clicker.selected.updatepos();
    }
});
attribute_y.addEventListener("input", function() {
    if (clicker.selected) {
        let old = clicker.selected.center;
        let data = Number(attribute_y.value);
        if (data > 1 || data < -1 || isNaN(data)) {
            data = old.y;
            attribute_y.value = old.y;
        }
        clicker.selected.center = new Pos(old.x, data);
        clicker.selected.updatepos();
    }
});
attribute_update.addEventListener("click", function() {
    if (clicker.selected) {
        clicker.selected.updatepos();
        refresh_attributes();
    }
});
attribute_delete.addEventListener("click", function() {
    if (clicker.selected) {
        clicker.selected.destroy();
        clicker.selected = null;
        refresh_attributes();
    }
});

function updatelister() {
    while (objlister.children.length > 1) {
        objlister.removeChild(objlister.children[1]);
    }
    for (let cpart of parts.arr) {
        if (cpart.display&&cpart.parttype!="Curve") {
            let row = document.createElement("div");
            row.className = "row";
            let col1 = document.createElement("div");
            col1.className = "col";
            let namer = document.createElement("input");
            namer.value = cpart.name;
            namer.className = "maxinput";
            cpart.namer = namer;
            namer.addEventListener("input", function() {
                cpart.usingnamer = true;
                cpart.name = namer.value;
                cpart.usingnamer = false;
            });
            col1.appendChild(namer);
            let col2 = document.createElement("div");
            col2.className = "col";
            let text2 = document.createElement("p");
            let type = cpart.parttype;
            if (type == "ThePoint") type = "所求點";
            if (type == "FixedPoint") type = "固定點";
            if (type == "Point") type = "動點";
            if (type == "Segment") type = "線段";
            if (type == "Polygon") type = "多邊形";
            if (type == "Curve") type = "曲線";
            text2.innerHTML = type;
            col2.appendChild(text2);
            let col3 = document.createElement("div");
            col3.className = "col";
            let btn0 = document.createElement("button");
            btn0.cpart = cpart;
            btn0.className = "btn btn-primary btn-sm";
            btn0.innerHTML = "選取";
            btn0.addEventListener("click", function() {
                clicker.selected = btn0.cpart;
                refresh_attributes();
                document.getElementById("attributes-tab").click();
            });
            col3.appendChild(btn0);
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            objlister.appendChild(row);
        }
    }
}
//button method
function promptnumber(ask) {
    let r = NaN;
    let faild = false;
    while (isNaN(r)) {
        let t = prompt(ask + (faild ? "(請輸入數字或按取消)" : ""), "0");
        if (t == null) {
            return null;
        }
        r = Number(t);
        faild = true;
    }
    return r;
}

function averagecolor(color0, color1) {
    let a = fl((parseInt(color0.substr(1, 2), 16) + parseInt(color1.substr(1, 2), 16)));
    let b = fl((parseInt(color0.substr(3, 2), 16) + parseInt(color1.substr(3, 2), 16)));
    let c = fl((parseInt(color0.substr(5, 2), 16) + parseInt(color1.substr(5, 2), 16)));
    let m = 1;
    if (a > 255) m = m < a / 255 ? m : a / 255;
    if (b > 255) m = m < b / 255 ? m : b / 255;
    if (c > 255) m = m < c / 255 ? m : c / 255;
    a = Math.floor(a / m).toString(16);
    b = Math.floor(b / m).toString(16);
    c = Math.floor(c / m).toString(16);
    return "#" + (a.length > 1 ? a : "0" + a) + (b.length > 1 ? b : "0" + b) + (c.length > 1 ? c : "0" + c);
}

function facingtopos() {
    let facing1 = Number(facingin1.value);
    let facing2 = Number(facingin2.value);
    let name = pointnamer.value;
    let p1 = parts.arr.find((p) => p.name == first_standard_point.value);
    let p2 = parts.arr.find((p) => p.name == second_standard_point.value);
    if (triple_standard_point.checked) {
        let facing3 = Number(facingin3.value);
        let p3 = parts.arr.find((p) => p.name == third_standard_point.value);
        new ThePoint(facing1, facing2, name, p1, p2, averagecolor(p1.color, p2.color));
        new ThePoint(facing1, facing3, name, p1, p3, averagecolor(p1.color, p3.color));
        new ThePoint(facing2, facing3, name, p2, p3, averagecolor(p2.color, p3.color));
    } else {
        new ThePoint(facing1, facing2, name, p1, p2, pointcolorr.value);
    }
    updatelister();
}

function checkfacingtopos() {
    let name = pointnamer.value;
    let sus = name.length > 0;
    let facing1 = Number(facingin1.value);
    let facing2 = Number(facingin2.value);
    let facing3 = Number(facingin3.value);
    sus = sus && !isNaN(facing1) && !isNaN(facing2);
    sus = sus && facingin1.value.length > 0 && facingin2.value.length > 0;
    sus = sus && (Math.abs(facing1 - facing2) % 180 != 0);
    if (triple_standard_point.checked) {
        sus = sus && !isNaN(facing3) && facingin3.value.length > 0;
        sus = sus && (Math.abs(facing1 - facing3) % 180 != 0) && (Math.abs(facing2 - facing3) % 180 != 0);
    }
    btn_ftp.disabled = !sus;
}

function refresh() { //刷新畫面
    checkcanvaspos();
    ctx.beginPath();
    ctx.rect(0, 0, size, size);
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#000000";
    ctx.fill();
    if (clicker.selected) clicker.selected.selected();
    parts.draws();
    if (clicker.isseging) {
        onseging();
    }
    if (clicker.polypoints.length > 0) {
        if (clicker.method == "polygon") {
            onpoly();
        } else if (clicker.method == "curve") {
            oncurve();
        }
    }
    //畫指向北方的箭頭
    /*
    ctx.lineWidth = 2;
    ctx.strokeStyle = midpoint.color;
    let p1 = midpoint.canvaspos;
    let p2 = northpoint.canvaspos;
    drawline(p1.x, p1.y, p2.x, p2.y);
    let f1 = p1.sub(p2).toPolar();
    f1.theta += 30;
    f1.r *= 0.2;
    let f2 = p1.sub(p2).toPolar();
    f2.theta -= 30;
    f2.r *= 0.2;
    let p3 = p2.add(f1);
    let p4 = p2.add(f2);
    drawline(p3.x, p3.y, p2.x, p2.y);
    drawline(p4.x, p4.y, p2.x, p2.y);
    */
}
//default points
var part1, part2, midpoint, northpoint;

function init() {
    parts.arr = [];
}

function createProfile() {
    let data = {};
    let partlist = [];
    let settings = {};
    //
    //
    let ps = parts.arr;
    for (let p of ps) {
        let o = null;
        if (!p.isbase) {
            o = {}
            o.pos = p.center;
            o.name = p.name;
            o.color = p.color;
            o.standardable = !!p.standardable;
            o.type = p.parttype;
            o.uuid = p.uuid;
            if (o.type == "ThePoint") {
                o.part1 = p.part1.uuid;
                o.part2 = p.part2.uuid;
                o.facing1 = p.angle1;
                o.facing2 = p.angle2;
                delete o.pos;
            } else if (o.type == "Point") {} else if (o.type == "Segment") {
                o.point1 = p.point1.uuid;
                o.point2 = p.point2.uuid;
                if (p.inpolygon) {
                    o = null;
                }
            } else if (o.type == "Polygon") {
                o.points = [];
                let pl = p.parts;
                for (let j = 0; j < pl.length - 1; j++) {
                    o.points[j] = pl[j].uuid;
                }
            } else if (o.type == "Curve") {
                o.points = [];
                let pl = p.parts;
                for (let j = 0; j < pl.length; j++) {
                    o.points[j] = pl[j].uuid;
                }
                o.power = p.power;
            } else {
                o = null;
            }
        }
        if (o) {
            partlist.push(o);
        }
    }
    //
    data.settings = settings;
    data.partlist = partlist;
    return JSON.stringify(data);
}

function readProfile(text) {
    let data = JSON.parse(text);
    console.log(data);
    let settings = data.settings;
    let partlist = data.partlist;
    let g = {};
    init();
    for (let pd of partlist) {
        if (pd.type == "ThePoint") {
            if (pd.facing1 === undefined) {
                pd.facing1 = north() - g[pd.part1].center.sub(new Pos(pd.pos.x, pd.pos.y)).toPolar().theta;
            }
            if (pd.facing2 === undefined) {
                pd.facing2 = north() - g[pd.part2].center.sub(new Pos(pd.pos.x, pd.pos.y)).toPolar().theta;
            }
            while (pd.facing1 >= 360) pd.facing1 -= 360;
            while (pd.facing2 >= 360) pd.facing2 -= 360;
            while (pd.facing1 < 0) pd.facing1 += 360;
            while (pd.facing2 < 0) pd.facing2 += 360;
            let p = new ThePoint(pd.facing1, pd.facing2, pd.name, g[pd.part1], g[pd.part2], pd.color);
            g[pd.uuid] = p;
            p.standardable = pd.standardable;
            if (p.standardable) p.radius = 10;
        } else if (pd.type == "Point") {
            let p = new Point(new Pos(pd.pos.x, pd.pos.y), 10, pd.color);
            g[pd.uuid] = p;
            p.standardable = pd.standardable;
        } else if (pd.type == "Segment") {
            let p = new Segment(g[pd.point1], g[pd.point2], pd.color);
        } else if (pd.type == "Polygon") {
            let ps = [];
            for (let uuid of pd.points) {
                ps.push(g[uuid])
            }
            let p = new Polygon(ps, pd.color);
        } else if (pd.type == "Curve") {
            let ps = [];
            for (let uuid of pd.points) {
                ps.push(g[uuid])
            }
            let p = new Curve(ps, pd.color);
            //p.power = pd.power;
        }
    }
    parts.updatepos();
    updatelister();
}

profile_download.addEventListener("click", function() {
    let filename = "畫圖" + getTimeStr(new Date()) + ".json";
    saveTextAsFile(filename, createProfile());
});
const reader = new FileReader();
profile_uploader.addEventListener("change", function() {
    let files = profile_uploader.files;
    profile_upload.disabled = !(files.length > 0 && files[0].name.endsWith(".json"));
});
profile_upload.addEventListener("click", function() {
    reader.readAsText(profile_uploader.files[0]);
});
reader.addEventListener("load", function() {
    readProfile(reader.result);
    profile_upload.disabled = true;
});

function north() {
    return 0;
}

function reference_center() {
    return new Pos(0,0);
}

function reallength() {
    return 1;
}

function reference_pos() {
    return new Pos(0,0);
}

function checknumber(ip, positive) {
    ip.oldvalue = ip.value;
    ip.numberchecker = function() {
        if (isNaN(Number(ip.value))) {
            ip.value = ip.oldvalue;
        }
        if (positive) {
            ip.value = "" + Math.abs(Number(ip.value));
        }
        ip.oldvalue = ip.value;
    };
    ip.addEventListener("input", ip.numberchecker);
}
window.setTimeout(init, 1);