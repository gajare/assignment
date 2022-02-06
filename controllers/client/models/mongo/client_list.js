var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    name: { type: String, required: [true, "can't be blank"]},
    email: { type: String, required: [true, "can't be blank"]},
    phone: { type: String, default: '' },
    totalBill: { type: Number, required: [true, "can't be blank"]}
}, { timestamps: true });

mongoose.model('client_list', ClientSchema);
