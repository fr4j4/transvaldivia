/*
-39.803796, -73.269065 								 -39.803796,-73.182377

		^					+   <-longitud -> -
		        +---------------------------------------------+
		-		 -											   -
				 -											   -
		l		 -   -->									   -
		a		 -		                    			<--	   -
		t		 -											   -
		i		 -					VALDIVIA				   -
		t		 -											   -
		u		 -											   -
		d		 -											   -
		+		 -											   -
		|		 -											   -
		v		 -											   -
		         +---------------------------------------------+
		

-39.856902, -73.269065												 -39.856902, -73.182377

*/
//proposito del bot: obtener paraderos de la ciudad de valdivia
//var API_KEY='AIzaSyDesV0pveJzriPnvtbAl--z-rwImMoImwg'

var top_left ={lat:-39.803796,lng:-73.269065};
var bot_left ={lat:-39.856902,lng:-73.269065};
var top_right={lat:-39.803796,lng:-73.182377};
var bot_right={lat:-39.856902,lng:-73.182377};
var timeout=100;
var d_lat=0.0025,d_lng=0.025;
var sentido_lat=-1;
var sentido_lng=1;
var finished=false;
var position;
var table;
var found=0;
var iteraciones=0;
var perc_x=0.0,perc_y=0.0,perc_all=0.0;
var map;
var paraderos = {};
function init(){
	log("~by fr4j4~");
	finished=false;
	found=0;
	$('#contador_paraderos').html(found);
	log("Inicializando bot ...");
	position = new google.maps.LatLng(top_left.lat,top_left.lng);
	$('#bot_position').html('('+position.lat()+","+position.lng()+")");
	log("Posicion establecida a: ("+position.lat()+" , "+position.lng()+")");
	log("Bot inicializado.");
}

function setLocation(lat,long){
	log("Posicion establecida");
}

function run(){
	//(top_right.lng - top_left.lng)
	if(sentido_lng>0){
		perc_x=(((position.lng()-top_left.lng)/(top_right.lng - top_left.lng))*100);
	}else{
		perc_x=100-(((position.lng()-top_left.lng)/(top_right.lng - top_left.lng))*100);
	}
	if(perc_x<0){perc_x=0;}
	if(perc_x>100){perc_x=100;}
	perc_x=perc_x.toFixed(2);
	perc_y=(1-(position.lat()-bot_left.lat)/(top_left.lat- bot_left.lat))*100;

	perc_all+=perc_y*(perc_x/1000.0);
	//console.log(perc_all);
	map.panTo(position);
	//map.setZoom(17);
	$('#bot_position').html('('+position.lat()+","+position.lng()+")");
	if(iteraciones>=10){iteraciones=0;}
	$('#contador_paraderos').html(found);
	log("Buscando paraderos: ");
	log(perc_y+"% ,"+perc_x+" %");
	//log(position);
	var request={
		location:position,
		radius:50000,
		query:'bus_stop',
		types:['bus_stop'],
	};
	service = new google.maps.places.PlacesService($('#map2').get(0));//mapa falso
	//service.nearbySearch(request, google_search_callback);
	service.textSearch(request, google_search_callback);
	var temp_lng=position.lng();
	var temp_lat=position.lat();
	var prev_lng=temp_lng,prev_lat=temp_lat;
	
	//comportamiento
	//si esta entre top y bot
	if(position.lat()<=top_left.lat && position.lat()>=bot_left.lat ){
		if(sentido_lng==-1&&position.lng()<top_left.lng){//izquierda a derecha
			console.log("Eeeepa!! ->");
			sentido_lng=1;
			temp_lng=prev_lng;
			temp_lat=temp_lat+(d_lat*sentido_lat);
		}else if(sentido_lng==1&&position.lng()>top_right.lng){//derecha a izquierda
			console.log("Eeeepa!! <-");
			sentido_lng=-1;
			temp_lng=prev_lng;
			temp_lat=temp_lat+(d_lat*sentido_lat)
		}
		temp_lng=temp_lng+d_lng*sentido_lng;
	}else{
		finished=true;
		generateFile();
	}
	position =new google.maps.LatLng(temp_lat,temp_lng);
}

function google_search_callback(results, status){
	if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
		var place = results[i];
    	if(!check_if_exist(place.id)){
			//log("Nuevo paradero encontrado: "+place.name+" "+place.geometry.location);
    		paraderos[place.id.toString()]=place;
    		found++;
    	$('#table').append("<tr><td>"+num_paraderos()+"</td><td>"+place.id+"</td><td>"+place.name+"</td><td>"+place.geometry.location.lat()+"</td><td>"+place.geometry.location.lng()+"</td></tr>");
    	$('#contador_paraderos').html(found);
    	}
    }
  }
  if(!finished){
  	setTimeout(function(){run();},timeout);
  }else{
  	log("Busqueda finalizada.");
  }
}

function num_paraderos(){
	var count = 0
	$.each(paraderos, function(index, value) {
    	count++;
	})
	return count;
}

//previene agregar paraderos que ya se ingresaron (por ID)
function check_if_exist(new_key){
	var exists=false;
	for(var key in paraderos){
		if(key===new_key){
			exists=true;
			break;
		}
	}
	return exists;
}

function log(text){//imprime en la salida
	//console.log(text);
	$('#output').html($('#output').html()+text+"<br>");//insertar texto
	$('#output').scrollTop($('#output')[0].scrollHeight);//hacer scroll hacia el final
}

function output_clear(){
	$('#output').html('');
}

function initMap(){
	log("inicializado mapa...");
	map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: top_left.lat, lng:top_left.lng},// -73.2505124},
	    zoom: 14,
	    mapTypeId: google.maps.MapTypeId.HYBRID,
  	});

	log("mapa inicializado correctamente.");
}

function generateFile(){
	$('#download_link').css('display','inline-block');
	log("Generando archivo (espere) .....");
	var f="";
	for(key in paraderos){
		var separador=";";
		var lat=paraderos[key].geometry.location.lat();
		var lng=paraderos[key].geometry.location.lng();
		var linea=""+paraderos[key].name+separador+lat+separador+lng+"\n";
		f+=linea;
	}
	var a = document.getElementById("download_link");
	var file = new Blob([f], {type: 'text/plain'});
	a.href = URL.createObjectURL(file);
	a.download = "paraderos.txt";
	log("Archivo generado, listo para descargar");
}