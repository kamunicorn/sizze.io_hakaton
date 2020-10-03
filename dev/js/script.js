// clear js
/* window.addEventListener('keydown', function(e) {
    console.log(e.which);
    console.log(e.key);
}); */

/* горячие клавиши по требованиям из functional kit, страница 5
e.which = e.keyCode (оба устарели)
e.code рекомендуется использовать
конкретная нажатая клавиша, например Shift:
e.which = 16 для ShiftLeft, ShiftRight
e.code=ShiftLeft, e.code=ShiftRight
в ките есть metaKey, это клавиша win или cmd. я вместо нее проставила control, как в фигме */

// $(window).keydown(function(e) { // jquery
window.addEventListener('keydown', function(e) { // clear js
    e.preventDefault(); // оно должно быть внутри каждого if (вынесла сюда, чтоб не было много текста)
    // переключение к инструментам - Tool
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 86) {
        console.log('V = Move Tool');
    }
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 84) {
        console.log('T = Text Tool');
    }
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 67) {
        console.log('C = Crop Tool');
    }
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 82) {
        console.log('R = Rectangle Tool');
    }
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 79) {
        console.log('O = Ellipse Tool');
    }
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 72) {
        console.log('H = Hand Tool');
    }
    // действия с элементами
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 83) {
        console.log('S = Save Element');
    }
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 68) {
        console.log('D = Duplicate Element');
    }
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 8) {
        console.log('Backspace = Delete element');
    }
    if (!e.altKey && e.ctrlKey && !e.shiftKey && e.which == 71) {
        console.log('Control + G = группировка');
    }
    if (!e.altKey && e.ctrlKey && e.shiftKey && e.which == 71) {
        console.log('Control + Shift + G = разгруппировка');
    }
    if (!e.altKey && e.ctrlKey && !e.shiftKey && e.which == 90) {
        console.log('Control + Z = отмена действия');
    }
    if (!e.altKey && e.ctrlKey && e.shiftKey && e.which == 90) {
        console.log('Control + Shift + Z = повтор действия');
    }
    // перемещения элемента
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 37) {
        console.log('Left = Move left');
    }
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 38) {
        console.log('Up = Move up');
    }
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 39) {
        console.log('Right = Move right');
    }
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 40) {
        console.log('Down = Move down');
    }
    // перемещения элемента на много px (10px)
    if (!e.altKey && !e.ctrlKey && e.shiftKey && e.which == 37) {
        console.log('Shift + Left = Move left long');
    }
    if (!e.altKey && !e.ctrlKey && e.shiftKey && e.which == 38) {
        console.log('Shift + Up = Move up long');
    }
    if (!e.altKey && !e.ctrlKey && e.shiftKey && e.which == 39) {
        console.log('Shift + Right = Move right long');
    }
    if (!e.altKey && !e.ctrlKey && e.shiftKey && e.which == 40) {
        console.log('Shift + Down = Move down long');
    }
    
    // выравнивания сгруппированных элементов
    if (e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 65) {
        console.log('Alt + A = Align Left');
    }
    if (e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 87) {
        console.log('Alt + W = Align Top');
    }
    if (e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 68) {
        console.log('Alt + D = Align Right');
    }
    if (e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 83) {
        console.log('Alt + S = Align Bottom');
    }
    // выравнивания по центру, вертикали
    if (e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 86) {
        console.log('Alt + V = Align Vertical Spacing');
    }
    if (e.altKey && !e.ctrlKey && !e.shiftKey && e.which == 72) {
        console.log('Alt + H = Align Horizontal Spacing');
    }
    if (e.altKey && e.ctrlKey && e.shiftKey && e.which == 86) {
        console.log('Control + Shift + Alt + V = Distribute Vertical Spacing');
    }
    if (e.altKey && e.ctrlKey && e.shiftKey && e.which == 72) {
        console.log('Control + Shift + Alt + H = Distribute Horizontal Spacing');
    }
    // прочее
    // тут изменила по сравнению с китом - у них там 2 S, поэтому тут добавила Control
    if (!e.altKey && e.ctrlKey && !e.shiftKey && e.which == 83) {
        console.log('Control + S = Open Shortcuts');
    }

    console.log(e);
    // console.log(e.key +' = '+ e.which);
    // console.log(e.key);
});

import Moveable from "moveable";

const moveable = new Moveable(document.body, {
    target: document.querySelector(".target"),
    // If the container is null, the position is fixed. (default: parentElement(document.body))
    container: document.body,
    draggable: true,
    resizable: true,
    scalable: true,
    rotatable: true,
    warpable: true,
    // Enabling pinchable lets you use events that
    // can be used in draggable, resizable, scalable, and rotateable.
    pinchable: true, // ["resizable", "scalable", "rotatable"]
    origin: true,
    keepRatio: true,
    // Resize, Scale Events at edges.
    edge: false,
    throttleDrag: 0,
    throttleResize: 0,
    throttleScale: 0,
    throttleRotate: 0,
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
    target!.style.left = `${left}px`;
    target!.style.top = `${top}px`;
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
    delta[0] && (target!.style.width = `${width}px`);
    delta[1] && (target!.style.height = `${height}px`);
}).on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
    console.log("onResizeEnd", target, isDrag);
});

/* scalable */
moveable.on("scaleStart", ({ target, clientX, clientY }) => {
    console.log("onScaleStart", target);
}).on("scale", ({
    target, scale, dist, delta, transform, clientX, clientY,
}: OnScale) => {
    console.log("onScale scale", scale);
    target!.style.transform = transform;
}).on("scaleEnd", ({ target, isDrag, clientX, clientY }) => {
    console.log("onScaleEnd", target, isDrag);
});

/* rotatable */
moveable.on("rotateStart", ({ target, clientX, clientY }) => {
    console.log("onRotateStart", target);
}).on("rotate", ({ target, beforeDelta, delta, dist, transform, clientX, clientY }) => {
    console.log("onRotate", dist);
    target!.style.transform = transform;
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