'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema(
    {
      __v: { type: Number, select: false },
      email: { type: String, required: true },
      password: { type: String, required: true, select: false },
      nickname: { type: String, required: true },
      avatar: { type: String, required: false, default: '/user.png' },
    },
    {
      timestamps: true,
    }
  );

  return mongoose.model('User', UserSchema);
};
