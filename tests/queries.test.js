import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import { prisma } from '../src/generated/prisma-client';
import { getClient } from './utils/getClient';


const client = getClient();

beforeAll( async () => {
  await prisma.deleteManyUsers()
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
  
  await client.mutate({
  mutation: createUser
  });

});

describe('the Queries that can be performed on TODO and USER type', () => {
  it('should be able to see author\'s profile without sensitive info being displayed', async () => {
    const userQuery = gql`
    query {
      users {
        id 
        name
      }
    }
    `;

    const { data } = await client.query({
      query: userQuery
    });

    expect(data.users.length).toBe(1);
    expect(data.users[0].name).toBe('Gbolahan Olagunju');
  });
});