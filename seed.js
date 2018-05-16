var faker = require('faker');
var express = require('express');
var Recipe = require('./models/recipe');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipemanager');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

async function createRecipe() {
            var title = faker.name.findName()
            var description = faker.company.catchPhraseDescriptor()
     
            var author = faker.name.findName()
            var ingredients = faker.commerce.productMaterial()

            var recipe = new Recipe({ title: title, description: description,author: author, ingredients: ingredients })
            recipe.save()
            console.log(recipe)


};

createRecipe();