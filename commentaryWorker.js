// Add an event listener to receive messages from the main thread
self.onmessage = function(event) {
  console.log('Message from Main Thread:', event.data);

  // Send a response back to the main thread
  self.postMessage('Hello from Web Worker!');
};
