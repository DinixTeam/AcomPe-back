require('dotenv').config();
const { string } = require('joi');
const mongoose = require('mongoose');

const CadernetaSchema = new mongoose.Schema(
  {
    consulta: {
      type: Number,
      default: 1
    },
    bornData: [
        {
            bornHour: {
                type: String
            },
            bornDate:{
                type: Date
            },
            sex:{
                type: String
            },
            bornWeight:{
                type: Number
            },
            bblength:{
                type: Number
            },
            cephalic:{
                type: Number
            },
            gestationalAge:{
                type: Number
            },
            bloodType:{
                type: String
            },
            exitWeight:{
                type: Number
            },
            exitDate:{
                type: Date
            },
            motherName:{
                type: String
            }

        }
    ],
    neonatal:[
        {
            ortolaniIsPositive:{
                type: Boolean
            },
            ortolaniConduct:{
                type: String
            },
            redReflectionIsNormal:{
                type: Boolean
            },
            redReflectionConduct:{
                type: String
            },
            tootsyYesOrNo: {
                type: Boolean
            },
            tootsyMadeAt:{
                type: Date
            },
        }
    ],
    results:[
        {
            feniceltonuriaIsNormal:{
                type: Boolean
            },
            hipotireodismoIsNormal:{
                type: Boolean
            },
            anemiaFalciformeIsNormal:{
                type: Boolean
            }
        }
    ],
    others:[
        {
            hearingScreeningYesOrNo: {
                type: Boolean
            },
            hearingScreeningMadeAt:{
                type: Date
            },
            testPerformed:{
                type: String
            },
            resultText1:{
                type: String
            },
            resultText2:{
                type: String
            },
            resultIsNormal:{
                type: Boolean
            },
        }
    ],
    exitFeeding:{
        type: String
    },
    importantInformations:{
        type: String
    }
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Caderneta', CadernetaSchema);
