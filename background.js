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
var onReceive = function(info) {
  if (info.socketId !== socketId)
    return;
 console.log(ab2str(info.data)); //convert byte array to text.  it is however, primarily floating point numbers, so get a better converter.
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