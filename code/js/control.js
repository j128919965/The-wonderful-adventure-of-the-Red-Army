/**
 * control.js
 * @author csy
 * 状态机的实现
 *
 */


if (guoqi.complete) {
    anime = new openAnime();
    anime.draw();
} else {
    guoqi.onload = function () {
        anime = new openAnime();
        anime.draw();
    };
}


document.onkeydown = state1;

/**
 * 状态机 一号
 * 开场动画
 *
 */
function state1(e) {
    //跳转到state2
    audioChoose.play();
    if (e.keyCode === 75) {
        document.onkeydown = undefined;
        anime.stop();
        anime = new scroll();
        anime.draw();
        context.drawImage(backImg, 0, 0, backImg.width, backImg.height, 0, 0, canvas.width, canvas.height);
        document.onkeydown = state2;
    }
}

/**
 * 状态机二号
 * 滚动字幕
 * @param e
 * @returns {Promise<void>}
 */
async function state2(e) {
    audioChoose.play();
    if (e.keyCode === 74) {
        anime.stop();
        anime = new openAnime();
        anime.draw();
        document.onkeydown = state1;
    } else if (e.keyCode === 75) {
        document.onkeydown = undefined;
        anime.stop();
        closeCTX(animeContext);
        /*
          精灵表开始绘制
          此处为异步动画
         */
        loop = setInterval(run,500);
        talkIndex=0;
        //document.onkeydown = main;
        audioOpen.pause();
        audioEnemy.load();
        audioEnemy.play();
        talk(enemyList[1],enemyList[2],talk3,cunzi,talkIndex);
        document.onkeydown=state3;
    }
}

/**
 * 状态机三号
 * 开始游戏前的对话
 * @param e
 * @returns {Promise<void>}
 */
