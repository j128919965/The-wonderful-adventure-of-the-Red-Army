/**
 * Hero.js
 * @author lzr
 * 英雄对象
 */

function Hero() {
    this.id = -1;
    //是否为我方单位
    this.isMy =  true;//false;
    //是否存活
    this.alive = true;
    //是否待机
    this.isStandby = true;
    //头像图片
    this.head =  new Image();
    this.staticPic = new Image();
    this.spritePic = new Image();
    this.cell = [];
    this.name =  "";
    // 等级最高20级
    this.level =  1;
    // 每次命中敌方获得10点经验值，击败敌方获得20+等级差*5点经验值。
    // 经验值>=100时，level+1，点数随机2~4项增加一点。exp归零
    this.exp =  0;
    // 战斗开始时生命值默认等于最大hp
    // 回血最多可以回到最大hp
    this.max_hp =  20;
    // hp归零时人物退场
    this.hp =  20;
    // 攻击力 发动攻击时造成伤害为
    // (攻击力+武器伤害+武器克制)/(敌方防御力+敌方地形防御力)
    this.attack =  5;
    this.defence =  5;
    // 速度，即闪避率，计算公式为
    // (对手闪避率)((hero.speed+getEquipmentById(this.bag[0]).weight+getTerrian(hero.addr.x,hero.addr.y).addSpe)/30)/getEquipmentById(hero.bag[0]).hitRate;
    this.speed =  5;
    //角色每回合最大可以移动的距离
    this.move_force =  5;
    //背包，最大可以容纳5件物品
    this.bag =  new Array(5);
    // 角色的位置
    this.addr =  {x:0,y:0};
    //人物可以移动到的范围的矩阵
    this.move_range = new Array(150);
    //人物当前选择移动路径
    this.path=new Queue(150);
    this.txt = "他不配拥有姓名。";
    this.aiType = 0;
}

/**
 * 设置英雄属性
 * @param hero 从json中读取的对象，不是单纯的赋值
 */
Hero.prototype.setHero = function (hero) {
    this.isMy = hero.isMy;
    this.alive = hero.alive;
    this.isStandby = hero.isStandby;
    this.head.src = hero.head;
    this.staticPic.src = hero.staticPic;
    this.spritePic.src = hero.spritePic;
    this.cell = hero.cell;
    this.name = hero.name;
    this.level = hero.level;
    this.exp = hero.exp;
    this.max_hp = hero.max_hp;
    this.hp = hero.hp;
    this.attack = hero.attack;
    this.defence = hero.defence;
    this.speed = hero.speed;
    this.move_force = hero.move_force;
    for(var i=0;i<5;i++){
        this.bag[i] = getEquipmentById(hero.bag[i]);
    }
    this.addr = hero.addr;
    this.txt = hero.txt;
    this.aiType = hero.aiType !== undefined ? hero.aiType : this.aiType;
};

Hero.prototype.moveTo = function (l,l,loc) {
    this.addr.x = loc.x;
    this.addr.y = loc.y;
};
/**
 * 攻击（单向）
 *
 * 返回值为-1，没有装备武器
 * 返回值为0：闪避，需要在头上画一个miss的字样
 * 该函数为单向攻击，真正战斗时需要调用两次该函数，分别对对方攻击一次
 *
 * @param hero
 * @returns -1：武器使用次数不够
 *           0：闪避了
 */
Hero.prototype.att = function (hero) {
    audioAttack.load();
    audioAttack.play();
    console.log(this.name+"is attacking at "+hero.name);
    if(this.bag[0].lastTime<=0){
        console.log("次数不够了！！！没有a出来，快换装备！！");
        return -1;
    }
    var i = Math.random().toFixed(2);
    //计算闪避率
    var j = ((hero.speed+this.bag[0].weight+getTerrian(hero.addr.x,hero.addr.y).addSpe)/80)/hero.bag[0].hitRate;
    console.log("闪避判定数值为 "+i+" 闪避率为 "+j);
    if(i<j){
        return 0;
    }
    var damage = this.bag[0].attack+this.attack+getHold(this.bag[0],hero.bag[0])-(hero.defence+getTerrian(hero.addr.x,hero.addr.y).addDef);
    if(damage<0){
        damage=0;
    }
    hero.hp-=damage;
    if(hero.hp<=0){
        hero.die();
        console.log(hero.name+" died!!");
    }
    this.bag[0].lastTime-=1;
    return 1;
};
/**
 * 获取经验值
 * @param i 获取的经验值
 */
Hero.prototype.getEXP = function(i){
    if(this.level===20){
        return;
    }
    this.exp+=i;
    if(this.exp>100){
        this.levelup();
        this.exp -= 100;
    }
};
/**
 * 升级
 */
