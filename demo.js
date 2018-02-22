var faker = require('faker');
var express = require('express');
var Recipe = require('./models/recipe');
var Account = require('./models/account');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/passport_locals');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// var users;

// Account.find().limit(-1).skip(Math.random() * Account.count()).exec(function (err, data) {
//     users = data
//     // console.log(users);
// })



async function createRecipe() {


    // var value = await Account.find().limit(-1).skip(Math.random() * Account.count());
    // console.log(value);

    var value = await Account.aggregate(
        { $sample: { size: 1 } }
     )
        
  console.log(value[0].username)
//  console.log(value.length)
    for (var i = 0; i<value.length; i++ ) {
        for (var j = 0; j< 3; j++) {
            var title = faker.name.findName()
            var description = faker.company.catchPhraseDescriptor()
            var method = faker.name.jobDescriptor()
            var serving = faker.random.number({ min: 2, max: 5 })
            var preptime = faker.random.number({ min: 20, max: 120 })
            var author = value[i].username
            var ingredients = faker.commerce.productMaterial()

            var recipe = new Recipe({ title: title, description: description, method: method, serving: serving, preptime: preptime, author: author, ingredients: ingredients })
            recipe.save()
            console.log(recipe)

        }
    }

};

createRecipe();

