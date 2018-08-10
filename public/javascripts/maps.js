
//intento 1
//obtiene la direccion mediante la api de maps y en el input de direccion 

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

//datos con boton encuentrame
// var lat = document.getElementById("lat");
// var lng = document.getElementById("lng");
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

// let title = '{{name}}';

//      const map = new google.maps.Map(
//         document.getElementById('map'),
//         {
//             center,
//             zoom:15
//         }
//     );
//     const marker = new google.maps.Marker({
//         map,
//         position:{
        
//         },
//         title,
//         animation: google.maps.Animation.BOUNCE
//     });
     


//obtiene los datos del la posicion 
// var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };

// function success(pos) {
//   var crd = pos.coords;

//   console.log('Your current position is:');
//   console.log('Latitude : ' + crd.latitude);
//   console.log('Longitude: ' + crd.longitude);
//   console.log('More or less ' + crd.accuracy + ' meters.');
// };

// function error(err) {
//   console.warn('ERROR(' + err.code + '): ' + err.message);
// };

// navigator.geolocation.getCurrentPosition(success, error, options);

//"https://maps.googleapis.com/maps/api/js?key=AIzaSyB-14hVewjP3BDtGFfOsy36obNYblwSapk&libraries=places"






// function initMap(){
//   let options = {
//     center: {lat: 19.3977705, lng: -99.1735841},
//       zoom: 13
//   }
//   let map = new google.maps.Map(document.getElementById('map'), options)

//     google.maps.event.addListener(map, 'click', function(event){
//       // Add marker
//       addMarker({coords:event.latLng});
//   }); //end of map 
// }//end of initMap function





