const express=require("express")
const multer=require("multer")
const nodemailer=require("nodemailer")
const cors=require("cors")
const fs=require("fs")
const app=express()
const upload=multer({dest:"uploads/"})
app.use(cors())
app.post("/upload",upload.single("file"),async(req,res)=>{
  try{
      const t=nodemailer.createTransport({service:"gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}})
          await t.sendMail({from:process.env.EMAIL_USER,to:process.env.EMAIL_USER,subject:"New File Uploaded",text:"A file was uploaded.",attachments:[{filename:req.file.originalname,path:req.file.path}]})
              fs.unlinkSync(req.file.path)
                  res.json({success:true,message:"File sent to your email!"})
                    }catch(e){
                        res.status(500).json({success:false,error:e.message})
                          }
                          })
                          app.listen(3000,()=>console.log("Server running"))