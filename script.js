"use strict";

function createImage(imageSource) {
    if(imageSource !== undefined) {
        const popularCoverBox = document.querySelector('.popular-content');
        const mangaContainer = document.createElement('mangaContainer');
        //Creating title labels
        const titleElement = document.createElement('div');
        titleElement.textContent = "Title goes here";
        titleElement.style.color = "white"
        //Creating image elements
        const coverElement = document.createElement('img');
        coverElement.addEventListener('click', function handleClick(event) {
        console.log(`You clicked ${src}`, event);
        });
        coverElement.src = imageSource;  
        coverElement.width = 150;
        coverElement.height = 150;
        coverElement.style.margin = "0px 0px 0px 40px";
      //  titleElement.style.position = "absolute";
      //  coverElement.style.position = "absolute";
       
        mangaContainer.appendChild(titleElement);
        mangaContainer.appendChild(coverElement);
        popularCoverBox.appendChild(mangaContainer);
        
    }
}

async function getCover(coverID) {
    let url = `https://api.mangadex.org/cover/${coverID}`;
    let response = await fetch(url);
    let result = await response.json();
    
    let mangaID = result.data.relationships[0].id;
    let fileName = result.data.attributes.fileName;
    let coverSource = `https://uploads.mangadex.org/covers/${mangaID}/${fileName}`;
    console.log(`Done processing ${coverSource}`);
    createImage(coverSource);
    return coverSource;
}

async function getCovers(mangas) {
    const covers = [];
    for(let i = 0; i < mangas.data.length; i ++) {
        let coverID = mangas.data[i].relationships[2].id;
        try {
            let coverSource = await getCover(coverID);
            covers.push(coverSource);
        }
        catch(err) {
            console.log(`Error: ${err}`);
        }
        
    }
    console.log(covers);
    return covers;
    
}

async function getMangas() {

    var url = new URL("https://api.mangadex.org/manga"),
    params = {limit:20};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    console.log(url);

    let response = await fetch(url);
    let result = await response.json();
    let covers =  getCovers(result);
    return covers;
}

// function callback(covers) {
//     for(let i = 0; i < covers.length; i ++) {
//         createImage(covers[i]);
//     }
// }
// getMangas().then(callback)
getMangas();
