/**
 * Anime.js
 * @author lzr
 * 动画
 */


var loop = null;

function openAnime() {
    this.i = 0;
}

openAnime.prototype = {
    draw: function () {
        animeContext.canvas.style.background = "#fff";
        animeContext.clearRect(0, 0, 720, 480);
        animeContext.globalAlpha = 0.7;
        animeContext.drawImage(guoqi, 0, 0);
        loop = setInterval(this.drawWord, 50);
    },
    drawWord: function () {
        this.i += 5;
        if (this.i >= 1000) {
            this.i = 0;
        }
        animeContext.clearRect(160, 80, 560, 150);
        animeContext.save();
        animeContext.globalAlpha = 0.7;
        animeContext.rect(160, 80, 560, 150);
        animeContext.clip();
        animeContext.drawImage(guoqi, 0, 0);
        animeContext.restore();
        var lin = animeContext.createLinearGradient(160, 144, 720, 292);
        lin.addColorStop(0, "#000");
        lin.addColorStop((this.i) / 1000, "red");
        lin.addColorStop(1, "#000");
        animeContext.fillStyle = lin;
        animeContext.font = "italic small-caps bold 56px arial";
        animeContext.fillText("红军的奇妙冒险——", 160, 144);
        animeContext.font = "italic small-caps bold 72px arial";
        animeContext.fillText("革命潮流", 400, 220);
        lin = null;
        animeContext.save();
        animeContext.clearRect(180, 340, 500, 50);
        animeContext.globalAlpha = 0.7;
        animeContext.rect(180, 340, 500, 50);
        animeContext.clip();
        animeContext.drawImage(guoqi, 180, 340, 500, 50, 180, 340, 500, 50);
        animeContext.globalAlpha = (this.i % 200) / 200 + 0.1;
        animeContext.font = "italic small-caps bold 35px arial";
        animeContext.fillStyle = "#af0";
        animeContext.fillText("press k start", 180, 380);
        animeContext.restore();
        animeContext.font = "italic small-caps bold 30px arial";
        animeContext.fillStyle = "#000";
        animeContext.fillText("press k start", 200, 380);
        animeContext.font = "15px Arial";
        animeContext.fillText("author: 李兆荣 施博彦 陈双宇", 20, 20);
    },
    stop: function () {
        clearInterval(loop);
    }
};


var y = 480;

function scroll() {
    this.loop = null;
}

scroll.prototype = {
    draw: function () {
        loop = setInterval(this.drawWord, 30);
    },
    drawWord: function () {
        animeContext.clearRect(0, 0, 720, 480);
        animeContext.globalAlpha = 0.6;
        animeContext.drawImage(guoqi, 0, 0);
        animeContext.globalAlpha = 1;
        drawText(animeContext, "故事背景", 80, y - 130, 500, 80);
        drawText(animeContext, openstr, 100, y, 500, 30);
        y -= 2;
        if (y <= -600) {
            clearInterval(loop);
        }
    },
    stop: function () {
        clearInterval(loop);
    }
};


async function enemyRun() {
    openCTX(animeContext);
    animeContext.save();
    animeContext.canvas.style.background = "rgba(255,255,255,0)";
    animeContext.font = "italic small-caps bold 100px arial";
    animeContext.fillStyle = "#972b03";
    var speFast = 30;
    var speSlow = 3;
    var i = 0;
    var length = animeContext.measureText("敌方回合").width;
    for (i = 0; ; i += speFast) {
        animeContext.clearRect(0, 0, 720, 480);
        animeContext.fillRect(730 - i, 150, 710, 20);
        for (var j = 0; j < 20; j++) {
            animeContext.fillRect(730 - i + j * 36, 180, 8, 8);
            animeContext.fillRect(730 - i + j * 36, 340, 8, 8);
        }
        animeContext.fillText("敌方回合", i - length, 300);
        animeContext.fillRect(730 - i, 350, 710, 20);
        await sleep(20);
        if (i >= 550) {
            break;
        }
    }
    for (; ; i += speSlow) {
        animeContext.clearRect(0, 0, 720, 480);
        animeContext.fillRect(730 - i, 150, 710, 20);
        for (var j = 0; j < 20; j++) {
            animeContext.fillRect(730 - i + j * 36, 180, 8, 8);
            animeContext.fillRect(730 - i + j * 36, 340, 8, 8);
        }
        animeContext.fillText("敌方回合", i - length, 300);
        animeContext.fillRect(730 - i, 350, 710, 20);
        await sleep(20);
        if (i >= 750) {
            break;
        }
    }
    for (; ; i += speFast) {
        animeContext.clearRect(0, 0, 720, 480);
        animeContext.fillRect(730 - i, 150, 710, 20);
        for (var j = 0; j < 20; j++) {
            animeContext.fillRect(730 - i + j * 36, 180, 8, 8);
            animeContext.fillRect(730 - i + j * 36, 340, 8, 8);
        }
        animeContext.fillText("敌方回合", i - length, 300);
        animeContext.fillRect(730 - i, 350, 710, 20);
        await sleep(20);
        if (i >= 1440) {
            break;
        }
    }
    return new Promise(resolve => setTimeout(resolve, 0));
}

