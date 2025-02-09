const jwt = require("jsonwebtoken");

const authenticateUser= (req,res)=> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        res.status(200).send({ user: decoded });
      } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
      }
};

module.exports = {authenticateUser};