async function state3(e)
{
    //audioChoose.play();
    if (e.keyCode === 75) {
        if(openTalkState === 1){
            talkIndex++;
            if(talkIndex>=talk3.length)
            {
                document.onkeydown = null;
                closeCTX(animeContext);
                openTalkState = 2;
                talkIndex = 0;
                curHero = enemyList[1];
                var q=new Queue(150);
                q.push({x:2,y:2});
                q.push({x:2,y:3});
                q.push({x:3,y:3});
                q.push({x:4,y:3});
                q.push({x:4,y:4});
                q.push({x:4,y:5});
                q.push({x:5,y:5});
                q.push({x:6,y:5});
                q.push({x:6,y:6});
                q.push({x:7,y:6});
                q.push({x:8,y:6});
                enemyList[1].path = q;
                await enemyList[1].picMove();
                enemyList[1].addr = {x:8,y:6};
                curHero.path.clear();
                curHero = heroList[2];
                q=new Queue(150);
                q.push({x:12,y:7});
                q.push({x:11,y:7});
                q.push({x:10,y:7});
                q.push({x:9,y:7});
                q.push({x:9,y:7});
                q.push({x:9,y:6});
                heroList[2].path = q;
                await heroList[2].picMove();
                heroList[2].addr = {x:9,y:6};
                curHero.path.clear();
                curHero = null;
                await talk(heroList[2],enemyList[1],talk2,cunzi,talkIndex);
                document.onkeydown = state3;
                return;
            }
            document.onkeydown = null;
            await talk(enemyList[1],enemyList[2],talk3,cunzi,talkIndex);
            document.onkeydown = state3;
        }
        else if(openTalkState === 2){
            talkIndex++;
            if(talkIndex>=talk2.length){
                document.onkeydown = null;
                animeContext.save();
                animeCanvas.style.background = "rgba(0,0,0,0)";
                animeContext.clearRect(0,0,720,480);
                animeContext.fillStyle = "#fbca20";
                animeContext.strokeText("-25!",heroList[2].addr.x*girdSize+girdSize/2,(heroList[2].addr.y)*girdSize);
                animeContext.fillText("-25!",heroList[2].addr.x*girdSize+girdSize/2,(heroList[2].addr.y)*girdSize);
                await fightAnime(enemyList[1],heroList[2]);
                audioAttack.play();
                animeContext.strokeText("miss!",enemyList[1].addr.x*girdSize+girdSize/2,(enemyList[1].addr.y)*girdSize);
                animeContext.fillText("miss!",enemyList[1].addr.x*girdSize+girdSize/2,(enemyList[1].addr.y)*girdSize);
                animeContext.restore();
                await fightAnime(heroList[2],enemyList[1]);
                audioAttack.pause();
                audioAttack.load();
                audioAttack.play();
                await sleep(500);
                await talk(heroList[2],enemyList[1],talk4,cunzi,0);
                document.onkeydown = state3;
                openTalkState = 3;
                talkIndex = 0;
                return;
            }
            document.onkeydown = null;
            await talk(heroList[2],enemyList[1],talk2,cunzi,talkIndex);
            document.onkeydown = state3;
        }
        else if(openTalkState === 3){
            document.onkeydown = null;
            closeCTX(animeContext);
            curHero = heroList[2];
            q=new Queue(150);
            q.push_front({x:12,y:7});
            q.push_front({x:11,y:7});
            q.push_front({x:10,y:7});
            q.push_front({x:9,y:7});
            q.push_front({x:9,y:7});
            q.push_front({x:9,y:6});
            heroList[2].path = q;
            await heroList[2].picMove();
            heroList[2].addr = {x:12,y:7};
            curHero.path.clear();
            curHero = null;
            await talk(heroList[2],enemyList[1],talk5,cunzi,0);
            document.onkeydown = state3;
            openTalkState = 4;
        }
        else if(openTalkState === 4){
            document.onkeydown = null;
            closeCTX(animeContext);
            curHero = enemyList[1];
            q=new Queue(150);
            q.push_front({x:2,y:2});
            q.push_front({x:2,y:3});
            q.push_front({x:3,y:3});
            q.push_front({x:4,y:3});
            q.push_front({x:4,y:4});
            q.push_front({x:4,y:5});
            q.push_front({x:5,y:5});
            q.push_front({x:6,y:5});
            q.push_front({x:6,y:6});
            q.push_front({x:7,y:6});
            q.push_front({x:8,y:6});
            enemyList[1].path = q;
            await enemyList[1].picMove();
            enemyList[1].addr = {x:2,y:2};
            curHero.path.clear();
            curHero = null;
            await talk(heroList[1],heroList[2],talk1,cunzi,talkIndex);
            document.onkeydown = state3;
            openTalkState = 5;
        }
        else{
            talkIndex++;
            if(talkIndex>=talk1.length-1){
                closeCTX(animeContext);
                document.onkeydown = main;
                audioEnemy.pause();
                audioMain.load();
                audioMain.play();
                await heroRun();
                return;
            }
            document.onkeydown = null;
            await talk(heroList[1],heroList[2],talk1,cunzi,talkIndex);
            document.onkeydown = state3;
        }
    }
}

/**
 * 状态机4：主战斗界面
 * @param e
 */
function main(e) {
    
    var dFlg = -1;
    var flag = false;
    if (e.keyCode === 65) {
        dFlg = 0;
        flag = true;
    } else if (e.keyCode === 87) {
        dFlg = 1;
        flag = true;
    } else if (e.keyCode === 68) {
        dFlg = 2;
        flag = true;
    } else if (e.keyCode === 83) {
        dFlg = 3;
        flag = true;
    }
    if (flag) {
        //audioChoose.play();
        var direction = {x: movx[dFlg], y: movy[dFlg]};
        moveContext.clearRect(0, 0, moveCanvas.width, moveCanvas.height);
        cursor.moveCursor(direction);
        cursor.placeCursor();
        fwindow.updateWin(cursor);
    }
    //k
    else if (e.keyCode === 75) {
        audioChoose.play();
        curHero = null;
        if (heroMatrix[cursor.x + cursor.y * 15] !== 0) {
            curHero = heroList[heroMatrix[cursor.x + cursor.y * 15]];
        } else if (enemyMatrix[cursor.x + cursor.y * 15] !== 0) {
            curHero = enemyList[enemyMatrix[cursor.x + cursor.y * 15]];
        }
        if (curHero !== null) {
            //显示人物移动范围
            getMoveRange(curHero);//计算角色的移动矩阵
            showMoveRange(curHero);//显示移动范围
            windowContext.clearRect(0, 0, windowCanvas.width, windowCanvas.height);
            if (curHero.isMy && curHero.isStandby)//若选中的为友方角色，则将当前位置作为路径的起点
            {
                curHero.path.clear();
                curHero.path.push({x: cursor.x, y: cursor.y});
                var i;
                for (i = 0; i < 150; i++) {
                    pathMatrix[i] = 0;
                }
                pathMatrix[cursor.x + cursor.y * 15] = 1;
                document.onkeydown = state5;
            }
        }
    }
    //i
    else if (e.keyCode === 73) {
        audioChoose.play();
        curHero = null;
        if (heroMatrix[cursor.x + cursor.y * 15] !== 0) {
            curHero = heroList[heroMatrix[cursor.x + cursor.y * 15]];
        } else if (enemyMatrix[cursor.x + cursor.y * 15] !== 0) {
            curHero = enemyList[enemyMatrix[cursor.x + cursor.y * 15]];
        }
        if (curHero !== null) {
            curHero.showInformation(HIContext, true, 0);
            document.onkeydown = state11;
        }
    }
}

