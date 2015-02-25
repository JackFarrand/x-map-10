var theId;

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
  theId = win.id;
  }
    );   
});

var socketId;

var lat, lon;

// Handle the "onReceive" event.
var onReceive = function(info) 
{
  if (info.socketId !== socketId)
    return;
  
 //console.log(ab2str(info.data)); //convert byte array to text.  it is however, primarily floating point numbers, so get a better converter.
 //console.log(info.data.byteLength);  console.log("yup");
  
 

var recLen = info.data.byteLength;

recLen -= 36; //subtract the byte length of a data set transmission from XP10 from the Bytes received, to make sure we don't indexOutOfBounds

//console.log("received bytes length: " + recLen)

  for(var i = 5; i <= recLen; i+=36){
    //first 4 bytes are the integer that identifies the next 8 floats.
    var id = new Uint32Array(info.data.slice(i, i+4))[0]; 
    //console.log("identifier received: " + id);
    
    if(id === 20)
    {     
       var floatView = new Float32Array(info.data.slice(i+4, i+36));    
     //  console.log("Lattitude: " + floatView[0]);
    //   console.log("Longitude: " + floatView[1]);
       
       lat = floatView[0];
       lon = floatView[1];
    }
  }

  if(chrome.app.window.get("mainwin")) //if the damn window exists, write a message to it, else, just return.
  chrome.app.window.get("mainwin").contentWindow.document.getElementById("mapFrame").contentWindow.postMessage("" + lat + "," + lon , '*');
  
};

// Create the Socket
chrome.sockets.udp.create({}, function(socketInfo) {
  socketId = socketInfo.socketId;
  // Setup event handler and bind socket.
  chrome.sockets.udp.onReceive.addListener(onReceive);
  chrome.sockets.udp.bind(socketId,
    "0.0.0.0", 49003, function(result) {
      if (result < 0) {
        console.log("Error binding socket.");
        return;
      }
      else
	console.log("socket bound!");     
  });
});