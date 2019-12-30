/**
 * cursor.js
 * @author sby
 * 光标
 */

//光标对象构造函数
function Cursor(cordinate)
{
  this.x=cordinate.x;
  this.y=cordinate.y;
  this.canMove=true;
}
Cursor.prototype={
  placeCursor:function()
  {//在光标坐标上绘制光标
    var crd1={x:this.x*girdSize+3,y:this.y*girdSize+3},
    crd2={x:this.x*girdSize+girdSize-3,y:this.y*girdSize+girdSize-3};
    drawCursor(crd1,crd2); 
  },
  moveCursor:function(direction)
  {//改变光标位置
    if(!this.canMove)
      return;
    var crd={x:this.x*girdSize,y:this.y*girdSize};
    eraseMap(crd);
    
    if(this.x+direction.x<0||this.x+direction.x>mapWidth-1||this.y+direction.y<0||this.y+direction.y>mapHeight-1)
      return;
    
    var nextC=this.whereCursor({x:this.x+direction.x,y:this.y+direction.y});
    var i;
    for(i=0;i<4;i++)
      fwindow.canUse[i]=true;
    fwindow.canUse[nextC.x+nextC.y*2]=false;
    fwindow.placeWin(fwindow.charactWin,true);
    fwindow.placeWin(fwindow.goalWin,true);
    fwindow.placeWin(fwindow.addWin,true);
    fwindow.changeWin(fwindow.charactWin);
    fwindow.changeWin(fwindow.goalWin);
    fwindow.changeWin(fwindow.addWin);
    
    this.x+=direction.x;
    this.y+=direction.y;
    //console.log(this.x,this.y);
  },
  whereCursor:function(cordinate)
  {
    var x,y;
    x=cordinate.x>7?1:0;
    y=cordinate.y>4?1:0;
    return {x:x,y:y};
  }
};

function eraseMap(cordinate)
{
  cursorContext.clearRect(cordinate.x,cordinate.y,girdSize,girdSize);
}

function drawCursor(cordinate1,cordinate2)
{
  var x1=cordinate1.x,y1=cordinate1.y,x2=cordinate2.x,y2=cordinate2.y;
  cursorContext.save();
  cursorContext.lineWidth=4;
  cursorContext.beginPath();
  cursorContext.moveTo(x1,y1);
  cursorContext.lineTo(x1,y1+15);
  cursorContext.stroke();
  cursorContext.beginPath();
  cursorContext.moveTo(x1,y1);
  cursorContext.lineTo(x1+15,y1);
  cursorContext.stroke();

  cursorContext.beginPath();
  cursorContext.moveTo(x1,y2);
  cursorContext.lineTo(x1,y2-15);
  cursorContext.stroke();
  cursorContext.beginPath();
  cursorContext.moveTo(x1,y2);
  cursorContext.lineTo(x1+15,y2);
  cursorContext.stroke();
  
  cursorContext.beginPath();
  cursorContext.moveTo(x2,y1);
  cursorContext.lineTo(x2,y1+15);
  cursorContext.stroke();
  cursorContext.beginPath();
  cursorContext.moveTo(x2,y1);
  cursorContext.lineTo(x2-15,y1);
  cursorContext.stroke();
  
  cursorContext.beginPath();
  cursorContext.moveTo(x2,y2);
  cursorContext.lineTo(x2,y2-15);
  cursorContext.stroke();
  cursorContext.beginPath();
  cursorContext.moveTo(x2,y2);
  cursorContext.lineTo(x2-15,y2);
  cursorContext.stroke();
  cursorContext.restore();
}