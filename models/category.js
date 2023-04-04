'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product)
    }
  }
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    hooks: {
      beforeCreate(instance){
       console.log(new Date().getTime(), "<<---");
        let words = instance.name.split(" ")
        let newWords = words.map(el => el[0].toUpperCase() + el.slice(1).toLowerCase())
        instance.name = newWords.join(" ");
      },
      beforeDestroy(instance){
        if (instance.name.length >= 8){
          throw "Tidak boleh hapus " + instance.name
        }
      }
    },
  });



  return Category;
};