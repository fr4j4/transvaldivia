var map;
	var pinUser,pinStop,pinStop2;
	var lat=-1,long=-1;
	var first=true;
	var json;

	function getNearby(){
		$.ajax(
			{
				url: "http://localhost:8000/API/nearby_stops/"+lat+","+long,
				async: false,//importante
				success: function(result){
        		json=JSON.parse(JSON.stringify(result));


    	},error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
      }


    });	
	}
	
	function getLocation() {
		
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(getPos_callback,error,{enableHighAccuracy:true,timeout:60000, maximumAge:60000});
	    } else {
			alert("Su navegador no soporta geolocalización.");
		}
	}

	function error(e){
		var errors = { 
	    	1: 'Permiso denegado',
		    2: 'Posición no disponible',
		    3: 'Tiempo de espera terminado'
		};
		//alert("Error al obtener datos del GPS\n["+errors[e.code]+"]");
		$('#status').html("Error: "+errors[e.code]);
	}

	function getPos_callback(p){
		lat=p.coords.latitude;
		long=p.coords.longitude;
		$('#latitude').val(lat);
		$('#longitude').val(long);
		initMap();
		$('#status').html("Posición obtenida con exito!");
		if(first){
			reset_map();
			first=false;
		}
		getNearby();
		$('#resumen').html('')
		var resumen="Error al recibir la información.";
		if(json){
			resumen='';
			if(parseInt(json['summary'].total)>1){
				resumen+="Se han encontrado <b>"+json['summary'].total+"</b> "+json['summary'].item_name_plu+" cercanos en 200 "+json['summary'].dist_plu+" de radio.";
			}else if(parseInt(json['summary'].total)===1){
				resumen+="Se ha encontrado <b>un</b> "+json['summary'].item_name_sing+" cercano en 200 "+json['summary'].dist_plu+" de radio.";
			}else{
				resumen+="No de ha encontrado <b>ningun</b> "+json['summary'].item_name_sing+" cercano en 200 "+json['summary'].dist_plu+" de radio.";
			}
			resumen+="<br>";
			var mas_cercano;
			var first=true;
			var min_dist;

			for(o in json.items){
				var i=json.items[o];
				if(first===true){
					mas_cercano=i;
					first=false;
				}
				if(i.dist<mas_cercano.dist){
					mas_cercano=i;
				}
			}

			for(o in json.items){
				var i=json.items[o];
				var i_name=i.nombre;
				var i_dist=i.dist;
				var i_lat=parseFloat(i.lat);
				var i_lng=parseFloat(i.lng);
				
				/*
				console.log('lat:'+i_lat);
				console.log('lng:'+i_lng);
				console.log("");
				*/
				if(i!=mas_cercano){
					var marker = new google.maps.Marker({
					    position: {lat: i_lat, lng: i_lng},
					    map: map,
					    icon: pinStop,
			  		});
				}else{
					var marker = new google.maps.Marker({
					    position: {lat: i_lat, lng: i_lng},
					    map: map,
					    icon: pinStop2,
			  		});
				}

			}
			if(mas_cercano){
			resumen+="- Paradero más cercano :&nbsp;:&nbsp;<img height='25' src='"+stopMarkImage2+"'><br>";
			resumen+="<b> "+mas_cercano.nombre+"</b><br>";
			resumen+="<b> "+parseFloat(mas_cercano.dist).toFixed(2)+" "+json['summary'].dist_plu+" de distancia.</b><br>";
			//console.log(json.summary.latitude);
			}
		}
		$('#resumen').html(resumen)

		var marker = new google.maps.Marker({
		    position: {lat: lat, lng: long},
		    map: map,
		    icon: pinUser,
		    title: 'Usted está aquí!',
  		});
	}

	function reset_map(){
		google.maps.event.trigger(map, 'resize');
		var lat=parseFloat($('#latitude').val());
		var long=parseFloat($('#longitude').val());
		if(map){
			  //var target = new google.maps.LatLng(location.lat,location.lng);
			  map.panTo({lat: lat, lng: long});
			  map.setZoom(17);
		}
	}
	function initMap() {
		$('#map_box').collapse();
		$('#map').css('display','block');
		// Create a map object and specify the DOM element for display.

		pinUser = new google.maps.MarkerImage(
		    userMarkImage,
		    null, /* size is determined at runtime */
		    null, /* origin is 0,0 */
		    null /* anchor is bottom center of the scaled image */
		);

		pinStop = new google.maps.MarkerImage(
		    stopMarkImage,
		    null, /* size is determined at runtime */
		    null, /* origin is 0,0 */
		    null, /* anchor is bottom center of the scaled image */
		    new google.maps.Size(28, 40)
		);

		pinStop2 = new google.maps.MarkerImage(
		    stopMarkImage2,
		    null, /* size is determined at runtime */
		    null, /* origin is 0,0 */
		    null, /* anchor is bottom center of the scaled image */
		    new google.maps.Size(28, 40)
		);

		var styles = [{
		featureType: "transit.station.bus",//esconder paraderos
		stylers: [{
		    visibility: "off"
		  	}]
		}];
		var lat=parseFloat($('#latitude').val());
		var long=parseFloat($('#longitude').val());
		
		var mapOptions = {
		    disableDefaultUI: true,
			styles:styles,
		    zoom: 17,
		    center: {lat: lat, lng: long},
		    mapTypeId:google.maps.MapTypeId.ROADMAP,
		    mapTypeControlOptions: {
		      mapTypeIds: ['map_style',]
		    }
		  };
	 	map = new google.maps.Map(document.getElementById('map'));
		map.setOptions(mapOptions);
	}