/**
 * 状态机 5：选择角色
 */
async function state5(e) {
    //audioChoose.play();
    //操作
    var dFlg = -1;
    //是否为移动状态
    var flag = false;
    if (e.keyCode === 65) {
        dFlg = 0;
        flag = true;
    } else if (e.keyCode === 87) {
        dFlg = 1;
        flag = true;
    } else if (e.keyCode === 68) {
        dFlg = 2;
        flag = true;
    } else if (e.keyCode === 83) {
        dFlg = 3;
        flag = true;
    }
    if (flag) {
        var direction = {x: movx[dFlg], y: movy[dFlg]};
        cursor.moveCursor(direction);
        cursor.placeCursor();
        //console.log(curHero.move_range[cursor.x+cursor.y*15]);
        if (curHero.move_range[cursor.x + cursor.y * 15] === -1 || curHero.move_range[cursor.x + cursor.y * 15] > curHero.move_force)
            return;
        if (heroMatrix[cursor.x + cursor.y * 15] !== 0 && heroList[heroMatrix[cursor.x + cursor.y * 15]] !== curHero)
            return;
        else if (enemyMatrix[cursor.x + cursor.y * 15] !== 0)
            return;
        if (curHero.isMy)//若选中的为友方角色，则显示路径
        {
            if (pathMatrix[cursor.x + cursor.y * 15] === 1) //当前位置已经在路径中，则将路径截断至当前位置
            {
                while (curHero.path.getBack().x !== cursor.x || curHero.path.getBack().y !== cursor.y) {
                    pathMatrix[curHero.path.getBack().x + curHero.path.getBack().y * 15] = 0;
                    curHero.path.pop_back();
                }
                pathMatrix[curHero.path.getBack().x + curHero.path.getBack().y * 15] = 0;
                curHero.path.pop_back();
            }
            curHero.path.push({x: cursor.x, y: cursor.y});
            pathMatrix[cursor.x + cursor.y * 15] = 1;
            //console.log(curHero.move_range[cursor.x+cursor.y*15]+1!==curHero.path.now_length);
            if (curHero.move_range[cursor.x + cursor.y * 15] + 1 !== curHero.path.now_length || (curHero.path.now_length >= 2 && !checkCord(cursor, curHero.path.get(curHero.path.now_length - 2)))) {//所选路径不是到达当前位置的最短路径，则寻找一条最短路径
                findShortestPath(curHero, cursor);
            }
            showPath(curHero.path);
        }
    }
    //j
    else if (e.keyCode === 74) {
        audioChoose.play();
        moveContext.clearRect(0, 0, moveCanvas.width, moveCanvas.height);
        pathContext.clearRect(0, 0, pathCanvas.width, pathCanvas.height);
        fwindow.updateWin(cursor);
        curHero = null;
        document.onkeydown = main;
    }
    //k
    else if (e.keyCode === 75) {
        audioChoose.play();
        if (curHero.move_range[cursor.x + cursor.y * 15] !== -1) {
            if (heroMatrix[cursor.x + cursor.y * 15] !== 0 && heroList[heroMatrix[cursor.x + cursor.y * 15]] !== curHero)
                return;
            else if (enemyMatrix[cursor.x + cursor.y * 15] !== 0)
                return;
            moveContext.clearRect(0, 0, moveCanvas.width, moveCanvas.height);
            pathContext.clearRect(0, 0, pathCanvas.width, pathCanvas.height);
            document.onkeydown = undefined;
            await curHero.picMove();
            prepAddr = {x: cursor.x, y: cursor.y};
            document.onkeydown = state6;
            fwindow.showActWin();
        } else {
            sence--;
        }
    }
    //i
    else if (e.keyCode === 73) {

    }
}

