import { getToken } from '../../utils/token';
import { hashPassword, comparePassword } from '../../utils/password';

export const createUser = async (parent, args, context, info) => {
  const { prisma } = context;
  const { data: { name, email, password } } = args;

  if (password.length < 8) throw new Error('password must be more than 8 characters');
  const hash = hashPassword(password);
  const user = await prisma.createUser({
    name,
    email,
    password: hash
  });

  const token = getToken(user);
  return { user, token };
} 

export const loginUser = async (parent, args, context, info) => {
  const { prisma } = context;
  const { data: { email, password } } = args;

  const user = await prisma.user({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = getToken(user);
  return { user, token };
} 

export const updateUser = async (parent, args, context, info) => {
  const { prisma } = context;
  const { data, id } = args;

  if (data.password) {
    data.password = hashPassword(data.password);
  }
  const updatedUser = await prisma.updateUser({
    data,
    where: {
      id
    }
  })
  return updatedUser;
} 

export const deleteUser = async (parent, args, context, info) => {
  const { prisma } = context;
  const { id } = args;

  const deletedUser = await prisma.deleteUser({
    id
  });

  return deletedUser;
} 