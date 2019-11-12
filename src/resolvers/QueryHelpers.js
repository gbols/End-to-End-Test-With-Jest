import { decodeToken } from '../utils/token'

export  const Todo = {
  author: async (parent, args, context, info) => {
      const {prisma} = context;
      return prisma.todo({ id: parent.id}).author()
    },
  } 

export const User = {
  todos: (parent, args, context, info) => {
    const { prisma } = context;
    return prisma.user({ id: parent.id }).todos()
  },

  email: (parent, args, context, info) => {
    const { req } = context;
    const { id }= decodeToken(req, false);
    if (id && id === parent.id) return parent.email
    else return null
  }
}
