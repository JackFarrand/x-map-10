chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'bounds': {
      'width': 960,
      'height': 540
    }
  });
});

var socketId;

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}
// Handle the "onReceive" event.
var onReceive = function(info) 
{
  if (info.socketId !== socketId)
    return;
  
 //console.log(ab2str(info.data)); //convert byte array to text.  it is however, primarily floating point numbers, so get a better converter.
 //console.log(info.data.byteLength);
var i;  

var recLen = info.data.byteLength;

recLen -= 36;

console.log("received bytes length: " + recLen)

  for(i = 5; i <= recLen; i+=36){
    //first 4 bytes are the integer that identifies the next 8 floats.
    var id = new Uint32Array(info.data.slice(i, i+4))[0]; 
    console.log("identifier received: " + id);
    
    if(id === 20)
    {     
       var floatView = new Float32Array(info.data.slice(i+4, i+36));    
       console.log("Lattitude: " + floatView[0]);
       console.log("Longitude: " + floatView[1]);
    }
  }

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