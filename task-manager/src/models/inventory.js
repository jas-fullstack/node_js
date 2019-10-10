const mongoose = require('mongoose')

const Inventory = mongoose.model('Inventory', {
    item: {
        type: String,
    },
    qty: {
        type: Number,
    },
    size : {
        h : Number,
        w: Number,
        uom : String
    },
    status : {
        type: String
    }
    
})

module.exports = Inventory