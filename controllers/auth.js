const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/kyes')
const errorhender = require('../utilus/errorHandler')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    })
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            //генерируем токен
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            /// пороли не совпали
            res.status(401).json({
                massage: 'User is not found'
            })
        }
//пользователя нету ошибка
    } else {
        res.status(404).json({
            massage: 'User is not found'
        })
    }


}


module.exports.register = async function (req, res) {
    //email password
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        //пользователь существует нужно ошибка
        res.status(409).json({
            massage: 'email not valid'
        })


    } else {
        //create candidate
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorhender(res, e)
        }

    }

}


