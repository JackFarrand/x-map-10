
       var map;
       var planeMarker;
     
      google.load("maps", "3", {other_params:'sensor=TRUEorFALSE',
      
      callback: function initialize() 
	{
	    var mapCanvas = document.getElementById('map-canvas');
	    var mapOptions = 
	    {
	      center: new google.maps.LatLng(44.5403, -78.5463),
	      zoom: 8,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    }
	  
	  map = new google.maps.Map(mapCanvas, mapOptions);
	  
	  var myCenter=new google.maps.LatLng(51.508742,-0.120850);
	  
	  planeMarker=new google.maps.Marker({position:myCenter,  icon: 
	  {
	    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
	    strokeWeight:2,
	    scale: 7,
	    rotation: 0
	  }
	  ,});
  
	  planeMarker.setMap(map);
       
	}
      }
    );
       
      var counter = 0;
      function setMapCoords(lattitude, longitude, heading)
      {
	var newLatLng = new google.maps.LatLng(lattitude, longitude)
	
	  map.panTo(newLatLng);
	
	planeMarker.setPosition(newLatLng);
	planeMarker.setIcon( {
	    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
		strokeWeight:2,
	    scale: 7,
	    rotation: heading
	  }
	  );
	  
      }
      
      window.addEventListener("message", receiveMessage, false);

      function receiveMessage(event)
      {
	//console.log(event.data);
	
	var coordsArray = event.data.split(",");
	
//	console.log(coordsArray);
	
	setMapCoords(parseFloat(coordsArray[0]), parseFloat(coordsArray[1]), parseFloat(coordsArray[2]));
	

      }
      