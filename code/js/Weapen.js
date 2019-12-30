/**
 * 装备构造函数
 */
function Weapen() {
    this.name = "";
    this.maxTime = 20;
    this.lastTime = 20;
    //攻击力or治疗量
    this.attack = 6;
    //命中率
    this.hitRate = 1;
    //重量
    this.weight = 3;
    //武器类型：1剑，2枪，3斧，互相克制
    this.type = 1;
    this.isMedcine = false;
    this.txt = "一把没有姓名的不知名武器";
    this.head = new Image();
}
function getHold(w1, w2) {
    var i=0;
    if(w1.type - w2.type === 1) i = 3;
    else if(w1.type - w2.type === -2) i = 3;
    return i;
}
function getEquipmentById(i){
    var w = new Weapen();
    switch(i){
        case 0:
            return null;
        case 1:
            w.name = "轻质铁刀";
            w.maxTime = 46;
            w.lastTime = 46;
            w.attack = 5;
            w.hitRate = 0.9;
            w.weight = 5;
            w.type=1;
            w.isMedcine = false;
            w.txt = "一把劣质的铁刀。";
            w.head.src = "./img/weapen/轻质铁刀.jpg";
            break;
        case 2:
            w.name = "军用钢刀";
            w.maxTime = 30;
            w.lastTime = 30;
            w.attack = 8;
            w.hitRate = 0.75;
            w.weight = 10;
            w.type=1;
            w.isMedcine = false;
            w.txt = "一把优质的军用钢刀。";
            w.head.src = "./img/weapen/军用钢刀.jpg";
            break;
        case 3:
            w.name = "特种钢刀";
            w.maxTime = 20;
            w.lastTime = 20;
            w.attack = 13;
            w.hitRate = 0.8;
            w.weight = 8;
            w.type=1;
            w.isMedcine = false;
            w.txt = "非常锋利的钢刀，削铁如泥。";
            w.head.src = "./img/weapen/特种钢刀.jpg";
            break;
        case 4:
            w.name = "铁质长矛";
            w.maxTime = 45;
            w.lastTime = 45;
            w.attack = 7;
            w.hitRate = 0.8;
            w.weight = 8;
            w.type=2;
            w.isMedcine = false;
            w.txt = "一把劣质的铁质长矛。";
            w.head.src = "./img/weapen/铁制长矛.jpg";
            break;
        case 5:
            w.name = "军用钢枪";
            w.maxTime = 30;
            w.lastTime = 30;
            w.attack = 10;
            w.hitRate = 0.7;
            w.weight = 13;
            w.type=2;
            w.isMedcine = false;
            w.txt = "一把优质的钢枪。";
            w.head.src = "./img/weapen/军用钢枪.jpg";
            break;
        case 6:
            w.name = "特种钢枪";
            w.maxTime = 20;
            w.lastTime = 20;
            w.attack = 14;
            w.hitRate = 0.75;
            w.weight = 10;
            w.type=2;
            w.isMedcine = false;
            w.txt = "非常锐利的钢枪，可以刺穿世界上所有的盾。";
            w.head.src = "./img/weapen/特种钢枪.jpg";
            break;
        case 7:
            w.name = "铁制斧头";
            w.maxTime = 45;
            w.lastTime = 45;
            w.attack = 8;
            w.hitRate = 0.75;
            w.weight = 10;
            w.type=3;
            w.isMedcine = false;
            w.txt = "农夫砍树用的铁斧。";
            w.head.src = "./img/weapen/铁质斧头.jpg";
            break;
        case 8:
            w.name = "军用钢斧";
            w.maxTime = 30;
            w.lastTime = 30;
            w.attack = 11;
            w.hitRate = 0.65;
            w.weight = 15;
            w.type=3;
            w.txt = "军用的优质钢质斧头。";
            w.isMedcine = false;
            w.head.src = "./img/weapen/军用钢斧.jpg";
            break;
        case 9:
            w.name = "特种钢斧";
            w.maxTime = 20;
            w.lastTime = 20;
            w.attack = 15;
            w.hitRate = 0.7;
            w.weight = 12;
            w.type=3;
            w.isMedcine = false;
            w.txt = "一把可以砍断世界上所有木头的斧头。";
            w.head.src = "./img/weapen/特种钢斧.jpg";
            break;
        case 10:
            w.name = "绷带";
            w.maxTime = 5;
            w.lastTime = 5;
            w.attack = 13;
            w.hitRate = 1;
            w.weight = 0;
            w.type=4;
            w.isMedcine = true;
            w.txt="绷带，受伤后使用，可以恢复13点生命值。";
            w.head.src = "./img/weapen/绷带.jpg";
            break;
        case 11:
            w.name = "小刀";
            w.maxTime = 30;
            w.lastTime = 30;
            w.attack = 4;
            w.hitRate = 1;
            w.weight = 1;
            w.type=1;
            w.txt = "一把不太锋利的匕首，一般用来切水果。";
            w.isMedcine = false;
            w.head.src = "./img/weapen/小刀.jpg";
            break;
        case 12:
            w.name = "红星之剑";
            w.maxTime = 3;
            w.lastTime = 3;
            w.attack = 17;
            w.hitRate = 1;
            w.weight = 1;
            w.type=1;
            w.isMedcine = false;
            w.txt = "代表着红军意志的利刃，战无不胜。";
            w.head.src = "./img/weapen/共产主义之剑.jpg";
            break;
    }
    return w;
}
Weapen.prototype.showInformation = function (ctx) {
    ctx.save();
    ctx.clearRect(0,0,720,480);
    ctx.canvas.style.display = "";
    ctx.fillStyle = "#96e2d3";
    ctx.fillRect(0,0,300,480);
    ctx.fillStyle = "#eebc37";
    ctx.fillRect(300,0,420,480);
    ctx.strokeStyle="#000";
    ctx.strokeRect(20,40,200,200);
    ctx.font="italic small-caps bold 40px arial";
    ctx.drawImage(this.head,20,40,200,200);
    ctx.strokeText(this.name,20,300);
    ctx.fillText(this.name,20,300);

    if(this.type === 1){
        ctx.strokeText("类型：刀剑",20,350);
        ctx.fillText("类型：刀剑",20,350);
    }
    else if(this.type === 2){
        ctx.strokeText("类型：长矛",20,350);
        ctx.fillText("类型：长矛",20,350);
    }
    else if(this.type === 3){
        ctx.strokeText("类型：斧头",20,350);
        ctx.fillText("类型：斧头",20,350);
    }
    else if(this.type === 4){
        ctx.strokeText("类型：药品",20,350);
        ctx.fillText("类型：药品",20,350);
    }

    var left = 340;
    var top = 110;
    ctx.fillStyle = "#1e1b3b";
    ctx.strokeRect(335,100,350,370);
    ctx.fillText("equipment ",320,40);
    ctx.fillText("     information: ",320,75);
    if(this.isMedcine){
        ctx.fillText("治疗量:  "+this.attack,left+10,top+100);
    }
    else{
        ctx.fillText("攻击:  "+this.attack,left+10,top+50);
        ctx.fillText("重量:  "+this.weight,left+10,top+100);
        ctx.fillText("基础命中率:  "+this.hitRate*100+"%",left+10,top+150);
    }
    ctx.fillText("使用次数:  "+this.lastTime+"/"+this.maxTime,left+10,top+200);
    ctx.beginPath();
    ctx.moveTo(335,top+240);
    ctx.lineTo(335+350,top+240);
    ctx.stroke();
    drawText(ctx,this.txt,20,360,270,20);
    var str = "tips: 武器见存在克制关系，刀剑克斧头，斧头克长矛，长矛克刀剑。克制时会造成额外伤害。";
    drawText(ctx,str,left,top+250,290,20);
};