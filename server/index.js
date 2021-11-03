//2 

const express= require('express');
const app =express();

PORT = 3000|| process.env.PORT;

app.get("/",(req,res)=>{
res.send("om \n welcome to kct fam app");
})

app.listen(PORT,()=>{
    
    console.log(`app running on port ${PORT} successfully`);
});

