/* 
**/
class GameBody extends egret.Sprite{
    public width:number;
    public height:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private bingos = [];
    private row = 2;
    private col = 10;
    private clears = [];
    // 事件锁，需控制的事件完成后才能继续进行
    private lock;
    static childW:number = 90;
    static childH:number = 90;
    private a;
    // 交换栈
    private stackArr = [];
    public constructor(width,height){
        super();
        this.x = 0;
        this.y = 200;
        this.width = width;
        this.height = height-this.y;
        this.row = Math.floor(this.width / GameBody.childW)
        this.col = Math.floor(this.height/ GameBody.childH)
        this.x = (this.width - this.row*GameBody.childH) / 2
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawDoors,this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
    }
    /* 事件捕捉 */
    private mouseDown(ev) {
        let x =  Math.floor(ev.stageX/GameBody.childW);
        let y = Math.floor((ev.stageY-this.y)/GameBody.childH);
        if(this.lock)
            return;
        if(this.exitObj(this.bingos,x,y)){
           this.bingos[x][y].chooseBingo();
           // 栈里面已经有bingo了
           if(this.stackArr[0] && this.stackArr[0]!==this.bingos[x][y]) {
               if(this.checkChange(this.stackArr[0],this.bingos[x][y])) {
                   this.stackArr[0].chooseBingo();
                   this.bingos[x][y].chooseBingo();
                   this.stackArr.length = 0;
                   this.lock = true;
                   setTimeout(()=>{
                       this.lock = false;
                   },630)
               } else {
                   this.stackArr[0].removeChoosed();
                   this.stackArr.length = 0;
                   this.stackArr.push(this.bingos[x][y])
               }
           } else if(this.stackArr[0] && this.stackArr[0]===this.bingos[x][y]) {
               this.stackArr.length = 0;
           } else {
               this.stackArr.push(this.bingos[x][y])
           }
        }
    }
    // 判断是否可以交换
    private checkChange(object_1,object_2) {
        let coord_1 = this.getObjSet(object_1);
        let coord_2 = this.getObjSet(object_2);
        let x = Math.abs(coord_1.x - coord_2.x) 
        let y = Math.abs(coord_1.y - coord_2.y)         
        // 两个在同一横线上
        if( x ===1 && y === 0 ) {
            // 一在二的右边
            if(coord_1.x - coord_2.x > 0) {
                object_1.moveToDirection(4)
                object_2.moveToDirection(2)
                this.changeObj(object_1,object_2)
                return true;
            // 一在二的左边
            } else {
                object_1.moveToDirection(2)
                object_2.moveToDirection(4)
                this.changeObj(object_1,object_2)
                return true;
            }
        }
        // 两个在同一竖线上
        if( y===1 && x ===0 ) {
            // 一在二的下边
            if(coord_1.y - coord_2.y > 0) {
                object_1.moveToDirection(1)
                object_2.moveToDirection(3)
                this.changeObj(object_1,object_2)
                return true;
            // 一在二的上边
            } else {
                object_1.moveToDirection(3)
                object_2.moveToDirection(1)
                this.changeObj(object_1,object_2)
                return true;
            }
        }
        console.log("不可以交换")
        return false;
    }
    // 交换两个对象 direction是方向 1 2 3 4对应上右下左
    private changeObj(object_1,object_2) {
        let coord_1 = this.getObjSet(object_1);
        let coord_2 = this.getObjSet(object_2);
        let obj = this.bingos[coord_1.x][coord_1.y];
        this.bingos[coord_1.x][coord_1.y] = this.bingos[coord_2.x][coord_2.y] 
        this.bingos[coord_2.x][coord_2.y] = obj;
        setTimeout(()=>{
             this.checkFun();            
        },1000)
    }
   
