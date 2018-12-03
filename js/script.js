var content = document.getElementById("content");
var restart = document.getElementById("btn");

window.onresize = redraw;
	
/*No selection*/
content.onselectstart = function(){return false;}
content.onmousedown = function(){return false;}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
/*Duplicate array*/
var sorted = arr.slice(0);

/*Mix array*/
function randFunc(a, b){
	return Math.random() - 0.5;
}
arr.sort(randFunc);

/*Check whether arrays are equal or not*/
function areEqual(){
	for (var i = 0; i < 16; i++){
		if (arr[i] != sorted[i])
			return false;
	}
	return true;
}

/*Move blocks function*/
function move(elem, next){
	var ind = arr.indexOf(parseInt(elem.textContent));
	var tmp = arr[ind];
	arr[ind] = arr[next];
	arr[next] = tmp;
	redraw();

	/*If completed show picture*/
	if (areEqual()){
		for (var i = 0; i < 16; i++){
			var d = document.getElementById(i+1);
			d.textContent = "";
			var img = document.createElement("img");
			img.setAttribute('src', 'img/' + (i+1)+'.jpg');
			img.style.width = "100%";
			img.style.height = "100%";
			d.appendChild(img);
		}
	}
}

/*Check whether there is an empty block nearby*/
function clickFunc(e){
	var elem = e.target;
	var index = arr.indexOf(parseInt(elem.textContent));
	var ost = index - 4*Math.floor(index/4);
	var nextL = index - 1;
	var nextR = index + 1;
	var nextT = index - 4;
	var nextB = index + 4;
	
	var flag = false;
	var next;
	if (nextL % 4 != 3 && nextL >= 0)
		if (arr[nextL] == 16){
			flag = true;
			next = nextL;
		}
	if(nextR % 4 != 0 && nextR < 16)
		if (arr[nextR] == 16){
			flag = true;
			next = nextR;
		}
	if(nextT >= 0)
		if (arr[nextT] == 16){
			flag = true;
			next = nextT;
		}
	if(nextB < 16)
		if (arr[nextB] == 16){
			flag = true;
			next = nextB;
		}

	if(flag)
		move(elem, next);
}

/*Adding blocks to the main field*/
function redraw(){
	width = content.clientWidth;
	height = content.clientHeight;
	if(!f){
		for(var i = 0; i < 16; i++){
			content.removeChild(document.getElementById(arr[i]));
		}
	}
	f = false;
	for (var i = 0; i < 16; i++){
	var div = document.createElement("div");
	div.style.width = width/4 - 10 + "px";
	div.style.height = height/4 - 10 + "px";
	div.style.lineHeight = div.style.height;
	div.textContent = arr[i];	
	div.ondblclick = clickFunc;
	div.className = "elem";

	div.id = arr[i];
	if (arr[i] != 16){
		div.style.backgroundColor = "rgb(255, 217, 240) ";
	}
	else{
		div.style.color = "grey";
	}
	content.appendChild(div);
}
	
}
var f = true;
redraw();

/*Restart function*/
function restartFunc(){
	arr.sort(randFunc);
	redraw();
}
restart.onclick = restartFunc;


