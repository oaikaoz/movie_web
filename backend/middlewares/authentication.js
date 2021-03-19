const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(404).json({
        error: {
          message: "ไม่พบ token",
        },
      });
    }
    const token = authHeader.split(' ')[1];
    var decoded = jwt.verify(token,  process.env.KEY_JWT);
    next();
  } catch (error) {
    res.status(404).json({
      error: {
        message: "token ไม่ถูกต้อง",
      },
    });
  }
};