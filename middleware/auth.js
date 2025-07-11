const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  
  let token = req.header('Authorization');
  
  
  if (!token && req.cookies?.token) {
    token = `Bearer ${req.cookies.token}`;
  }

  
  if (!token && req.header('x-auth-token')) {
    token = `Bearer ${req.header('x-auth-token')}`;
  }

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
   
    const tokenValue = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
       
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};