var faker = require('faker');
var express = require('express');
var Recipe = require('./models/recipe');
var Account = require('./models/account');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/passport_locals');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var users;

Account.find().limit(-1).skip(Math.random() * Account.count()).exec(function (err, data) {
    users = data
    console.log(users);
})

// console.log("Printing out users: " + JSON.stringify(users));

// Account.find().exec(function (err, data) {
//     user = data
//     console.log(data);
// })

async function createRecipe() {


    var value = await Account.find().limit(-1).skip(Math.random() * Account.count());
    console.log(value);

    // Account.find({},function(err,account){
    //     if(err){
    //         console.log('this is failed');

    //     }else{
    //     console.log("resolving promise")
    //         users.push(account)
    //         console.log("pushed to array")
    //         return account
    //         console.log("returned array")
    //         }})
        
// console.log(users)

    // for (var i = 0; i<users.length; i++ ) {
    //     for (var j = 0; j< 6; j++) {
    //         var title = faker.name.findName()
    //         var description = faker.company.catchPhraseDescriptor()
    //         var method = faker.name.jobDescriptor()
    //         var serving = faker.random.number({ min: 2, max: 5 })
    //         var preptime = faker.random.number({ min: 20, max: 120 })
    //         var author = users[i].username
    //         var ingredients = faker.commerce.productMaterial()

    //         var recipe = new Recipe({ title: title, description: description, method: method, serving: serving, preptime: preptime, author: author, ingredients: ingredients })
    //         recipe.save()
    //         console.log(recipe)

    //     }
    // }

};

// createRecipe();

