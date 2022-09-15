const express = require("express");
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
const cors = require("cors");
// To connect with your mongoDB database
const mongoose = require("mongoose");
const { useParams } = require("react-router-dom");
const PORT = process.env.PORT||8000;

const Axios = require("axios");
var open = require('open');
const { ObjectId } = require("mongodb");
app.use(cors());
app.use(express.json());

// Connecting to database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Abhip32:Abhip%4032@cluster0.h2ekc1w.mongodb.net/test";

app.post("/getQuestions",(req, res) => {
    console.log("getQuestions")
    MongoClient.connect(url).then((client) => {
        const connect = client.db("QuizApp");
            
        // Connect to collection
        const collection = connect.collection("Quizes");
        collection.find().toArray().then ((ans) => {
            res.send(ans)
        });
})
})


app.post("/getTestQuestions",(req, res) => {
    let para=req.body.Name;
    console.log("getTestQuestions")
    MongoClient.connect(url).then((client) => {
        const connect = client.db("QuizApp");
            
        // Connect to collection
        const collection = connect.collection("Quizes");
        collection.find({"Name":para}).toArray().then ((ans) => {
            res.send(ans)
        });
})
})

app.post("/CreateTest",(req, res) => {
    console.log("createQuestions")
    let Paper=req.body.Paper;
    let name=req.body.name;
    let email=req.body.email;
    console.log("getCreateTest")
  
       MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("QuizApp");

                var myobj = { Question:Paper,Name:Paper[0][0].name,CreatedBy:name,email:email};
            
            dbo.collection("Quizes").insertOne(myobj, function(err, res) {
            if (err) out="fail"
            else out="success"
            console.log("1 document inserted");
            db.close();
            });
        })

    })


    
    app.post("/SubmitTest",(req, res) => {
        let answers=req.body.answers;
        let user=req.body.user;
        let email=req.body.email;
        console.log("SubmitTest")

        console.log(answers,user,email)
        
      
           MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("QuizApp");
                myobj={"Name":user,"Email":email,"Answers":answers}
                dbo.collection("Submissions").insertOne(myobj, function(err, res) {
                if (err) out="fail"
                else out="success"
                console.log("1 document inserted");
                db.close();
                });
            })
        })



if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
        app.use(express.static('build'));
        app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'build','index.html'));
      });
    }



app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});