const models = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.index = async (req, res) => {
  const Users = await models.User.findAll();

  res.status(200).json({
    data: Users,
  });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const Users = await models.User.findOne({
      where: { username: username },
    });
    
    if (Users) {
      if (bcrypt.compareSync(password, Users.password)) {
        let jwtToken = jwt.sign(
          {
            username: Users.username,
            role: Users.role,
          },
          process.env.KEY_JWT,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          access_token: jwtToken,
          data: {
            username: Users.username,
            role: Users.role,
          },
        });
      } else {
        const error = new Error("รหัสผ่านไม่ถูกต้อง");
        error.statusCode = 404;

        throw error;
      }
    } else {
      const error = new Error("ไม่พบ User นี้ในระบบ");
      error.statusCode = 404;

      throw error;
    }
  } catch (error) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });
  }
};
