import { createServer, Response } from 'miragejs';

function createMockServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.namespace = 'api'; // Define a namespace for all mock API routes

      this.post('/todos', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        if (attrs.title.toLowerCase() === 'Error') {
          return new Response(400, {}, { errors: { title: 'Title cannot be "Error"' } });
        }

        return new Response(200, {}, { todo: attrs });
      });
    },
  });

  return server;
}

export default createMockServer;
