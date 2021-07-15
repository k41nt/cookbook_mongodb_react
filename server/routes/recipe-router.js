const express = require('express')

const RecipeCtrl = require('../controllers/recipe-controller')

const router = express.Router()

router.post('/createRecipe', RecipeCtrl.createRecipe)
router.put('/recipe/:id', RecipeCtrl.updateRecipe)
router.delete('/recipe/:id', RecipeCtrl.deleteRecipe)
router.get('/recipe/:id', RecipeCtrl.getRecipeById)
router.get('/recipes', RecipeCtrl.getRecipes)

module.exports = router