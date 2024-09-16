import mongoose from 'mongoose';
import Item from './models/item';
// const Item = mongoose.model('Item', new mongoose.Schema({
//   name: { type: String, required: true },
// }));

export const resolvers = {
  Query: {
    getItems: async () => {
        try{ 
            return await Item.find({});
            
        }
        catch(error){
          console.log(error,"while fetching data")
          throw new Error('Error fetching items');
        }
     
    },
    getItem: async (_, { id }) => {
      return Item.findById(id);
    },
  },
  Mutation: {
    createItem: async (_, { name }) => {
      const item = new Item({ name });
      await item.save();
      return item;
    },
    updateItem: async (_, { id, name }) => {
      return Item.findByIdAndUpdate(id, { name }, { new: true });
    },
    deleteItem: async (_, { id }) => {
      await Item.findByIdAndDelete(id);
      return 'Item deleted';
    },
  },
};
