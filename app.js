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


    /* 
        This works, but it uses `res.write` and `res.end` instead of `res.send`
        How can I make this work in a loop that uses `res.send` at the end?
        You can't send multiple `res.send` because it closes the connection.
        https://blog.kevinchisholm.com/javascript/node-js/express-js/response-send-end-write-difference/
   
        For testing: http://localhost:3004/sightings?state=MO&city=Kansas%20City&shape=Light
            A, B, C
            A, -, -
            A, B, -
            A, -, C
            -, B, C
            -, B, -
            -, -, C 
            -, -, - // NO QUERY (don't want to show everything - this is guard clause)
        */
    for (let report of nuforcReports){
        if ((state === report.state && city === report.city && shape === report.shape)
            || (state === report.state && city === "" && shape === "")
            || (state === report.state && city === report.city && shape === "")
            || (state === report.state && city === "" && shape === report.shape)
            || (state === "" && city === report.city && shape === report.shape)
            || (state === "" && city === report.city && shape === "")
            || (state === "" && city === "" && shape === report.shape)            
            ){
            res.write(`
=====================
Date: ${report.date_time}
City: ${report.city}
State: ${report.state}
Shape: ${report.shape}
Duration: ${report.duration}
Text: ${report.text}
=====================
                `);
        } else if (state === "" && city === "" && shape === ""){
            res.send(`
            </br>=====================</br>
            Please enter a valid localhost search.</br>
            An example of data to search:</br>
            State: ${report.state}, City: ${report.city}, Shape: ${report.shape}
            </br>=====================</br>
            `);
        }
    }
    res.end();


    /*
        This way only gives one response every time I search a query, not multiple responses.
        How can I fix this so that it loops multiple times before doing `res.send`?
    */

    // let result = nuforcReports.filter((post)=>{
    //     // for search: no queries entered
        // if (state === "" && city === "" && shape === ""){
        //     res.send(`
        //     </br>=====================</br>
        //     Please enter a valid localhost search.</br>
        //     An example of data to search:</br>
        //     State: ${post.state}, City: ${post.city}, Shape: ${post.shape}
        //     </br>=====================</br>
        //     `);
        // }        
    //     // for search: state, city, shape
    //     if (state === post.state && city === post.city && shape === post.shape){
            // res.send (`
            // </br>=====================</br>
            // Date: ${post.date_time}</br>
            // City: ${post.city}</br>
            // State: ${post.state}</br>
            // Shape: ${post.shape}</br>
            // Duration: ${post.duration}</br>
            // Text: ${post.text}
            // </br>=====================</br>
            // `);
    //     }
    // })
    // res.send(result);
})

// Export
module.exports = app;