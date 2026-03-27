const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, "Company name is required"],
        trim: true,
        unique: true
    },

    description: {
        type: String,
        default: ""
    },

    location: {
        type: String,
        default: ""
    },

    website: {
        type: String,
        default: ""
    },

    logo: {
        type: String,
        default: ""
    },

    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
});

companySchema.index({ recruiter: 1 });

module.exports = mongoose.model("Company", companySchema);