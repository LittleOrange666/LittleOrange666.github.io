var sourceURL = "https://script.google.com/macros/s/AKfycbyJ74rdZYzWdPIYAXEtOOWw6dZyDv7A7xaN2AdRJpNkSLWHT0kd3zyPN028WN2C5xwRbQ/exec"

function executeScript(data, varname, oncomplete) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    document.body.appendChild(script);
    script.src = sourceURL + "?id=gomoku&page=script&data=" + JSON.stringify(data) + "&varname=" + varname + "&oncomplete=" + oncomplete;
    console.log(script.src)
    document.body.removeChild(script);
}
class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(pos) {
        return new Pos(this.x + pos.x, this.y + pos.y);
    }
    static fromXYObj(obj) {
        return new Pos(obj["x"], obj["y"])
    }
}
Pos.facings = [new Pos(1, 1), new Pos(1, 0), new Pos(1, -1), new Pos(0, -1),
    new Pos(-1, -1), new Pos(-1, 0), new Pos(-1, 1), new Pos(0, 1)
];
let canvaspos = {
    x: 0,
    y: 0,
};
var size = 0;
var bsize = 0;
var ctx;

function updatecanvaspos() { //修正排版
    let size1 = document.body.clientWidth;
    let size2 = window.screen.height - 160 - uparea.clientHeight;
    size = Math.min(size1, size2);
    bsize = size / 30;
    canvas.width = size;
    canvas.height = size;
    if (size1 < size2) {
        canvaspos.x = 0;
        canvaspos.y = Math.floor((size2 - size) / 2) + uparea.clientHeight;
    } else {
        canvaspos.x = Math.floor((size1 - size) / 2);
        canvaspos.y = uparea.clientHeight;
    }
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.textAlign = 'center';
}
updatecanvaspos()
let mouse = {
    x: 0,
    y: 0,
};
window.addEventListener('mousemove', (event) => {
    mouse.x = event.pageX - canvaspos.x;
    mouse.y = event.pageY - canvaspos.y;
});
class ChessType {}
ChessType.INVALID = -1;
ChessType.NOTHING = 0;
ChessType.BLACK = 1;
ChessType.WHITE = 2;
var PLAYER = 1;
var COMPUTER = 2;
let chessboard = {
    array: new Array(),
    forbidden: new Array(),
    round: PLAYER,
    get: function(pos) {
        if (-1 < pos.x && pos.x < 15 && -1 < pos.y && pos.y < 15) return chessboard.array[pos.x][pos.y];
        return -1;
    },
    status: 0
};

function reset() { //重置棋局
    for (let x = 0; x < 15; x++) {
        let l = new Array();
        let l0 = new Array();
        for (let y = 0; y < 15; y++) {
            l[y] = 0;
            l0[y] = false;
        }
        chessboard.array[x] = l;
        chessboard.forbidden[x] = l0;
    }
    chessboard.status = 0
}
reset();

