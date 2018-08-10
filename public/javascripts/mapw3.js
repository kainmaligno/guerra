//intento 3

var map, infoWindow;
let address = document.getElementById('address') 
let lat = document.getElementById('lat')
let lng = document.getElementById('lng')
let title = "{{name}}"
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 19.3977705, lng: -99.1735841},
          zoom: 15,
          
        });
      
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            

            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Guerrero Urbano',
                animation: google.maps.Animation.BOUNCE
              });

            infoWindow.setPosition(pos);
            infoWindow.setContent('Guerrero Urbano Localizado');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

      initMap();


//obtiene la direccion mediante la api de maps y en el input de direccion 



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