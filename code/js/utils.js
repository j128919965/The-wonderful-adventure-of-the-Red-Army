/**
 * 自动换行的字符绘制函数
 * @param context 要画的canvas的context
 * @param t 文本
 * @param x 起始x
 * @param y 起始y
 * @param w 最大宽度
 * @param size 字体大小
 */
function drawText(context, t, x, y, w, size) {
    'use strict';
    context.save();
    var chr = t.split("");
    var temp = "";
    var row = [];
    context.font = "italic small-caps bold " + size + "px arial";
    context.fillStyle = "black";
    context.textBaseline = "middle";
    for (var a = 0; a < chr.length; a++) {
        if (context.measureText(temp).width < w && chr[a] !== '\n') {

        } else {
            row.push(temp);
            temp = "";
        }
        temp += chr[a];
    }
    row.push(temp);
    for (var b = 0; b < row.length; b++) {
        context.fillText(row[b], x, y + (b + 1) * (size + 1));
    }
    context.restore();
}

/**
 * 闪烁字符绘制（对话时使用）
 * 自动换行
 * @param context
 * @param t
 * @param x
 * @param y
 * @param w
 * @param size
 * @returns {Promise<void>}
 */
async function blinkText(context, t, x, y, w, size) {
    'use strict';
    context.save();
    let chr = t.split("");
    let temp = "";
    let row = [];
    context.font = "italic small-caps bold " + size + "px arial";
    context.fillStyle = "black";
    context.textBaseline = "middle";
    for (let a = 0; a < chr.length; a++) {
        if (context.measureText(temp).width < w && chr[a] !== '\n') {
        } else {
            row.push(temp);
            temp = "";
        }
        temp += chr[a];
    }
    row.push(temp);
    for (let b = 0; b < row.length; b++) {
        let beginx = 0;
        for(let i = 0;i<row[b].length;i++){
            beginx += context.measureText(row[b].substring(0,i+1)).width-context.measureText(row[b].substring(0,i)).width;
            context.fillText(row[b][i], beginx+x, y + (b + 1) * (size + 1));
            await sleep(15);
        }
    }
    context.restore();
}

/**
 * 手动实现sleep
 * @param ms
 * @returns {boolean}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 关闭展示信息界面
 * @param ctx
 */
function closeCTX(ctx) {
    ctx.canvas.style.display = "none";
};

function openCTX(ctx) {
    ctx.canvas.style.display = "";
}