function drawline(x1, y1, x2, y2) { //畫直線
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
let fl = Math.floor;
canvas.onclick = (function(event) {
    if (chessboard.round == PLAYER && chessboard.status == 0) {
        let x;
        let y;
        [x, y] = [fl(mouse.x / bsize * 0.5), fl(mouse.y / bsize * 0.5)]
        if (chessboard.array[x][y] == 0 && !chessboard.forbidden[x][y]) {
            chessboard.array[x][y] = PLAYER;
            chessboard.round = COMPUTER;
            wincheck();
            if (chessboard.status == 0) {
                checkForbidden();
                runCOMPUTER();
            }
        }
    }
});

function checkForbiddenPoint(pos, condition, countrequire, allowspace, spacecondition, needmorespace, id) { //單點檢查
    let l = [0, 0, 0, 0];
    for (let j = 0; j < 8; j++) {
        let facing0 = Pos.facings[j];
        let facing1 = Pos.facings[(j + 4) % 8];
        let s = 1;
        let p = pos.add(facing0);
        while (chessboard.get(p) == 1) {
            s++;
            p = p.add(facing0);
        }
        if (allowspace) {
            if (chessboard.get(p) == 0 && !(chessboard.forbidden[p.x][p.y] > id)) { //留一空格
                if (spacecondition) {
                    if (!spacecondition(p)) continue;
                }
                p = p.add(facing0);
                let isrepeat = chessboard.get(p) != 1;
                while (chessboard.get(p) == 1) {
                    s++;
                    p = p.add(facing0);
                }
                let end0 = p;
                p = pos.add(facing1);
                while (chessboard.get(p) == 1) {
                    s++;
                    p = p.add(facing1);
                }
                let end1 = p;
                if (needmorespace) {
                    if (!(chessboard.get(end0) == 0 && chessboard.get(end1) == 0)) continue;
                    if (chessboard.forbidden[end0.x][end0.y] > id || chessboard.forbidden[end1.x][end1.y] > id) continue;
                    if (spacecondition) {
                        if (!spacecondition(end0)) continue;
                        if (!spacecondition(end1)) continue;
                    }
                }
                if (condition(s)) {
                    l[j % 4] = isrepeat ? 1 : l[j % 4] + 1;
                }
            }
        } else {
            p = pos.add(facing1);
            while (chessboard.get(p) == 1) {
                s++;
                p = p.add(facing1);
            }
            if (condition(s)) {
                l[j % 4] = 1;
            }
        }
    }
    return l.reduce((a, b) => a + b, 0) >= countrequire;
}

function checkForbidden() { //禁點檢查
    if (document.getElementById('checkb').checked == false) {
        return;
    }
    for (let x = 0; x < 15; x++) {
        for (let y = 0; y < 15; y++) {
            chessboard.forbidden[x][y] = 0;
        }
    }
    //長連禁點(3)
    for (let x = 0; x < 15; x++) {
        for (let y = 0; y < 15; y++) {
            if (chessboard.array[x][y] == 0) {
                let pos = new Pos(x, y);
                chessboard.forbidden[x][y] = checkForbiddenPoint(pos, (count) => count > 5, 1, false, null, false, 3) ? 3 : 0;
            }
        }
    }
    //雙四禁點(2)
    for (let x = 0; x < 15; x++) {
        for (let y = 0; y < 15; y++) {
            if (chessboard.array[x][y] == 0 && !chessboard.forbidden[x][y]) {
                let pos = new Pos(x, y);
                chessboard.forbidden[x][y] = checkForbiddenPoint(pos, (count) => count == 4, 2, true, null, false, 2) ? 2 : 0;
            }
        }
    }
    //雙活三禁點(1)
    for (let x = 0; x < 15; x++) {
        for (let y = 0; y < 15; y++) {
            if (chessboard.array[x][y] == 0 && !chessboard.forbidden[x][y]) {
                let pos = new Pos(x, y);
                chessboard.array[x][y] = 1; //補子法
                chessboard.forbidden[x][y] = checkForbiddenPoint(pos, (count) => count == 3, 2, true,
                    (p) => !checkForbiddenPoint(p, (count) => count == 4, 2, true, null, false, 2), true, 1) ? 1 : 0;
                chessboard.array[x][y] = 0;
            }
        }
    }
    //五連解禁(0)
    for (let x = 0; x < 15; x++) {
        for (let y = 0; y < 15; y++) {
            if (chessboard.forbidden[x][y]) {
                let pos = new Pos(x, y);
                if (checkForbiddenPoint(pos, (count) => count == 5, 1, false, null, false, 0)) chessboard.forbidden[x][y] = 0;
            }
        }
    }
}

let response = {}

function onresponse() {
    let pos = Pos.fromXYObj(response.pos);
    chessboard.array[pos.x][pos.y] = COMPUTER;
    wincheck();
    chessboard.round = PLAYER;
    checkForbidden();
}

function runCOMPUTER() { //電腦判斷(使用雲端運算)
    executeScript({ PLAYER: PLAYER, COMPUTER: COMPUTER, chessboard: chessboard }, "response.pos", "onresponse")
}

function wincheck() {
    if (chessboard.status != 0) {
        return;
    }
    let bool = true;
    for (let x = 0; x < 15 && bool; x++) {
        for (let y = 0; y < 15 && bool; y++) {
            if (chessboard.array[x][y] == 0) {
                bool = false;
            }
        }
    }
    if (bool) {
        chessboard.status = -1;
        return;
    }
    let t = 0;
    let tie = true;
    for (let i = 0; i < 15; i++) {
        let l = chessboard.array[i];
        let o = l.reduce((old, v) => (old.c < 5 ? (v == 0 ? { t: 0, c: 0 } : ((v == old.t) ? { t: old.t, c: old.c + 1 } : { t: v, c: 1 })) : old), { t: 0, c: 0 });
        if (tie) { tie = l.reduce((c, v) => (c < 5 ? (v == 1 ? 0 : c + 1) : c), 0) < 5; }
        if (tie) { tie = l.reduce((c, v) => (c < 5 ? (v == 2 ? 0 : c + 1) : c), 0) < 5; }
        if (o.c >= 5) {
            chessboard.status = o.t;
            return;
        }
        //
        l = chessboard.array.map((arr) => arr[i]);
        o = l.reduce((old, v) => (old.c < 5 ? (v == 0 ? { t: 0, c: 0 } : ((v == old.t) ? { t: old.t, c: old.c + 1 } : { t: v, c: 1 })) : old), { t: 0, c: 0 });
        if (tie) { tie = l.reduce((c, v) => (c < 5 ? (v == 1 ? 0 : c + 1) : c), 0) < 5; }
        if (tie) { tie = l.reduce((c, v) => (c < 5 ? (v == 2 ? 0 : c + 1) : c), 0) < 5; }
        if (o.c >= 5) {
            chessboard.status = o.t;
            return;
        }
    }
    for (let i = -14; i < 15; i++) {
        let l = new Array();
        for (let j = Math.max(-i, 0); j < Math.min(15 - i, 15); j++) {
            l[l.length] = chessboard.array[j][j + i];
        }
        let o = l.reduce((old, v) => (old.c < 5 ? (v == 0 ? { t: 0, c: 0 } : ((v == old.t) ? { t: old.t, c: old.c + 1 } : { t: v, c: 1 })) : old), { t: 0, c: 0 });
        if (tie) { tie = l.reduce((c, v) => (c < 5 ? (v == 1 ? 0 : c + 1) : c), 0) < 5; }
        if (tie) { tie = l.reduce((c, v) => (c < 5 ? (v == 2 ? 0 : c + 1) : c), 0) < 5; }
        if (o.c >= 5) {
            chessboard.status = o.t;
            return;
        }
        //
        l = new Array();
        for (let j = Math.max(-i, 0); j < Math.min(15 - i, 15); j++) {
            l[l.length] = chessboard.array[14 - j][j + i];
        }
        o = l.reduce((old, v) => (old.c < 5 ? (v == 0 ? { t: 0, c: 0 } : ((v == old.t) ? { t: old.t, c: old.c + 1 } : { t: v, c: 1 })) : old), { t: 0, c: 0 });
        if (tie) { tie = l.reduce((c, v) => (c < 5 ? (v == 1 ? 0 : c + 1) : c), 0) < 5; }
        if (tie) { tie = l.reduce((c, v) => (c < 5 ? (v == 2 ? 0 : c + 1) : c), 0) < 5; }
        if (o.c >= 5) {
            chessboard.status = o.t;
            return;
        }
    }
    if (tie) {
        chessboard.status = -1;
    }
}

function refresh() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#E3CF57";
    ctx.strokeStyle = "#000000";
    ctx.fill();
    for (let i = 0; i < 15; i++) {
        drawline(fl(bsize * (2 * i + 1)), fl(bsize), fl(bsize * (2 * i + 1)), fl(bsize * 29));
        drawline(fl(bsize), fl(bsize * (2 * i + 1)), fl(bsize * 29), fl(bsize * (2 * i + 1)));
    }
    for (let x = 0; x < 15; x++) {
        for (let y = 0; y < 15; y++) {
            if (chessboard.array[x][y] != 0) {
                ctx.beginPath();
                switch (chessboard.array[x][y]) {
                    case 1:
                        ctx.fillStyle = "#000000";
                        ctx.strokeStyle = "#FFFFFF";
                        break;
                    case 2:
                        ctx.fillStyle = "#FFFFFF";
                        ctx.strokeStyle = "#000000";
                        break;
                    default:
                        break;
                }
                ctx.arc(fl(bsize * (2 * x + 1)), fl(bsize * (2 * y + 1)), fl(bsize * 0.75), 0, Math.PI * 2);
                ctx.stroke();
                ctx.fill();
            }
            if (chessboard.forbidden[x][y]) {
                ctx.strokeStyle = "#FF0000";
                drawline(fl(bsize * (2 * x + 0.25)), fl(bsize * (2 * y + 0.25)), fl(bsize * (2 * x + 1.75)), fl(bsize * (2 * y + 1.75)));
                drawline(fl(bsize * (2 * x + 1.75)), fl(bsize * (2 * y + 0.25)), fl(bsize * (2 * x + 0.25)), fl(bsize * (2 * y + 1.75)));
            }
        }
    }
    ctx.font = '100px Airal'; // 文字字號、字型
    switch (chessboard.status) {
        case PLAYER:
            ctx.fillStyle = '#00FF00'; // 文字顏色
            ctx.fillText("You Win", size / 2, size / 2);
            break;
        case COMPUTER:
            ctx.fillStyle = '#FF0000'; // 文字顏色
            ctx.fillText("You Lose", size / 2, size / 2);
            break;
        case -1:
            ctx.fillStyle = '#FFFF00'; // 文字顏色
            ctx.fillText("Tie", size / 2, size / 2);
            break;
        default:
            break;
    }
}
window.setInterval(refresh, 100);