import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String
    password: String!
    todos: [Todo!]
  }

  type Todo {
    id: ID!
    title: String!
    body: String!
    author: User!
  }

  type Query {
    todo(id: ID!): Todo
    todos: [Todo!]
    users: [User!]
    me: User!
  }

  type Mutation {
    # "User CRUD functionality"
    createUser(data: createUserInput!) : AuthPayLoad!
    loginUser(data: loginUserInput!): AuthPayLoad!
    deleteUser(id: ID!): User!
    updateUser(id: ID!, data: updateUserInput!): User!

    # "Todo CRUD functionality"
    createTodo(data: createTodoInput!): Todo!
    updateTodo(id: ID!, data: updateTodoInput!): Todo!
    deleteTodo(id: ID!): Todo!
  }

  type AuthPayLoad {
    token: String!
    user: User!
  }

  input createUserInput {
    name: String!
    email: String!
    password: String!
  }

  input loginUserInput {
    email: String!
    password: String!
  }

  input updateUserInput {
    name: String
    email: String
    password: String
  }

  input createTodoInput {
    title: String!
    body: String!
  }

  input updateTodoInput {
    title: String
    body: String
  }
`;

export default typeDefs;