const mongoose = require('mongoose');

const shirtSchema = new mongoose.Schema({
    shirtName: {
        type: String,
        required: true
    },
    shirtImage: {
        type: String,
        required: true
    },
    shirtSize: {
        type: String,
        enum: ['S', 'M', 'L', 'XL'],
        required: true
    },
    shirtPrice: {
        type: Number,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
});

shirtSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Shirt = mongoose.model('Shirt', shirtSchema);

module.exports = Shirt;
