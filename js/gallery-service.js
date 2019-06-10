'use strict'

var gId = 0;
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs;

function createImages() {
    gImgs = [
        createImg(`meme-imgs/2.jpg`, 'happy'),
        createImg('meme-imgs/003.jpg', 'trump, angry'),
        createImg('meme-imgs/004.jpg', 'animal'),
        createImg('meme-imgs/005.jpg', 'baby,dog,sleep'),
        createImg('meme-imgs/5.jpg', 'baby'),
        createImg('meme-imgs/006.jpg', 'cat. sleep'),
        createImg('meme-imgs/8.jpg', 'magician'),
        createImg('meme-imgs/9.jpg', 'baby'),
        createImg('meme-imgs/12.jpg', 'celeb'),
        createImg('meme-imgs/19.jpg', 'celeb'),
        createImg('meme-imgs/drevil.jpg', 'drevil'),
        createImg('meme-imgs/img2.jpg', 'dance, kids'),
        createImg('meme-imgs/img4.jpg', 'trump'),
        createImg('meme-imgs/img6.jpg', 'dog'),
    ]
}

function createImg(url, keywords) {
    return {
        id: gId++,
        url: url,
        keywords: keywords.split(',')
    }
}

function searchImg(chars, filteredImgs) {
    chars = chars.toLowerCase();
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            if (keyword.startsWith(chars)) {
                filteredImgs.push(img);
            }
        });
    });
}

function chooseImg(imgId){
    var imgIdx = gImgs.findIndex(function (img) {
        return img.id === imgId;
    });
    saveToStorage('imgId', imgIdx);
}