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
//dynamic geocoding using user input...still reading documentation, need help with geocoding requests...
//Yelp api code starts here

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
  }

  function codeAddress() { 
    var sAddress = document.getElementById("newLocation").value;
    geocoder.geocode( { 'address': sAddress}, function(results, status) { 
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
                });
            }
            else{
            alert("Geocode was not successful for the following reason: " + status);
            }
        });
  }
