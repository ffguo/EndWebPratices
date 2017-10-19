//子类：饮料
var Beverage = function(){}

Beverage.prototype.Boil = function (){
	console.log("把水烧开了");
};

Beverage.prototype.Brew = function() {
	throw new Error("子类必须覆写该方法");
};

Beverage.prototype.PutInCup = function() {
	throw new Error("子类必须覆写该方法");
};

Beverage.prototype.AddCondiments = function() {
	throw new Error("子类必须覆写该方法");
};

Beverage.prototype.CustomIsWant = function() {
	return true;
};

//初始化方法
Beverage.prototype.Init = function() {
	this.Boil();
	this.Brew();
	this.PutInCup();
	if(this.CustomIsWant())
		this.AddCondiments();
};

var Tea = function(){};
var Coffee = function(){};
//继承子类
Tea.prototype = new Beverage();
Coffee.prototype = new Beverage();

//Tea的方法
Tea.prototype.Brew = function() {
	console.log("用开水冲泡茶");
};

Tea.prototype.PutInCup = function() {
	console.log("把茶倒进杯子里");
};

Tea.prototype.AddCondiments = function() {
	console.log("加柠檬");
};

Tea.prototype.CustomIsWant = function() {
	return window.confirm("请问需要加柠檬嘛？");
};

//Coffee的方法
Coffee.prototype.Brew = function() {
	console.log("用开水冲泡咖啡");
};

Coffee.prototype.PutInCup = function() {
	console.log("把咖啡倒进杯子里");
};

Coffee.prototype.AddCondiments = function() {
	console.log("加糖和牛奶");
};

Coffee.prototype.CustomIsWant = function() {
	return false;
};

//使用
var tea = new Tea();
var coffee = new Coffee();
tea.Init();
coffee.Init();