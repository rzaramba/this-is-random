let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.0902, lng: -95.7129 },
    zoom: 10,
  });
  infoWindow = new google.maps.InfoWindow();

  // const locationButton = document.createElement("button");
  //moved button from box to top of google maps
  //findMyLocation replaced all of locationButton in function...

  const findMyLocation = document.querySelector("#btn");

  findMyLocation.textContent = "Find My Location";
  findMyLocation.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(findMyLocation);
  findMyLocation.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  console.log(navigator.geolocation.getCurrentPosition.position);
  //tried to console/log current location but it is not defined.
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;
//Geocoding API

var geocoder;
var mapOne;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlang = new google.maps.LatLng(42, -84);

  var myOptions = {
    center: latlang, zoom: 5, mapTypeId: google.maps.MapTypeId.SATELLITE,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL
    }
  };
  var mapOne = new google.maps.Map(document.getElementById("map-2"),
    myOptions);

  if (localStorage.userLocation) {
    document.getElementById("newLocation").value = localStorage.userLocation
  }
  console.log(localStorage.userLocation);
}

function codeAddress() {
  var sAddress = document.getElementById("newLocation").value;
  geocoder.geocode({ 'address': sAddress }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      console.log(sAddress);
      localStorage.setItem("userLocation", sAddress);
    }
    else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });

};

// Yelp API

// The method below using the bearer token is not safe because anyone can read the code and use the authorization for their own project, however, for the purposes of the front end of the app working and this course we are doing it like this.
document.querySelector('#inputButtonGeocode').addEventListener('click', function () {

  var YELP_URL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?locale=en_US&limit=7&city=${document.getElementById("newLocation").value}`;

  var YELP_API_KEY = '2ZhlYRdEeLQ6L6Ar-oilki-PPnB4uUxOvbLOWfrLFiJlW78u-0Cdik77mlXZKQb0nFMQ5SX8GzzgjLjNXAeTo5RjKU_KkbBskWczcaTnuwEqiP6dYgPZd_8MEbSbYnYx';


  var req = new Request(YELP_URL, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${YELP_API_KEY}`,
      'Content-Type': 'application/json'
    }),

  });

  fetch(req)
    .then((tacocat) => {
      if (tacocat.ok) {
        return tacocat.json();
      } else {

        throw new Error();
      }
    })
    .then((jsonData) => {
      console.log(jsonData);
    })
    .catch((err) => {
      console.log('ERROR: ', err.message);
    });

})

//modal js
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});





    // pop screen

