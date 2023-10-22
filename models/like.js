import mongoose from 'mongoose';

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    //this defines the object id of the liked object
    likable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    //this field is used for defining the type of the liked object since it is a dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']// the value of onModel can either be Post or Comment and nothing else
    }
},{
    timestamps:true
})

const Like=mongoose.model('Like',likeSchema);

export default Like;