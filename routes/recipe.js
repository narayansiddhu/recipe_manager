var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');
var User = require('../models/user');
router.get('/',(req, res) => {
    Recipe.find({}, (err, recipes) => {
        if (err) return err;
        else
            res.render('recipe', {
                recipes: recipes
            })
    })
});
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('recipe_add');
});

router.post('/add', (req, res) => {
    // var title = req.body.title;
    // var description = req.body.description;
    // var ingredients = req.body.ingredients;



    // Validation
    req.checkBody('title', 'title is required').notEmpty();
    req.checkBody('description', 'description is required').notEmpty();
    req.checkBody('ingredients', 'ingredients are required').notEmpty();


    var errors = req.validationErrors();

    if (errors) {
        res.render('recipe_add', {
            errors: errors
        });
    }
    else {
        var recipe = new Recipe();
        recipe.title = req.body.title;
        recipe.description = req.body.description;
        recipe.ingredients = req.body.ingredients;
        recipe.author = req.user.username;
        recipe.save(function (err) {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success_msg', 'You are added a new Recipe');
                res.redirect('/recipe');
            }
        });

    }

});
router.delete('/delete/:id', (req, res) => {
    if (!req.user._id) {
        res.status(500).send();
    }

    let query = { _id: req.params.id }

    Recipe.findById(req.params.id, function (err, recipe) {
        if (recipe.author != req.user.username) {
            res.status(500).send();
        } else {
            Recipe.remove(query, () => {
                res.send(200);
            })

        }
    });


});
router.get('/edit/:id', ensureAuthenticated,(req,res)=>{
    Recipe.findById(req.params.id,function(err,recipe){
        if(recipe.author!=req.user.username){
            res.redirect('/recipe')
      }
        res.render('recipe_edit',{
            recipe:recipe
        });
    });

});
router.post('/edit/:id', function(req, res){
 
    let recipe = {};
    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.ingredients = req.body.ingredients;

    let query = {_id:req.params.id}
 
    Recipe.update(query,recipe, function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success_msg', 'Recipe Updated');
        res.redirect('/recipe');
      }
    });
  });
  
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}



module.exports = router;