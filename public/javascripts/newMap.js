
//intento 2

function startMap() {

    // Store Ironhack's coordinates
    const ironhackMexico = { lat: 19.3977705,  lng: -99.1735841 };
  
    // Map initialization
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: ironhackMexico
    });
  
    // Add a marker for Ironhack Mexico
    const IronHackmexMarker = new google.maps.Marker({
      position: {
        lat: ironhackMexico.lat,
        lng: ironhackMexico.lng
      },
      map: map,
      title: "Iron Hack"
    });
  
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const user_location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
  
        // Center map with user location
        map.setCenter(user_location);
  
        // Add a marker for your user location
        const ironHackmexMarker = new google.maps.Marker({
          position: {
            lat: user_location.lat,
            lng: user_location.lng
          },
          map: map,
          title: "You are here"
        });
  
      }, function () {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }
  }
  
  startMap();


let address = document.getElementById('address') 
let lat = document.getElementById('lat')
let lng = document.getElementById('lng')

function autoComplete(input, inputLat, inputLng){
    const dropdown = new google.maps.places.Autocomplete(input)
  

    dropdown.addListener('place_changed', ()=>{
        let place = dropdown.getPlace()
        console.log(place)
        lat.value = place.geometry.location.lat()
        lng.value = place.geometry.location.lng()
    })
}
autoComplete(address, lat, lng)


function getLocation(e) {
    //e.preventDefault()
      if (navigator.geolocation) {
          const nav = navigator.geolocation.watchPosition(showPosition);
        
      } else { 
          x.innerHTML = "Geolocation is not supported by this browser.";}
      }
      
  function showPosition(position) {
      lat.innerHTML="Latitude: " + position.coords.latitude; 
      lng.innerHTML="Longitude: " + position.coords.longitude;
  }