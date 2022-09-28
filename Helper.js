"use strict";

function encodeQuery(data){
  let query = ""
  for (let d in data)
       query += encodeURIComponent(d) + '=' + 
          encodeURIComponent(data[d]) + '&'
  return query.slice(0, -1)
}

function createImage(mangaTitle, mangaID, imageSource) {
  if(imageSource !== undefined) {
      
      //Creating image elements
      const coverElement = document.createElement('img');
      coverElement.addEventListener('click', function handleClick(event) {
        let query = encodeQuery({'mangaTitle': mangaTitle, 'mangaID': mangaID,'mangaCover': imageSource});
        window.open(`./MangaPage/MangaPage.html?${query}`,'_self');

      });
      coverElement.src = imageSource;  
      coverElement.width = 200;
      coverElement.height = 250;
      coverElement.style.margin = "0px 0px 0px 40px";
    //  titleElement.style.position = "absolute";
    //  coverElement.style.position = "absolute";
    return coverElement;

      
  }
}

function createTitle(mangaTitle) {
  const titleElement = document.createElement('p');
  let title = filterTitle(mangaTitle);
  titleElement.title = mangaTitle;
  titleElement.textContent = title;
  titleElement.style.color = "white";
  titleElement.style.paddingLeft = "50px";
  return titleElement;

}

function loadPopular(mangaTitle, mangaID, imageSource) {
  const popularCoverBox = document.querySelector('.popular-content');
  const mangaContainer = document.createElement('mangaContainer');
  let titleElement = createTitle(mangaTitle);
  let coverElement = createImage(mangaTitle, mangaID, imageSource);

  mangaContainer.appendChild(titleElement);
  mangaContainer.appendChild(coverElement);
  popularCoverBox.appendChild(mangaContainer);

}

function filterTitle(title) {
  let newTitle = "", counter=0;
  for(let i = 0; i < title.length; i ++) {
    newTitle += title[i];
    if(counter === 17) {
      newTitle += "...";
      break;
    }
    counter++;
  }
  return newTitle;
}

function getQueryParams() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  return params;
}

function filterGenres(data) {
  let tags = data.data.attributes.tags;
  let genres = "";
  for(let i = 0; i < tags.length; i ++ ) {
   if(tags[i].attributes.group === "genre") {
    genres += tags[i].attributes.name.en + " ";
   }
  }
  return genres;
}

export default {encodeQuery, createImage, createTitle, loadPopular, getQueryParams, filterGenres, filterTitle};