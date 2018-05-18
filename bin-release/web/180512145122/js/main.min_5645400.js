var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))(function(o,r){function a(t){try{h(n.next(t))}catch(e){r(e)}}function s(t){try{h(n["throw"](t))}catch(e){r(e)}}function h(t){t.done?o(t.value):new i(function(e){e(t.value)}).then(a,s)}h((n=n.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return n([t,e])}}function n(i){if(o)throw new TypeError("Generator is already executing.");for(;h;)try{if(o=1,r&&(a=r[2&i[0]?"return":i[0]?"throw":"next"])&&!(a=a.call(r,i[1])).done)return a;switch(r=0,a&&(i=[0,a.value]),i[0]){case 0:case 1:a=i;break;case 4:return h.label++,{value:i[1],done:!1};case 5:h.label++,r=i[1],i=[0];continue;case 7:i=h.ops.pop(),h.trys.pop();continue;default:if(a=h.trys,!(a=a.length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){h=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){h.label=i[1];break}if(6===i[0]&&h.label<a[1]){h.label=a[1],a=i;break}if(a&&h.label<a[2]){h.label=a[2],h.ops.push(i);break}a[2]&&h.ops.pop(),h.trys.pop();continue}i=e.call(t,h)}catch(n){i=[6,n],r=0}finally{o=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var o,r,a,s,h={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},GameInf=function(t){function e(e,i){var n=t.call(this)||this;return n.image=new egret.Bitmap,n.myScore=0,n.myStepNow=0,n.backToPage="",n.x=0,n.y=0,n.width=e,n.height=i,n.parents=parent,n.addEventListener(egret.Event.ADDED_TO_STAGE,n.addImage,n),n}return __extends(e,t),e.prototype.addImage=function(){this.addTaxNum(),this.updataScroe(),this.addBack()},e.prototype.addTimer=function(){var t=new Timer;this.addChild(t)},e.prototype.addBack=function(){var t=this,e=this.createBitmapByName("back_png",40,40);e.x=20,e.y=50,e.touchEnabled=!0,e.addEventListener("touchEnd",function(){PageBus.gotoPage(t.backToPage)},this),this.addChild(e)},e.prototype.addTaxNum=function(){this.taxNum=new TaxButton,this.taxNum.skinName="resource/eui_skins/TitleSkin.exml",this.taxNum.label2="第"+GameConfig.taxArr[GameConfig.nowTax]+"宇宙",this.taxNum.label="熵值：0",this.taxNum.x=this.width-this.taxNum.width-50,this.taxNum.y=5,this.addChild(this.taxNum)},e.prototype.updataScroe=function(){this.taxNum.label="熵值："+this.myScore},e.prototype.createBitmapByName=function(t,e,i){var n=new egret.Bitmap,o=RES.getRes(t);return n.texture=o,e&&(n.width=e),i&&(n.height=i),n},e}(egret.Sprite);__reflect(GameInf.prototype,"GameInf");var GameBody=function(t){function e(i,n,o,r){var a=t.call(this)||this;return a.image=new egret.Bitmap,a.bingos=[],a.row=2,a.col=10,a.clears=[],a.lock=!0,a.loack_2=!1,a.clickLock=!1,a.padding=50,a.bingoType=4,a.game=!0,a.stackArr=[],a.newBingos=[],a.maxUncommon=0,a.width=i,a.parents=r,e.childH=e.childW=(a.width-a.padding)/GameConfig.taxConfig[GameConfig.nowTax].row,a.row=GameConfig.taxConfig[GameConfig.nowTax].row,a.col=GameConfig.taxConfig[GameConfig.nowTax].col,a.bingoType=GameConfig.taxConfig[GameConfig.nowTax].bingoType,a.gameInf=o,a.x=a.padding/2,a.height=a.col*e.childH,a.y=200,a.addEventListener(egret.Event.ADDED_TO_STAGE,a.drawDoors,a),a.touchEnabled=!0,a.addEventListener(egret.TouchEvent.TOUCH_BEGIN,a.mouseDown,a),a}return __extends(e,t),e.prototype.initWinnerConfig=function(){GameConfig.taxConfig[GameConfig.nowTax].checkType},e.prototype.mouseDown=function(t){var i=Math.floor((t.stageX-this.x)/e.childW),n=Math.floor((t.stageY-this.y)/e.childH);this.lock||this.loack_2||this.exitObj(this.bingos,i,n)&&(this.bingos[i][n].chooseBingo(),this.stackArr[0]&&this.stackArr[0]!==this.bingos[i][n]?this.checkChange(this.stackArr[0],this.bingos[i][n])?(this.stackArr[0].chooseBingo(),this.bingos[i][n].chooseBingo(),this.stackArr.length=0):(this.stackArr[0].removeChoosed(),this.stackArr.length=0,this.stackArr.push(this.bingos[i][n])):this.stackArr[0]&&this.stackArr[0]===this.bingos[i][n]?this.stackArr.length=0:this.stackArr.push(this.bingos[i][n]))},e.prototype.checkChange=function(t,e){var i=this.getObjSet(t),n=this.getObjSet(e),o=Math.abs(i.x-n.x),r=Math.abs(i.y-n.y);return 1===o&&0===r?i.x-n.x>0?(this.changeObj(t,e,4,2),!0):(this.changeObj(t,e,2,4),!0):1===r&&0===o?i.y-n.y>0?(this.changeObj(t,e,1,3),!0):(this.changeObj(t,e,3,1),!0):!1},e.prototype.changeObj=function(t,e,i,n,o){var r=this;this.loack_2=!0;var a=this.getObjSet(t),s=this.getObjSet(e),h=this.bingos[a.x][a.y];this.bingos[a.x][a.y]=this.bingos[s.x][s.y],this.bingos[s.x][s.y]=h;var c=t.moveToDirection(i),l=e.moveToDirection(n);Promise.all([c,l]).then(function(){return o||r.checkFun()||GameConfig.canChange?(r.loack_2=!1,void r.gameInf.myStepNow++):void r.changeObj(e,t,i,n,!0)})},e.prototype.drawDoors=function(){this.drawBingo(),this.gameInf.updataScroe(),this.addMask()},e.prototype.addBack=function(){var t=new egret.Shape;t.graphics.beginFill(0,.7),t.graphics.lineStyle(1,0),t.graphics.drawRect(0,0,this.width-this.padding,this.col*e.childH),t.graphics.endFill(),this.addChild(t)},e.prototype.addMask=function(){var t=new egret.Shape;t.graphics.beginFill(255),t.graphics.drawRect(this.x,this.y,this.width-this.padding,this.col*e.childH),t.graphics.endFill(),this.$parent.addChild(t),this.mask=t},e.prototype.drawBingo=function(){for(var t=0;t<this.row;t++){for(var e=[],i=0;i<this.col;i++)e.push(null);this.bingos.push(e)}this.updataGame()},e.prototype.addBingo=function(){if(this.bingos[0])for(var t=0;t<this.bingos[0].length;t++)this.bingos[0][t]&&(this.game=!1);for(var e=0;e<this.row;e++){var i=this.ran(),n=new Bingo(e,-1,i,this);this.addChild(n),this.newBingos.push(n)}this.moveToBottom()},e.prototype.moveToBottom=function(){var t,e,i=this;this.newBingos.map(function(n,o){t=o;var r=i.getMyBottom(t,0);e=r?r.j:i.col,e>=1&&n.moveToBottom(e-1),i.bingos[t][e-1]=n}),this.newBingos.length=0,this.checkFun()},e.prototype.checkFun=function(){var t=this;return this.checkBingos(),0===this.clears.length?(this.lock=!1,console.log("监测是否结束"),this.checkGameOver(),!1):(this.lock=!0,this.clearAll(function(){t.updataGame()}),!0)},e.prototype.ran=function(){var t=0,e=this.bingoType;return Math.floor(Math.random()*(t-e)+e)},e.prototype.checkBingos=function(){var t=this;this.bingos.forEach(function(e,i){e.forEach(function(e,n){t.checkAround({x:i,y:n},!1)})})},e.prototype.checkAround=function(t,e){var i=t.x,n=t.y,o=this.bingos[i][n],r=o.type;if(!(r>=100)){if(!e)return this.exitObj(this.bingos,i,n-1)&&this.bingos[i][n-1].type===r&&this.checkAround({x:i,y:n-1},1)&&(this.saveClears(i+","+n),this.saveClears(i+","+(n-1))),this.exitObj(this.bingos,i+1,n)&&this.bingos[i+1][n].type===r&&this.checkAround({x:i+1,y:n},2)&&(this.saveClears(i+","+n),this.saveClears(i+1+","+n)),this.exitObj(this.bingos,i,n+1)&&this.bingos[i][n+1].type===r&&this.checkAround({x:i,y:n+1},3)&&(this.saveClears(i+","+n),this.saveClears(i+","+(n+1))),void(this.exitObj(this.bingos,i-1,n)&&this.bingos[i-1][n].type===r&&this.checkAround({x:i-1,y:n},4)&&(this.saveClears(i+","+n),this.saveClears(i-1+","+n)));switch(e){case 1:if(this.exitObj(this.bingos,i,n-1)&&r===this.bingos[i][n-1].type)return this.saveClears(i+","+(n-1)),!0;break;case 2:if(this.exitObj(this.bingos,i+1,n)&&r===this.bingos[i+1][n].type)return this.saveClears(i+1+","+n),!0;break;case 3:if(this.exitObj(this.bingos,i,n+1)&&r===this.bingos[i][n+1].type)return this.saveClears(i+","+(n+1)),!0;break;case 4:if(this.exitObj(this.bingos,i-1,n)&&r===this.bingos[i-1][n].type)return this.saveClears(i-1+","+n),!0;break;default:return!1}}},e.prototype.exitObj=function(t,e,i){return 0>e||0>i||e>this.row||i>this.col||!t[e]||!t[e][i]?!1:!0},e.prototype.saveClears=function(t){for(var e=0;e<this.clears.length;e++)if(this.clears[e]===t)return;this.clears.push(t)},e.prototype.clearAll=function(t){var e=this,i=[];return 0!==this.clears.length&&platform.playClearMusic(),this.clears.map(function(t){var n=+t.split(",")[0],o=+t.split(",")[1];e.bingos[n]&&e.bingos[n][o]&&(i.push(e.bingos[n][o].killSelf()),e.gameInf.myScore+=50,delete e.bingos[n][o])}),this.clears.length=0,Promise.all(i).then(function(){t(),e.gameInf.updataScroe()})},e.prototype.updataGame=function(){for(var t=this,e=0;e<this.bingos.length;e++){for(var i=this.bingos[e],n=void 0,o=this.col-1;o>=0;o--)if(!i[o]){var r=this.getMyTop(e,o-1);if(!r){isNaN(n)?(n=o,this.createNewBingos(e,o,1)):n===o?this.createNewBingos(e,o,1):this.createNewBingos(e,o,n-o+1);continue}r.moveToBottom(o),this.deleteBingos(r),this.bingos[e][o]=r}n=void 0}setTimeout(function(){t.checkFun()},1e3)},e.prototype.checkGameOver=function(){this.cloneBingos()||(console.log("失败了"),this.parents.gameOver()),this.gameInf.myScore>=GameConfig.taxConfig[GameConfig.nowTax].myScore&&this.parents.passTax()},e.prototype.cloneBingos=function(){for(var t=[],e=this.bingos,i=0;i<e.length;i++){for(var n=[],o=0;o<e[i].length;o++){e[i][o].type;if(this.checkLineExis(i,o))return!0}t.push(n)}return!1},e.prototype.checkLineExis=function(t,e){for(var i=this,n=[[{i:t-2,j:e+1},{i:t-1,j:e+1},{i:t,j:e},{i:t+1,j:e+1},{i:t+2,j:e+1}],[{i:t-2,j:e},{i:t-1,j:e},{i:t,j:e+1},{i:t+1,j:e},{i:t+2,j:e}],[{i:t,j:e-2},{i:t,j:e-1},{i:t,j:e+1}],[{i:t,j:e},{i:t,j:e+2},{i:t,j:e+3}],[{i:t,j:e-2},{i:t,j:e-1},{i:t+1,j:e},{i:t,j:e+1},{i:t,j:e+2}],[{i:t+1,j:e-2},{i:t+1,j:e-1},{i:t,j:e},{i:t+1,j:e+1},{i:t+1,j:e+2}],[{i:t-2,j:e},{i:t-1,j:e},{i:t+1,j:e}],[{i:t,j:e},{i:t+2,j:e},{i:t+3,j:e}]],o=function(t){var e,n=1,o=!1;return t.map(function(t,r){var a=t.i,s=t.j,h=i.exitObj(i.bingos,a,s);0!==r&&(h&&100>e&&e===i.bingos[a][s].type?n++:n=1),e=h?i.bingos[a][s].type:null,n>=3&&(o=!0)}),o},r=0;r<n.length;r++)if(o(n[r]))return!0;return!1},e.prototype.createNewBingos=function(t,e,i){var n=this.ran(),o=GameConfig.taxConfig[GameConfig.nowTax];"uncommon"===o.checkType&&3===n&&this.maxUncommon<o.uncommon&&(n=100,this.maxUncommon++);var r=new Bingo(t,-i,n,this);this.addChild(r),r.moveToBottom(e),this.bingos[t][e]=r},e.prototype.getMyTop=function(t,e){return this.bingos[t][e]?this.bingos[t][e]:0>e?!1:this.getMyTop(t,e-1)},e.prototype.getMyBottom=function(t,e){return this.bingos[t][e]?{i:t,j:e}:e>this.col?!1:this.getMyBottom(t,e+1)},e.prototype.deleteBingos=function(t){var e=this;this.bingos.map(function(i,n){i.map(function(i,o){i===t&&delete e.bingos[n][o]})})},e.prototype.getObjSet=function(t){var e,i;return this.bingos.map(function(n,o){n.map(function(n,r){n===t&&(e=o,i=r)})}),{x:e,y:i}},e.childW=90,e.childH=90,e}(egret.Sprite);__reflect(GameBody.prototype,"GameBody");var PageBus=function(){function t(){}return t.init=function(e){t.contain=e},t.pushPage=function(e){t.pages[e.router]||(t.pages[e.router]=e)},t.gotoPage=function(e){t.nowPage||(t.nowPage=t.pages.index),t.nowPage.page.removeChildren(),t.contain.removeChild(t.nowPage.page),t.contain.addChild(t.pages[e].page),t.nowPage=t.pages[e]},t.pages={},t}();__reflect(PageBus.prototype,"PageBus");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t.prototype.shareAppMessage=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t.prototype.createInnerAudioContext=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t.prototype.playClearMusic=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var Progress=function(t){function e(){var e=t.call(this)||this;return e._label="",e}return __extends(e,t),Object.defineProperty(e.prototype,"label",{get:function(){return this._label},set:function(t){this._label=t,this.labelDisplay&&(this.labelDisplay.text=t)},enumerable:!0,configurable:!0}),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.labelDisplay&&(this.labelDisplay.text=this._label)},e}(eui.Component);__reflect(Progress.prototype,"Progress");var TaxButton=function(t){function e(){var e=t.call(this)||this;return e._label="",e._label2="",e}return __extends(e,t),Object.defineProperty(e.prototype,"label",{get:function(){return this._label},set:function(t){this._label=t,this.labelDisplay&&(this.labelDisplay.text=t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"label2",{get:function(){return this._label2},set:function(t){this._label2=t,this.labelDisplay2&&(this.labelDisplay2.text=t)},enumerable:!0,configurable:!0}),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.labelDisplay&&(this.labelDisplay.text=this._label)},e}(eui.Component);__reflect(TaxButton.prototype,"TaxButton");var TalkButton=function(t){function e(){var e=t.call(this)||this;return e._label="",e}return __extends(e,t),Object.defineProperty(e.prototype,"label",{get:function(){return this._label},set:function(t){this._label=t,this.labelDisplay&&(this.labelDisplay.text=t)},enumerable:!0,configurable:!0}),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.labelDisplay&&(this.labelDisplay.text=this._label)},e}(eui.Component);__reflect(TalkButton.prototype,"TalkButton");var Bingo=function(t){function e(e,i,n,o){var r=t.call(this)||this;return r.width=GameBody.childW,r.height=GameBody.childH,r.image=new egret.Bitmap,r.colors=[1877500,2710685,10027008,8323072],r.x=e*r.width,r.y=i*r.height,r.parents=o,r.type=n,r.addEventListener(egret.Event.ADDED_TO_STAGE,r.drawDoors,r),r}return __extends(e,t),e.prototype.drawDoors=function(){this.addImage()},e.prototype.addRect=function(){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(e){switch(e.label){case 0:return t=this,[4,this.createBitmapByName("rect.png")];case 1:return t.rect=e.sent(),this.rect.width=this.width,this.rect.height=this.height,this.addChild(this.rect),[2]}})})},e.prototype.addImage=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(i){switch(i.label){case 0:return this.type>=100?(t=this,[4,this.createBitmapByName("100.png")]):[3,2];case 1:return t.img=i.sent(),[3,4];case 2:return e=this,[4,this.createBitmapByName(this.type+1+".png")];case 3:e.img=i.sent(),i.label=4;case 4:return this.img.width=this.width,this.img.height=this.height,this.addChild(this.img),[2]}})})},e.prototype.addBlackHole=function(t){return __awaiter(this,void 0,void 0,function(){var e,i,n;return __generator(this,function(o){switch(o.label){case 0:return this.removeChild(this.img),[4,this.createBitmapByName("blackhole.png")];case 1:return e=o.sent(),console.log("设置宽度高度"),e.width=this.width,e.height=this.height,console.log("设置原点"),e.anchorOffsetX=this.width/2,e.anchorOffsetY=this.width/2,console.log("设置x"),e.x=e.width/2,e.y=e.width/2,i=function(){e.rotation+=6*n,e.scaleX>.1&&(e.scaleX-=.01,e.scaleY-=.01)},n=1,this.addChild(e),egret.Tween.get(e,{onChange:i,onChangeObj:e}).to({},1e3,egret.Ease.sineIn).call(t),[2]}})})},e.prototype.createBitmapByName=function(t){return __awaiter(this,void 0,void 0,function(){var e,i;return __generator(this,function(n){return e="https://raw.githubusercontent.com/checkmind/bingo/master/resource/assets/"+t,i=new eui.Image,egret.ImageLoader.crossOrigin="anonymous",i.source=e,[2,i]})})},e.prototype.onAddToStage=function(t){},e.prototype.addText=function(){var t=new egret.TextField;t.x=this.width/2-t.textWidth/2,t.y=this.height/2-t.textHeight/2,this.addChild(t)},e.prototype.killSelf=function(){var t=this;return new Promise(function(e){t.addBlackHole(function(){t.$parent.removeChild(t),e()})})},e.prototype.moveToDirection=function(t){var e=this,i=this;return new Promise(function(n){var o=function(){i.removeChoosed(),n(!0)};switch(t){case 1:egret.Tween.get(e).to({x:e.x,y:e.y-e.height},600,egret.Ease.sineIn).call(o);break;case 2:egret.Tween.get(e).to({x:e.x+e.width,y:e.y},600,egret.Ease.sineIn).call(o);break;case 3:egret.Tween.get(e).to({x:e.x,y:e.y+e.height},600,egret.Ease.sineIn).call(o);break;default:egret.Tween.get(e).to({x:e.x-e.width,y:e.y},600,egret.Ease.sineIn).call(o)}})},e.prototype.moveToBottom=function(t){var e=t*this.height;egret.Tween.get(this).to({x:this.x,y:e},600,egret.Ease.sineIn)},e.prototype.chooseBingo=function(){return this.choosed?void this.removeChoosed():(this.addRect(),void(this.choosed=!0))},e.prototype.removeChoosed=function(){this.choosed&&(this.rect.$parent&&this.removeChild(this.rect),this.choosed=!1)},e}(egret.Sprite);__reflect(Bingo.prototype,"Bingo");var GameGroup=function(t){function e(e,i,n){var o=t.call(this)||this;return o.image=new egret.Bitmap,o.x=0,o.y=0,o.width=e,o.height=i,o.parents=n,o.group=new eui.Group,o.addEventListener(egret.Event.ADDED_TO_STAGE,o.addImage,o),o}return __extends(e,t),e.prototype.addImage=function(){for(var t=0;t<GameConfig.taxArr.length;t++)this.meau(t);this.addScroll()},e.prototype.meau=function(t){var e=new TaxButton;if(e.skinName="resource/eui_skins/toastSkin.exml",e.label2="第"+GameConfig.taxArr[t]+"宇宙",e.label="  "+GameConfig.taxLabel[t],e.width=226,e.height=345,e.x=(e.width+40)*t,e.y=(this.height-e.height)/2,e.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bindClickFn,this),this.group.addChild(e),!(t<=GameConfig.nowTax)){var i=[.3,.6,0,0,0,.3,.6,0,0,0,.3,.6,0,0,0,0,0,0,1,0],n=new egret.ColorMatrixFilter(i);e.filters=[n]}},e.prototype.addScroll=function(){this.myScroller=new eui.Scroller,this.myScroller.width=this.width,this.myScroller.height=this.height,this.myScroller.viewport=this.group,this.addChild(this.myScroller)},e.prototype.bindClickFn=function(t){var e=Math.floor((t.stageX-this.x+this.myScroller.viewport.scrollH)/274),i=Math.floor((t.stageY-this.y)/344);1!=i||e>GameConfig.nowTax||(GameConfig.nowTax=e,PageBus.gotoPage("pageTax"))},e.prototype.createBitmapByName=function(t,e,i){var n=new egret.Bitmap,o=RES.getRes(t);return n.texture=o,e&&(n.width=e),i&&(n.height=i),n},e}(eui.Group);__reflect(GameGroup.prototype,"GameGroup");var Main=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.createChildren=function(){t.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var e=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",e),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(i){switch(i.label){case 0:return[4,this.loadResource()];case 1:i.sent();try{this.createGameScene()}catch(n){console.log(n),console.log("创建场景出错")}return[4,RES.getResAsync("description_json")];case 2:return t=i.sent(),[4,platform.login()];case 3:return i.sent(),[4,platform.getUserInfo()];case 4:return e=i.sent(),platform.createInnerAudioContext(),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e,i;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,4,,5]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return n.sent(),console.log("loading 1"),[4,this.loadTheme()];case 2:return n.sent(),console.log("loading 2"),[4,RES.loadGroup("preload",0,t)];case 3:return e=n.sent(),console.log("loading 3"),this.stage.removeChild(t),console.log("oading 4"),[3,5];case 4:return i=n.sent(),console.error(i),[3,5];case 5:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,i){var n=new eui.Theme("resource/default.thm.json",t.stage);n.addEventListener(eui.UIEvent.COMPLETE,function(){console.log("加载成功"),e()},t)})},e.prototype.createGameScene=function(){var t=this.createBitmapByName("bg_png");this.addChild(t);var e=this.stage.stageWidth,i=this.stage.stageHeight,n=new egret.Shape;n.graphics.beginFill(0,1),n.graphics.lineStyle(1,0),n.graphics.drawRect(0,0,e,i),n.graphics.endFill(),this.addChild(n),t.width=e,t.height=i;var o=new TaxPage(e,i),r=new EntryGame(e,i,this);this.addChild(r);var a=new GameTax(e,i,this);PageBus.init(this),PageBus.pushPage({page:r,router:"index"}),PageBus.pushPage({page:o,router:"pageTax"}),PageBus.pushPage({page:a,router:"gameTax"})},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e},e}(eui.UILayer);__reflect(Main.prototype,"Main");var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.addTaxNum=function(){this.progress=new TaxButton,this.progress.skinName="resource/eui_skins/TitleSkin.exml",this.progress.label2="第"+GameConfig.taxArr[GameConfig.nowTax]+"宇宙",this.progress.label="熵值：0",this.progress.y=5,this.addChild(this.progress)},e.prototype.onProgress=function(t,e){console.log(t,e),this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var TalkContent=function(t){function e(e,i,n){var o=t.call(this)||this;return o.image=new egret.Bitmap,o.nowWords=0,o.x=0,o.y=0,o.width=e,o.height=i,o.parents=n,o.addEventListener(egret.TouchEvent.TOUCH_BEGIN,o.mouseDown,o),o}return __extends(e,t),e.prototype.mouseDown=function(){this.nowWords++;var t=GameConfig.npcTalk[GameConfig.nowTax];this.showWhich(t[this.nowWords])},e.prototype.init=function(){console.log("调用了init"),this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this)},e.prototype.addImage=function(){console.log("调用了初始show"),this.showWhich(GameConfig.npcTalk[GameConfig.nowTax][this.nowWords]),this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addImage,this)},e.prototype.addGameBody=function(){},e.prototype.addBack=function(){var t=new egret.Shape;t.graphics.beginFill(0,.9),t.graphics.lineStyle(1,0),t.graphics.drawRect(0,0,this.width,this.height),t.graphics.endFill(),this.addChild(t)},e.prototype.showWhich=function(t){return console.log("传值是"),console.log(t),t?void(1!==t.type?this.addNpc_2(t.text):this.addNpc_1(t.text)):(this.parents.success(),this.removeChildren(),void(this.$parent&&this.parents.removeChild(this)))},e.prototype.addNpc_1=function(t){return this.clearNpc(),this.npc_1?(this.npc_1.label=t,void this.addChild(this.npc_1)):(this.npc_1=new TaxButton,this.npc_1.skinName="resource/eui_skins/TalkSkin.exml",this.npc_1.label=t,this.npc_1.y=this.height-this.npc_1.height,void this.addChild(this.npc_1))},e.prototype.addNpc_2=function(t){return this.clearNpc(),this.npc_2?(console.log(this.addNpc_2),this.npc_2.label=t,void this.addChild(this.npc_2)):(this.npc_2=new TaxButton,this.npc_2.skinName="resource/eui_skins/TalkSkin2.exml",this.npc_2.label=t,this.npc_2.y=this.height-this.npc_2.height,void this.addChild(this.npc_2))},e.prototype.clearNpc=function(){this.npc_2&&this.npc_2.parent&&this.npc_2.parent.removeChild(this.npc_2),this.npc_1&&this.npc_1.parent&&this.npc_1.parent.removeChild(this.npc_1)},e.prototype.updataStep=function(){},e.prototype.createBitmapByName=function(t,e,i){var n=new egret.Bitmap,o=RES.getRes(t);return n.texture=o,e&&(n.width=e),i&&(n.height=i),n},e}(egret.Sprite);__reflect(TalkContent.prototype,"TalkContent");var Timer=function(t){function e(){var e=t.call(this)||this;return e.image=new egret.Bitmap,e.timer=60,e.x=0,e.y=0,e.group=new eui.Group,e.addEventListener(egret.Event.ADDED_TO_STAGE,e.addImage,e),e}return __extends(e,t),e.prototype.addImage=function(){this.taxNum=new TalkButton,this.taxNum.skinName="resource/eui_skins/timerSkin.exml",this.taxNum.width=236,this.taxNum.height=281,this.taxNum.label=this.timer,this.taxNum.x=50,this.taxNum.y=50,this.addChild(this.taxNum)},e}(eui.Group);__reflect(Timer.prototype,"Timer");var GameConfig=function(){function t(){}return t.generatorBingos=function(){},t.canChange=!1,t.state=0,t.stepOnoff=!0,t.maxStep=20,t.bingosMax=8,t.taxArr=["一","二","三","四","五","六","七","八"],t.taxLabel=["第一宇宙是平淡无奇的宇宙，你可以很容易的通关","暂未解锁","暂未解锁","暂未解锁","暂未解锁","暂未解锁","暂未解锁","暂未解锁"],t.npcTalk=[[{type:1,text:"救世主，你醒了，我在这里等你很久了......"},{type:2,text:"爱因斯坦？什么？？什么救世主，我正打《星球大爆炸》就突然被屏幕吸到这里来了，怎么回事儿？？？"},{type:1,text:"你先听我慢慢道来，我们的仪表监测到最近有些宇宙的熵越来越高，不清楚什么原因。如果熵继续这样增加下去，恐怕这些宇宙会进入一个死寂的永恒状态。"},{type:2,text:"什么？？什么熵？什么死寂？听上去很“玄幻啊”!?"},{type:1,text:"哦，我有些唐突了，你还只是个初中生，熵是衡量物质的混乱程度，对比星球而言就是星球的混乱程度，宇宙在不断膨胀，星球之间的距离一直在增加，熵也在增加。"},{type:1,text:"当宇宙中的熵达到极限大时，一切运动就会中止，这个完全静止的状态就称为死寂。如果宇宙进入了死寂状态，那生物也就不存在了。"},{type:2,text:"你，你是什么人！告诉我这些干什么！？还有，我为什么出现在这里？"},{type:1,text:"其实我不是爱因斯坦，用你们的话讲，我们是外星高级文明，维度也高过人类，通过脑电波在和你对话，你所处的这个地方也是我干扰你的脑电波臆造出来的。"},{type:1,text:"虽然我们的维度高过人类，但我们的文明发展的代价是熵的剧增，对于降低熵的思维没有三维低等文明活跃。因此在你们网络上发布了这款星球大爆炸游戏..."},{type:2,text:"等等！你不会要说我是被游戏筛选出来的吧！"},{type:1,text:"（思索一会儿......）先别说了，前面的全息屏幕熟悉吧，将相同的星球聚集在一起，让我看看你的实力吧。"}],[{type:1,text:"怎么样，跟你在地球玩的游戏一样吧，很简单，凑够三个以上相同星球，宇宙中的熵就会降低，只要你达到对应宇宙目标熵差，我们就可以接着拯救后面的宇宙"},{type:1,text:"屏幕上方是数值面板，每当熵值降为0的时候，这个宇宙的目标就达到了，当然不同的宇宙有不同的规则，我会一一给你介绍"},{type:2,text:"那当然，这游戏对我来说小菜一碟，哎，你还没告诉我你是什么人呢？！"},{type:1,text:"（目光转到另一边），哈哈哈，现实生活中可不比游戏，刚刚是第一宇宙，很平常的宇宙，现在是第二宇宙，你在降熵的同时，还要...沉默了"},{type:2,text:"还要什么？别再这个时候沉默啊！？？"},{type:1,text:"在第二宇宙有几四大犬星，十分巨大，以我们目前的技术不能控制它，所以你还要将其放到第二宇宙的最底部，我会在屏幕上方告知你它的外观。"},{type:1,text:"好了，开始吧。"}],[{type:1,text:"又到了第三关了"}],[{type:1,text:"第四关"}],[{type:1,text:"第五关"}],[{type:1,text:"第六关"}],[{type:1,text:"第七关"}],[{type:1,text:"最后一关了"}]],t.failWords=["失败了？没关系再来一次！？","除了实力还需要运气","宇宙的熵越来越高了，降熵的速度都赶不上增熵了！","运用你的智慧......"],t.nowTax=0,t.taxConfig=[{row:5,col:5,checkType:"uncommon",myScore:1e3,bingoType:5,uncommon:4},{row:5,col:5,checkType:"uncommon",darkTime:60,myScore:2e3,bingoType:4},{row:6,checkType:"uncommon",col:6,myScore:3e3,bingoType:4},{row:7,checkType:"uncommon",col:7,matrix:[],myScore:4e3,bingoType:4},{row:7,checkType:"uncommon",col:7,matrix:[],myScore:5e3,bingoType:4},{row:8,checkType:"uncommon",col:8,matrix:[],myScore:6e3,bingoType:4},{row:8,checkType:"uncommon",col:9,matrix:[],myScore:7e3,bingoType:4},{row:8,checkType:"uncommon",col:10,matrix:[],myScore:8e3,bingoType:4}],t}();__reflect(GameConfig.prototype,"GameConfig");var AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,i){function n(n){e.call(i,n,t)}if(RES.hasRes(t)){var o=RES.getRes(t);o?n(o):RES.getResAsync(t,n,this)}else RES.getResByUrl(t,n,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,i,n){function o(t){e.call(n,t)}function r(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),i.call(n))}"undefined"!=typeof generateEUI?egret.callLater(function(){e.call(n,generateEUI)},this):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,r,null),RES.getResByUrl(t,o,this,RES.ResourceItem.TYPE_TEXT))},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var EntryGame=function(t){function e(e,i,n){var o=t.call(this)||this;return o.image=new egret.Bitmap,o.x=0,o.y=0,o.width=e,o.height=i,o.parents=n,o.addEventListener(egret.Event.ADDED_TO_STAGE,o.addImage,o),o}return __extends(e,t),e.prototype.addImage=function(){var t=this.createBitmapByName("bg_png",this.width,this.height);t.width=this.width,t.height=this.height,this.addBlackHead(),this.addBoom(),this.addTitle(),this.addNPC(),this.addStarLand(),this.meau()},e.prototype.addNPC=function(){var t=this,e=this.createBitmapByName("npc_1_png",256,282);this.addChild(e),e.x=100,e.y=this.height-e.height/.75;var i=function(){egret.Tween.get(e).to({y:t.height-e.height/.7},3e3,egret.Ease.sineIn).call(n)},n=function(){egret.Tween.get(e).to({y:t.height-e.height/.75},3e3,egret.Ease.sineIn).call(i)};i()},e.prototype.addTitle=function(){var t=this.createBitmapByName("title_png",500,500);this.addChild(t),t.x=this.width/2-300,t.y=90},e.prototype.addBoom=function(){var t=new particle.GravityParticleSystem(RES.getRes("newParticle2_png"),RES.getRes("newParticle2_json"));this.addChild(t),t.start()},e.prototype.addBlackHead=function(){var t=this.createBitmapByName("black2_png",480,485);this.addChild(t);var e=function(){t.rotation+=1*i},i=1;t.x=this.width/2-t.width/1.5,t.y=40,t.anchorOffsetX=t.width/2,t.anchorOffsetY=t.height/2,this.addChild(t);var n=function(){egret.Tween.get(t,{onChange:e,onChangeObj:t}).to({},2e4,egret.Ease.sineIn).call(n)};n()},e.prototype.addStarLand=function(){var t=this.createBitmapByName("starLand_png",this.width,null);this.addChild(t),t.width=this.width,t.scaleY=1.5,t.scaleX=1.5,t.y=this.height-1.5*t.height},e.prototype.meau=function(){for(var t=this,e=["ButtonModel1","ButtonModel2","ButtonMore","ButtonHelp"],i=["剧情模式","无尽模式","游戏帮助","退出游戏"],n=function(e){var n=new eui.Button;n.touchEnabled=!0,n.x=o.width/2,n.label=i[e],n.width=236,n.height=81,n.y=90*e+o.height/2,n.enabled=!0,o.addChild(n),n.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){t.bindClickFn(e)},o,!1,e)},o=this,r=0;r<e.length;r++)n(r)},e.prototype.bindClickFn=function(t){switch(t){case 0:PageBus.gotoPage("gameTax");break;case 1:break;case 2:break;default:return}},e.prototype.createBitmapByName=function(t,e,i){var n=new egret.Bitmap,o=RES.getRes(t);return n.texture=o,e&&(n.width=e),i&&(n.height=i),n},e}(egret.Sprite);__reflect(EntryGame.prototype,"EntryGame");var GameTax=function(t){function e(e,i,n){var o=t.call(this)||this;return o.image=new egret.Bitmap,o.x=0,o.y=0,o.width=e,o.height=i,o.parents=n,o.addEventListener(egret.Event.ADDED_TO_STAGE,o.addImage,o),o}return __extends(e,t),e.prototype.addImage=function(){this.addBack(),this.addGroup(),this.addReturn()},e.prototype.addGroup=function(){var t=new GameGroup(this.width,this.height,this);this.addChild(t)},e.prototype.addBack=function(){var t=this.createBitmapByName("back_1_png",this.width,1.78*this.width);this.addChild(t);var e=function(){egret.Tween.get(t).to({y:-100},24e3,egret.Ease.sineIn).call(i)},i=function(){egret.Tween.get(t).to({y:0},24e3,egret.Ease.sineIn).call(e)};e()},e.prototype.addReturn=function(){var t=this.createBitmapByName("back_png",40,40);t.x=20,t.y=50,t.touchEnabled=!0,t.addEventListener("touchEnd",function(){PageBus.gotoPage("index")},this),this.addChild(t)},e.prototype.createBitmapByName=function(t,e,i){var n=new egret.Bitmap,o=RES.getRes(t);return n.texture=o,e&&(n.width=e),i&&(n.height=i),n},e}(egret.Sprite);__reflect(GameTax.prototype,"GameTax");var TaxPage=function(t){function e(e,i){var n=t.call(this)||this;return n.image=new egret.Bitmap,n.x=0,n.y=0,n.width=e,n.height=i,n.addEventListener(egret.Event.ADDED_TO_STAGE,n.addImage,n),n}return __extends(e,t),e.prototype.addImage=function(){var t=this;try{this.addStar()}catch(e){console.log("报错"),console.log(e)}this.addTalk(),this.success=function(){t.removeChild(t.talkContent),t.addGameBody()};var i=new particle.GravityParticleSystem(RES.getRes("newParticle_png"),RES.getRes("newParticle_json"));this.addChild(i),i.start(),this.addGameInf()},e.prototype.addStar=function(){var t=1.78*this.width,e=t-this.height,i=this.createBitmapByName("back_1_png",this.width,t);this.addChild(i);var n=function(){egret.Tween.get(i).to({y:-e},48e3,egret.Ease.sineIn).call(o)},o=function(){egret.Tween.get(i).to({y:0},48e3,egret.Ease.sineIn).call(n)};n()},e.prototype.addGameBody=function(){this.gameBody=new GameBody(this.width,this.height,this.gameInf,this),this.addChild(this.gameBody)
},e.prototype.addTalk=function(){this.talkContent=new TalkContent(this.width,this.height,this),this.talkContent.init(),this.addChild(this.talkContent)},e.prototype.passTax=function(){var t=this;return GameConfig.nowTax++,this.addChild(this.talkContent),this.talkContent.showWhich({type:1,text:"真厉害，竟然通关了，果然没选错人"}),GameConfig.nowTax>=1?void(this.success=function(){PageBus.gotoPage("gameTax")}):void(this.success=function(){t.removeChildren(),t.addImage()})},e.prototype.gameOver=function(){var t=this;this.addChild(this.talkContent),this.talkContent.showWhich({type:1,text:"失败了？没事儿，再来一次"}),this.success=function(){t.removeChild(t.talkContent),t.removeChild(t.gameBody),t.addGameBody()}},e.prototype.success=function(){this.removeChild(this.talkContent),this.addGameBody()},e.prototype.addGameInf=function(){this.gameInf=new GameInf(this.width,this.height),this.addChild(this.gameInf),this.gameInf.backToPage="gameTax"},e.prototype.updataStep=function(){this.gameInf.updataStep()},e.prototype.createBitmapByName=function(t,e,i){var n=new egret.Bitmap,o=RES.getRes(t);return n.texture=o,e&&(n.width=e),i&&(n.height=i),n},e}(egret.Sprite);__reflect(TaxPage.prototype,"TaxPage");