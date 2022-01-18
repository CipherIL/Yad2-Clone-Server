const mongoose = require('mongoose');

const realestateSchema = new mongoose.Schema({
    realestateData: {
        balconies: {
            type: Number,
            required: true,
        },
        builtArea: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        entryDate: {
            type: Date,
        },
        entryFlexible: {
            type: Boolean,
            required: true,
        },
        entryNow: {
            type: Boolean,
            required: true,
        },
        estateCondition: {
            type: String,
            required: true,
        },
        estateType: {
            type: String,
            required: true,
        },
        features: [{
            type: String,
        }],
        floor: {
            type: Number,
        },
        images: [{
            type: String, 
        }],
        mainImage: {
            type: String,
        },
        number: {
            type: String,
        },
        onPillars: {
            type: Boolean,
        },
        parkingSpots: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        publishPlan: {
            type: String,
            required: true,
        },
        rooms: {
            type: Number,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        totalArea: {
            type: Number,
            required: true,
        },
        totalFloors: {
            type: Number,
        },        
    },
    userData: {
        adMailingList: {
            type: Boolean,
            required: true,
        },
        addToMailingList: {
            type: Boolean,
            required: true,
        },
        contactCellphone: {
            type: String,
            required: true,
        },
        contactEmail: {
            type: String,
            required: true,
        },
        contactMailingList: {
            type: Boolean,
            required: true,
        },
        contactName: {
            type: String,
            required: true,
        },
        contactTerms: {
             type: Boolean,
            required: true,
        },
        contactVirtualNumber: {
            type: Boolean,
            required: true,
        },
        contactWeekend: {
            type: Boolean,
            required: true,
        },
        secondaryContactCellphone: {
            type: String,
        },
        secondaryContactName: {
            type: String,
        },
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    date: {
        type: Date,
    }
})

const Realestate = mongoose.model('Realestate',realestateSchema);

module.exports = Realestate;