import ApolloClient from 'apollo-boost';

export const getClient = (token) => {
   return new ApolloClient({
    uri: 'http://localhost:4000/',
    request: (operation) => {
      if(token) {
        operation.setContext({
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
      }
    },
    onError: (e) => { console.log(e) },
  });
}