'use strict'
let gMeme = {
    selectedImgId: 0,
    currLineIdx: 0,
    txts: []
}
var gNum = 1;
function showImg() {
    let chosenImg = new Image()
    chosenImg.src = gImgs[gMeme.selectedImgId].url;
    chosenImg.addEventListener('load', function () {
        gCtx.drawImage(chosenImg, 0, 0, gCanvas.width, gCanvas.height);
        drawText()
    });
}

function defineGctx(txt) {
    gCtx.font = `${txt.size}px ${txt.family}`;
    gCtx.fillStyle = txt.color;
    gCtx.strokeStyle = txt.strokeColor;
    gCtx.textAlign = txt.align;
}

function saveTxt(txt, lineId) {
    let isFound = gMeme.txts.find(text => text.lineId === lineId); //Checks if there is a txt object with this chosen ID
    if (!isFound) createNewLine(txt); //Creating a new txt object if the it doesnt exist yet, with the text inserted.
    else isFound.txt = txt;
}

//NOTE: Also need to make the line break when reaching the edges
function drawText() {
    gMeme.txts.forEach(function (txt) {
        defineGctx(txt);
        txt.width = gCtx.measureText(txt.txt).width;
        gCtx.fillText(txt.txt, txt.lineCoords.x, txt.lineCoords.y);
        gCtx.strokeText(txt.txt, txt.lineCoords.x, txt.lineCoords.y);
    });
}

function clearCanvas() {
    let ctx = gCanvas.getContext('2d');     // gets reference to canvas context
    ctx.beginPath();    // clear existing drawing paths
    ctx.save();         // store the current transformation matrix
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    ctx.restore();        // restore the transform
}

function createNewLine(txt) {
    //Setting the new txt object in the middle, with default hard-coded properties.
    gNum++;
    let newTxt = {
        lineId: '' + gNum,
        lineCoords: {
            x: gCanvas.width / 2,
            y: gCanvas.height / 2
        },
        txt: txt,
        size: 50,
        family: 'impact',
        color: 'white',
        strokeColor: 'black',
        align: 'center',
        width: 0,
    };
    gMeme.txts.push(newTxt);
}

function changeTxtColor(color, lineId) {
    gMeme.txts[lineId].color = color;
}

function changeStrokeColor(color, lineId) {
    gMeme.txts[lineId].strokeColor = color;
}

//NOTE: Got to fix the boundaries when moving the text to the left and right
function moveLine(direction, lineId) {
    let line = gMeme.txts[lineId];
    if (direction === 'up') line.lineCoords.y -= 6;
    else if (direction === 'down') line.lineCoords.y += 6;
    else if (direction === 'left') line.lineCoords.x -= 6;
    else if (direction === 'right') line.lineCoords.x += 6;
}

function changeAlignment(alignment, lineId) {
    let line = gMeme.txts[lineId];
    if (alignment === 'align-left') {
        line.align = 'left';
        line.lineCoords.x = line.size * 0.5;
    }
    else if (alignment === 'align-center') {
        line.align = 'center';
        line.lineCoords.x = gCanvas.width / 2;

    }
    else if (alignment === 'align-right') {
        line.align = 'right';
        line.lineCoords.x = gCanvas.width - line.size * 0.5;
    }
}

function changeFontLining(newSize, prevSize, lineId) {
    if (newSize === prevSize) return;
    if (newSize > prevSize)
        gMeme.txts[lineId].lineCoords.y += +newSize - prevSize;
    else if (newSize < prevSize)
        gMeme.txts[lineId].lineCoords.y -= +prevSize - newSize;
}

function changeFontSize(fontSize, lineId) {
    gMeme.txts[lineId].size = fontSize;
}

function changeFontFamily(fontFamily, lineId) {
    let line = gMeme.txts[lineId];
    line.family = fontFamily;
}

function deleteLine(lineId) {
    let lineIdx = gMeme.txts.findIndex(text => text.lineId === lineId);
    gMeme.txts.splice(lineIdx, 1);
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}