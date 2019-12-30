/*--Artificial Idiot--*/
/*--- 人 工 智 障 ---*/
/**
 * AI.js
 * @author sby
 * 敌方行动AI
 */
var canmoveList=new Queue(150);
/**
 * 
 * @param {*} cord 当前所处位置
 */
function wannaBattle(cord)
{
    var i,battleId;
    for(i=0;i<4;i++)
    {
        var nx=cord.x+movx[i],ny=cord.y+movy[i];
        battleId=heroMatrix[nx+ny*15]
        if(battleId!==0)
            break;
    }
    return battleId;
}

function findBattlePath(enemy,id)
{
    var i;
    var length=canmoveList.now_length;
    var target=null; //目标
    var minn=2333; //最短距离
    //console.log(enemyList[id]);
    for(i=0;i<length;i++)
    {
        var addr=canmoveList.get(i);
        if(enemy.move_range[addr.x+addr.y*15]<=minn&&enemy.move_range[addr.x+addr.y*15]!==-1)
        {
            //console.log(addr);
            if(enemyMatrix[addr.x+addr.y*15]===0||enemyMatrix[addr.x+addr.y*15]===id){
                minn=enemy.move_range[addr.x+addr.y*15];
                target=canmoveList.get(i);
            }
        }
    }
    if(target===null)
        return target;
    findShortestPath(enemy,target);
    if(enemy.path.isEmpty())
    {
        return null;
    }
    while(enemy.move_range[enemy.path.getBack().x+enemy.path.getBack().y*15]>enemy.move_force)
    {
        enemy.path.pop_back();
    }
    if(enemy.path.isEmpty())
    {
        return null;
    }
    while((enemyMatrix[enemy.path.getBack().x+enemy.path.getBack().y*15]!==0&&
        enemyMatrix[enemy.path.getBack().x+enemy.path.getBack().y*15]!==id)||
        heroMatrix[enemy.path.getBack().x+enemy.path.getBack().y*15]!==0)
    {
        enemy.path.pop_back();
    }
    return target;
}

async function enemyAI(enemyId)
{
    curHero = enemyList[enemyId];
    getMoveList();
    let aiType = enemyList[enemyId].aiType;
    let target=findBattlePath(enemyList[enemyId],enemyId);
    if(target===null)
        return new Promise(resolve => setTimeout(resolve, 0));
    if(aiType===0)
    {
        enemyMatrix[enemyList[enemyId].addr.x+enemyList[enemyId].addr.y*15]=0;
        await enemyList[enemyId].picMove();
        enemyList[enemyId].stop(enemyList[enemyId].path.getBack());
        enemyMatrix[enemyList[enemyId].path.getBack().x+enemyList[enemyId].path.getBack().y*15]=enemyId;
        let heroId=wannaBattle(enemyList[enemyId].addr);
        if(heroId!==0){
            await fight(enemyList[enemyId],heroList[heroId]);
        }
    }
    else if(aiType===1)
    {
        let addr=target;
        if(enemyList[enemyId].move_range[addr.x+addr.y*15]<=enemyList[enemyId].move_force)
        {
            //console.log(target);
            enemyMatrix[enemyList[enemyId].addr.x+enemyList[enemyId].addr.y*15]=0;
            await enemyList[enemyId].picMove();
            enemyList[enemyId].stop(enemyList[enemyId].path.getBack());
            enemyMatrix[enemyList[enemyId].path.getBack().x+enemyList[enemyId].path.getBack().y*15]=enemyId;
            let heroId=wannaBattle(enemyList[enemyId].addr);
            if(heroId!==0){
                //console.log("这时候应该打架");
                await fight(enemyList[enemyId],heroList[heroId]);
            }
        }
    }
    else if(aiType===2)
    {
        let heroId=wannaBattle(enemyList[enemyId].addr);
        if(heroId!==0)
            await fight(enemyList[enemyId],heroList[heroId]);
    }
    curHero = null;
    return new Promise(resolve => setTimeout(resolve, 0));
}
function getMoveList()
{
    canmoveList.clear();
    var i;
    var length=heroList.length;
    for(i=1;i<length;i++)
    {
        if(!heroList[i].alive)
        {
            continue;
        }
        var j;
        for(j=0;j<4;j++)
        {
            var cord={x:heroList[i].addr.x+movx[j],y:heroList[i].addr.y+movy[j]};
            if(check(cord)&&heroMatrix[cord.x+cord.y*15]==0)
            {
                canmoveList.push(cord);
                //console.log(canmoveList.getBack());
            }
        }
    }
}