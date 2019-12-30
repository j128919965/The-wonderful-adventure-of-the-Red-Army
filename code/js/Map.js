/**
 * map.js
 * @author lzr
 * 获取地图信息
 */

function getTerrian(x,y) {
    //平地
    if(mapMatrix[x+y*15]===0){
        return{
            name:"平地",
            addHp:0,
            addDef:0,
            addSpe:0,
            canMove:1
        }
    }
    //树丛
    else if(mapMatrix[x+y*15]===1){
        return{
            name:"丛林",
            addHp:0,
            addDef:1,
            addSpe:2,
            canMove:1
        }
    }
    //要塞
    else if(mapMatrix[x+y*15]===2){
        return{
            name:"土楼",
            addHp:3,
            addDef:2,
            addSpe:2,
            canMove:1
        }
    }
    else if(mapMatrix[x+y*15]===3){
        return{
            name:"民家",
            addHp:0,
            addDef:0,
            addSpe:1,
            canMove:1
        }
    }
    else if(mapMatrix[x+y*15]===4){
        return{
            name:"高山",
            addHp:0,
            addDef:2,
            addSpe:2,
            canMove:0
        }
    }
    //5悬崖
    else if(mapMatrix[x+y*15]===5){
        return{
            name:"悬崖",
            addHp:0,
            addDef:2,
            addSpe:2,
            canMove:0
        }
    }
    //6湖
    else if(mapMatrix[x+y*15]===6){
        return{
            name:"湖",
            addHp:0,
            addDef:2,
            addSpe:1,
            canMove:0
        }
    }
    //7城门
    else if(mapMatrix[x+y*15]===7){
        return{
            name:"胡府大门",
            addHp:3,
            addDef:2,
            addSpe:1,
            canMove:1
        }
    }
    else if(mapMatrix[x+y*15]===9)
    {
        return{
            name:"胡家豪宅",
            addHp:0,
            addDef:0,
            addSpe:0,
            canMove:0
        }
    }
}