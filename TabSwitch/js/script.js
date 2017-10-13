function $(id) {
	return typeof id === "string" ? document.getElementById(id) : id;
}

window.onload = function (){
	var titles = $('notice-tit').getElementsByTagName('li'),
		contents = $('notice-con').getElementsByClassName('mod');

	if(titles.length !== contents.length) return;

	for (var i = 0; i < titles.length; i++) {
		titles[i].id = i;

		titles[i].onmouseover = function (){
			for (var i = 0; i < titles.length; i++) {
				titles[i].className = "";
				contents[i].style.display = "none";
			}

			this.className = "select";
			contents[this.id].style.display = "block";
		}
	}
};