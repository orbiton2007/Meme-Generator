'use strict'

var gId = 0;
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs;
let keywordsCountMap = {};

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
            if (keyword.startsWith(chars) && !filteredImgs.includes(img)) {
                console.log('keyword', keyword, 'starts with', chars, img);
                filteredImgs.push(img);
            }
        });
    });
}

function chooseImg(imgId) {
    var imgIdx = gImgs.findIndex(function (img) {
        return img.id === imgId;
    });
    saveToStorage('imgId', imgIdx);
}

//Count words appearances by a count map
function countByPopularity() {
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            if (!keywordsCountMap[keyword])
                keywordsCountMap[keyword] = 1;
            else keywordsCountMap[keyword]++;
        });
    });
}

//Sort top 5 words by popularity
function sortWordsByPopularity(keywordCountMap) {
    let sortedKeywords = [];
    for (let keyword in keywordsCountMap) {
        sortedKeywords.push([keyword, keywordCountMap[keyword]]);
    }
    sortedKeywords.sort((a, b) => b[1] - a[1]);
    return sortedKeywords.slice(0, 5);
}

//Rendering to the homepage the top 5 searches with size by popularity on a random order.
function renderTopFiveSearches() {
    let topFiveSearches = sortWordsByPopularity(keywordsCountMap);
    let strHTML = topFiveSearches.map((word, index) =>
        `<p class="popular-keywords font-size${index}">${word[0]}</p>`)
    document.querySelector('.top-searches').innerHTML = shuffle(strHTML).join('');
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}