/**
 * 状态机 6：角色操作浮窗
 */
function state6(e) {
    audioChoose.play();
    //w
    if (e.keyCode === 87) {
        actSelect = (actSelect - 1 + 3) % 3
    }
    //a
    else if (e.keyCode === 83) {
        actSelect = (actSelect + 1) % 3;
    }
    //k
    else if (e.keyCode === 75) {
        if (actSelect === 0) {
            //打开物品栏
            //sence=3;
            fwindow.showActWin();
            fwindow.showBag(curHero.bag, 0);
            showing_location = 0;
            document.onkeydown = state9;
            return;
        }
        //待机
        else if (actSelect === 1) {
            sence = 0;//sence回到0
            var id = heroMatrix[curHero.addr.x + curHero.addr.y * 15];
            heroMatrix[curHero.addr.x + curHero.addr.y * 15] = 0; //将人物原位置对应的矩阵值改为0
            heroMatrix[cursor.x + cursor.y * 15] = id;
            curHero.moveTo(heroContext, curHero.path, prepAddr); //修改人物位置属性
            prepAddr = undefined;
            windowContext.clearRect(0, 0, windowCanvas.width, windowCanvas.height);//清空浮窗界面
            curHero.wait();
            curHero.path.clear();
            curHero = null;
            document.onkeydown = main; //回档到main
            return;
        } else if (actSelect === 2) {
            var f = false;
            if (/*enemyMatrix[(prepAddr.x-1)+(prepAddr.y)*15]!==0
                        ||enemyMatrix[(prepAddr.x+1)+(prepAddr.y)*15]!==0
                        ||enemyMatrix[(prepAddr.x)+(prepAddr.y-1)*15]!==0
                        ||enemyMatrix[(prepAddr.x)+(prepAddr.y+1)*15]!==0*/
                fightList.length !== 0
            ) {
                f = true;
            }
            if (f) {
                windowContext.clearRect(0, 0, windowCanvas.width, windowCanvas.height);
                fight_location = 0;
                fwindow.showFightWin(fightList, fight_location);
                document.onkeydown = state7_1;
                return;
            }
        }
    } else if (e.keyCode === 74) //j
    {
        console.log("j");
        document.onkeydown = undefined;
        sence = 0;
        actSelect = 0;
        clearCharacter(prepAddr);
        cursor.moveCursor(curHero.addr);
        cursor.placeCursor();
        drawCharacter(curHero.addr, curHero.staticPic); //旧位置上画回去
        showMoveRange(curHero); //重新显示移动范围和路径
        windowContext.clearRect(0, 0, windowCanvas.width, windowCanvas.height); //清空浮窗
        showPath(curHero.path);
        document.onkeydown = state5; //回档到状态5
        return;
    }
    fwindow.showActWin();
}

/**
 * 状态机 7：攻击目标选择
 */
function state7(e) {
    audioChoose.play();
    //wasd
    var dFlg = -1;
    var flag = false;
    if (e.keyCode === 65) {
        dFlg = 0;
        flag = true;
    } else if (e.keyCode === 87) {
        dFlg = 1;
        flag = true;
    } else if (e.keyCode === 68) {
        dFlg = 2;
        flag = true;
    } else if (e.keyCode === 83) {
        dFlg = 3;
        flag = true;
    }
    if (flag) {
        var direction = {x: movx[dFlg], y: movy[dFlg]};
        cursor.moveCursor(direction);
        cursor.placeCursor();
    }
    //k
    if (e.keyCode === 75) {
        if (enemyMatrix[cursor.x + cursor.y * 15] === 0) return;
        attackingHero = enemyList[enemyMatrix[cursor.x + cursor.y * 15]];
        fightInf(HIContext, curHero, attackingHero);
        document.onkeydown = state8;
    }
    //j
    if (e.keyCode === 74) {
        fwindow.showActWin();
        console.log("document.onkeydown = state6");
        document.onkeydown = state6;
    }
}

