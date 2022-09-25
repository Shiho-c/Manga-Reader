"use strict";
import Manga from "/MangaClasses/Manga.js";
import Helper from '../Helper.js';

const MangaClass = new Manga();
const params = Helper.getQueryParams();

let mangaTitle = params.mangaTitle;
let mangaID = params.mangaID;
let mangaCover = params.mangaCover;
let genreXsynopsis = MangaClass.getGenreSynopsis(mangaID);
genreXsynopsis.then(function(result){
  console.log(result[0]);
  document.querySelector(".manga-genres").textContent = result[0];
  document.querySelector(".manga-synopsis").textContent = result[1];
})

document.querySelector(".manga-title").textContent = mangaTitle;
document.querySelector(".manga-cover").src = mangaCover;

