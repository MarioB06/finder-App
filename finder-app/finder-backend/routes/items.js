const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { check, validationResult } = require('express-validator');

// API zum Hinzufügen eines Items
router.post(
    '/add',
    [
        check('title').not().isEmpty().withMessage('Title is required'),
        check('description').not().isEmpty().withMessage('Description is required'),
        check('location').not().isEmpty().withMessage('Location is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description, location, locationDescription, reward, image, user } = req.body;

            const newItem = new Item({
                title,
                description,
                location,
                locationDescription,
                reward,
                image,
                user
            });

            await newItem.save();
            res.status(201).json(newItem);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    router.get('/', async (req, res) => {
        try {
            const items = await Item.find({ isFound: false }); // Filter für isFound auf false
            res.json(items);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
    

module.exports = router;
