// Server initializing modules
const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

// Creating Server
const server = new Hapi.Server();

let port = process.env.PORT || 4800
// Server Port Listener
server.connection({ port: 4800, host: 'localhost' });

// Server Routing
server.register(require('inert'), (err) => {
  if(err) throw err;

  // Path: '/'
  server.route({
    method:'GET',
    path: '/',
    handler: (request, reply) => {
      reply.file('./client/index.html')
    }
  });
  // Path: '/jane'
  server.route({
    method:'GET',
    path: '/jane',
    handler: (request, reply) => {
      reply.file('./client/jane.html')
    }
  });
  // Path: JS, CSS Directories
  server.route({
    method: 'GET',
    path: '/scripts/{file*}',
    handler: {
      directory: {
        path: 'client/scripts'
      }
    }
  });
  server.route({
    method: 'GET',
    path: '/styles/style.css',
    handler: function (request, reply) {
      reply.file('./client/styles/style.css')
    }
  })
  // Path to Assets
  server.route({
    method: 'GET',
    path: '/assets/{file*}',
    handler: {
      directory: {
        path: './client/assets'
      }
    }
  });
});
// Start server
server.start((err) => {
  if(err) throw err;
  console.log(`Server running at ${server.info.uri}`)
})