async function heroRun() {
    openCTX(animeContext);
    animeContext.save();
    animeContext.canvas.style.background = "rgba(255,255,255,0)";
    animeContext.font = "italic small-caps bold 100px arial";
    animeContext.fillStyle = "#2341aa";
    var speFast = 30;
    var speSlow = 3;
    var i = 0;
    var length = animeContext.measureText("我方回合").width;
    for (i = 0; ; i += speFast) {
        animeContext.clearRect(0, 0, 720, 480);
        animeContext.fillRect(730 - i, 150, 710, 20);
        for (var j = 0; j < 20; j++) {
            animeContext.fillRect(730 - i + j * 36, 180, 8, 8);
            animeContext.fillRect(730 - i + j * 36, 340, 8, 8);
        }
        animeContext.fillText("我方回合", i - length, 300);
        animeContext.fillRect(730 - i, 350, 710, 20);
        await sleep(20);
        if (i >= 550) {
            break;
        }
    }
    for (; ; i += speSlow) {
        animeContext.clearRect(0, 0, 720, 480);
        for (var j = 0; j < 20; j++) {
            animeContext.fillRect(730 - i + j * 36, 180, 8, 8);
            animeContext.fillRect(730 - i + j * 36, 340, 8, 8);
        }
        animeContext.fillRect(730 - i, 150, 710, 20);
        animeContext.fillText("我方回合", i - length, 300);
        animeContext.fillRect(730 - i, 350, 710, 20);
        await sleep(20);
        if (i >= 750) {
            break;
        }
    }
    for (; ; i += speFast) {
        animeContext.clearRect(0, 0, 720, 480);
        for (var j = 0; j < 20; j++) {
            animeContext.fillRect(730 - i + j * 36, 180, 8, 8);
            animeContext.fillRect(730 - i + j * 36, 340, 8, 8);
        }
        animeContext.fillRect(730 - i, 150, 710, 20);
        animeContext.fillText("我方回合", i - length, 300);
        animeContext.fillRect(730 - i, 350, 710, 20);
        await sleep(20);
        if (i >= 1440) {
            break;
        }
        ;
    }
    return new Promise(resolve => setTimeout(resolve, 0));
};


async function falseAnime() {
    openCTX(finalContext);
    finalContext.save();
    finalContext.fillStyle = "#fff";
    var i = 0;
    while (1) {
        finalContext.globalAlpha = i / 50;
        finalContext.clearRect(0, 0, 720, 480);
        finalContext.font = "italic small-caps bold 100px arial";
        finalContext.fillText("you lose", 150, 300);
        finalContext.font = "italic small-caps bold 30px arial";
        finalContext.fillText("press any key restart", 150, 400);
        await sleep(50);
        i++;
        if (i >= 50) {
            break;
        }
    }
    document.onkeydown = function () {
        location.reload();
    };
    return new Promise(resolve => setTimeout(resolve, 0));
}


function winAnime() {
    openCTX(finalContext);
    var w = 720;
    var h = 480;
    var nowImg;
    var loc = [];
    var Sprite = function (x, y, h) {
        this.x = x;
        this.y = y;
        this.ox = x;
        this.oy = y;
        this.h = h;
        this.r = 1 + Math.random() * 7;
        this.vx = Math.random() * 2 - 1;
        this.vy = -1 + Math.random() * -3;
        this.a = 1;
        this.as = 0.6 + Math.random() * 0.1;
        this.s = 1;
        this.ss = 0.98;
    };
    Sprite.prototype = {
        constructor: Sprite,
        update: function () {
            this.x += this.vx;
            this.y += this.vy;
            this.a *= this.as;
            this.s *= this.ss;
            this.h += 0.5;

            if (this.y < -1 || this.a < 0.01 || this.s < 0.01) {
                this.x = this.ox;
                this.y = this.oy;
                this.a = 1;
                this.s = 1;

                this.r = 7 + Math.random() * 5;
                this.vx = Math.random() * 2 - 1;
                this.vy = -1 + Math.random() * -2;
                this.as = 0.6 + Math.random() * 0.1;
            }

        },
        paint: function (ctx) {
            ctx.save();
            ctx.fillStyle = 'hsla(' + this.h + ', 100%, 50%,' + this.a + ')';
            ctx.translate(this.x, this.y);
            ctx.scale(this.s, this.s);
            ctx.beginPath();
            ctx.fillRect(0, 0, this.r, this.r);
            ctx.restore();
        }
    };

    finalContext.font = "italic small-caps bold 110px arial";
    finalContext.textAlign = 'center';
    finalContext.baseline = 'middle';
    finalContext.canvas.style.background = "#fff";

    /**
     * 获取哪些点画了颜色
     */
    finalContext.fillText('Y O U  W I N', w / 2, h / 2 + 50);
    nowImg = finalContext.getImageData(0, 0, w, h).data;
    finalContext.clearRect(0, 0, w, h);
    for (var y = 0; y < h; y += 1) {
        for (var x = 0; x < w; x += 1) {
            var idx = (x + y * w) * 4 - 1;
            if (nowImg[idx] > 0) {
                loc.push({
                    x: x,
                    y: y
                });
            }
        }
    }

    var ctr = 800;
    var painter = [];
    var h = Math.random() * 360;

    for (var i = 0; i < ctr; i++) {
        var lc = loc[Math.floor(Math.random() * loc.length)];
        var p = new Sprite(lc.x, lc.y, h);
        painter.push(p);
    }

    requestAnimationFrame(function loop() {
        finalContext.globalCompositeOperation = 'source-over';
        finalContext.fillStyle = "rgba(0,0,0,0.1)";
        finalContext.fillRect(0, 0, 720, 480);
        finalContext.globalCompositeOperation = 'lighter';
        for (var i = 0, len = painter.length; i < len; i++) {
            p = painter[i];
            p.update();
            p.paint(finalContext);
        }
        requestAnimationFrame(loop);
    });

    document.onkeydown = function () {
        location.reload();
    };

}