/* eslint-disable no-underscore-dangle */
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
    // пароль не будет возвращаться
    select: false,
  },

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

// метод для скрытия пароля после его сравнения bcrypt
userSchema.methods.hidePass = function hidePasss() {
  const user = this.toObject();
  delete user._id;
  delete user.password;
  delete user.__v;
  return user;
};
module.exports = model('user', userSchema);
