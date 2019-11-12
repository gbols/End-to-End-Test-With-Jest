import  { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { prisma } from './generated/prisma-client'

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: req => ({
    prisma,
    req
  })
 });

export default server;