const users = {};

const getUsers = (request, response) => {
  const responseJSON = JSON.stringify(users);

  response.writeHead(200, {
    'Content-Type': 'application/json',
  });

  response.write(responseJSON);
  response.end();
};

const getUsersMeta = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'application/json',
  });

  response.end();
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  response.writeHead(404, {
    'Content-Type': 'application/json',
  });

  response.write(JSON.stringify(responseJSON));
  response.end();
};

const notFoundMeta = (request, response) => {
  response.writeHead(404, {
    'Content-Type': 'application/json',
  });

  response.end();
};

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';

    response.writeHead(400, {
      'Content-Type': 'application/json',
    });

    response.write(JSON.stringify(responseJSON));
    response.end();
    return;
  }

  if (users[body.name]) {
    users[body.name].age = body.age;

    response.writeHead(204, {
      'Content-Type': 'application/json',
    });

    response.end();
    return;
  }

  users[body.name] = {
    name: body.name,
    age: body.age,
  };

  responseJSON.message = 'Created Successfully';

  response.writeHead(201, {
    'Content-Type': 'application/json',
  });

  response.write(JSON.stringify(responseJSON));
  response.end();
};

module.exports = {
  getUsers,
  getUsersMeta,
  notFound,
  notFoundMeta,
  addUser,
};