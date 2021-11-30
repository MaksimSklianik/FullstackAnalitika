const mongoose = require('mongoose')
const Schema = mongoose.Schema


const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },

    order: {

        type: Number,
        required: true
    },

    list: [{
        name: {type: String},
        quantity: {type: Number},/// храним это для того что бы корентно работал заказ если передумаешь или что т оизмениться в заказе пример: было кофе поменял на чай
        cost: {type: Number}
    }],

        user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }


})

module.exports = mongoose.model('orders', orderSchema)