Hero.prototype.levelup = function(){
    this.level+=1;
    var i;
    console.log(this.name+"升到了 lv."+this.level);
    i = Math.random();
    if(i<0.85) {
        this.max_hp+=1;
        this.hp+=1;
        console.log(this.name+"的 max_hp + 1!!");
    }
    i = Math.random();
    if(i<0.85){
        this.attack+=1;
        console.log(this.name+"的 attack + 1!!");
    }
    i = Math.random();
    if(i<0.85) {
        this.defence+=1;
        console.log(this.name+"的 defence + 1!!");
    }
    i = Math.random();
    if(i<0.85) {
        this.speed+=1;
        console.log(this.name+"的 speed + 1!!");
    }
};
/**
 * 英雄阵亡
 * */
Hero.prototype.die = function () {
    this.alive = false;
    deleteHero(this);
};
Hero.prototype.show = function (){
    console.log(this.name+" "+this.hp);
}
/**
 * 装备/使用
 * 调用此函数，如果该物品是药品，则该函数的功能是吃药
 * 如果该物品为武器，则将武器移动到背包第一个，即为装备
 *
 * @param i 选择要装备/使用的物品在背包中的位置
 * @returns false: 使用失败，物品使用次数已用完
 */
Hero.prototype.equip =async function (i) {
    if(this.bag[i].isMedcine){
        if(this.bag[i].lastTime<=0){
            console.log("物品使用次数不足，已经不能再使用了");
            return false;
        }
        console.log(this.name+" 使用了物品 "+this.bag[i].name);
        console.log("回复了 "+this.bag[i].attack+" 点生命值！");
        console.log(this.name+" 的生命值从 "+this.hp);
        this.hp+=this.bag[i].attack;
        if(this.hp>=this.max_hp){
            this.hp = this.max_hp;
        }
        console.log("恢复到了 "+this.hp)
        this.bag[i].lastTime-=1;
        openCTX(animeContext);
        animeContext.save();
        animeCanvas.style.background = "rgba(0,0,0,0)";
        animeContext.clearRect(0,0,720,480);
        animeContext.font="italic small-caps bold 30px arial";
        animeContext.fillStyle = "#fbca20";
        clearCharacter(this.addr);
        drawCharacter(this.addr,this.staticPic);
        animeContext.strokeText("+13!",this.addr.x*girdSize,(this.addr.y)*girdSize);
        animeContext.fillText("+13!",this.addr.x*girdSize,(this.addr.y)*girdSize);
        await sleep(800);
        animeContext.clearRect(0,0,720,480);
        closeCTX(animeContext);
        this.wait();
        return true;
    }
    else{
        var temp = this.bag[0];
        this.bag[0] = this.bag[i];
        this.bag[i] = temp;
        return true;
    }
};
/**
 * 移动完成
 * */
Hero.prototype.stop = function (cordinate) {
    this.addr.x=cordinate.x;
    this.addr.y=cordinate.y;
};
/**
 * 待机
 */
Hero.prototype.wait = function () {
    this.isStandby = false;
    if(!isEnemyRound)
    checkStandBy();
    checkWin();
};
/**
 * 英雄信息展示
 * @param ctx 要绘制在哪张canvas的context上
 * @param flag 绘制英雄信息/背包信息
 * @param focus 高亮哪个项目
 */
