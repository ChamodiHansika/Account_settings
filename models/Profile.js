const mongoose = require('mongoose').default;

const Schema = mongoose.Schema;

const profileSchema=new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact_no: {
        type: Number,
        required: true
    },
    
})

const Profile=mongoose.model("Profile",profileSchema);

module.exports=Profile;