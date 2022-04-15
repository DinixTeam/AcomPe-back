const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    cpf:{
      type: String,
      required: true
    },
    rg:{
      type: String,
      required: true
    },
    sex:{
      type: String,
      required: true
    },
    bornDate:{
      type: Date,
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
    phone: {
      type: String,
    },
    Caderneta: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Caderneta',
      },
    ],
    consultas:{
      type: mongoose.Schema.ObjectId,
        ref: 'Consulta',
    }
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

const salt = 10;

UserSchema.pre('save', async function crypt(next) {
  if (this.isModified('password')) {
    this.password = await this.encryptPassword(this.password);
  }
  return next();
});

UserSchema.pre('updateOne', async function recovery(next) {
  if (this._update.password) {
    this._update.password = await this.schema.methods.encryptPassword(
      this._update.password,
    );
  }
  return next();
});

UserSchema.methods = {
  authenticate(password) {
    return bcrypt.compareSync(password, this.password);
  },
  encryptPassword(password) {
    return bcrypt.hashSync(password, salt);
  },
};

module.exports = mongoose.model('User', UserSchema);
