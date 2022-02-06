var mongoose = require('mongoose');

var AgencySchema = new mongoose.Schema({
    name: { type: String, required: [true, "can't be blank"] },
    address1: { type: String, required: [true, "can't be blank"]},
    address2: { type: String, default: '' },
    state: { type: String, required: [true, "can't be blank"]},
    city: { type: String, required: [true, "can't be blank"]},
    phone: { type: String, required: [true, "can't be blank"]},
    clients: [{ type: String, type: mongoose.ObjectId, ref: 'client_list'}]
}, { timestamps: true });

mongoose.model('agency_list', AgencySchema);
