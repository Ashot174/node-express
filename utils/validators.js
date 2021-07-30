const {body} = require('express-validator')

const User = require('../models/user')

exports.registerValidators = [
    body('email')
            .isEmail().withMessage('Enter valid email')
            .custom(async (value, {req}) => {
                try {
                    const user = await User.findOne({email: value})
                    if (user) {
                        return Promise.reject('User with this email already exists')
                    }
                }catch (e) {
                    console.log(e)
                }
    })
            .normalizeEmail(),
    body('password', 'Password must be at least 6 characters')
            .isLength({min: 6, max: 56})
            .isAlphanumeric()
            .trim(),
    body('confirm')
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error('Password confirmation failed')
                }
                return true
            })
            .trim(),
    body('name')
            .isLength({min: 2})
            .withMessage('Name must be at least 2 characters')
            .trim()
]


exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Title must be at least 3 characters').trim(),
    body('price').isNumeric().withMessage('Enter valid price'),
    body('img', 'Enter valid image URL').isURL(),
]