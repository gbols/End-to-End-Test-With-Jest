## End to End Testing of GraphQL Resolvers with Jest.

#### To get this project up and running kindly follow the following instructions.
1. run git clone `https://github.com/gbols/End-to-End-Test-With-Jest.git`
2. cd into /src
3. run `docker compose up -d`
4. run `prisma deploy -e ../config/dev.env`
5. run `prisma generate`
6. cd to the root directory
7. run `npm install`
8. run `npm run dev`

#### To set up the test environment
1. cd into /src
2. run `deploy -e ../config/test.env`
3. run `prisma generate`
4. run `npm run test`

### This project consists of two braches 
1. The `start` branch
   - This branch contains all the beginnner starter files and can be modified when following the article step by step. 
2. The `final` branch
   - This branch contains what the project will look like when we are finished with the start branch.

#### Here is a few of the Mutations and Queries that can be done on this application. 
For a Comprehesive list open http://localhost:4000/ on your local browser and click on the docs button.
`User Type`
```
mutation {
  createUser(data: {
    name: "John Doe",
    email: "john@example.com",
    password: "iamjohndoe",
  }){
    token
    user {
      name
      email
      id
      password
    }
  }
}

mutation{
  loginUser(data:{
    email: "john@example.com",
    password: "iamjohndoe",
  }){
    user {
      name
      id
      email
      password
    }
    token
  }
}

query{
  users{
    email
    id
    todos{
      title
      body
    }
  }
}
```

`Todo Type`
1. make sure to copy the token returned from loginUser or creatUser mutation.
2. Add the token in the headers section like this
```
   {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJ1cGRhdGVkQXQiOiIyMDE5LTExLTEyVDE1OjI4OjMwLjk3NloiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJpZCI6ImNrMncwZzA3NDAwd3UwNzY2N2t4bWVuajUiLCJjcmVhdGVkQXQiOiIyMDE5LTExLTEyVDE1OjI4OjMwLjk3NloiLCJwYXNzd29yZCI6IiQyYiQwNCRnaHVTdTJHSWtzUHA3NEY1R1Y3am5lWW90LnJnbzFPM1o1WlcuQ3A5a21sT3RsMmpzR3NhSyIsImlhdCI6MTU3MzU3MzM0NH0.bNByjNB2ed-p4vQzYpWy2nJ7mZaGE2vwoW_d6tvyjbE"
}
   ```

```
mutation {
  createTodo(data: {
    title: "Buy Indomie",
    body: "Buy yam from the supermarket for everyone to eat at 10pm"
  }){
    title
  }
}

mutation{
  updateTodo(id:"string ID of TODO to Update", data:{
    title: "Buy Beans Instead"
  }){
    title
    body
  }
}

query {
  todos{
    title
    body
    id
    author{
      name
      email
    }
  }
}
```