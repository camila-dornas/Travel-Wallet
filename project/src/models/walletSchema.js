/* eslint-disable max-len */
const {default: mongoose} = require('mongoose');
const connection = require('./connection');

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  value: mongoose.Types.Decimal128,
  currency: 'String',
});

walletSchema.virtual('id').get(function transform() {
  return this._id.toHexString();
});

walletSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret._id;
    delete ret.userId;
  },
});

const Wallet = connection.model('Wallet', walletSchema);

module.exports = Wallet;
