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
            ortolani:[
                {
                    isPositive:{
                        type: Boolean
                    },
                    conduct:{
                        type: String
                    }
                },
            ],
            redReflection:[
                {
                    isNormal:{
                        type: Boolean
                    },
                    conduct:{
                        type: String
                    }
                },
            ],
            tootsy: [
                {
                    yesOrNo:{
                        type: Boolean
                    },
                    madeAt:{
                        type: Date
                    }
                },
            ],
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
            hearingScreening:[
                {
                    yesOrNo:{
                        type: Boolean
                    },
                    madeAt:{
                        type: Date
                    }
                }
            ],
            testPerformed:{
                type: String
            },
            result:[
                {
                    text1:{
                        type: String
                    },
                    text2:{
                        type: String
                    },
                    isNormal:{
                        type: Boolean
                    }
                }
            ],
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
