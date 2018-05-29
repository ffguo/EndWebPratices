# 进度条
> 实现五种进度条的效果

## 定时器加载(demo1)
一般常用制作gif动图来显示加载动画，通过定时器来控制加载时间（一般不这么做，因为你不知道图片加载需要多长时间）  
```JavaScript
$(function(){
    var content = '<div class="loading"><div class="pic"></div></div>';
    $("body").append(content);

    setInterval(function() {
        $(".loading").fadeOut();
    }, 3000);
})
```
## 事件状态加载(demo2)
还是用gif动图，但这次使用监听事件状态为'complete'（相当于window.onload）来控制加载时间  
```JavaScript
document.onreadystatechange = function(){   //页面加载状态改变事件
    if(document.readyState == "complete"){  //页面加载完成
        $('.loading').fadeOut();
    }
}
```
## CSS3加载(demo3)
使用CSS3来实现一个加载动画，具体看注释  
```css
.loading .pic i{
    display: block;
    float: left;
    width: 6px;
    height: 50px;
    background-color: #399;
    margin: 0 2px;
    transform: scaleY(0.4); /*默认先缩小成原来的0.4倍*/
    animation: load 1.2s infinite; /*连续1.2s执行load动画*/
}
/*用animation-delay来延迟执行达到波浪的效果*/
.loading .pic i:nth-child(1){}
.loading .pic i:nth-child(2){ animation-delay: 0.1s }
.loading .pic i:nth-child(3){ animation-delay: 0.2s }
.loading .pic i:nth-child(4){ animation-delay: 0.3s }
.loading .pic i:nth-child(5){ animation-delay: 0.4s }
@keyframes load{
    0%,40%,100%{ transform: scaleY(0.4); }
    20%{ transform: scaleY(1); }
}
```
## 头部加载(demo4)
利用dom结构从上往下执行，在每部分中间插入js代码来实现加载多少  
```html
<div class="loading">
    <div class="pic">
    </div>
</div>
<header>
    <img src="http://f.hiphotos.baidu.com/image/pic/item/b03533fa828ba61efdc5ac024a34970a304e59f7.jpg" alt="">
    <img src="http://g.hiphotos.baidu.com/image/pic/item/3ac79f3df8dcd100d403870c798b4710b9122f7b.jpg" alt="">
</header>
<script type="text/javascript">
    $('.loading .pic').animate({width: "33%"}, 100);
</script>
<section>
    <img src="http://e.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9ea31a51ecede39b6003af3b34c.jpg" alt="">
    <img src="http://g.hiphotos.baidu.com/image/pic/item/55e736d12f2eb938c5c755dfde628535e5dd6f70.jpg" alt="">
</section>
<script type="text/javascript">
    $('.loading .pic').animate({width: "66%"}, 100);
</script>
<footer>
    <img src="http://c.hiphotos.baidu.com/image/pic/item/b21bb051f81986188c2a9da941ed2e738bd4e6aa.jpg" alt="">
    <img src="http://pic.58pic.com/58pic/15/01/86/60V58PICF8v_1024.jpg" alt="">
</footer>
<script type="text/javascript">
    $('.loading .pic').animate({width: "100%"}, 100, function (){
        $('.loading').fadeOut();
    });
</script>
```
## 数据加载(demo5)
利用Image的onload事件的回调函数来显示加载进度  
```javascript
$(function (){
    var $img = $('img');
    var num = 0;
    $img.each(function (i){
        var oImg = new Image();
        oImg.onload = function(){
            oImg.onload = null;
            num++;
            $('.loading b').html(parseInt(num/$img.length*100) + "%");
            if(num >= $img.length){
                $('.loading').fadeOut();
            }
        }
        oImg.src = $img[i].src;
    });
})
```

最后推荐一个加载动画的素材网站[Loading.io](https://loading.io/)