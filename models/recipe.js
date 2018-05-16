let mongoose = require('mongoose');

// Article Schema
let recipeSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  ingredients:{
    type: String,
    required: true
  },
  author:{
      type: String
  }
});

let Recipe = module.exports = mongoose.model('Recipe', recipeSchema);
