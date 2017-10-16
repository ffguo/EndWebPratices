function $(id) {
	return typeof id === "string" ? document.getElementById(id) : id;
}

window.onload = function (){
	var timer = null;

	var titles = $('notice-tit').getElementsByTagName('li'),
		contents = $('notice-con').getElementsByClassName('mod');

	if(titles.length !== contents.length) return;

	for (var i = 0; i < titles.length; i++) {
		titles[i].id = i;

		titles[i].onmouseover = function (){
			var that = this;

			if(timer){
				clearTimeout(timer);
				timer = null;
			}

			timer = setTimeout(function (){
				for (var j = 0; j < titles.length; j++) {
					titles[j].className = "";
					contents[j].style.display = "none";
				}

				that.className = "select";
				contents[that.id].style.display = "block";
			}, 500);
		}
	}
};