function state7_1(e) {
    audioChoose.play();
    //wasd
    if (e.keyCode === 87) {
        fight_location = (fight_location - 1 + fightList.length) % fightList.length;
    } else if (e.keyCode === 83) {
        fight_location = (fight_location + 1) % fightList.length;
    }
    //k
    if (e.keyCode === 75) {
        if (enemyList[fightList[fight_location]].alive) {
            attackingHero = enemyList[fightList[fight_location]];
            fightInf(HIContext, curHero, attackingHero);
            document.onkeydown = state8;
            return;
        }
    }
    //j
    if (e.keyCode === 74) {
        fwindow.showActWin();
        document.onkeydown = state6;
        return;
    }
    windowContext.clearRect(0, 0, windowCanvas.width, windowCanvas.height);
    fwindow.showFightWin(fightList, fight_location);
}

/**
 * 状态机 8：战斗信息浮窗
 */
async function state8(e) {
    audioChoose.play();
    //j
    if (e.keyCode === 74) {
        closeCTX(HIContext);
        document.onkeydown = state7_1;
    }
    //k
    else if (e.keyCode === 75) {
        closeCTX(HIContext);
        var id = heroMatrix[curHero.addr.x + curHero.addr.y * 15];
        heroMatrix[curHero.addr.x + curHero.addr.y * 15] = 0; //将人物原位置对应的矩阵值改为0
        heroMatrix[prepAddr.x + prepAddr.y * 15] = id; //新位置的矩阵值改为人物id
        curHero.moveTo(heroContext, curHero.path, prepAddr); //修改人物位置属性
        prepAddr = undefined;
        windowContext.clearRect(0, 0, windowCanvas.width, windowCanvas.height);//清空浮窗界面
        curHero.wait();
        curHero.path.clear();
        await fight(curHero, attackingHero);
        prepAddr = undefined;
        curHero = null;
        attackingHero = null;
        fwindow.updateWin(cursor);
        document.onkeydown = main;
    }
}

/**
 * 状态机 9：物品选择浮窗
 */
function state9(e) {
    audioChoose.play();
    if (e.keyCode === 87) //w
    {
        showing_location = (showing_location - 1 + curHero.getBagSize()) % curHero.getBagSize();
    } else if (e.keyCode === 83) //a
    {
        showing_location = (showing_location + 1) % curHero.getBagSize();
    } else if (e.keyCode === 74) //j
    {
        windowContext.clearRect(fwindow.bagCord.x, fwindow.bagCord.y, fwindow.bagSize.w, fwindow.bagSize.h * 5);
        fwindow.showActWin();
        document.onkeydown = state6;
        return;
    } else if (e.keyCode === 75) //k
    {
        windowContext.clearRect(fwindow.weapenCord.x, fwindow.weapenCord.y, fwindow.weapenSize.w + 2, fwindow.weapenSize + 2);
        select_location = 0;
        fwindow.showWeapen(curHero.bag[showing_location], select_location);
        document.onkeydown = state10;
        return;
    }
    windowContext.save();
    windowContext.clearRect(fwindow.bagCord.x, fwindow.bagCord.y, fwindow.bagSize.w, fwindow.bagSize.h);
    fwindow.showBag(curHero.bag, showing_location);
    windowContext.restore();
}

/**
 * 状态机 10：物品操作浮窗
 */
