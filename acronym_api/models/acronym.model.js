var mongoose         = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2')

var acronymSchema = mongoose.Schema({
    name: String,
    description: String,
    eliminated:Boolean
})

acronymSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Acronym', acronymSchema, 'acronym');