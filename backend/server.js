const express = require('express');
const candidateRoutes = require('./src/candidate/routes');
const app = express();
const port = 3000;
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json());


app.get("/", (req, res) => {
    res.send("hello")
})
app.use('/api/v1/candidates', candidateRoutes);
app.listen(port, () => console.log(`working ${port}`));