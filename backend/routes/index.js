const router = require('express').Router();

const userRoutes = require('./users');
const userCards = require('./cards');

router.use(userRoutes);
router.use(userCards);

module.exports = router;
