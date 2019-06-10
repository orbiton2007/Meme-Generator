'use strict'
let gCanvas;
let gCtx;

function onInitGenerator() {
    gCanvas = document.getElementById('main-canvas');
    gCtx = gCanvas.getContext('2d');
    gImgs = loadFromStorage('images');
    gMeme.selectedImgId = loadFromStorage('imgId');
    showImg();
    gMeme.txts = [{
        lineId: '0',
        lineCoords: {
            x: gCanvas.width / 2,
            y: 75
        },
        txt: '',
        size: 50,
        family: 'impact',
        color: '#ffffff',
        strokeColor: '#000000',
        align: 'center',
        width: 0
    },
    {
        lineId: '1',
        lineCoords: {
            x: gCanvas.width / 2,
            y: gCanvas.height - 25
        },
        txt: '',
        size: 50,
        family: 'impact',
        color: '#ffffff',
        strokeColor: '#000000',
        align: 'center',
        width: 0
    }];
    renderLineBoxs()
}

function onDrawText(txt, lineId) {
    saveTxt(txt, lineId);
    showImg();
}

//Note: We still didn't implement it in our DOM
function onClearAll() {
    gMeme.txts = [];
    showImg();
}

function onChooseColor(color, lineId) {
    changeTxtColor(color, lineId);
    showImg();
    drawText();
}

function onChooseStrokeColor(color, lineId) {
    changeStrokeColor(color, lineId);
    showImg();
    drawText()
}

function onChangeFontSize(fontSize, lineId) {
    if (fontSize === '') return;
    let prevSize = gMeme.txts[lineId].size;
    //We change the line height depending on the font size:
    changeFontLining(fontSize, prevSize, lineId);
    //And then also change the font size:
    changeFontSize(fontSize, lineId);
    showImg();
    drawText();
}

function onChangeFontFamily(fontFamily, lineId) {
    if (fontFamily === '') return;
    changeFontFamily(fontFamily, lineId);
    showImg();
    drawText();
}

//Note: We need to fix the boundaries issue.
function onMoveLine(direction, lineId) {
    moveLine(direction, lineId);
    showImg();
    drawText()
}

//Adding a new txt line object to the gMemes
function onAddLine() {
    createNewLine('');
    renderLineBoxs()
}

function onChangeAlignment(alignment, lineId) {
    changeAlignment(alignment, lineId);
    showImg();
    drawText();
}

function onDeleteLine(lineId) {
    deleteLine(lineId);
    removeLineBox(lineId);
    showImg();
    drawText();
}

function renderLineBoxs() {
    removeLineBoxs();
    gMeme.txts.forEach(txt => {
        renderLineBox(txt.lineId)
    });
}

function renderLineBox(lineId) {
    let lineIdx = gMeme.txts.findIndex(txt => +txt.lineId === +lineId);
    let innerHTML = `
        <div class="txt-item-${lineId} new-line">
                <div><input type="textarea" class="line-input" placeholder=" Write something..." value="${gMeme.txts[lineIdx].txt}" data-id="${lineId}"
                        onkeyup="onDrawText(this.value, this.dataset.id)"/>
                    <button class="line-btn remove-line" data-id="${lineId}" onclick="onDeleteLine(this.dataset.id)">X</button>
                </div>
                <div class="btns">
                    <input class="line-btn btn-color" type="color" data-id="${lineId}" value="${gMeme.txts[lineIdx].color}"
                        onchange="onChooseColor(this.value, this.dataset.id)">
                    <input class="line-btn btn-color" type="color" data-id="${lineId}" value="${gMeme.txts[lineIdx].strokeColor}"
                        onchange="onChooseStrokeColor(this.value, this.dataset.id)">
                    <button class="line-btn" id="left" data-id="${lineId}"
                        onmousedown="onMoveLine(this.id, this.dataset.id)">←</button>
                    <button class="line-btn" id="up" data-id="${lineId}"
                        onmousedown="onMoveLine(this.id, this.dataset.id)">↑</button>
                    <button class="line-btn" id="down" data-id="${lineId}"
                        onmousedown="onMoveLine(this.id, this.dataset.id)">↓</button>
                    <button class="line-btn" id="right" data-id="${lineId}"
                        onmousedown="onMoveLine(this.id, this.dataset.id)">→</button>
                    <button class="line-btn" id="align-left" data-id="${lineId}"
                        onclick="onChangeAlignment(this.id, this.dataset.id)">L</button>
                    <button class="line-btn" id="align-center" data-id="${lineId}"
                        onclick="onChangeAlignment(this.id, this.dataset.id)">C</button>
                    <button class="line-btn" id="align-right" data-id="${lineId}"
                        onclick="onChangeAlignment(this.id, this.dataset.id)">R</button>
                    <select name="font-size" class="select-size" data-id="${lineId}"
                        onclick="onChangeFontSize(this.value, this.dataset.id)">
                        <option value="">Font size</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                    <select class="select-font-family" name="font-family" data-id="${lineId}" onclick="onChangeFontFamily(this.value, this.dataset.id)">
                        <option value=""> Font family</option>
                        <option value="Impact">Impact</option>
                        <option value="Arial">Arial</option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Lato">Lato</option>
                    </select>
                </div>
            </div>
        `
    document.querySelector('.text-boxs').innerHTML += innerHTML;
}

function removeLineBox(lineId) {
    let boxToRemove = document.querySelector(`.txt-item-${lineId}`);
    if (!boxToRemove) return;
    boxToRemove.remove();
}

function removeLineBoxs() {
    gMeme.txts.forEach(txt => {
        removeLineBox(txt.lineId)
    });
}