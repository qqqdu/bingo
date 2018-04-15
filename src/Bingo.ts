/* 
**/
class Bingo extends egret.Sprite{
    public width:number = GameBody.childW;
    public height:number = GameBody.childH;
    private image:egret.Bitmap = new egret.Bitmap();
    public type
    public parent
    public colors = [0x1ca5fc,0x295c9d,0x990000,0x7f0000]
    private choosed
    private borderShape:egret.Shape
    public img
    public constructor(x,y,type,parent){
        super();
        this.x = x*(this.width);
        this.y = y*(this.height);
        this.parent = parent
        this.type = type;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawDoors,this);
        
    }
    private drawDoors(){
        this.addRect();
        this.addImage();
        //this.addText();
        //this.addBlackHole();
    }
    private addRect(){
        this.img = this.createBitmapByName("rect_png");
        this.img.width = this.width;
        this.img.height = this.height;
        this.addChild(this.img);
    }
    private addImage(){
        this.img = this.createBitmapByName((this.type+1)+"_png");
        this.img.width = this.width;
        this.img.height = this.height;
        this.addChild(this.img);
    }
    private addBlackHole(fn) {
        this.removeChild(this.img)
        let sky = this.createBitmapByName("blackhole_png");
        sky.width = this.width;
        sky.height = this.height;
        sky.anchorOffsetX = this.width/2
        sky.anchorOffsetY = this.width/2
        sky.x = sky.width/2;
        sky.y = sky.width/2;
        var funcChange = ():void=>{
            sky.rotation += 6 * iDirection;
            if(sky.scaleX>0.1)
            {
                sky.scaleX -= 0.01;
                sky.scaleY -= 0.01;
            }
        }
        var iDirection:number = 1;  
        //egret.Tween.get( sky ).to( {width:0,height:0}, 600, egret.Ease.sineIn )
        
        this.addChild(sky);
        egret.Tween.get( sky, { onChange:funcChange, onChangeObj:sky } )
            .to( {}, 1000, egret.Ease.sineIn ).call(fn);
    }
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    private addText() {
        var text:egret.TextField = new egret.TextField();
        // text.text = this.type;
        text.x = this.width/2 - text.textWidth/2;
        text.y = this.height/2 -text.textHeight/2;
        this.addChild(text);        
    }
    public killSelf() {
        return new Promise((resolve)=>{
            this.addBlackHole(()=>{
                this.$parent.removeChild(this);
                resolve();            
            })
        })
    }
    // 交换位置
    public moveToDirection(direction) {

        let that = this;
        
        return new Promise((resolve)=>{
            let fn = () => {
                that.removeChoosed();
                resolve(true);
            }
            switch(direction) {
                case 1:
                    egret.Tween.get( this ).to( {x:this.x,y:this.y-this.height}, 600, egret.Ease.sineIn ).call(fn);
                    break;
                case 2:
                    egret.Tween.get( this ).to( {x:this.x+this.width,y:this.y}, 600, egret.Ease.sineIn ).call(fn);
                    break;
                case 3:
                    egret.Tween.get( this ).to( {x:this.x,y:this.y+this.height}, 600, egret.Ease.sineIn ).call(fn);
                    break;
                default:
                    egret.Tween.get( this ).to( {x:this.x-this.width,y:this.y}, 600, egret.Ease.sineIn ).call(fn);
                    break;
            }
        });
        

    }

    public moveToBottom(j) {
        /*** 本示例关键代码段开始 ***/
        let distance = j * (this.height)
        egret.Tween.get( this )
            .to( {x:this.x,y:distance}, 600, egret.Ease.sineIn );
    }
    public chooseBingo() {
        if( this.choosed ) {
            this.removeChoosed();
            return;
        }
        this.borderShape = new egret.Shape()
        this.borderShape.graphics.lineStyle(2, 0xffffff);
        this.borderShape.graphics.drawRect(0, 0, this.width,this.height);
        this.borderShape.graphics.endFill();
        this.addChild(this.borderShape);
        this.choosed = true;
    }
    public removeChoosed() {
        if( !this.choosed )
            return;
        this.removeChild(this.borderShape)
        this.choosed = false;
    }
}