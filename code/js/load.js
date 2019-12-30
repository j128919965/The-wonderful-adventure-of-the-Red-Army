/**
 * load.js
 * @author csy
 * 载入所需全局变量
 */

var //背景层
    canvas = document.getElementById('mycanvas'),
    context = canvas.getContext('2d');
var //移动范围层
    moveCanvas = document.getElementById('canvasOfMove'),
    moveContext = moveCanvas.getContext('2d');
var //路径指示层
    pathCanvas = document.getElementById('canvasOfPath'),
    pathContext = pathCanvas.getContext('2d');
var//人物层
    heroCanvas = document.getElementById('canvasOfHero'),
    heroContext = heroCanvas.getContext('2d');
var //弹窗层
    windowCanvas = document.getElementById('canvasOfWindow'),
    windowContext = windowCanvas.getContext('2d');
var
    cursorCanvas = document.getElementById('canvasOfCursor'),
    cursorContext = cursorCanvas.getContext('2d');
var
    HICanvas = document.getElementById("canvasOfHeroInformation"),
    HIContext = HICanvas.getContext("2d");
var
    animeCanvas = document.getElementById("canvasOfOpenAnime"),
    animeContext = animeCanvas.getContext("2d");
var finalCanvas = document.getElementById("finalCVS"),
    finalContext = finalCanvas.getContext("2d");
closeCTX(finalContext);

var actSelect = 0, //行为选项
    mapWidth = 15, //地图长
    mapHeight = 10, //地图宽
    girdSize = canvas.width / mapWidth, //单元格长宽
    movx = [-1, 0, 1, 0], //横向移动方向
    movy = [0, -1, 0, 1],  //纵向移动方向
    heroMatrix =
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //人物矩阵

    mapMatrix =
        [0, 9, 9, 9, 5, 0, 0, 0, 5, 6, 6, 6, 5, 0, 5,
            0, 9, 9, 9, 5, 0, 0, 0, 1, 5, 6, 6, 6, 5, 5,
            0, 9, 7, 9, 0, 5, 0, 2, 0, 0, 5, 6, 6, 6, 6,
            0, 0, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 6, 6, 5,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 3, 0, 5, 5, 0,
            5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0,
            5, 0, 0, 0, 0, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0], //地形矩阵

    enemyMatrix =
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    pathMatrix =
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    sence = 0
;
var
    heroList = [], //友军列表
    enemyList = [],//敌人列表
    fightList = [] //战斗列表
;
var openstr = '1934年秋，红军主力被迫撤离中央根据地。红军战士潘行义随部队离开柳溪镇。'+
    '临行前，他给儿子潘冬子留下了一颗闪闪的红星。\n' +
    '不久后恶霸胡汉三趁虚而入，柳溪镇陷入了一片白色恐怖之中。\n' +
    '在当地领导游击队和革命群众进行斗争的红军干部吴修竹，向他们传达了遵义会议的精神，带领着乡亲们和恶霸斗智斗勇，' +
    '这增强了潘冬子坚持斗争的勇气和力量。\n' +
    '在闪闪的红星照耀下，潘冬子积极参加对敌斗争，变得更加坚强。' +
    '他和红军将领吴修竹一起在战斗，并期待着最终的胜利。';
