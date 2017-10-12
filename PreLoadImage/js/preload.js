// 图片预加载
(function ($){

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
	},
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
	};

	//扩展方法
	$.extend({
		preload: function(imgs, options){
			return new PreLoad(imgs, options);
		}
	})

})(jQuery);