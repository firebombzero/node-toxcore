/**
 * A tiny tox bot example using node-toxcore's synchronous methods (new_api).
 */

var toxcore = require('toxcore').new;
var tox = new toxcore.Tox();

// Specify nodes to bootstrap from
var nodes = [
  { maintainer: 'Impyy',
    address: '178.62.250.138',
    port: 33445,
    key: '788236D34978D1D5BD822F0A5BEBD2C53C64CC31CD3149350EE27D4D9A2F9B6B' },
  { maintainer: 'sonOfRa',
    address: '144.76.60.215',
    port: 33445,
    key: '04119E835DF3E78BACF0F84235B300546AF8B936F035185E2A8E9E0A67C8924F' }
];

// Bootstrap from nodes
nodes.forEach(function(node) {
  tox.bootstrapSync(node.address, node.port, node.key);
  console.log('Successfully bootstrapped from ' + node.maintainer + ' at ' + node.address + ':' + node.port);
  console.log('... with key ' + node.key);
});

tox.on('selfConnectionStatus', function(e) {
  console.log(e.isConnected() ? 'Connected' : 'Disconnected');
});

tox.on('friendName', function(e) {
  console.log('Friend[' + e.friend() + '] changed their name: ' + e.name());
});

tox.on('friendStatusMessage', function(e) {
  console.log('Friend[' + e.friend() + '] changed their status message: ' + e.statusMessage());
});

tox.on('friendStatus', function(e) {
  console.log('Friend[' + e.friend() + '] changed their status: ' + e.status());
});

tox.on('friendConnectionStatus', function(e) {
  console.log('Friend[' + e.friend() + '] is now ' + (e.isConnected() ? 'online' : 'offline'));
});

tox.on('friendTyping', function(e) {
  console.log('Friend[' + e.friend() + '] is ' + (e.isTyping() ? 'typing' : 'not typing'));
});

tox.on('friendReadReceipt', function(e) {
  console.log('Friend[' + e.friend() + '] receipt: ' + e.receipt());
});

tox.on('friendRequest', function(e) {
  tox.addFriendNoRequestSync(e.publicKey());
  console.log('Received friend request: ' + e.message());
  console.log('Accepted friend request from ' + e.publicKeyHex());
});

tox.on('friendMessage', function(e) {
  if(e.isAction()) {
    console.log('** Friend[' + e.friend() + '] ' + e.message() + ' **');
  } else {
    console.log('Friend[' + e.friend() + ']: ' + e.message());
  }
});

console.log('Address: ' + tox.getAddressHexSync());

// Start the tox_iterate loop
tox.start();
