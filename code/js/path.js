/**
 * path.js
 * @author sby
 * 路径指示层
 */
/**
 * 绘制完整路径
 * @param path
 */
function showPath(path)
{
    pathContext.clearRect(0,0,pathCanvas.width,pathCanvas.height);
    var i;
    //遍历路径中的前n-1个格子，画出它们到下一个格子的路径
    for(i=path.front;(i+1)%path.max_length!=path.end;i=(i+1)%path.max_length)
    {
        linkPath(path.node[i],path.node[(i+1)%path.max_length]);
    }
    //当路径长度超过一格时，在路径的最后一格画一个箭头
    if(path.now_length>1)
        drawArrow(path.node[(i-1+path.max_length)%path.max_length],path.node[i]);
}
function linkPath(cordinate1,cordinate2) //绘制两个格子间的路径
{
    var x1=cordinate1.x*girdSize+girdSize/2,y1=cordinate1.y*girdSize+girdSize/2,
    x2=cordinate2.x*girdSize+girdSize/2,y2=cordinate2.y*girdSize+girdSize/2;
    pathContext.beginPath();
    pathContext.lineWidth=4;
    pathContext.strokeStyle='rgba(60,60,200,1)';
    pathContext.moveTo(x1,y1);
    pathContext.lineTo(x2,y2);
    pathContext.stroke();
}
function drawArrow(cordinate1,cordinate2) //画箭头
{
    var x=cordinate1.x-cordinate2.x,y=cordinate1.y-cordinate2.y,
    x1=cordinate2.x*girdSize+girdSize/2,y1=cordinate2.y*girdSize+girdSize/2;
    pathContext.lineWidth=4;
    pathContext.strokeStyle='rgba(60,60,200,1)';
    pathContext.moveTo(x1,y1);
    if(y==0)
    {
        pathContext.lineTo(x1+x*girdSize*0.3,y1+girdSize*0.2);
        pathContext.stroke();
        pathContext.beginPath();
        pathContext.moveTo(x1,y1);
        pathContext.lineTo(x1+x*girdSize*0.3,y1-girdSize*0.2);
    }
    else if(x==0)
    {
        pathContext.lineTo(x1+girdSize*0.2,y1+y*girdSize*0.3);
        pathContext.stroke();
        pathContext.beginPath();
        pathContext.moveTo(x1,y1);
        pathContext.lineTo(x1-girdSize*0.2,y1+y*girdSize*0.3);
    }
    pathContext.stroke();    
}
//寻找最短路径
function findShortestPath(hero,cursor)
{
    var x=cursor.x,y=cursor.y;
    var isMy=hero.isMy;
    hero.path.clear();
    for(i=0;i<150;i++) { pathMatrix[i]=0; }
    pathMatrix[x+y*15]=1;
    hero.path.push_front({x:x,y:y});
    while(hero.move_range[x+y*15]>0)
    {
        var i;
        for(i=0;i<4;i++)
        {
            var next={x:x+movx[i],y:y+movy[i]};
            if(check(next))
            {
                if(hero.move_range[next.x+next.y*15]==hero.move_range[x+y*15]-1)
                {
                    if(isMy&&enemyMatrix[next.x+next.y*15]!==0)
                    {
                        continue;
                    }
                    else if(!isMy&&heroMatrix[next.x+next.y*15]!==0)
                    {
                        continue;
                    }
                    hero.path.push_front({x:next.x,y:next.y});
                    x=next.x;
                    y=next.y;
                    pathMatrix[x+y*15]=1;
                    break;
                }
            }
        }
    }
}
function checkCord(cor1,cor2)
{
    //console.log(cor1,cor2);
    var offsetX=Math.abs(cor1.x-cor2.x);
    var offsetY=Math.abs(cor1.y-cor2.y);
    //console.log(cor1,cor2);
    if(offsetX+offsetY!==1)
        return false;
    return true;
}