// 图片预加载
(function ($){

	function PreLoad(imgs, options){
		this.imgs = (typeof imgs === "string") ? [imgs] : imgs;
		this.ops = $.extend({}, PreLoad.DEFAULTS, options);

		this._unoredered();
	}
	PreLoad.DEFAULTS = {
		each: null,	//每张图片加载完毕后执行
		all: null	//所有图片加载完毕后执行
	};

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

	$.extend({
		preload: function(imgs, options){
			return new PreLoad(imgs, options);
		}
	})

})(jQuery);