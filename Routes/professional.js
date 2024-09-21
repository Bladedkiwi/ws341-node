const express = require('express');
const {getProfessionals, getProfessionalsById } = require('../controllers/professionalController');
const router = express.Router();

//Professionals Routes
router.get('/', getProfessionals);
router.get('/:id', getProfessionalsById);

module.exports = router;