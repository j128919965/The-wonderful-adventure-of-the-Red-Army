/**
 * main.js
 * @author csy
 * 游戏主流程
 */

/**
 * 检查我方单位是否全部待机
 * @returns {Promise<void>}
 */
async function checkStandBy() {

    var allTired = true;
    for(var i = 1 ; i<heroList.length ; i++){
        if(!heroList[i].alive)continue;
        if(heroList[i].isStandby) allTired = false;
    }
    if(allTired){
        isEnemyRound = true;
        enemyRound();
    }
}

/**
 * 进入敌方回合
 * @returns {Promise<void>}
 */
async function enemyRound() {
    //停下我方BGM播放敌方BGM
    audioMain.pause();
    audioEnemy.load();
    audioEnemy.play();
    await enemyRun();
    document.onkeydown = null;
    var i;
    var length=enemyList.length;
    for(i=1;i<length;i++) {
        document.onkeydown = null;
        if(i==4){

        }
        if(enemyList[i].alive){
            getMoveRange(enemyList[i]);
            await enemyAI(i);
            fwindow.updateWin(cursor);
            await sleep(300);
        }
    }
    await nextRound();
}

/**
 * 下一回合（我方回合）
 * @returns {Promise<void>}
 */
async function nextRound() {
    audioEnemy.pause();
    audioMain.load();
    audioMain.play();
    await heroRun();
    openCTX(animeContext);
    animeContext.save();
    animeContext.font="italic small-caps bold 30px arial";
    animeContext.fillStyle = "#fbca20";
    fwindow.updateWin(cursor);
    for(var i = 1 ; i<heroList.length ; i++){
        if(!heroList[i].alive) continue;
        heroList[i].isStandby = true;
        curHero = heroList[i];
        var addhp = getTerrian(heroList[i].addr.x,heroList[i].addr.y).addHp;
        if(addhp!==0){
            curhero = heroList[i];
            console.log(curHero.name);
            curhero.hp+= addhp;
            clearCharacter(curHero.addr);
            drawCharacter(curHero.addr,curHero.staticPic);
            animeContext.strokeText("+"+addhp+"!",curhero.addr.x*girdSize,(curHero.addr.y)*girdSize);
            animeContext.fillText("+"+addhp+"!",curhero.addr.x*girdSize,(curHero.addr.y)*girdSize);
            await sleep(800);
            animeContext.clearRect(0,0,720,480);
            if(heroList[i].hp>heroList[i].max_hp) heroList[i].hp = heroList[i].max_hp;
        }
        curHero = null;
    };
    isEnemyRound = false;
    animeContext.restore();
    closeCTX(animeContext);
    document.onkeydown = main;
}

/**
 * 移除英雄
 * 仅移除矩阵对应位置
 * heroList和enemyList不做改变
 * @param hero
 */
function deleteHero(hero) {
    console.log(hero.name+" has been deleted！");
    clearCharacter(hero.addr);
    if(hero.isMy){
        heroMatrix[hero.addr.x+hero.addr.y*15] = 0;
    }
    else{
        enemyMatrix[hero.addr.x+hero.addr.y*15] = 0;
    }
}

/**
 * 检查是否失败
 * @returns {Promise<unknown>}
 */
async function checkFalse() {
    var isfalse = true;
    for(i=1;i<heroList.length;i++){
        if(heroList[i].alive)isfalse = false;
    }
    if(isfalse){
        console.log("checked False!");
        audioEnemy.pause();
        audioMain.pause();
        audioFalse.load();
        audioFalse.play();
        await falseAnime();
    }
    return new Promise(resolve => setTimeout(resolve,0));
}

async function checkWin() {
    for(var i = 1;i<heroList.length;i++){
        if(heroList[i].addr.x===2&&heroList[i].addr.y===2){
            winAnime();
        }
    }
}

/**
 * 精灵表开进行绘制
 * 通过setInterval来运行
 */
function run() {
    for(let i=1;i<heroList.length;i++){
        if(curHero!==heroList[i]&&heroList[i].alive)
            drawSprite(heroList[i]);
    }
    for(let i=1;i<enemyList.length;i++){
        if(curHero!==enemyList[i]&&enemyList[i].alive)
            drawSprite(enemyList[i]);
    }
    cellIndex = (cellIndex+1)%4;
}

/**
 * 对话功能
 *
 * @param h1 hero
 * @param h2 hero
 * @param txt {speaker,t}
 * @param img 背景图片
 * @returns {Promise<boolean>}
 */
async function talk(h1,h2,txt,img,i) {
    openCTX(animeContext);
    console.log("spoken");
    animeContext.clearRect(0,0,720,480);
    animeContext.drawImage(img,0,0);
    animeContext.save();
    animeContext.fillStyle = "rgba(255,255,255,0.5)";
    animeContext.fillRect(20,20,720-40,480-40);
    if(txt[i].speaker===1){
        animeContext.drawImage(h1.head,50,50,200,200);
        animeContext.globalAlpha = 0.7;
        animeContext.drawImage(h2.head,490,50);
        animeContext.restore();
        animeContext.font = "30px Arial";
        animeContext.fillText(h1.name+":",50,300);
    }
    else if(txt[i].speaker===2){
        animeContext.globalAlpha = 0.7;
        animeContext.drawImage(h1.head,50,50);
        animeContext.restore();
        animeContext.drawImage(h2.head,490,50,200,200);
        animeContext.font = "30px Arial";
        animeContext.fillText(h2.name+":",720-50-animeContext.measureText(h2.name+":").width,300);
    }
    else
    {
        animeContext.globalAlpha = 0.7;
        animeContext.drawImage(h1.head,50,50);
        animeContext.drawImage(h2.head,490,50);
        animeContext.restore();
    }
    await blinkText(animeContext,txt[i].t,150,300,500,20);
    animeContext.font = "20px Arial";
    animeContext.fillText("按k继续对话.....",500,400);
    animeContext.restore();
    return sleep(0);
}

