import express from 'express';
//import * as sqlite from 'sqlite';
//import sqlite3 from 'sqlite3';

console.log('START');
import { my_vehicles, current_vehicle, search_vehicles, change_vehicle, delete_vehicle, view_users, historyDb, add_journeyDB, history_totalDB, getEmission } from './db.js'


const app = express();
const PORT = process.env.PORT || 4011;
app.listen(PORT, () => `Server started ${PORT}`)

app.use(express.static('public'))
app.use(express.json())


console.log(`Server started on ${PORT}`)

//above part working 

app.get('/api/current_vehicle/', async (req, res) => {
    //const plans = await getPlans();
    const currentVehicle = await current_vehicle();
    console.log('current_vehicle');
    res.json({
        vehicle : currentVehicle

    })
});

//above part working 

app.get("/api/my_vehicles", async (req, res) => {
    console.log('My Vehicle List' );
    const myVehicles = await my_vehicles();

    res.json({
       
        myVehicles

    });
});

//above part working 


app.post('/api/search_vehicles', async (req,res) => {

    
    let make = (req.body.make);
    make = make.toUpperCase();    
    const model = req.body.model;
    const searchResult = await search_vehicles(make,model);
    console.log('SEARCH RESULTS:',searchResult);
    res.json({
        
        searchResult
    })
    
});

//above partially working, giving too many results 

app.post('/api/change_vehicle/', async (req, res) => {
    const registration = req.body.registration;
    const result = await change_vehicle(registration);
    
    
    res.json({
        status: 'success',
        vehicle : result
        
    });
});

//above part working

app.post('/api/settings/delete_vehicle', async (req, res) =>{
   
    const registration = req.body.registration;
    
    await delete_vehicle(registration)
    //
    res.json({
        status: 'success',
        message: `Deleted ${registration},`
    })
});

//above part working

app.get("/api/view_users", async (req, res) => {
    console.log('Here we\'ll find a user list' );
    const users = await view_users();

    res.json({
       
        users

    });
});

//above part working

app.post('/api/all_vehicles/view_history', async (req, res) => {
    const resultsPerPage = req.body.resultsPerPage;
    const history = await historyDb(resultsPerPage);
    console.log(history);
    res.json({
        history
    })
});

//sbove part working

app.get("/api/history_totals", async (req, res) => {
    console.log('My Vehicle List' );
    const summary = await history_totalDB();

    res.json({
       
        summary

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

app.get('/api/current_vehicle/view_history', async (req, res) => {
    //const plans = await getPlans();
    console.log('current_vehicle');
    res.json({
        date: 25052023, //investigate date format from javascript
        distance: 34,
        score: 7,
        emission: 30,
        tax: 4.50
    })
});


app.get("/api/view_all_vehicles", function (req, res) {
    console.log('Here we\'ll find a list' );

    res.json({
        list1 : my_vehicles()

    });
});

app.post('/api/current_vehicle/add_journey', async (req, res) =>{
    const date= req.body.date;
    const model= req.body.model;
    const registration=req.body.registration;
    const distance_traveled = req.body.distance_traveled;
    const co2_emitted = req.body.co2_emitted;
    const calculated_tax = req.body.calculated_tax;
    const currently_selected = req.body.currently_selected;
    const score = req.body.score;

    await add_journeyDB(date, model, registration, distance_traveled, co2_emitted, calculated_tax, currently_selected, score)
    
   
    res.json({
        status: 'success',
        message: `added journey,`
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

app.post('/api/all_vehicles/get_car_emissions', async (req, res) =>{
    //const usage = req.body.usage;
    const vehicle_selection_emission = req.body.selectedVehicleTax;
    const emissions = await getEmission(vehicle_selection_emission)
    
    
    res.json({
        status: 'success',
        emissions,
    })
});


