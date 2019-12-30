/**
 * move.js
 * @author sby
 * 获取移动范围
 */

function showMoveRange(hero)
{
    moveContext.clearRect(0,0,moveCanvas.width,moveCanvas.height);
    var mRange=hero.move_range;
    var i,j;
    for(i=0;i<15;i++)
    {
        for(j=0;j<10;j++)
        {
            moveContext.save();
            moveContext.globalAlpha=0.35;
            if(mRange[i+j*15]!=-1&&mRange[i+j*15]<=hero.move_force+1)
            {   
                if(mRange[i+j*15]!==hero.move_force+1)
                    moveContext.fillStyle="rgb(50,50,200)";
                else
                    moveContext.fillStyle="rgb(200,50,50)";
                showGird(i,j);
            }
            moveContext.restore();
        }
    }
}
function showGird(x,y)
{
    moveContext.fillRect(x*girdSize+2,y*girdSize+2,girdSize-4,girdSize-4);
}
//获取人物的移动范围
function getMoveRange(character)
{
    character.iniRange();
    var range=0;//character.move_force;
    var nowCordinate=character.addr;
    var qe=new Queue(301);
    qe.push(nowCordinate);
    character.move_range[nowCordinate.x+nowCordinate.y*15]=range;
    //console.log(character.move_range[nowCordinate.x+nowCordinate.y*15]);
    while(!qe.isEmpty())
    {
        var now=qe.getFront();
        var i;
        range=character.move_range[now.x+now.y*15];
        for(i=0;i<4;i++)
        {
            var next={x:now.x+movx[i],y:now.y+movy[i]};
            if(check(next)&&character.move_range[next.x+next.y*15]==-1)
            {
                //console.log(next);
                character.move_range[next.x+next.y*15]=range+1;
                if(character.isMy){
                    if(enemyMatrix[next.x+next.y*15]!=0){  continue; }
                }
                else{
                    if(heroMatrix[next.x+next.y*15]!=0){ continue; }
                }
                qe.push(next);
            }
        }
        qe.pop();
    }
}