    private drawDoors(){
       // this.addImage();
        this.drawBingo();
        this.$parent.stage.$stageWidth
    }
    private addImage(){
        var shape:egret.Shape = new egret.Shape;
        shape.graphics.beginFill(0x000000,.5)
        shape.graphics.lineStyle(1,0x000000) 
        shape.graphics.drawRect(0, 0, this.width-this.x,this.height);
        shape.graphics.endFill();
        this.addChild(shape);
    }
    private drawBingo() {
        for(let i = 0;i<this.row;i++) {
            let arrs = [];
            for(let j = 0;j<this.col;j++) {
                let ran = this.ran(0,5)
                let bingo:Bingo = new Bingo(i,j,ran,{i, j});
                this.addChild(bingo);
                arrs.push(bingo);
            }
            this.bingos.push(arrs);
        }
        this.checkFun();
    }
    private checkFun() {
        this.checkBingos();
        if(this.clears.length ===0)
                return;
        this.clearAll();
        this.updataGame();
    }
    private ran(end:number, start:number) {
		return Math.floor(Math.random()*(end-start)+start)
    }
    /* 检测是否能消除 */
    private checkBingos() {
        let that = this;
        this.bingos.forEach((val, x)=>{
            let onoff = false
            val.forEach((vals, y)=>{
                that.checkAround({x,y},false)
            })
        })
    }
    /* 检测周围有没有相同色号,第二个参数限定反向 1,2,3,4 t r b l */
    private checkAround(coord,direction) {
        let {
            x,y
        } = coord
        let obj = this.bingos[x][y]
        let type = obj.type;
        if(!direction) {
            /* 检测四个方向 */
            if(this.exitObj(this.bingos,x,y-1) &&this.bingos[x][y-1].type===type) {
                if(this.checkAround({x,y:y-1},1)){
                    this.saveClears(x+`,`+y)
                    this.saveClears(x+`,`+(y-1))
                }
            }
            if(this.exitObj(this.bingos,x+1,y) &&this.bingos[x+1][y].type===type) {
                if(this.checkAround({x:x+1,y},2)){
                    this.saveClears(x+`,`+y)
                    this.saveClears((x+1)+`,`+y)
                }
            }
            if(this.exitObj(this.bingos,x,y+1) &&this.bingos[x][y+1].type===type) {
                if(this.checkAround({x,y:y+1},3)){
                    this.saveClears(x+`,`+y)
                    this.saveClears(x+`,`+(y+1))
                }
            }
            if(this.exitObj(this.bingos,x-1,y) &&this.bingos[x-1][y].type===type) {
                if(this.checkAround({x:x-1,y},4)){
                    this.saveClears(x+`,`+y)
                    this.saveClears((x-1)+`,`+y)
                }
            }
            return;
        }
        switch(direction) {
            case 1:
                if(this.exitObj(this.bingos,x,y-1) && type===this.bingos[x][y-1].type){
                    this.saveClears(x+`,`+(y-1))
                    return true;
                }
                break;
            case 2:
                if(this.exitObj(this.bingos,x+1,y) && type===this.bingos[x+1][y].type){
                    this.saveClears((x+1)+`,`+y)
                    return true;
                }
                break;
            case 3:
                if(this.exitObj(this.bingos,x,y+1) && type===this.bingos[x][y+1].type){
                    this.saveClears(x+`,`+(y+1))
                    return true;
                }
                break;
            case 4:
                if(this.exitObj(this.bingos,x-1,y) && type===this.bingos[x-1][y].type){
                    this.saveClears((x-1)+`,`+y)
                    return true;
                }
                break;
            default:
                return false;
         }
    }
    /* 判断对象是否存在 */
    private exitObj(obj,x,y) {
        if(x<0 || y<0 || x>this.row || y>this.col || !obj[x] || !obj[x][y]  ){
            return false
        }
        return true;
    }
    /* 清除栈 */
    private saveClears(string) {
        for(let i = 0;i<this.clears.length;i++) {
            if(this.clears[i] === string)
               return;
        }
        this.clears.push(string);
    }
    /* 清除函数 */
    private clearAll() {
        this.clears.map((val)=>{
            let i = +val.split(",")[0]
            let j = +val.split(",")[1]
            if(this.bingos[i] && this.bingos[i][j]) {
                this.bingos[i][j].killSelf();
                delete this.bingos[i][j];
            }  
        })
        this.clears.length = 0;
    }
    /* 更新函数 */
    private updataGame() {
        for(let i = 0;i<this.bingos.length;i++) {
			let now = this.bingos[i]
            for(let j = this.col-1;j>0;j--) {
				// 当前没有方块，去上级拿
				if( !now[j] ) {
                    let topBingo = this.getMyTop(i,j-1) 
					if(topBingo){
                        topBingo.moveToBottom(j);
                        this.deleteBingos(topBingo)
                        this.bingos[i][j]  = topBingo;
					}
					else{
                        // let ran = this.ran(0,5)
                        // let bingo:Bingo = new Bingo(i-1,j,ran,{i, j});
                        // this.addChild(bingo);
						// now[j] = bingo                       
                    }
                // 当前有方块，记录下坐标
				} else {
                    
                }
			}
		}

        setTimeout(()=>{
            this.checkFun();
        },1000)
    }

    /* 得到上级方块 */
    private getMyTop(i,j) {

        if(this.bingos[i][j]) {
            return this.bingos[i][j]  
        }
        if(j<0)
            return false
        return this.getMyTop(i,j-1)
    }
    /* 删除bingos里面的对象 */
    private deleteBingos(obj) {
        this.bingos.map((val, index)=>{
            val.map((val2, index2)=>{
                if(val2 === obj){
                    delete this.bingos[index][index2]
                 }
            })
        })
    }

     // 得到对象当前在二维数组的位置
    private getObjSet(obj) {
        let x,y;
        this.bingos.map((val, index)=>{
            val.map((val2, index2)=>{
                if(val2 === obj){
                    x = index;
                    y = index2;
                 }
            })
        })
        return {
            x,y
        }
    }
}