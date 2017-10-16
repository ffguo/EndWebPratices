function $(id) {
	return typeof id === "string" ? document.getElementById(id) : id;
}

window.onload = Tab;

function Tab() {
	var index = 0,
		timer = null;

	var titles = $('notice-tit').getElementsByTagName('li'),
		contents = $('notice-con').getElementsByClassName('mod');

	//绑定鼠标移上移出事件
	for (var i = 0; i < titles.length; i++) {
		titles[i].id = i;

		titles[i].onmouseover = function (){
			clearInterval(timer);
			ChangeOption(this.id);
		};

		titles[i].onmouseout = function (){
			timer = setInterval(AutoPlay, 2000);
		}
	}

	timer = setInterval(AutoPlay, 2000);

	//自动播放
	function AutoPlay() {
		//index = (index + 1 >= titles.length) ? 0 : index + 1;
		index = ++index % titles.length;
		ChangeOption(index);
	}

	//切换标签
	function ChangeOption(curIndex){
		for (var i = 0; i < titles.length; i++) {
			titles[i].className = "";
			contents[i].style.display = 'none';
		}

		titles[curIndex].className = "select";
		contents[curIndex].style.display = "block";
		index = curIndex;
		console.log(curIndex);
	}
}