var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
**/
var Bingo = (function (_super) {
    __extends(Bingo, _super);
    function Bingo(x, y, type, coord) {
        var _this = _super.call(this) || this;
        _this.width = 48;
        _this.height = 48;
        _this.image = new egret.Bitmap();
        _this.colors = [0x1ca5fc, 0x295c9d, 0x990000, 0x7f0000];
        _this.x = x * (_this.width);
        _this.y = y * (_this.height);
        _this.coord = coord;
        _this.type = type;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawDoors, _this);
        return _this;
    }
    Bingo.prototype.drawDoors = function () {
        this.addImage();
        this.addText();
    };
    Bingo.prototype.addImage = function () {
        var shape = new egret.Shape();
        shape.graphics.beginFill(this.colors[this.type]);
        shape.graphics.drawRect(0, 0, this.width, this.height);
        shape.graphics.endFill();
        this.addChild(shape);
    };
    Bingo.prototype.addText = function () {
        var text = new egret.TextField();
        // text.text = this.type;
        text.text = this.coord.i + '' + this.coord.j;
        text.x = this.width / 2 - text.textWidth / 2;
        text.y = this.height / 2 - text.textHeight / 2;
        this.addChild(text);
    };
    Bingo.prototype.killSelf = function () {
        this.$parent.removeChild(this);
    };
    Bingo.prototype.moveToDirection = function (direction) {
        if (GameBody.lock)
            return;
        GameBody.lock = true;
        switch (direction) {
            case 1:
                egret.Tween.get(this).to({ x: this.x, y: this.y - this.height }, 600, egret.Ease.sineIn);
                break;
            case 2:
                egret.Tween.get(this).to({ x: this.x + this.width, y: this.y }, 600, egret.Ease.sineIn);
                break;
            case 3:
                egret.Tween.get(this).to({ x: this.x, y: this.y + this.height }, 600, egret.Ease.sineIn);
                break;
            default:
                egret.Tween.get(this).to({ x: this.x - this.width, y: this.y }, 600, egret.Ease.sineIn);
                break;
        }
        GameBody.lock = false;
    };
    Bingo.prototype.moveToBottom = function (j) {
        /*** 本示例关键代码段开始 ***/
        var distance = j * (this.height);
        egret.Tween.get(this)
            .to({ x: this.x, y: distance }, 600, egret.Ease.sineIn);
    };
    Bingo.prototype.chooseBingo = function () {
        console.log(this.coord);
        if (this.choosed) {
            this.removeChild(this.borderShape);
            this.choosed = false;
            return;
        }
        this.borderShape = new egret.Shape();
        this.borderShape.graphics.lineStyle(2, 0xffffff);
        this.borderShape.graphics.drawRect(0, 0, this.width, this.height);
        this.borderShape.graphics.endFill();
        this.addChild(this.borderShape);
        this.choosed = true;
    };
    return Bingo;
}(egret.Sprite));
__reflect(Bingo.prototype, "Bingo");
//# sourceMappingURL=Bingo.js.map