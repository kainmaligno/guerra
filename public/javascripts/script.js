document.addEventListener('DOMContentLoaded', () => {

  console.log('Guerra de Puestos cargada Exitosmente');

}, false);


$(document).ready(main);
 
var contador = 1;
 
function main(){
	$('.menu_bar').click(function(){
		 //$('nav').toggle(); 
 
		if(contador == 1){
			$('nav').animate({
				left: '0'
			});
			contador = 0;
		} else {
			contador = 1;
			$('nav').animate({
				left: '-100%'
			});
		}
 
	});
 
};