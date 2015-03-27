
var map;
var planeMarker;
var tracking = true;
var trailing = true;

function handleCheckBoxClick(cb)
{
  if(cb.name==="trackingBox")
    tracking = cb.checked;
}

google.load("maps", "3", {other_params:'sensor=TRUEorFALSE',  
  callback: function initialize() 
  {
    
    var myCenter=new google.maps.LatLng(51.508742,-0.120850);
	
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = 
    {
      center: myCenter,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    
    map = new google.maps.Map(mapCanvas, mapOptions);
    

    
    planeMarker=new google.maps.Marker({position:myCenter,  icon: 
      {
	path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
	strokeWeight:3,
	scale: 7,
	rotation: 0
      }
      ,});
    
    planeMarker.setMap(map);
    
  }
}
);

window.addEventListener("message", receiveMessage, false);



function receiveMessage(event)
{
  //console.log(event.data);
  
  var coordsArray = event.data.split(",");
  
  //	console.log(coordsArray);
  
  setMapCoords(parseFloat(coordsArray[0]), parseFloat(coordsArray[1]), parseFloat(coordsArray[2]));
  
  
}
var lastUpdate = performance.now();
function setMapCoords(lattitude, longitude, heading)
{
  
  if(performance.now() - lastUpdate > 500)
  {
      console.log("adding a point to the polyline...");
      lastUpdate = performance.now();
  }
 
  var newLatLng = new google.maps.LatLng(lattitude, longitude)
  
  if(tracking)
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
