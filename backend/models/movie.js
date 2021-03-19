"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      // join this
    }
  }
  Movie.init(
    {
      title: DataTypes.STRING,
      release_year: DataTypes.INTEGER,
      rating: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
      tableName: "movies",
    }
  );
  return Movie;
};
