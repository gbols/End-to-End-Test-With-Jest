import server from './src/app';

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});