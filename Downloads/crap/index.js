import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


// difine the app
const app = express();
const port = 3000;
const baseURL = "http://localhost:8080";

// middleware
app.use(bodyParser.urlencoded({extended: true}));

// the get request for the home page
app.get("/", async(req, res)=>{
    try{
        const response = await axios.get(baseURL + "/random");
        const object = response.data;

        res.render("index.ejs", {joke : response.data});

    }
    catch(err){
        return res.status(404).send(err.message);
    }
});

app.get("/all", async(req, res)=>
{
    try{
        const response = await axios.get(baseURL + "/all");
        const object = JSON.stringify(response.data);

        res.render("index.ejs", {
          jokes : object.jokeText
        });
        
    }
    catch(err){
        return res.status(404).send(err.message);
    }
})

app.listen(port , ()=>
{
    console.log(`server running on port ${port}`);
})