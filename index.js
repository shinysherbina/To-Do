import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const months =["January","February","March","April","May","June","July","August","September","October","November","December"];
const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const day = new Date(); 
const today = days[day.getDay()]+"," +months[day.getMonth()] + " "+ day.getDate();
var todayTodo = [];
var workTodo = [];
var todayTaskDone = [];
var workTaskDone = [];

// Middleware - static files
//---------------------------
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//                 Backend
//-----------------------------------------

app.get("/",(req,res)=>{
    res.render("index.ejs",{today:today ,  todayChecklist:todayTodo});
});

// Navbar Today link - index.ejs refers to the today list
app.get("/pageToday",(req,res)=>{
    res.render("index.ejs",{today:today ,  todayChecklist:todayTodo});
});

// Navbar Work link
app.get("/pageWork",(req,res)=>{
    res.render("work.ejs",{ workChecklist:workTodo });
});

// Add new todo to the Today list
app.post("/today",(req,res)=>{
    todayTodo.push({todo :req.body["todo"], isChecked : ""});
    res.render("index.ejs",{today:today, todayChecklist:todayTodo});
    console.log("New today-todo added");
    console.log(todayTodo);
});

// Add new todo to the Work list
app.post("/work",(req,res)=>{
    workTodo.push({todo :req.body["todo"], isChecked : ""});
    res.render("work.ejs",{ workChecklist:workTodo});
    console.log("New work-todo added");
    console.log(todayTodo);
});

// Check if a list is done
app.post("/taskDone",(req,res)=>{
    console.log("Inside taskDone page");
    console.log(req.body["taskDone"]);
    console.log(req.body["page"]);
    
    if (req.body["page"] == "today"){
        console.log("Inside if");
        
        if (req.body["taskDone"] !== "no tasks"){
            todayTaskDone = req.body["taskDone"];
        }
        else{
            todayTaskDone = [];
        };
        console.log(todayTaskDone);
        for (var i=0; i< todayTodo.length; i++){
            if (todayTaskDone.includes(i.toString())){
                console.log("Inside checked if");
                todayTodo[i]["isChecked"] = "checked";
            }
            else{
                console.log("Inside checked else");
                todayTodo[i]["isChecked"] = "";
            };
        };
    }
    else if (req.body["page"] == "work"){
        console.log("Inside if");
        workTaskDone = req.body["taskDone"];
        console.log(workTaskDone);
        for (var i=0; i< workTodo.length; i++){
            if (workTaskDone.includes(i.toString())){
                console.log("Inside checked if");
                workTodo[i]["isChecked"] = "checked";
            }
            else{
                console.log("Inside checked else");
                workTodo[i]["isChecked"] = "";
            };
        };
    };
   
    console.log(workTaskDone);
    

   /* todayTodo[req.body["value"]]["isChecked"] = "checked";  
    console.log( todayTodo[req.body["value"]]); */
    res.render("index.ejs", { today:"changed", todayChecklist:todayTodo}); 
});

// Temp
app.post("/temp",(req,res)=>{
    console.log("Inside Temp");
    console.log(req.body);

});

//Initial connection
app.listen(port , ()=>{
    console.log("server got connected");
}) ;