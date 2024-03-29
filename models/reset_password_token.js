import  mongoose from 'mongoose';



const resetPasswordTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type:String
    },
    isValid:{
        type:Boolean
    }
}, {
    timestamps: true
});

const ResetPasswordToken=mongoose.model('ResetPasswordToken',resetPasswordTokenSchema);

export default ResetPasswordToken;