const mongoose = require('mongoose');
const { Status } = require('../../config/constant.config');

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        max: 100,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    logo: {
        secureUrl: String,
        optimizedUrl: String,
        publicUrl: String
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.INACTIVE
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
},{
    autoCreate: true,
    autoIndex: true,
    timestamps: true
})


const brandModel = mongoose.model("Brand", BrandSchema);
module.exports = brandModel;