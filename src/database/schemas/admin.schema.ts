import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});

export const name = 'Admin';
