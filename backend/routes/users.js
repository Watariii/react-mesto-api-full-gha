const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlevares/auth');
const {
  validPostCreateUser,
  validPostLogin,
  validGetGetUser,
  validPatchUpdateUser,
  validPatchUpdateUserAvatar,
} = require('../utils/validRoutesUser');

const {
  getUsers, getUser, createUser, updateUser, updateUserAvatar, login,
} = require('../controllers/users');

router.post('/signup', celebrate(validPostCreateUser), createUser);

router.post('/signin', celebrate(validPostLogin), login);

router.use(auth);

router.get('/users', getUsers);

router.get('/users/me', getUser);

router.get('/users/:id', celebrate(validGetGetUser), getUser);

router.patch('/users/me', celebrate(validPatchUpdateUser), updateUser);

router.patch('/users/me/avatar', celebrate(validPatchUpdateUserAvatar), updateUserAvatar);

module.exports = router;
