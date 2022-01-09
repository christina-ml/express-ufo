// Dependencies
const express = require("express");
const nuforcReports = require("./nuforc_reports.json");

// Configuration
const app = express();

// Routes
app.get("/", (req, res)=>{
    res.send("welcome to Express UFO App");
    console.log(nuforcReports[0]);
})

// Export
module.exports = app;