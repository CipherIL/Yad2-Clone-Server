const mongoose = require('mongoose');

const realestateSchema = new mongoose.Schema({
    realestateData: {
        balconies: {
            type: String,
            required: true,
        },
        builtArea: {
            type: String,
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
            type: String,
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
            type: String,
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
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        publishPlan: {
            type: String,
            required: true,
        },
        rooms: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        totalArea: {
            type: String,
            required: true,
        },
        totalFloors: {
            type: String,
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
    }
})

const Realestate = mongoose.model('Realestate',realestateSchema);

module.exports = Realestate;