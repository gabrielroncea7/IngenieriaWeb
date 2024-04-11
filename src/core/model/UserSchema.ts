import {Schema, model} from 'mongoose';

const UserSchema = new Schema({

    _username:{

        type: String,
        trim: true,
        unique: true

    },
    _email:{

        type: String,
        trim: true,
        unique: true

    },
    _password:{

        type: String,
        trim: true

    },
    _points:{

        type: Number,
        trim:true

    },
    _wins:{

        type: Number,
        trim: true

    },
    _gamesPlayed:{

        type: Number,
        trim:true

    } 

},{

    timestamps: true

});

export default model('User', UserSchema);