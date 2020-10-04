const container = document.querySelector('.container');
const input = document.querySelector('input');
const btnSumbit = document.querySelector('button');
const body = document.querySelector('body');
let VIDEO_ID;
const alertBox = document.querySelector('.alert');
let card;

const API_KEY = 'AIzaSyBj0nj-ofGQXzXqVfkwJlA8HD3jkXNZ-NI';
const URL_KEY = 'https://www.googleapis.com/youtube/v3/commentThreads';

//Complete Functionality
btnSumbit.addEventListener('click', (e) => {
  e.preventDefault();
  const URL = input.value;
  if (verifyURL(URL)) {
    VIDEO_ID = input.value.split('?v=')[1];
    const FULL_URL = `${URL_KEY}?key=${API_KEY}&textFormat=plainText&part=snippet&videoId=${VIDEO_ID}&maxResults=100`;
    const data = fetchData(FULL_URL);
    displayData(data);
  } else {
    alertBar();
  }
});

// _________________________________________________________________________________//
//Display Data Function
function displayData(el) {
  el.then((response) => response.json()).then((data) => {
    container.innerHTML = '';
    data.items.forEach((item) => {
      const {
        authorChannelUrl,
        authorDisplayName,
        authorProfileImageUrl,
        textDisplay,
      } = item.snippet.topLevelComment.snippet;
      cardBuilder(
        authorProfileImageUrl,
        authorDisplayName,
        authorDisplayName,
        textDisplay,
        authorChannelUrl
      );
    });
  });
}

//Card Builder function
function cardBuilder(imgURL, name, comment, channelURL) {
  card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `<div class="card-img">
                  <img
                    src="${imgURL}"
                    alt="${name}"
                  />
                </div>
                <div class="content">
                  <div class="card-title">
                    <h1>${name}</h1>
                  </div>
                  <div class="card-comments">
                    <h3>${comment}</h3>
                  </div>
                  <div class="card-profile">
                    <a href="${channelURL}">Visit Channel</a>
                  </div>
                </div>`;
  container.appendChild(card);
}

//Fetch Data Function
async function fetchData(values) {
  const data = await fetch(values);
  return data;
}

//Verify URL function
function verifyURL(url) {
  if (url.includes('https://www.youtube.com/watch?v=')) {
    return true;
  } else false;
}

//alert function for verification
function alertBar() {
  alertBox.innerHTML = `Please check your URL. It must include <pre>https://<pre>`;
  alertBox.classList.add('show');
  setTimeout(() => {
    alertBox.innerHTML = '';
    alertBox.classList.remove('show');
  }, 2000);
  body.append(alertBox);
}
