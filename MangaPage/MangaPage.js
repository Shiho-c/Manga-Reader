"use strict";

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let value = params.mangaCover;

  const coverElement = document.createElement('img');
  coverElement.src = value;
  coverElement.width = 300;
  coverElement.height = 300;
  const content = document.querySelector('.content')
  content.appendChild(coverElement);