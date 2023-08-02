const cardsService = require('../services/cards.service');
// GET ALL CARDS
const getAllCards = async (req, res) => {
	try {
		const cardsData = await cardsService.getAllCards();
		res.json(cardsData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

// GET USERS CARDS
const getMyCards = async (req, res) => {
	try {
		const cardsData = await cardsService.getCardByUserId(req.userData._id);
		res.json(cardsData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

const getCard = async (req, res) => {
	try {
		const id = req.params.id;
		await cardValidationService.cardIdValidation(id);
		let card = await cardsService.getCardById(id);
		res.json(card);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

// CREATE A NEW CARD
const createCard = async (req, res) => {
	try {
		let normalCard = await normalizeCard(req.body, req.userData._id);
		await cardValidationService.createCardValidation(normalCard);
		let cardsData = await cardsService.createCard(normalCard);
		res.json(cardsData);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

// EDIT CARD
const editCard = async (req, res) => {
	try {
		const id = req.params.id;
		let normalCard = await normalizeCard(req.body, req.userData._id);
		await cardValidationService.cardIdValidation(id);
		await cardValidationService.createCardValidation(normalCard);
		const cardFromDB = await cardsService.updateCard(id, normalCard);
		res.json(cardFromDB);
	} catch (error) {
		handleError(res, error.message, 400);
	}
};

// FAVORITE(LIKE) A CARD
const favoriteCard = async (req, res) => {
	try {
		const cardId = req.params.id;
		const userId = req.userData._id;
		await cardValidationService.cardIdValidation(cardId);
		const { likes } = await cardsService.getCardById(cardId);
		if (likes) {
			if (likes.includes(userId)) {
				await cardsService.unLikeCard(userId, cardId);
				res.json({ msg: 'like removed!' });
			} else {
				await cardsService.likeCard(userId, cardId);
				res.json({ msg: 'like Added!' });
			}
		} else {
			handleError(res, 'could not find the card', 404);
		}
	} catch (error) {
		console.log(error);
		handleError(res, error.message, 400);
	}
};

// Delete Card
const deleteCard = async (req, res) => {
	try {
		const id = req.params.id;
		await cardValidationService.cardIdValidation(id);
		const cardFromDb = await cardsService.deleteCard(id);
		res.json({ msg: `card - ${cardFromDb.title} deleted` });
	} catch (error) {
		handleError(res, error.message, 400);
	}
};
module.exports = {
	getAllCards,
	getMyCards,
	getCard,
	createCard,
	editCard,
	favoriteCard,
	deleteCard,
};
