// src/models/user.js

import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
    savedArticles: [{ type: Schema.Types.ObjectId, ref: 'Articles' }], // NEW
  },
  { timestamps: true },
);

userSchema.pre('save', function (next) {
  if (!this.username) this.username = this.email;
  next();
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
