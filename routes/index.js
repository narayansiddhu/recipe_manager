var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
let Recipe  = require('../models/recipe');
var router = express.Router();
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var db = mongoose.connect('mongodb://localhost/passport_locals');


router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

router.get('/recipe/new', function(req, res){
       res.render('addrecipe', {
                 
               });
       });


 router.post('/recipe', function (req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        const recipe = new Recipe(req.body)
      
        // SAVE INSTANCE OF Comment MODEL TO DB
        recipe.save().then((recipe) => {
          // REDIRECT TO THE ROOT
          return res.redirect(`/recipe`)
        }).catch((err) => {
          console.log(err);
        })
      })

      router.get('/recipe', function(req,res){
     Recipe.find({},function(err, recipe){
         if(err){
             console.log(err);
         }else{
            res.render('getrecipe',
            {
                
             recipe:recipe
            })  
         }
     })
        
      })

module.exports = router;