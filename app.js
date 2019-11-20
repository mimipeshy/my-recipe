const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

mongoose.connect('mongodb+srv://mimipeshy:hainapassword@cluster0-0obja.mongodb.net/test?retryWrites=true&w=majority')

  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use((req, res) => {
     res.json({ message: 'Your request was successful!' });
  });
 // create a new recipe
  app.post('/api/recipes', (req, res, next) => {
    const recipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      difficulty: req.body.difficulty,
      time: req.body.time,
      _id: req.body._id
    });
    recipe.save().then(
      () => {
        res.status(201).json({
          message: 'Recipe created successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

//get all recipes
  app.use('/api/recipes', (req, res, next) => {
    Recipe.find().then(
      (recipes) => {
        res.status(200).json(recipes);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

//get a specific recipe
  app.get('/api/recipes/:id', (req, res, next) => {
    Recipe.findOne({
      _id: req.params.id
    }).then(
      (recipes) => {
        res.status(200).json(recipes);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });

//update a recipe
app.put('/api/recipes/:id', (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time,
    _id: req.body._id
  });
  Recipe.updateOne({_id: req.params.id}, recipe).then(
    () => {
      res.status(201).json({
        message: 'Recipe updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

//delete a recipe
app.delete('/api/recipe/:id', (req, res, next) => {
  Recipe.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});
module.exports = app;
