import jwt from 'jsonwebtoken';

export const getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET);
}

export const decodeToken = (req, requireAuth = true) => {
  const header = req.req.headers.authorization;

  if (header) {
      const token = header.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
  }

  if (requireAuth) {
      throw new Error('Authentication required')
  } 
  
  return null
}