var talk3= [
    {speaker:1,t:"嗯？"},
    {speaker:2,t:"老爷，是我。给您带好消息来了！"},
    {speaker:1,t:"讲。"},
    {speaker:2,t:"老爷果然料事如神，红军已经连夜离开了柳溪镇，您看咱们是不是..."},
    {speaker:1,t:"哼，是时候敲打敲打那帮不知天高地厚的土鳖了，让下面的人都准备准备，咱们杀回柳溪。"},
    {speaker:2,t:"好的老爷，我这就去。"}
];
var talk2= [
    {speaker:1,t:"什么？你是胡汉三！"},
    {speaker:2,t:"没错！我胡汉三又回来了！"},
    {speaker:1,t:"我们光荣的红军不可能让你继续作威作福！"},
    {speaker:2,t:"？就凭你？"},
    {speaker:1,t:"就凭光荣的红军意志！！"},
    {speaker:2,t:"呵呵，找打！"}
];
var talk4= [
    {speaker:1,t:"快撤！这土匪力气好大！"}
];
var talk5= [
    {speaker:2,t:"呵呵，先放你一条小命。"}
];
var talk1= [
    {speaker:0,t:"负伤的吴修竹躲进了潘冬子家"},
    {speaker:1,t:"吴叔！？，您这是怎么了？"},
    {speaker:2,t:"胡汉三回来了，快去通知乡亲们上山躲起来。"},
    {speaker:1,t:"胡汉三还敢回来？他不是被红军赶走了吗？"},
    {speaker:2,t:"中央开会决定进行战略转移，咱们柳溪的部队昨天夜里得到指示已经离开了，没想到这么快就被胡汉三发现了。"},
    {speaker:1,t:"...这可恶的胡汉三。"},
    {speaker:2,t:"冬子你不要怕，大部队走了还有我们游击队，"},
    {speaker:2,t:"胡汉三被红军大部队赶走后损失惨重，现在手下已经没什么狗腿子了。咱们和他们迂回一阵子是可以找到机会再次打败他的。"},
    {speaker:2,t:"咱们利用对地形熟悉的优势，和他们迂回一阵子，是可以找到机会再次打败他的。"},
    {speaker:1,t:"我明白了吴叔，我们这就行动吧。"},
    {speaker:2,t:"好样的冬子，柳溪就靠咱们了。"},
];
//国旗
const guoqi = new Image();
const cunzi = new Image();
guoqi.src = "./img/guoqi.jpg";
cunzi.src = "./img/cunzhuang.png";
//背景音乐
const audioMain=document.getElementById('audioMain');
const audioFalse = document.getElementById('audioFalse');
const audioEnemy = document.getElementById('audioEnemy');
const audioOpen = document.getElementById('audioOpen');
const audioAttack = document.getElementById('audioAttack');
const audioChoose = document.getElementById('audioChoose');
audioOpen.onended=function(e){ audioOpen.play();}
audioOpen.load();
audioOpen.play();
//当前正在执行的动画对象
var anime = null;
//当前对话的状态
var openTalkState = 1;
//背景图片
var backImg = new Image();
backImg.src = "./img/fe1.png",
    isShowingRange = false,
    heroId = -1;
var cursor;//光标对象
var fwindow = new FWindow();//浮窗界面对象
//当前是否在展示信息界面
var isShowifm = false;
var curHero = null;
var showing_location;
var select_location;
var fight_location;
//当前光标所在的hero
var curhero = null;
//即将攻击的hero
var attackingHero;
cursor = new Cursor({x: 0, y: 0});
var prepAddr = {x: -1, y: -1};
var isEnemyRound = false;
var cellIndex = 0;
var talkIndex = 0;

//回合
var round = 1;

function inilist(list, size) {
    var i;
    for (i = 0; i < size + 1; i++) {
        list[i] = new Hero();
    }
}

$.getJSON("./json/myHero.json", function (data) {
    inilist(heroList, data.length);
    for (i = 1; i <= data.length; i++) {
        heroList[i] = new Hero();
        heroList[i].setHero(data[i - 1]);
        heroList[i].id = i;
        //drawCharacter(heroList[i].addr, heroList[i].staticPic);
        heroMatrix[heroList[i].addr.x + heroList[i].addr.y * 15] = i;
    }
    cursor.moveCursor({x: 14, y: 9});
    cursor.placeCursor();
    fwindow.updateWin(cursor);
});

$.getJSON("./json/theEnemys.json", function (data) {
    inilist(enemyList,data.length);
    for(i=1;i<=data.length;i++){
            enemyList[i] = new Hero();
            enemyList[i].setHero(data[i-1]);
            enemyList[i].id = i;
            //drawCharacter(enemyList[i].addr,enemyList[i].staticPic);
            enemyMatrix[enemyList[i].addr.x+enemyList[i].addr.y*15]=i;
    }
});