async function state10(e) {
    audioChoose.play();
    if (e.keyCode === 74) //j
    {
        windowContext.clearRect(fwindow.weapenCord.x, fwindow.weapenCord.y, fwindow.weapenSize.w + 3, fwindow.weapenSize.h * 2 + 3);
        document.onkeydown = state9;
        return;
    } else if (e.keyCode === 87) //w
    {
        select_location = (select_location - 1 + 2) % 2;
    } else if (e.keyCode === 83) //a
    {
        select_location = (select_location + 1) % 2;
    }
    windowContext.save();
    windowContext.clearRect(fwindow.weapenCord.x, fwindow.weapenCord.y, fwindow.weapenSize.w + 3, fwindow.weapenSize.h * 2 + 3);
    fwindow.showWeapen(curHero.bag[showing_location], select_location);
    windowContext.restore();
    //k
    if (e.keyCode === 75) {
        if (select_location === 0) {
            if (curHero.bag[showing_location].isMedcine) {
                document.onkeydown = null;
                var id = heroMatrix[curHero.addr.x + curHero.addr.y * 15];
                heroMatrix[curHero.addr.x + curHero.addr.y * 15] = 0; //将人物原位置对应的矩阵值改为0
                heroMatrix[prepAddr.x + prepAddr.y * 15] = id; //新位置的矩阵值改为人物id
                curHero.moveTo(heroContext, curHero.path, prepAddr); //修改人物位置属性
                prepAddr = undefined;
                windowContext.clearRect(0, 0, windowCanvas.width, windowCanvas.height);//清空浮窗界面
                curHero.path.clear();
                await curHero.equip(showing_location);
                prepAddr = undefined;
                attackingHero = null;
                fwindow.updateWin(cursor);
                document.onkeydown = main;
                curHero.wait();
                curHero = null;
            } else {
                curHero.equip(showing_location);
                windowContext.clearRect(fwindow.bagCord.x, fwindow.bagCord.y, fwindow.bagSize.w, fwindow.bagSize.h);
                windowContext.clearRect(fwindow.weapenCord.x, fwindow.weapenCord.y, fwindow.weapenSize.w + 3, fwindow.weapenSize.h * 2 + 3);
                fwindow.showBag(curHero.bag, showing_location);
                document.onkeydown = state9;
                return;
            }
        } else {
            var equ = curHero.bag[showing_location].name;
            for (var i = showing_location; i < 5; i++) {
                if (i === 4) {
                    curHero.bag[i] = null;
                } else {
                    curHero.bag[i] = curHero.bag[i + 1];
                }
            }
            alert("已丢弃" + equ);
            windowContext.clearRect(0, 0, 720, 480);
            fwindow.showActWin();
            fwindow.showBag(curHero.bag, showing_location);
            document.onkeydown = state9;
            return;
        }
    }
}

/**
 * 状态机 11：角色信息界面
 */
function state11(e) {
    audioChoose.play();
    //a||d
    if (e.keyCode === 65 || e.keyCode === 68) {
        document.onkeydown = undefined;
        showing_location = 0;
        curHero.showInformation(HIContext, false, showing_location);
        document.onkeydown = state12;
    }
    //j || 73
    else if (e.keyCode === 74 || e.keyCode === 73) {
        closeCTX(HIContext);
        document.onkeydown = undefined;
        curHero = null;
        document.onkeydown = main;
    }
}

/**
 * 状态机 12：武器信息界面
 */
function state12(e) {
    audioChoose.play();
    //j
    if (e.keyCode === 74) {
        closeCTX(HIContext);
        curHero = null;
        document.onkeydown = main;
    }
    //w||s
    else if (e.keyCode === 87) {
        showing_location--;
        if (showing_location < 0) {
            showing_location = curHero.getBagSize() - 1;
        } else if (showing_location > curHero.getBagSize() - 1) {
            showing_location = 0;
        }
        curHero.showInformation(HIContext, false, showing_location);
    } else if (e.keyCode === 83) {
        showing_location++;
        if (showing_location < 0) {
            showing_location = curHero.getBagSize() - 1;
        } else if (showing_location > curHero.getBagSize() - 1) {
            showing_location = 0;
        }
        curHero.showInformation(HIContext, false, showing_location);
    }

    //a||d
    else if (e.keyCode === 65 || e.keyCode === 68) {
        document.onkeydown = undefined;
        showing_location = 0;
        curHero.showInformation(HIContext, true, showing_location);
        document.onkeydown = state11;
    } else if (e.keyCode === 73) {
        curHero.bag[showing_location].showInformation(HIContext);
        document.onkeydown = state13;
    }
}


/**
 * 状态机13
 * @param e
 */
function state13(e) {
    audioChoose.play();
    if (e.keyCode === 74 || e.keyCode === 73) {
        curHero.showInformation(HIContext, false, showing_location);
        document.onkeydown = state12;
    }
}

