var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  // only respond with listingData if GET request is sent to the '/listings' path
  if (request.method === 'GET' && parsedUrl.pathname == '/listings') {
    response.end(listingData);
  }
  // otherwise it sends a 404 error
  else
  {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Bad gateway error');
    response.end();
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
 
  //Check for errors
  if (err) throw err;

   //Save the state in the listingData variable already defined
  listingData = data;

  //Creates the server
  server = http.createServer(requestHandler);

  //Start the server
  server.listen(port);
});
