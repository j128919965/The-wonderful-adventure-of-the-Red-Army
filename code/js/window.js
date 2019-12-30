/**
 * window.js
 * @author sby
 * 浮窗
 */
/**
 * 
 * @param {*} x 浮窗横坐标 
 * @param {*} y 浮窗纵坐标
 * @param {*} w 浮窗宽度
 * @param {*} h 浮窗高度
 * @param {*} color 浮窗颜色
 * @param {*} id 浮窗类型
 */
function FWin(x,y,w,h,color,id)
{
  this.x=x;
  this.y=y;
  this.w=w;
  this.h=h;
  this.color=color;
  this.id=id;
}
//浮窗界面
function FWindow()
{
  this.cord1={x:girdSize*0.5,y:girdSize*0.3};  //信息窗坐标1 
  this.cord2={x:girdSize*10,y:girdSize*0.3};   //信息窗坐标2
  this.cord3={x:girdSize*0.5,y:girdSize*8.3};  //信息窗坐标3
  this.cord4={x:girdSize*11.5,y:girdSize*8.3}; //信息窗坐标4
  this.actCord={x:girdSize*0.5,y:girdSize*3};    //行动窗坐标
  
  this.bagCord={x:girdSize*3.2,y:girdSize*2.7}; //背包窗坐标
  this.bagSize={w:girdSize*6,h:girdSize};       //背包窗尺寸

  this.weapenCord={x:girdSize*9.4,y:girdSize*2.5}; //物品操作窗坐标
  this.weapenSize={w:girdSize*3,h:girdSize}; //物品操作窗尺寸

  this.fightCord={x:girdSize*5,y:girdSize*3}; //战斗列表坐标
  this.fightSize={w:girdSize*6,h:girdSize}; //战斗列表尺寸

  this.enemyCord={x:girdSize*5+4,y:girdSize*4}; //对手选项坐标
  this.enemySize={w:girdSize*5.8,h:girdSize}; //对手选项尺寸
  
  this.canUse=new Array(true,true,true,true);
  this.goalWin=new FWin(0,0,girdSize*4.5,girdSize,"rgba(10,10,10,0.7)","goal");
  this.addWin=new FWin(0,0,girdSize*2,girdSize*1.5,"rgba(200,100,10,0.7)","add");
  this.charactWin=new FWin(0,0,girdSize*4,girdSize*1.5,"rgba(255,255,255,0.7)","character");
  this.activeWin=new FWin(this.actCord.x,this.actCord.y,girdSize*2.5,girdSize*3,"rgba(100,100,200,0.8)","act");
  this.fightWin=new FWin(this.fightCord.x,this.fightCord.y,this.fightSize.w,this.fightSize.h,"rgba(200,50,200,1)","fight");
  //console.log("create window");
}
FWindow.prototype={
  /**
   * 
   * @param {*} myWindow //要绘制的浮窗对象 
   * @param {Boolean} isplaced //浮窗是否已绘制,为true时擦除浮窗
   */
  placeWin:function(myWindow,isplaced)
  {//显示浮窗
    if(isplaced)
    {
      windowContext.save();
      windowContext.clearRect(myWindow.x,myWindow.y,myWindow.w,myWindow.h);
      windowContext.restore();
      return;
    }
    windowContext.save();
    windowContext.fillStyle=myWindow.color;
    windowContext.fillRect(myWindow.x,myWindow.y,myWindow.w,myWindow.h);
    if(myWindow.id=="goal")
    {
      windowContext.font='Bolder 15px Arial';
      windowContext.textAlign='center';
      windowContext.textBaseline='middle';
      windowContext.fillStyle='rgb(100,150,250)';
      windowContext.fillText("目标：打倒胡汉三，夺回村庄",myWindow.x+myWindow.w/2.0,myWindow.y+myWindow.h/2.0);
    }
    else if(myWindow.id=="add")
    {
      var add=getTerrian(cursor.x,cursor.y);
      windowContext.fillStyle="rgba(100,150,250,0.7)";
      windowContext.fillRect(myWindow.x,myWindow.y,myWindow.w,myWindow.h/2.0);
      windowContext.font='Bolder 20px Arial';
      windowContext.textAlign='center';
      windowContext.textBaseline='middle';
      windowContext.fillStyle='rgb(50,50,50)';
      windowContext.fillText(add.name,myWindow.x+myWindow.w/2.0,myWindow.y+myWindow.h/4.0);
      windowContext.font='Bolder 10px Arial';
      windowContext.fillStyle='rgb(250,250,250)';
      windowContext.fillText("DEF:"+add.addDef,myWindow.x+myWindow.w*0.5,myWindow.y+myWindow.h*5/8.0);
      windowContext.fillText("SPE:"+add.addSpe,myWindow.x+myWindow.w*0.5,myWindow.y+myWindow.h*7/8.0);
    }
    else if(myWindow.id=="character")
    {
      windowContext.font='Bolder 20px Arial';
      windowContext.textAlign='center';
      windowContext.textBaseline='middle';
      windowContext.fillStyle='rgb(50,50,50)';
      var theHero;
      //判断当前角色是敌是友
      if(heroMatrix[cursor.x+cursor.y*15]!=0)
        theHero=heroList[heroMatrix[cursor.x+cursor.y*15]];
      else
        theHero=enemyList[enemyMatrix[cursor.x+cursor.y*15]]
      
      var hpPercentage=theHero.hp/theHero.max_hp;
      windowContext.drawImage(theHero.head,myWindow.x,myWindow.y+1,70,70);
      windowContext.fillText(theHero.name,myWindow.x+myWindow.w*2.0/3.0,myWindow.y+myWindow.h/4.0);
      windowContext.font='Bolder 15px Arial';
      //console.log(theHero.hp);
      windowContext.fillText("HP:"+theHero.hp+"/"+theHero.max_hp,myWindow.x+myWindow.w*2.0/3.0,myWindow.y+myWindow.h*5.0/8.0);
      windowContext.fillStyle='rgb(150,100,50)';
      windowContext.fillRect(myWindow.x+myWindow.w/3.0+7,myWindow.y+myWindow.h*3.0/4.0+3,myWindow.w*1.8/3.0,5);
      windowContext.fillStyle='rgb(150,100,150)';
      windowContext.fillRect(myWindow.x+myWindow.w/3.0+7,myWindow.y+myWindow.h*3.0/4.0+3,myWindow.w*1.8/3*hpPercentage,5);
    }
    else if(myWindow.id=="act")
    {
      var now=0; //正在显示第now种行为
      windowContext.textAlign='center';
      windowContext.textBaseline='middle';
      if(now==actSelect)
      { //如果第now种行为被选中，则将其字体大小设为35，颜色设为黄色
        windowContext.font='Bolder 35px Arial';
        windowContext.fillStyle='rgb(250,250,100)';
      
      }
      else
      { //第now种行为没有被选中，则大小为30，颜色为白色
        windowContext.font='Bolder 30px Arial';
        windowContext.fillStyle='rgb(250,250,250)';
      }
      windowContext.fillText("物品",myWindow.x+myWindow.w/2.0,myWindow.y+myWindow.h/6.0);
      now++;

      if(now==actSelect)
      {
        windowContext.font='Bolder 35px Arial';
        windowContext.fillStyle='rgb(250,250,100)';
      
      }
      else
      {
        windowContext.font='Bolder 30px Arial';
        windowContext.fillStyle='rgb(250,250,250)';
      }
      windowContext.fillText("待机",myWindow.x+myWindow.w/2.0,myWindow.y+myWindow.h*3.0/6.0);
      now++;

      
      if(now==actSelect){ windowContext.font='Bolder 35px Arial'; }
      else{ windowContext.font='Bolder 30px Arial'; }
      //战斗选项初始为黑色
      windowContext.fillStyle='rgb(150,150,150)';
      var nowCordinate=cursor;
      var i,numOfEnemy=0;
      fightList.splice(0,fightList.length);
      //console.log(fightList);
      for(i=0;i<4;i++)
      { //判断英雄四周是否有敌人，如果有，点亮战斗选项，并且将敌人添加进fightLisyt
        var enemyId=enemyMatrix[nowCordinate.x+movx[i]+(nowCordinate.y+movy[i])*15];
        //console.log(enemyId);
        if(enemyId!=0&&enemyId!=undefined)
        {
          if(now==actSelect)
          {
            windowContext.font='Bolder 35px Arial';
            windowContext.fillStyle='rgb(250,250,100)';
          }
          else
          {
            windowContext.font='Bolder 30px Arial';
            windowContext.fillStyle='rgb(250,250,250)';
          }
          fightList[numOfEnemy]=enemyId;
          //console.log(fightList[numOfEnemy]);
          numOfEnemy++;
        }
      }
      windowContext.fillText("战斗",myWindow.x+myWindow.w/2.0,myWindow.y+myWindow.h*5.0/6.0);
    }
    else if(myWindow.id=="bag")
    {//画单个背包栏浮窗
      //console.log("bag")
    }
    else if(myWindow.id=="weapen")
    {
      //console.log("weapen");
    }
    else if(myWindow.id=="fight")
    {
      windowContext.textAlign='center';
      windowContext.textBaseline='middle';
      windowContext.font='Bolder 30px Arial';
      windowContext.fillStyle='rgb(0,0,0)';
      windowContext.fillText("选择你的对手",myWindow.x+myWindow.w/2.0,myWindow.y+myWindow.h/2.0);
    }
    windowContext.restore(); 
  },
  /**
   * 
   * @param {*} cells  背包数组
   * @param {*} location 被选中的位置
   */
  showBag:function(cells,location)
  {
    var length=cells.length;
    var i;
    for(i=0;i<length;i++)
    {
      if(cells[i]==null)
        continue; 
      var bagColor;
      if(i!=location)
        bagColor="rgba(100,100,200,0.8)";
      else
        bagColor="rgba(250,250,100,0.8)";
      var bagLine=new FWin(this.bagCord.x,this.bagCord.y+i*this.bagSize.h,this.bagSize.w,this.bagSize.h,bagColor,"bag");
      //console.log(bagLine);
      this.placeWin(bagLine,false);
      if(cells[i].head!==null)
      {
        windowContext.drawImage(cells[i].head,bagLine.x+1,bagLine.y+1,bagLine.h-1,bagLine.h-1);  
      }
      if(cells[i].name!==null)
      {
        windowContext.save()
        windowContext.textAlign='center';
        windowContext.textBaseline='middle';
        windowContext.font='Bolder 20px Arial';
        windowContext.fillStyle='rgb(0,0,0)';
        windowContext.fillText(cells[i].name,bagLine.x+bagLine.w/2.0,bagLine.y+bagLine.h/2.0);
        windowContext.restore();
      }
      if(cells[i].lastTime>=0)
      {
        windowContext.save()
        windowContext.textAlign='center';
        windowContext.textBaseline='middle';
        windowContext.font='Bolder 15px Arial';
        windowContext.fillStyle='rgb(0,0,0)';
        windowContext.fillText(cells[i].lastTime+"/"+cells[i].maxTime,bagLine.x+bagLine.w-girdSize/2.0,bagLine.y+bagLine.h/2.0);
        windowContext.restore();

      }
      //console.log(cells[i]);
    }
  },
  /**
   * 
   * @param {*} weapen 被选中的物品
   * @param {*} location 被选中的操作
   */
  showWeapen:function(weapen,location)
  {
    var selectArray=["装备","丢弃"];
    if(weapen.isMedcine)
      selectArray[0]="使用";
    var i;
    for(i=0;i<2;i++)
    {
      var selectColor;
      if(i!=location)
        selectColor="rgba(100,100,200,0.8)";
      else
        selectColor="rgba(250,250,100,0.8)";
      var selectLine=new FWin(this.weapenCord.x,this.weapenCord.y+this.weapenSize.h*i,this.weapenSize.w,this.weapenSize.h
        ,selectColor,"weapen");
      this.placeWin(selectLine,false);
      windowContext.save()
      windowContext.textAlign='center';
      windowContext.textBaseline='middle';
      windowContext.font='Bolder 20px Arial';
      windowContext.fillStyle='rgb(0,0,0)';
      windowContext.fillText(selectArray[i],selectLine.x+selectLine.w/2.0,selectLine.y+selectLine.h/2.0);
      windowContext.restore();
    }
  },
  changeWin:function(myWindow)
  {
    var i;
    for(i=0;i<4;i++)
    {
      if(this.canUse[i]==true)
      {
        break;
      }
    }
    this.canUse[i]=false;
    if(i==0)
    {
      myWindow.x=this.cord1.x;
      myWindow.y=this.cord1.y;
    }
    else if(i==1)
    {
      myWindow.x=this.cord2.x;
      myWindow.y=this.cord2.y;
    }
    else if(i==2)
    {
      myWindow.x=this.cord3.x;
      myWindow.y=this.cord3.y;
    }
    else if(i==3)
    {
      myWindow.x=this.cord4.x;
      myWindow.y=this.cord4.y;
    }
    //console.log(myWindow.x,myWindow.y,i);
  },
  updateWin:function(cursor)
  {
    windowContext.clearRect(0,0,windowCanvas.clientWidth,windowCanvas.height);
    if(heroMatrix[cursor.x+cursor.y*15]>0||enemyMatrix[cursor.x+cursor.y*15]>0)
      this.placeWin(this.charactWin,false);
    else
      this.placeWin(this.charactWin,true);
    this.placeWin(this.goalWin,false);
    this.placeWin(this.addWin,false);
  },
  showActWin:function()
  {
    windowContext.clearRect(0,0,windowCanvas.clientWidth,windowCanvas.height);
      this.placeWin(this.activeWin,false);
      return; 
  },
  /**
   * 
   * @param {*} cells 战斗列表，一个存放了附近敌人信息的数组 
   * @param {*} location 战斗列表中被选中的敌人位置
   */
  showFightWin:function(cells,location)
  {
    //windowContext.clearRect()
    this.placeWin(this.fightWin,false);
    var length=cells.length;
    var i;
    for(i=0;i<length;i++)
    {
      if(cells[i]==null)
        continue; 
      var eId=cells[i];
      var bagColor;
      if(i!=location)
        bagColor="rgba(100,100,200,0.8)";
      else
        bagColor="rgba(250,250,100,0.8)";
      var enemyLine=new FWin(this.enemyCord.x,this.enemyCord.y+i*this.enemySize.h,this.enemySize.w,this.enemySize.h
        ,bagColor,"bag");
      //console.log(bagLine);
      this.placeWin(enemyLine,false);
      if(enemyList[eId].head!==null)
      {
        windowContext.drawImage(enemyList[eId].head,enemyLine.x+1,enemyLine.y+1,enemyLine.h-1,enemyLine.h-1);  
      }
      if(enemyList[eId].name!==null)
      {
        windowContext.save()
        windowContext.textAlign='center';
        windowContext.textBaseline='middle';
        windowContext.font='Bolder 20px Arial';
        windowContext.fillStyle='rgb(0,0,0)';
        windowContext.fillText(enemyList[eId].name,enemyLine.x+enemyLine.w/2.0,enemyLine.y+enemyLine.h/2.0);
        windowContext.restore();
      }
      if(enemyList[eId].hp>=0)
      {
        windowContext.save()
        windowContext.textAlign='center';
        windowContext.textBaseline='middle';
        windowContext.font='Bolder 15px Arial';
        windowContext.fillStyle='rgb(0,0,0)';
        windowContext.fillText("HP:"+enemyList[eId].hp+"/"+enemyList[eId].max_hp,enemyLine.x+enemyLine.w-girdSize*2.0/3.0,enemyLine.y+enemyLine.h/2.0);
        windowContext.restore();
      }
      else {
          windowContext.save()
          windowContext.textAlign='center';
          windowContext.textBaseline='middle';
          windowContext.font='Bolder 15px Arial';
          windowContext.fillStyle='rgb(0,0,0)';
          windowContext.fillText("已阵亡",enemyLine.x+enemyLine.w-girdSize*2.0/3.0,enemyLine.y+enemyLine.h/2.0);
          windowContext.restore();
      }
      //console.log(cells[i]);
    }
  }
};
