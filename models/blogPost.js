const mongoose = require('mongoose');
// mongoose.SchemaTimeStampsConfig
const PostSchema = new mongoose.Schema({
 desc: {
     type: String,
    required: true,
 },
 title: {
     type: String,
     required: true,
},
author:{
    type: String,
    required: true
}
},{timestamps: true});

module.exports = mongoose.model('Post', PostSchema);
