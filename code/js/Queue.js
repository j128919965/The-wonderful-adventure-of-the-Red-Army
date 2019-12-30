
//队列结构
function Queue(length)
{
    this.max_length=length;
    this.front=0;
    this.end=0;
    this.now_length=0;
    this.node=[];
}
Queue.prototype={
    push:function(cordinate)
    {
        //console.log(cordinate);
        if( (this.end+1)%this.max_length==this.front )
        {
            console.log("error: queue overflow");
            return;
        }
        this.node[this.end]=cordinate;
        this.now_length++;
        this.end=(this.end+1)%this.max_length;
    },
    push_front:function(cordinate)
    {
        if( (this.front-1+this.max_length)%this.max_length==this.end )
        {
            console.log("error: queue overflow");
            return;
        }
        this.front=(this.front-1+this.max_length)%this.max_length;
        this.now_length++;
        this.node[this.front]=cordinate;
    },
    pop:function()
    {
        this.front=(this.front+1)%this.max_length;
        this.now_length--;
    },
    pop_back:function()
    {
        //console.log(this.node[(this.end-1+this.max_length)%this.max_length])
        this.end=(this.end-1+this.max_length)%this.max_length;
        //console.log(this.end)
        this.now_length--;
    },
    getFront:function()
    {
        return this.node[this.front];
    },
    getBack:function()
    {
        return this.node[(this.end-1+this.max_length)%this.max_length];
    },
    isEmpty:function()
    {
        return this.front==this.end?true:false;
    },
    clear:function()
    {
        this.front=0;
        this.end=0;
        this.now_length=0;
    },
    travel:function()
    {
        var i;
        console.log(this.end);
        for(i=this.front;i!=this.end;i=(i+1)%this.max_length)
        {
            console.log(this.node[i]);
        }
    },
    get:function(i)
    {
        if(i<this.now_length)
            return this.node[(this.front+i)%this.max_length];
        else
            console.log("Queue Overflow!");
    }
}
function check(cordinate)
{
    var x=cordinate.x,y=cordinate.y;
    if(x<0||x>=mapWidth||y<0||y>=mapHeight){ return false; }
    else if(getTerrian(x,y).canMove==0){ return false; }
    //else if(enemyMatrix[x+y*15]!=0){ return false; }
    return true;
}



