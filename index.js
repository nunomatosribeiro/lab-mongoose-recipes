const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    Recipe.create((data) => {
      console.log(data.title);
      return Recipe;
    })
      .then(() => {
        Recipe.insertMany(data.json).then((result) => {
          console.log(`Title: ${Recipe.title}`);
          return Recipe;
        });
      })
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        );
      });
    console.log("Success");
  })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Success");
  })
  .then(() => {
    Recipe.disconnect();
  });
