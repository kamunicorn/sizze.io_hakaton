// Caution! The code can bite. Many methods are written as stubs :)

var amountOfElements = 0;
var curentScreenForm = document.getElementById("iphoneX");
var currentActiveElement = null;
var moveable = null;

function newRectangle() {
	let newBlock = document.createElement('div');
	newBlock.className = "rectangle";
	newBlock.id = amountOfElements++;
	curentScreenForm.append(newBlock);
	newBlock.addEventListener('click', function (e) { //dblclick?
		if (moveableStatus == true)
			moveableStop();
		else
			moveableStart(newBlock.id);
	});
	moveableStart(newBlock.id);
}

function newText() {
	let newBlock = document.createElement('div');
	newBlock.className = "text";
	newBlock.innerHTML = "new text";
	newBlock.setAttribute("contenteditable", true);
	newBlock.id = amountOfElements++;
	curentScreenForm.append(newBlock);
	newBlock.addEventListener('click', function (e) { //dblclick?
		if (moveableStatus == true)
			moveableStop();
		else
			moveableStart(newBlock.id);
	});
	newBlock.addEventListener('dblclick', function (e) {
		moveableStop();
	});
	moveableStart(newBlock.id);
}

function moveableStart(elementId, container) {
	moveableStop();
	moveable = new Moveable(curentScreenForm, {
		target: document.getElementById(elementId),
		container: curentScreenForm,
		resizable: true,
		draggable: true,
		resizable: true,
		scalable: true,
		rotatable: true,
		warpable: true,
		pinchable: true,
		origin: true,
		snappable: true,
		bounds: { top: 40, left: 2, bottom: 790, right: 370 },

		keepRatio: true,
		edge: false,
		origin: true,
		originDraggable: true,
		throttleDrag: 0,
		throttleResize: 0,
		throttleScale: 0,
		throttleRotate: 0,
	});

	// точка по центру :) костыль. надо переделать
	let translate = [0, 0];
	moveable.on("dragOriginStart", e => {
		e.dragStart && e.dragStart.set(translate);
	}).on("dragOrigin", e => {
		translate = e.drag.beforeTranslate;

		e.target.style.cssText
			+= `transform-origin: ${e.transformOrigin};`
			+ `transform: translate(${translate[0]}px, ${translate[1]}px)`;
	}).on("dragOriginEnd", e => {
		console.log(e);
	});

	/* draggable */
	moveable.on("dragStart", ({ target, clientX, clientY }) => {
		console.log("onDragStart", target);
	}).on("drag", ({
		target, transform,
		left, top, right, bottom,
		beforeDelta, beforeDist, delta, dist,
		clientX, clientY,
	}) => {
		console.log("onDrag left, top", left, top);
		target.style.left = `${left}px`;
		target.style.top = `${top}px`;
		// console.log("onDrag translate", dist);
		// target!.style.transform = transform;
	}).on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
		console.log("onDragEnd", target, isDrag);
	});

	/* resizable */
	moveable.on("resizeStart", ({ target, clientX, clientY }) => {
		console.log("onResizeStart", target);
	}).on("resize", ({ target, width, height, dist, delta, clientX, clientY }) => {
		console.log("onResize", target);
		delta[0] && (target.style.width = `${width}px`);
		delta[1] && (target.style.height = `${height}px`);
	}).on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
		console.log("onResizeEnd", target, isDrag);
	});

	/* scalable */
	moveable.on("scaleStart", ({ target, clientX, clientY }) => {
		console.log("onScaleStart", target);
	}).on("scale", ({
		target, scale, dist, delta, transform, clientX, clientY,
	}, OnScale) => {
		console.log("onScale scale", scale);
		target.style.transform = transform;
	}).on("scaleEnd", ({ target, isDrag, clientX, clientY }) => {
		console.log("onScaleEnd", target, isDrag);
	});

	/* rotatable */
	moveable.on("rotateStart", ({ target, clientX, clientY }) => {
		console.log("onRotateStart", target);
	}).on("rotate", ({ target, beforeDelta, delta, dist, transform, clientX, clientY }) => {
		console.log("onRotate", dist);
		target.style.transform = transform;
	}).on("rotateEnd", ({ target, isDrag, clientX, clientY }) => {
		console.log("onRotateEnd", target, isDrag);
	});

	/* warpable */
	this.matrix = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1,
	];
	moveable.on("warpStart", ({ target, clientX, clientY }) => {
		console.log("onWarpStart", target);
	}).on("warp", ({
		target,
		clientX,
		clientY,
		delta,
		dist,
		multiply,
		transform,
	}) => {
		console.log("onWarp", target);
		// target.style.transform = transform;
		this.matrix = multiply(this.matrix, delta);
		target.style.transform = `matrix3d(${this.matrix.join(",")})`;
	}).on("warpEnd", ({ target, isDrag, clientX, clientY }) => {
		console.log("onWarpEnd", target, isDrag);
	});

	/* pinchable */
	// Enabling pinchable lets you use events that
	// can be used in draggable, resizable, scalable, and rotateable.
	moveable.on("pinchStart", ({ target, clientX, clientY }) => {
		// pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
		console.log("onPinchStart");
	}).on("pinch", ({ target, clientX, clientY, datas }) => {
		// pinch event occur before drag, rotate, scale, resize
		console.log("onPinch");
	}).on("pinchEnd", ({ isDrag, target, clientX, clientY, datas }) => {
		// pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
		console.log("onPinchEnd");
	});
}

function moveableStatus() {
	if (moveable instanceof Moveable)
		return true;
	return false;
}

function moveableStop() {
	if (moveable instanceof Moveable) {
		moveable.destroy();
		moveable = null;
	}
}

function newScreenForm() {

}

//TODO
function exportHtml() {
	let html = document.getElementById('iphoneX').innerHTML,
		requestStr = 'appName=testApp&data=' + encodeURIComponent(html),
		xhr = new XMLHttpRequest();

	console.log(requestStr);
	
	// xhr.open('POST', 'index.php', true);
	xhr.open('POST', 'http://sizze.igrogood.ru/index.php', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(requestStr);
	showStatus('wait');
	xhr.onreadystatechange = function() { // Ждём ответа от сервера
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				let response = xhr.responseText;
				console.log(response);
				if (myResponse == 'success') {
					showStatus('success');
					console.log('Данные получены сервером.');
				} else
				if (myResponse == 'error') {
					showStatus('error');
					console.log('Что-то пошло не так:(');
				}
				
			}; // 200 - Сервер вернул код 200 успех
		}; // 4 - данные загружены
	};
}

function showStatus() {
	// wait
	// success
	// error
	
}

/* выделение элементов */


/* ! выделение элементов */