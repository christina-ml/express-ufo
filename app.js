// Dependencies
const express = require("express");
const nuforcReports = require("./nuforc_reports.json");

// Configuration
const app = express();

// Routes
app.get("/", (req, res)=>{
    res.send(`welcome to Express UFO App
        <h2>Number of Sightings: ${nuforcReports.length}</h2>
        `);
    console.log(nuforcReports[0]);
})

app.get("/sightings", (req, res)=>{
    const { state, city, shape } = req.query;
    console.log('state: ', state);
    console.log('city: ', city);
    console.log('shape: ', shape);

    const result = nuforcReports.filter((post)=>{
        // for search: no queries entered
        if (state === "" && city === "" && shape === ""){
            res.send(`
            </br>=====================</br>
            Please enter a valid localhost search.</br>
            An example of data to search:</br>
            State: ${post.state}, City: ${post.city}, Shape: ${post.shape}
            </br>=====================</br>
            `);
        }
        // for search: shape
        if (state === "" && city === "" && shape === post.shape){
            res.send(`
            </br>=====================</br>
            Date: ${post.date_time}</br>
            City: ${post.city}</br>
            State: ${post.state}</br>
            Shape: ${post.shape}</br>
            Duration: ${post.duration}</br>
            Text: ${post.text}
            </br>=====================</br>
            `);
        }
        
        // for search: state, city, shape
        if (state === post.state && city === post.city && shape === post.shape){
            res.send(`
            </br>=====================</br>
            Date: ${post.date_time}</br>
            City: ${post.city}</br>
            State: ${post.state}</br>
            Shape: ${post.shape}</br>
            Duration: ${post.duration}</br>
            Text: ${post.text}
            </br>=====================</br>
            `);
        }
    })
    res.send(result);
})

// Export
module.exports = app;