"use strict";
import Manga from "/MangaClasses/Manga.js";
import Helper from '../Helper.js';

const MangaClass = new Manga();
const params = Helper.getQueryParams();

let mangaTitle = params.mangaTitle;
let mangaID = params.mangaID;
let mangaCover = params.mangaCover;
let genreXsynopsis = MangaClass.getGenreSynopsis(mangaID);
let chapters = MangaClass.getChapter(mangaID);
chapters.then(function(chapters) {
  for(let i = 0; i < chapters.length; i ++) {
    let chapText = document.createElement("h3");
    chapText.textContent = chapters[i];
    chapText.style.borderBottom = "1px solid white";
    document.querySelector(".chapters-container").appendChild(chapText);
   // console.log(chaps);

  }
})
genreXsynopsis.then(function(result){
  document.querySelector(".manga-genres").textContent = result[0];
  document.querySelector(".manga-synopsis").textContent = result[1];
})

document.querySelector(".manga-title").textContent = mangaTitle;
document.querySelector(".manga-cover").src = mangaCover;

