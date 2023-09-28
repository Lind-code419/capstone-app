import express from 'express';
//import * as sqlite from 'sqlite';
//import sqlite3 from 'sqlite3';

import { my_vehicles } from './db.js'



const app = express();
const PORT = process.env.PORT || 4011;
app.listen(PORT, () => `Server started ${PORT}`)

app.use(express.static('public'))
app.use(express.json())


console.log(`Server started on ${PORT}`)

app.get('/api/current_vehicle/', async (req, res) => {
    //const plans = await getPlans();
    console.log('current_vehicle');
    res.json({
        registration : "CBZ454GP",
        model: "Suzuki Swift",
        journeys: 256

    })
});

app.get('/api/current_vehicle/view_history', async (req, res) => {
    //const plans = await getPlans();
    console.log('current_vehicle');
    res.json({
        date: 25052023,
        distance: 34,
        score: 7,
        emission: 30,
        tax: 4.50
    })
});

app.post('/api/searchVehicles', async (req,res) => {
    res.json({
        status : 'success'
    })

});


app.get("/api/view_all_vehicles", function (req, res) {
    console.log('Here we\'ll find a list' );

    res.json({
        list1 : "list1"

    });
});

app.get("/api/my_vehicles", function (req, res) {
    console.log('Here we\'ll find a list' );

    res.json({
        list1 : "list1",
        vehicle: my_vehicles(),

    });
});



app.post('/current_vehicle/add_journey', async (req, res) =>{
    //const usage = req.body.usage;
    const id = req.body.id
    
    //await deletePlan(id)
    //
    res.json({
        status: 'success',
        message: `Deleted ${id},`
    })
});


app.post('/api/change_vehicle/', function (req, res) {
    const price_plan = req.body.price_plan;
    const actions = req.body.actions;
    //const price = req.body.price

    res.json({
        status: 'success',
        vehicle : "Nissan"

    });
});

app.post('/api/settings/add_vehicle', async (req, res) => {
    console.log(req.body)
    const id = req.body.id;
    const vehicle = req.body.vehicle;
    const sms_price = req.body.sms_price;
    const call_price = req.body.call_price;

    //await addPlan(plan_name, sms_price, call_price)
    //
    res.json({
        status: 'success',
        message: `Added a new vehicle,`
    })
});


app.post('/api/settings/delete_vehicle', async (req, res) =>{
    //const usage = req.body.usage;
    const id = req.body.id
    
    //await deletePlan(id)
    //
    res.json({
        status: 'success',
        message: `Deleted ${id},`
    })
});

app.post('/api/settings/new_vehicle', async (req, res) =>{
    //const usage = req.body.usage;
    const id = req.body.id
    
    //await deletePlan(id)
    //
    res.json({
        status: 'success',
        emissions: 184,
    })
});


