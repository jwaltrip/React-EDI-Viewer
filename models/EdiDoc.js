const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

// we need to turn strict mode off so we don't need to define the extremely deeply nested nature of the edi docs
const EdiSchema = new Schema({}, { strict: false, collection: 'ediDocs' });
EdiSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("ediDocs", EdiSchema);