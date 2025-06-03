import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    title:{
      type:String,
      required:true,
    },
    blogImage:{
      public_id:{
        type:String,
        required:true,
      },
      url:{
        type:String,
        required:true,
      }
    },
    category:{
       type:String,
      required:true,
    },
    about:{
        type:String,
      required:true,
      minLength:[10,"should contain 200 characters"],
      maxLength:[400,"you can not write above 400 charcters"],
    },
    adminName:{
    type:String,
    },
  adminPhoto:{
    type:String,
  },
    createdBy:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
    }
})

const Blog=mongoose.model("Blog",blogSchema);
export default Blog;