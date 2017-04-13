// Server initializing modules
const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

// Creating Server
const server = new Hapi.Server();

// Server Port Listener
server.connection({ port: 4800, host: 'localhost' });

// Server Routing
server.register(require('inert'), (err) => {
  if(err) throw err;

  server.route({
    method:'GET',
    path: '/',
    handler: (request, reply) {
      reply.file('./client/index.html')
    }
  })
});

// Start server
server.start((err) => {
  if(err) throw err;
  console.log(`Server running at ${server.info.uri}`)
})
