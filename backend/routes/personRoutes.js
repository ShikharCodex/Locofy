const express = require('express');
const router = express.Router();
const {
  createPerson,
  getPersons,
  getPersonById,
  getUserPersons,
  updatePerson,
  deletePerson
} = require('../controllers/personController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

// All person routes must be protected
router.use(protect);

router.route('/')
  .get(getPersons)
  .post(upload.single('image'), createPerson);

router.route('/user')
  .get(getUserPersons);

router.route('/:id')
  .get(getPersonById)
  .put(upload.single('image'), updatePerson)
  .delete(deletePerson);

module.exports = router;
