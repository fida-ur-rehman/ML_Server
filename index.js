const express = require("express")
const bodyParser=require("body-parser")
const firebase = require("firebase")
let {PythonShell} = require('python-shell')
const cors =require("cors")
const app = express()
const multer = require("multer");
const download = require("image-downloader")
const spawn = require("child_process").spawn;
const storage = multer.diskStorage({
  destination: function(req, file, cb){
      // console.log(req)
      cb(null, "uploads/")
  },
  filename: function(req, file, cb){
      // console.log(file)
      cb(null, file.originalname)
  }
});

const upload = multer({storage: storage});

app.use(cors())
app.use(bodyParser.json())

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header("preflightContinue", false)
//   res.header("optionsSuccessStatus",204)
//     next();
//   });
const firebaseConfig = {
    apiKey: "AIzaSyAmc-LwC6UzDcPOQbBO3f8Yy1MFT75f2ds",
    authDomain: "mlfinal-90543.firebaseapp.com",
    databaseURL: "https://mlfinal-90543.firebaseio.com",
    projectId: "mlfinal-90543",
    storageBucket: "mlfinal-90543.appspot.com",
    messagingSenderId: "914099792843",
    appId: "1:914099792843:web:a23d95b890107bcceea44e",
    measurementId: "G-33XYHRRPXN"
  };
  if(firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig)
  }
  
app.get("/",(req,res)=>{
    res.send("ON HOME ROUTE")
})

app.post("/login",async (req,res)=>{

    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
})

app.post("/url",async(req,res)=>{
    const url = req.body.url;
    console.log(url)
    const options = {
        url:url,
        dest:'C:/Users/fidau/Desktop/ML project/last/mlserverv3/uploads/photo.jpg'
    }
    download.image(options)
    .then(async ({filename})=>{
        console.log('saved to',filename)
        let pyFile = new PythonShell("predict.py")

    // pyFile.send(JSON.stringify(data));
    let output = ""
     
   pyFile.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        output = message
        console.log(message);
      });

      pyFile.end(function (err,code,signal) {
        if (err) {
          console.log(err)
          
          res.send(err)
        };
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
    
        if(output === "suspicious"){
            res.send("suspicious")
        } 
        if(output === "relatives"){
          res.send("relative")
        }
    })
       

    })
})


app.post("/adduser",async(req,res)=>{

  const url = req.body.url;
  console.log(url)
  const name = Math.floor(Math.random() * 10000) 
  const options = {
      url:url,
      dest:`C:/Users/fidau/Desktop/ML project/last/mlserverv3/training_set/relatives/${name}.jpg`
      
      
  }
  download.image(options)
  .then(async ({filename})=>{
      console.log(`Saved image in Relative traing sata set ${filename}`)
      res.send(`Added Relative to relative training set`)
      let pyFile = new PythonShell("model.py")

      // pyFile.send(JSON.stringify(data));
     let output = ""
     console.log("----------------------------------------Training Model---------------------------------------------------")
     pyFile.on('message', function (message) {
          // received a message sent from the Python script (a simple "print" statement)
          output = message
          console.log(message);
        });
  
        pyFile.end(function (err,code,signal) {
          if (err) {
            console.log(err)
            
            res.send(err)
          };
          console.log('The exit code was: ' + code);
          console.log('The exit signal was: ' + signal);
          console.log('finished');
          
          
      })
  })

  

})

app.get("/output", async (req,res) => {
    
     
   });
   

  



app.listen(3000,(req,res)=>{
    console.log("server started on port 3000")
})

