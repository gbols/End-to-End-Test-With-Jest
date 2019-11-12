import { decodeToken } from '../../utils/token';

export const createTodo = async (parent, args, context, info) => {
  const { prisma, req } = context;
  const { data: { title, body } } = args;
  const { email } = decodeToken(req);
  const newTodo = await prisma.createTodo({
    title,
    body,
    author: {
      connect : { email }
    }
  }, info);
  return newTodo;
}

export const updateTodo = async (parent, args, context, info) => {
  const { prisma, req } = context;
  const { data, id } = args;
  const { email } = decodeToken(req);

  const myTodo = prisma.$exists.todo({
    id,
    author: {
      email
    }
  })
  if(!myTodo) throw new Error('cannot update Todo');

  const updatedTodo = await prisma.updateTodo({
    data,
    where: {
      id
    }
  }, info);

  return updatedTodo;
}

export const deleteTodo = async (parent, args, context, info) => {
  const { prisma, req } = context;
  const { id } = args;
  const { email } = decodeToken(req);
  const myTodo = prisma.$exists.todo({
    id,
    author: {
      email
    }
  })
  if(!myTodo) throw new Error('cannot delete Todo');

  const deletedTodo = await prisma.deleteTodo({
    id
  });
  return deletedTodo;
}