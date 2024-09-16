import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../lib/schema'; // Adjust the path as necessary
import { resolvers } from '../../lib/resolvers'; // Adjust the path as necessary
import connectToDatabase from '../../lib/mongodb'; // Adjust the path as necessary

let apolloServer;
let apolloServerHandlerPromise;

const startApolloServer = () => {
  if (!apolloServer) {
    apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: async () => {
        await connectToDatabase();
      },
    });

    apolloServerHandlerPromise = apolloServer.start().then(() => {
      return apolloServer.createHandler({ path: '/api/graphql' });
    });
  }

  return apolloServerHandlerPromise;
};

export const config = {
  api: {
    bodyParser: false, // Important for Apollo Server with Micro
  },
};

export default async function handler(req, res) {
  const handler = await startApolloServer();
  return handler(req, res);
}
