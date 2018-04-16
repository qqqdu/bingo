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
    游戏关卡页
**/
var GameTax = (function (_super) {
    __extends(GameTax, _super);
    function GameTax(width, height, parent) {
        var _this = _super.call(this) || this;
        _this.image = new egret.Bitmap();
        _this.x = 0;
        _this.y = 0;
        _this.width = width;
        _this.height = height;
        _this.parents = parent;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addImage, _this);
        return _this;
    }
    GameTax.prototype.addImage = function () {
        this.addBack();
        this.addGroup();
    };
    GameTax.prototype.addGroup = function () {
        var gameGroup = new GameGroup(this.width, this.height, this);
        this.addChild(gameGroup);
    };
    GameTax.prototype.addBack = function () {
        var sky = this.createBitmapByName("back_1_png", 432 * 2, 704 * 2);
        this.addChild(sky);
    };
    GameTax.prototype.createBitmapByName = function (name, width, height) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        if (width)
            result.width = width;
        if (height)
            result.height = height;
        return result;
    };
    return GameTax;
}(egret.Sprite));
__reflect(GameTax.prototype, "GameTax");
//# sourceMappingURL=GameTax.js.map