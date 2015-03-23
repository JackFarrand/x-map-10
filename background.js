var mainWindowID;			//ID variable to retrieve the main window created by the app
var socketId;				//ID of the socket we are using to receive the UDP data
var lat, lon, heading;			//Storage for lattitude, longitude, and headinging of the aircraft.


chrome.app.runtime.onLaunched.addListener(
  function() 
  {
    chrome.app.window.create('window.html', 
			     {
				id: "mainwin",
				innerBounds: {width: 500, height: 309}
			     }, 
			     
			     function(win) //callback
			     {
			       mainWindowID = win.id;
			     }
    );   
  });


// Create the Socket
chrome.sockets.udp.create({}, 	function(socketInfo) 
{
  socketId = socketInfo.socketId;
  
  // Setup event handler and bind socket.
  chrome.sockets.udp.onReceive.addListener(onReceive);
  chrome.sockets.udp.bind(socketId, "0.0.0.0", 49003, function(result) 
  {
    if (result < 0) 
    {
      console.log("Error binding socket.");
      return;
    }
    else
      console.log("socket bound!");     
  }
  );
}
);

var onReceive = function(info) // Handle the Socket "onReceive" event.
{
  if (info.socketId !== socketId)
    return;
  
  var recLen = info.data.byteLength;
  
  recLen -= 36; //subtract the byte length of a data set transmission from XP10 from the Bytes received, to make sure we don't indexOutOfBounds
  
  for(var i = 5; i <= recLen; i+=36)
  {
    //first 4 bytes are the integer that identifies the next 8 floats.
    var id = new Uint32Array(info.data.slice(i, i+4))[0];  //console.log("identifier received: " + id);
    
    if(id === 20) //ID for Lattitude and Longitude Etc.
    {     
      var floatView = new Float32Array(info.data.slice(i+4, i+36));    
      
      lat = floatView[0];
      lon = floatView[1];
    }
    
    if(id === 17)
    {     
      var floatView = new Float32Array(info.data.slice(i+4, i+36));    
      
      heading = floatView[2];
    }
  }
  
  if(chrome.app.window.get("mainwin")) //if the damn window exists, write a message to it, else, just return.
    chrome.app.window.get("mainwin").contentWindow.document.getElementById("mapFrame").contentWindow.postMessage("" + lat + "," + lon + "," + heading, '*');
  
};
