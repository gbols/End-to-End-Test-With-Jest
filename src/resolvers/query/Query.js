import { decodeToken } from '../../utils/token'

export const Query = {
  todos: (parent, args, context, info) => {
    const { prisma } = context;
    return prisma.todoes()
  },

  todo: (parent, args, context, info) => {
    const { prisma } = context;
    const { id } = args;
    return prisma.todo({id})
  }, 

  users: (parent, args, context, info) => {
    const { prisma } = context;
    return prisma.users();
  },

  me: (parent, args, context, info) => {
    const { prisma, req } = context;
    const { id }= decodeToken(req);
    return prisma.user({id})
  }
}