Hero.prototype.showInformation = function (ctx,flag,focus) {
    ctx.clearRect(0,0,720,480);
    ctx.canvas.style.display = "";
    ctx.fillStyle = "#96e2d3";
    ctx.fillRect(0,0,300,480);
    ctx.fillStyle = "#eebc37";
    ctx.fillRect(300,0,420,480);
    ctx.strokeStyle="#000";
    ctx.strokeRect(20,20,200,200);
    ctx.font="italic small-caps bold 40px arial";
    ctx.drawImage(this.head,20,20,200,200);
    ctx.strokeText(this.name,20,260);
    ctx.fillText(this.name,20,260);
    ctx.strokeText("level "+this.level,20,310);
    ctx.fillText("level "+this.level,20,310);
    ctx.strokeText("exp "+this.exp,20,360);
    ctx.fillText("exp "+this.exp,20,360);
    ctx.strokeText("hp "+this.hp+"/"+this.max_hp,20,410);
    ctx.fillText("hp "+this.hp+"/"+this.max_hp,20,410);
    var l = ctx.createLinearGradient(20,430,240,460);
    l.addColorStop(0,"black");
    l.addColorStop(0.3,"red");
    l.addColorStop(0.5,"orange");
    l.addColorStop(1,"green");
    ctx.fillStyle = l;
    ctx.strokeRect(20,430,220,30);
    ctx.fillRect(20,430,220*this.hp/this.max_hp,30);

    if(flag){
        var left = 380;
        var top = 110;
        ctx.fillStyle = "#1e1b3b";
        ctx.strokeRect(335,100,350,370);
        ctx.fillText("hero ",320,40);
        ctx.fillText("     information: ",320,75);
        ctx.fillText("攻击: "+this.attack,left+10,top+50);
        ctx.fillText("防御: "+this.defence,left+10,top+100);
        ctx.fillText("速度: "+this.speed,left+10,top+150);
        ctx.fillText("移动: "+this.move_force,left+10,top+200);
        ctx.beginPath();
        ctx.moveTo(335,top+240);
        ctx.lineTo(335+350,top+240);
        ctx.stroke();
        drawText(ctx,this.txt,left-30,top+250,320,20);
        return;
    }
    else{
        var left = 340;
        var top = 150;
        ctx.fillStyle = "#1e1b3b";
        ctx.strokeRect(335,100,350,370);
        ctx.fillText("equipment ",320,40);
        ctx.fillText("     information: ",320,75);
        var str;
        ctx.font="italic small-caps bold 38px arial";
        for(var i=0;i<5;i++){
            if(this.bag[i]!=null){
                str = (i+1)+": "+this.bag[i].name;
                if(i==focus){
                    str = "👉"+str;
                }
                ctx.fillText(str,left+10,top+50*i);
            }
        }
        ctx.beginPath();
        ctx.moveTo(335,top+240);
        ctx.lineTo(335+350,top+240);
        ctx.stroke();
        str = (focus+1)+" : "+this.bag[focus].txt;
        drawText(ctx,str,left,top+250,320,20);
    }
};
/**
 * 刷新移动范围
 */
Hero.prototype.iniRange = function(){
    for(i=0;i<150;i++){
        this.move_range[i] = -1;
    }
};

/**
 * 计算当前背包的大小
 * @Date  12.11
 * @returns {number}
 */
Hero.prototype.getBagSize = function () {
    var i=0;
    for(j = 0;j<this.bag.length;j++){
        if (this.bag[j]!==null){
            i++;
        }
    }
    return i;
};

/**
 * 两个单位战斗的函数
 * @param hero1
 * @param hero2
 *
 * @returns 0:没人死
 *         1:hero1死了
 *         2:hero2死了
 */
async function fight(hero1, hero2) {
    console.log(hero1.name+" and "+hero2.name+" is fighting!");
    var i = hero1.att(hero2);
    var damage1 = hero1.bag[0].attack+hero1.attack+
        getHold(hero1.bag[0],hero2.bag[0])-
        (hero2.defence+getTerrian(hero2.addr.x,hero2.addr.y).addDef);
    if(damage1<0)damage1=0;
    var damage2 = hero2.bag[0].attack+hero2.attack+
        getHold(hero2.bag[0],hero1.bag[0])-
        (hero1.defence+getTerrian(hero1.addr.x,hero1.addr.y).addDef);
    if(damage2<0)damage2=0;
    openCTX(animeContext);
    animeContext.save();
    animeContext.clearRect(0,0,720,480);
    animeCanvas.style.background = "rgba(0,0,0,0)";
    animeContext.fillStyle = "#fbca20";
    animeContext.textAlign='center';
    animeContext.font="italic small-caps bold 25px arial";
    hero2.show();
    if(i===0){
        animeContext.strokeText("miss!",hero2.addr.x*girdSize+girdSize/2,(hero2.addr.y)*girdSize);
        animeContext.fillText("miss!",hero2.addr.x*girdSize+girdSize/2,(hero2.addr.y)*girdSize);
        await fightAnime(hero1,hero2);
        hero1.getEXP(10);
    }
    if(i===1){
        animeContext.strokeText("-"+damage1+"!",hero2.addr.x*girdSize+girdSize/2,(hero2.addr.y)*girdSize);
        animeContext.fillText("-"+damage1+"!",hero2.addr.x*girdSize+girdSize/2,(hero2.addr.y)*girdSize);
        await fightAnime(hero1,hero2);
        if(!hero2.alive){
            hero1.getEXP(30+2*(hero2.level-hero1.level));
        }
        else{
            hero1.getEXP(20);
        }
    }
    if(hero2.alive){
        var j = hero2.att(hero1);
        animeContext.clearRect(0,0,720,480);
        hero1.show();
        if(j===0){
            animeContext.strokeText("miss!",hero1.addr.x*girdSize+girdSize/2,(hero1.addr.y)*girdSize);
            animeContext.fillText("miss!",hero1.addr.x*girdSize+girdSize/2,(hero1.addr.y)*girdSize);
            await fightAnime(hero2,hero1);
            hero2.getEXP(10);
        }
        if(j===1){
            animeContext.strokeText("-"+damage2+"!",hero1.addr.x*girdSize+girdSize/2,(hero1.addr.y)*girdSize);
            animeContext.fillText("-"+damage2+"!",hero1.addr.x*girdSize+girdSize/2,(hero1.addr.y)*girdSize);
            await fightAnime(hero2,hero1);
            if(!hero1.alive){
                hero2.getEXP(30+2*(hero1.level-hero2.level));
                //战斗结束，hero1死了
            }
            else{
                hero2.getEXP(20);
            }
        }
    }
    if(!hero1.alive){
        clearCharacter(hero1.addr);
    }
    if(!hero2.alive){
        clearCharacter(hero2.addr);
    }
    await checkFalse();
    hero1.wait();
    hero2.wait();
    animeContext.restore();
    closeCTX(animeContext);
    return new Promise(resolve => setTimeout(resolve,0));
}

