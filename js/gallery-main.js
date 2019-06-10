'use strict'
function onInitHomepage() {
    createImages();
    renderImgs(gImgs);
    saveToStorage('images', gImgs);
    // countByPopularity();    
    // renderTopFiveSearches();
}

function renderImgs(imgs) {
    var strHTML = '';
    imgs.forEach(function (img) {
        strHTML += `<div class ="img-gallery ${img.id}"><a href="generator.html"> 
        <img src="${img.url}" onclick="onChooseImg(${img.id})"></a>
        </div>`;
    })
    document.querySelector('.imgs-container').innerHTML = strHTML;
}


function toggleMenu() {
    document.querySelector('.modal-menu').style.display = "block";
    document.querySelector('.close-menu').onclick = function () {
        document.querySelector('.modal-menu').style.display = "none";
    }
}
function onAddImg() {
    document.querySelector('.modal-menu').style.display = "none";
    onShowModal();
}

function onShowModal() {
    document.querySelector('.modal').style.display = "block";
    document.querySelector('.close').onclick = function () {
        document.querySelector('.modal').style.display = "none";
    }
}
function onSubmitAddImg() {
    var url = document.querySelector('.input-url').value;
    var keywords = document.querySelector('.input-keywords').value;
    gImgs.push(createImg(url, keywords));
    document.querySelector('.modal').style.display = "none"
    renderImgs(gImgs);
}

function onChooseImg(imgId) {
    chooseImg(imgId);
}

function onSearchImg(chars) {
    let filteredImgs = [];
    searchImg(chars, filteredImgs);
    renderImgs(filteredImgs);
}
