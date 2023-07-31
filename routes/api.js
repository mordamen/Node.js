const express = require('express');
const router = express.Router();

const usersRouter = require('./users.router');
const cardsRouter = require('./cards.router');

//http://localhost:8181/api/cards
router.use('/cards', cardsRouter);

//http://localhost:8181/api/auth/
router.use('/users', usersRouter);

router.use((req, res, next) => {
	res.status(404).json({ error: 'api not found' });
});

module.exports = router;