async function fightAnime(h1, h2) {
    let i = 0;
    const vx = (h1.addr.x - h2.addr.x)/30;
    const vy = (h1.addr.y - h2.addr.y)/30;
    for(i=0;i<10;i++){
        clearCharacter(h1.addr);
        clearCharacter(h2.addr);
        drawCharacter({x:h1.addr.x-vx*i,y:h1.addr.y-vy*i},h1.staticPic);
        drawCharacter(h2.addr,h2.staticPic);
        await sleep(20);
    }
    for(i=9;i>=0;i--){
        clearCharacter(h1.addr);
        clearCharacter(h2.addr);
        drawCharacter({x:h1.addr.x-vx*i,y:h1.addr.y-vy*i},h1.staticPic);
        drawCharacter(h2.addr,h2.staticPic);
        await sleep(20);
    }
}

function fightInf(ctx, hero1, hero2) {
    ctx.canvas.style.display = "";
    var h = 180;
    ctx.clearRect(0,0,720,480);
    ctx.fillStyle = "#a5bfe2";
    ctx.fillRect(0,0,720,h);
    ctx.fillStyle = "#96e2d3";
    ctx.fillRect(0,h,360,480-h);
    ctx.fillStyle="#eebc37";
    ctx.fillRect(360,h,360,480-h);
    ctx.font="italic small-caps bold 90px arial";
    ctx.fillStyle = "#000"
    ctx.fillText("即将战斗",150,130);
    ctx.font="italic small-caps bold 30px arial";
    ctx.fillText("👈 返回 j",0,130);
    ctx.fillText("k 战斗 👉",720-ctx.measureText("k 战斗 👉").width,130);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(20,h+20,100,100);
    ctx.strokeRect(600,h+20,100,100);
    ctx.drawImage(hero1.head,20,h+20,100,100);
    ctx.drawImage(hero2.head,600,h+20,100,100);
    ctx.fillText(hero1.name,140,h+60);
    ctx.fillText(hero2.name,720-140-ctx.measureText(hero2.name).width,h+60);
    ctx.fillText("hp:"+hero1.hp+"/"+hero1.max_hp,140,h+100);
    ctx.fillText("hp:"+hero2.hp+"/"+hero2.max_hp,720-140-ctx.measureText("hp:"+hero2.hp+"/"+hero2.max_hp).width,h+100);
    ctx.font="italic small-caps bold 40px arial";
    if(hero1.bag[0].lastTime!==0){
        var damage1 = hero1.bag[0].attack+hero1.attack+
            getHold(hero1.bag[0],hero2.bag[0])-
            (hero2.defence+getTerrian(hero2.addr.x,hero2.addr.y).addDef);
        if(damage1<0)damage1=0;
        ctx.fillText("伤害："+damage1,30,370);
    }
    else ctx.fillText("武器损坏",30,370);
    if(hero2.bag[0].lastTime!==0){
        var damage2 = hero2.bag[0].attack+hero2.attack+
            getHold(hero2.bag[0],hero1.bag[0])-
            (hero1.defence+getTerrian(hero1.addr.x,hero1.addr.y).addDef);
        if(damage2<0)damage2=0;
        ctx.fillText("伤害："+damage2,720-30-ctx.measureText("伤害："+damage2).width,370);
    }
    else ctx.fillText("武器损坏",720-30-ctx.measureText("武器损坏").width,370);
    var miss2 =  ((hero2.speed+hero1.bag[0].weight+getTerrian(hero2.addr.x,hero2.addr.y).addSpe)/80)/hero2.bag[0].hitRate;
    miss2 = (miss2*100).toFixed(0)+"%";
    var miss1 =  ((hero1.speed+hero2.bag[0].weight+getTerrian(hero1.addr.x,hero1.addr.y).addSpe)/80)/hero1.bag[0].hitRate;
    miss1 = (miss1*100).toFixed(0)+"%";
    ctx.fillText("闪避率："+miss1,30,430);
    ctx.fillText("闪避率："+miss2,720-30-ctx.measureText("闪避率："+miss2).width,430);
}