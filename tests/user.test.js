import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import { prisma } from '../src/generated/prisma-client';
import { getClient } from './utils/getClient';


const client = getClient();

beforeAll(async () => {
  await prisma.deleteManyUsers()
})

describe('Tests the createUser Mutation', () => {
    it('should not signup a user with a password less than 8 characters', async () => {
          const createUser = gql`
            mutation {
              createUser(data: {
                name: "Gbolahan Olagunju",
                email: "gbols@example.com",
                password: "dafe",
              }){
                token
                user {
                  name
                  password
                  email
                  id
                }
              }
            }
            `;
      
    await expect(client.mutate({
      mutation: createUser
    })).rejects.toThrowError("password must be more than 8 characters");
  })

  it('should successfully create a user with valid credentials', async () => {
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
            
     const res = await client.mutate({
      mutation: createUser
    })
    const exists = await prisma.$exists.user({id : res.data.createUser.id});
    expect(exists).toBe(true);
  });

  
  it('should not create two users with the same credentials', async () => {
    const createUser = gql`
            mutation {
              createUser(data: {
                name: "Gbolahan Olagunju",
                email: "gbols@example.com",
                password: "dafeMania"
              }){
                token
                user {
                  name
                  password
                  email
                  id
                }
              }
            }
            `;
    await expect(client.mutate({
      mutation: createUser
    })).rejects.toThrowError("A unique constraint would be violated on User. Details: Field name = email");
  });
});