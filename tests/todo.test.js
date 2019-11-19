import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import { prisma } from '../src/generated/prisma-client';
import { getClient } from './utils/getClient';

const client = getClient();
let  authenticatedClient;
let todoId;

beforeAll(async () => {
  await prisma.deleteManyUsers()
  await prisma.deleteManyTodoes();

  const createUser = gql`
            mutation {
              createUser(data: {
                name: "Gbolahan Olagunju",
                email: "gbols@example.com",
                password: "dafeMania"
              }){
                token
                user {
                  id
                }
              }
            }
            `;
            
     const authenticatedUser = await client.mutate({
      mutation: createUser
    });
    authenticatedClient = getClient(authenticatedUser.data.createUser.token);
});

describe('Tests that can be performed on the Todo Mutation', () => {
  it('should not allow an authenticated user create a TODO ', async () => {
      const createTodo = gql`
      mutation {
        createTodo(data: {
          title: "Buy Potatoes",
          body: "Buy yam from the supermarket for everyone to eat at 10pm"
        }){
          title
          body
          id
        }
      }
      `;
      await expect(client.mutate({
        mutation: createTodo
      })).rejects.toThrowError("Authentication required");
  });

  it('should create a todo for a authenticated user', async () => {
    const createTodo = gql`
    mutation {
      createTodo(data: {
        title: "Buy Potatoes",
        body: "Buy yam from the supermarket for everyone to eat at 10pm"
      }){
        title
        body
        id
      }
    }
    `;

    const todo = await authenticatedClient.mutate({
      mutation: createTodo
    });
    todoId = todo.data.createTodo.id
    const exists = await prisma.$exists.todo({id: todoId});
    expect(exists).toBe(true);
  });

  it('should update a TODO', async () => {
    const variables = {
      id: todoId
    }
    const updateTodo = gql`
    mutation($id: ID!){
      updateTodo(id: $id , data: {
        title: "Buy Ice Cream",
        body: "Buy Ice Cream from the store"
      }){
        title
        body
      }
    }
    `;
    const updatedTodo = await authenticatedClient.mutate({
      mutation: updateTodo, variables
    });
    expect(updatedTodo.data.updateTodo.title).toBe('Buy Ice Cream');
    expect(updatedTodo.data.updateTodo.body).toBe('Buy Ice Cream from the store');
  });

  it('should delete a TODO', async () => {
    const variables = {
      id: todoId
    }
    const deleteTodo = gql`
    mutation($id: ID!){
      deleteTodo(id: $id){
        title
        body
      }
    }
    `;

    const deletedTodo = await authenticatedClient.mutate({
      mutation: deleteTodo, variables
    });
    const exists = await prisma.$exists.todo({id : todoId});
    expect(exists).toBe(false);
  });
});