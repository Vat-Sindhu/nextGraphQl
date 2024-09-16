import mongoose from 'mongoose';
let cachedDb = null;
const connectToDatabase = async () => {
    if (cachedDb) {
        return cachedDb;
      }
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
 cachedDb= await mongoose.connect('mongodb+srv://sindhu:sindhu@cluster0.afqjvbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  });
  return cachedDb;
};

export default connectToDatabase;
