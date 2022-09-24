"use strict";

function encodeQuery(data){
  let query = ""
  for (let d in data)
       query += encodeURIComponent(d) + '=' + 
          encodeURIComponent(data[d]) + '&'
  return query.slice(0, -1)
}

function createImage(imageSource) {
  if(imageSource !== undefined) {
      
      //Creating image elements
      const coverElement = document.createElement('img');
      coverElement.addEventListener('click', function handleClick(event) {
        console.log(`You clicked shit`, event);
        let query = encodeQuery({'mangaCover': imageSource});
        console.log(`Current query${query}`);
        window.open(`./MangaPage/MangaPage.html?${query}`,'_self');

      });
      coverElement.src = imageSource;  
      coverElement.width = 150;
      coverElement.height = 150;
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

function loadPopular(mangaTitle, imageSource) {
  const popularCoverBox = document.querySelector('.popular-content');
  const mangaContainer = document.createElement('mangaContainer');
  let titleElement = createTitle(mangaTitle);
  let coverElement = createImage(imageSource);

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

export default {createImage, createTitle, loadPopular};