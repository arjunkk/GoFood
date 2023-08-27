const mongoose = require('mongoose');

// Update the URI to point to your new local MongoDB database
const uri = "mongodb://127.0.0.1:27017/mernApp";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'mernApp'
    });

    console.log("Connected to MongoDB!");

    // Fetch data from 'food_items' collection
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodItemsData = await foodItemsCollection.find({}).toArray();

    // Fetch data from 'foodCategory' collection
    const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    // Assign fetched data to global variables
    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;

    return mongoose.connection;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};
module.exports = connectToDatabase;
