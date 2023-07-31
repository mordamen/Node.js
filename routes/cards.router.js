const express = require('express');
const router = express.Router();
const handleError = require('../utilities/errorHandler');
const cardController = require('../controllers/cards.controller');
const authMiddleware = require('../middleware/authMiddleware');

// GET ALL CARDS
// ROUTE: /cards | METHOD: GET | AUTHORIZATION: All | RETURN: All Cards
router.get('/', cardController.getAllCards);

// GET USERS CARDS
// ROUTE: /cards/my-cards | METHOD: GET | AUTHORIZATION: The Registered User | RETURN: Array of users cards
router.get('/my-cards', authMiddleware, cardController.getMyCards);

// GET A SINGLE CARD | ROUTE: /cards/my-cards
router.get('/:id', cardController.getCard);

// CREATE A NEW CARD
// ROUTE: /cards | METHOD: POST | AUTHORIZATION: Business User | RETURN: The newly created Card
router.post(
	'/',
	authMiddleware,
	/* permissionsMiddleware(false, true, false),*/ cardController.createCard
);

// EDIT CARD
// ROUTE: /cards/:id | METHOD: PUT | AUTHORIZATION: User who created the card | RETURN: The edited Card
router.put(
	'/:id',
	authMiddleware,
	/* permissionsMiddleware(false, false, true),*/ cardController.editCard
);

// FAVORITE(LIKE) A CARD
// ROUTE: /cards/:id | METHOD: PATCH | AUTHORIZATION: Any registered User | RETURN: The favorited Card
router.patch('/:id', authMiddleware, cardController.favoriteCard);

// Delete Card
// ROUTE: /cards/:id | METHOD: DELETE | AUTHORIZATION: The User who created the card, or admin | RETURN: The Deleted Card
router.delete(
	'/:id',
	authMiddleware,
	/* permissionsMiddleware(true, false, true),*/ cardController.deleteCard
);

// Change Card Number
// router.patch(
// 	'/bizNum/:id',
// 	// authMiddleware,
// 	// permissionsMiddleware(true, false, false),
// 	async (req, res) => {
// 		try {
// 			const cardId = req.params.id;
// 			await cardValidationService.cardIdValidation(cardId);
// 			const cardFromDb = await cardAccessDataService.updateCard(cardId, {
// 				bizNumber: await generateBizNumber(),
// 			});
// 			res.json({ msg: `the new biz number is ${cardFromDb.bizNumber}` });
// 		} catch (err) {
// 			console.log(err);
// 			handleError(res, err.message, 400);
// 		}
// 	}
// );

module.exports = router;
