/**
 * character.js
 * @author sby
 * 人物层绘制
 */

function drawCharacter(addr,pic)
{
    heroContext.save();
    if(pic.complete){
      heroContext.drawImage(pic,addr.x*girdSize+4,addr.y*girdSize+4,girdSize-7,girdSize-7);
    }
    else{
      pic.onload = function (ev) {
        heroContext.drawImage(pic,addr.x*girdSize+4,addr.y*girdSize+4,girdSize-7,girdSize-7);
      }
    }
}

function clearCharacter(addr) {
  heroContext.clearRect(addr.x*girdSize,addr.y*girdSize,girdSize,girdSize);
}

/**
 * 人物移动动画
 * 同步动画方式
 * Hero对象的方法
 */
Hero.prototype.picMove=async function(){
  var temp = 0;
  while(1){
    if(temp>=this.path.now_length-1) break;
    var vx = this.path.get(temp+1).x-this.path.get(temp).x,vy = this.path.get(temp+1).y-this.path.get(temp).y;
    vx = vx*girdSize/10;
    vy = vy*girdSize/10;
    for(var i = 1;i<=10;i++){
      clearCharacter(this.path.get(temp));
      clearCharacter(this.path.get(temp+1));
      heroContext.drawImage(this.staticPic,this.path.get(temp).x*girdSize+vx*i,this.path.get(temp).y*girdSize+vy*i,girdSize-7,girdSize-7);
      await sleep(20);
    }
    temp++;
  }
  return new Promise(resolve => setTimeout(resolve, 0));
};

/**
 * 精灵表绘制函数
 * @param hero 绘制的英雄
 */
function drawSprite(hero) {
  clearCharacter(hero.addr);
  //console.log(hero.addr.x*girdSize+" "+hero.addr.y*girdSize);
  if(hero.spritePic.complete){
    heroContext.drawImage(hero.spritePic,
        hero.cell[cellIndex].x,hero.cell[cellIndex].y,
        hero.cell[cellIndex].w,hero.cell[cellIndex].h,
        hero.addr.x*girdSize,hero.addr.y*girdSize,
        girdSize,girdSize);
  }
  else {
    hero.spritePic.onload = function (ev) {
      heroContext.drawImage(hero.spritePic,
          hero.cell[cellIndex].x,hero.cell[cellIndex].y,
          hero.cell[cellIndex].w,hero.cell[cellIndex].h,
          hero.addr.x*girdSize,hero.addr.y*girdSize);
    }
  }
}