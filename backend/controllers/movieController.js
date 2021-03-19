const models = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.index = async (req, res) => {
  const Movies = await models.Movie.findAll();
  res.status(200).json({
    data: Movies,
  });
};

//insert
exports.insert = async (req, res) => {
  try {
    const { title, release_year, rating } = req.body;

    const existMoive = await models.Movie.findOne({ where: { title: title } });
    if (existMoive) {
      const error = new Error("มีภาพยนต์เรื่องนี้อยู่แล้ว กรุณาเพิ่มใหม่");
      error.statusCode = 404;
      throw error;
    }

    const moive = await models.Movie.create({
      title: title,
      release_year: release_year,
      rating: rating,
    });

    res.status(201).json({
      message: "เพิ่มภาพยนต์เรียบร้อยแล้ว",
      data: {
        title: title,
        release_year: release_year,
        rating: rating,
      },
    });
  } catch (error) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });
  }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const Movies = await models.Movie.findByPk(id);

    if (!Movies) {
      const error = new Error("ไม่มีรายการ ภาพยนต์ เรื่องนี้");
      error.statusCode = 404;

      throw error;
    }
    res.status(200).json({
      data: Movies,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });
  }
};

//update
exports.update = async (req, res) => {
  try {
    const { id, title, release_year, rating } = req.body;

    if (req.params.id != id) {
      const error = new Error("รหัสไม่ถูกต้อง");
      error.statusCode = 400;
      throw error;
    }
    const movie = await models.Movie.update(
      {
        title: title,
        release_year: release_year,
        rating: rating,
      },
      {
        where: { id: id },
      }
    );

    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const Movies = await models.Movie.findByPk(id);

    if (!Movies) {
      const error = new Error("ไม่มีรายการ ภาพยนต์ เรื่องนี้");
      error.statusCode = 400;
      throw error;
    }

    await models.Movie.destroy({
      where: { id: id },
    });

    res.status(200).json({
      message: "ลบข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });
  }
};
