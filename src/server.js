const http = require('http');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response) => {
  const body = [];

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    jsonHandler.addUser(request, response, bodyParams);
  });
};

const onRequest = (request, response) => {
  console.log(request.url);

  if (request.method === 'POST') {
    if (request.url === '/addUser') {
      handlePost(request, response);
      return;
    }

    jsonHandler.notFound(request, response);
    return;
  }

  if (request.method === 'HEAD') {
    if (request.url === '/getUsers') {
      jsonHandler.getUsersMeta(request, response);
      return;
    }

    jsonHandler.notFoundMeta(request, response);
    return;
  }

  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;

    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;

    case '/getUsers':
      jsonHandler.getUsers(request, response);
      break;

    default:
      jsonHandler.notFound(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});