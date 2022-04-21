const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const PediatraSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    cpf:{
      type: String
    },
    rg:{
      type: String
    },
    sex:{
      type: String
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      default: Date.now,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    verified:{
      type: Boolean,
      default: false,
    },
    phone:{
      type: String,
    },
    patients:[
      {
        type: mongoose.SchemaTypes.ObjectId
      }
    ]
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

const salt = 10;

PediatraSchema.pre('save', async function crypt(next) {
  if (this.isModified('password')) {
    this.password = await this.encryptPassword(this.password);
  }
  return next();
});

PediatraSchema.pre('updateOne', async function recovery(next) {
  if (this._update.password) {
    this._update.password = await this.schema.methods.encryptPassword(
      this._update.password,
    );
  }
  return next();
});

PediatraSchema.methods = {
  authenticate(password) {
    return bcrypt.compareSync(password, this.password);
  },
  encryptPassword(password) {
    return bcrypt.hashSync(password, salt);
  },
};

module.exports = mongoose.model('Pediatra', PediatraSchema);
