let zIndexCounter = 1;
let dragTarget = null;
let offsetX, offsetY;

function openWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'block';
    bringToFront(id);
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

function bringToFront(id) {
    zIndexCounter++;
    const win = document.getElementById(id);
    win.style.zIndex = zIndexCounter;
}

function dragStart(e, id) {
    dragTarget = document.getElementById(id);
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.onmousemove = dragMove;
    document.onmouseup = dragEnd;
}

function dragMove(e) {
    if (dragTarget) {
        dragTarget.style.left = (e.pageX - offsetX) + 'px';
        dragTarget.style.top = (e.pageY - offsetY) + 'px';
    }
}

function dragEnd() {
    dragTarget = null;
    document.onmousemove = null;
    document.onmouseup = null;
}