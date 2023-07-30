// Contents of the worker.js script
const workerScript = `
  self.onmessage = function(event) {
    console.log('Message from Main Thread:', event.data);
    self.postMessage('Hello from Web Worker!');
  };
`;

// Use the Blob URL to create a web worker
const worker = new Worker(URL.createObjectURL(new Blob([workerScript], { type: 'application/javascript' })));

// Add an event listener to receive messages from the worker
worker.onmessage = function(event) {
  console.log('Message from Web Worker:', event.data);
};

// Post a message to the worker
worker.postMessage('Hello from Main Thread!');

// Don't forget to revoke the Blob URL when it's no longer needed
URL.revokeObjectURL(blobUrl);




