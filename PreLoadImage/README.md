# 图片预加载
> 实现了图片预加载的**插件化**

浏览前预加载图片，使用jquery封装插件，一共有三个实例进行展示。

* 翻页的图片无序加载，预加载用百分比显示进度
* qq表情无序预加载，预加载显示loading信息
* 翻页漫画有序预加载

## 图片预加载插件主要代码
### 构造函数和初始化字段
```JavaScript
//构造函数
function PreLoad(imgs, options){
	this.imgs = (typeof imgs === "string") ? [imgs] : imgs;
	this.ops = $.extend({}, PreLoad.DEFAULTS, options);	//参数options覆盖default值

	this.ops.order == 'oredered' ? this._oredered() : this._unoredered();	//判断调用有序或是无序
}
//初始化字段
PreLoad.DEFAULTS = {
	order: 'unoredered',	//默认无序加载
	each: null,	//每张图片加载完毕后执行
	all: null	//所有图片加载完毕后执行
};
```
### 无序加载
```JavaScript
PreLoad.prototype._unoredered = function() {	//无序加载
	var imgs = this.imgs,
		ops = this.ops,
		count = 0,
		len = imgs.length;

	$.each(imgs, function(i, src){
		if((typeof src) != "string") return;

		var oImage = new Image();

		$(oImage).on('load error', function(){
			count++;

			ops.each && ops.each(count);

			if(count >= len){
				ops.all && ops.all();
			}
		})

		oImage.src = src;
	})
}
```

### 有序加载
```JavaScript
PreLoad.prototype._oredered = function() {	//有序加载
	var imgs = this.imgs,
		ops = this.ops,
		count = 0,
		len = imgs.length;

	load();

	function load() {
		var oImage = new Image();

		$(oImage).on("load error", function () {
			ops.each && ops.each(count);
			count++;

			if(count >= len){
				//执行完毕
				ops.all && ops.all();
			}else{
				load();
			}
		})

		oImage.src = imgs[count];
	}
}
```

### 扩展方法
```JavaScript
$.extend({
	preload: function(imgs, options){
		return new PreLoad(imgs, options);
	}
})
```

### 扩展方法调用
```JavaScript
$.preload(ImageUrl Array or ImageUrl, {
	order: '',
	each: function(count){
	},
	all: function(){
	}
});
```

## 个人学习
对js基础有了新的学习，主要有以下知识点：
1. (function($){...})(jQuery) 实现了闭包，使里面的变量函数不会对其他js造成影响。
2. 通过Math的Max和Min方法，来规避判断小于0和大于图片数量。
3. Image对象的onload事件要写在src赋值前面，来规避图片缓存，导致无法执行onload事件。
3. 对js面向对象有了一定的了解。
4. jquery插件化，将具象的提取出来。
