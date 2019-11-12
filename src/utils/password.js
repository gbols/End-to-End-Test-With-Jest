import bcrypt from 'bcrypt';

export const hashPassword = (password) => {
  const saltRounds = 3;
  return bcrypt.hashSync(password, saltRounds);
}

export const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}