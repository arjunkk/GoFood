const mongoose= require('mongoose');

const uri = "mongodb+srv://mernApp:S5EfzkW8s6hypxIS@cluster0.xioaigc.mongodb.net/";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'mernApp'
    });
    
    console.log("Connected to MongoDB!");
    const fetched_data = mongoose.connection.db.collection("sample")
    fetched_data.find({}).toArray(function(err,data){
        if(err) console.log(err)
        else console.log(data)
    })
    
    return mongoose.connection;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};



module.exports = connectToDatabase;