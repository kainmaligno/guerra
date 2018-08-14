document.addEventListener('DOMContentLoaded', () => {

  console.log('Guerra de Puestos cargada Exitosmente');

}, false);



// $(document).ready(main);
// console.log("un log1");
// var contador = 1;

// function main(){
// 	$('.menu_bar').click(function(){
// 		 //$('nav').toggle(); 
 
// 		if(contador == 1){
// 			$('nav').animate({
// 				left: '0'
// 			});
// 			contador = 0;
// 		} else {
// 			contador = 1;
// 			$('nav').animate({
// 				left: '-100%'
// 			});
// 		}
 
// 	});
 
// };

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });