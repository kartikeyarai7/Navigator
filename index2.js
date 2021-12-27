const apiKey = 'KEY_HERE';

let sub = document.getElementById('sub');
let namePlace = document.getElementById('name');
let longitude = document.getElementById('lon');
let latitude = document.getElementById('lat');
let distance = document.getElementById('dmax');
let resultCount = document.getElementById('rmax');
let currentlat = '';
let currentlong = '';
let currentLocation = document.getElementById('curLoc');
let resultArray = [];
let cardContainer = document.getElementById('cardContainer');

window.addEventListener('load', event => {
  getLocation();
});

sub.addEventListener('click', e => {
  e.preventDefault();
  getPlaces(namePlace.value, longitude.value, latitude.value, distance.value, resultCount.value);
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  currentlat = position.coords.latitude;
  currentlong = position.coords.longitude;

  currentLocation.innerHTML = `[ Current Latitude is ${currentlat}, Longitude is ${currentlong} ]`;
}

function getPlaces(name, long, lat, dmax, rmax) {
  try {
    // initGeolocation();
    const authentication = new arcgisRest.ApiKey({
      key: apiKey
    });
    arcgisRest
      .geocode({
        params: {
          category: name,
          location: `${long},${lat}`,
          distance: dmax,
          maxLocations: rmax
        },
        outFields: '*',
        authentication
      })
      .then(response => {
        // console.log('Candidates:', response.candidates);
        resultArray = response.candidates;
        if (resultArray.length !== 0) {
          generateCards(resultArray);
        }
      });
  } catch (error) {
    console.log(error);
  }
}

function generateCards(data) {
  console.log(data);
  data.forEach(item => {
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer col-3 m-4';

    let title = document.createElement('h6');
    title.innerText = item.attributes.LongLabel;
    title.className = 'card-title';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    let d1 = document.createElement('div');
    d1.innerHTML = `Address : ${item.address} <br> Contact : ${item.attributes.Phone} <br> URL : ${item.attributes.URL}`;

    cardBody.appendChild(title);
    cardBody.appendChild(d1);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
    document.body.appendChild(cardContainer);
  });
}
