import * as sqlite from 'sqlite'; // * to import module that is not pure es6
import sqlite3 from 'sqlite3';

const db = await sqlite.open({
    filename: './vehicle.db',
    driver: sqlite3.Database
});


// await db.migrate()

// query using await

//console.log(result); // cannot have 2 const in the same block

//funstion that returns all the queries

export async function my_vehicles() { //async marks as special function with await
    const result = await db.all(`select * from my_vehicles`);
    return result;

}

export async function current_vehicle() { //async marks as special function with await
    const result = await db.all(`select * from my_vehicles where currently_selected =1`);
    return result;

}

export async function change_vehicle(registration) {
    //sql statement -insert
    //insert into greetings (language, greeting) values (?,?)

    let sql = `update my_vehicles set currently_selected=0 where currently_selected = 1`;
    await db.run(sql);
    sql = `update my_vehicles set currently_selected=1 where registration = $1`;
    await db.run(sql, [registration]);
    current_vehicle();
}


export async function search_vehicles(make, model) { //async marks as special function with await
    let sql = `select * from vehicles where make =? and model =?`;

    let result = await db.all(sql, [make, model]); //find out how to check for empty array
    if (result = []) {
        sql = `select * from vehicles where make =? or model =?`;
        result = await db.all(sql, [make, model]);
    }

    return result;

}

export async function delete_vehicle(registration) {

    const sql = `delete from my_vehicles where registration =?`
    await db.run(sql, [registration]);
}

export async function view_users() { //async marks as special function with await
    const result = await db.all(`select * from user`);
    return result;

}

export async function historyDb(numberPerPage) { //async marks as special function with await
    const sql = `select * from history limit ?`;
    const result = await db.all(sql,[numberPerPage]);
    return result;

}

export async function add_journeyDB(date, model, registration, distance_traveled, co2_emitted, calculated_tax, currently_selected, score) { //async marks as special function with await
    const sql = `insert into history (date, model, registration, distance_traveled, co2_emitted, calculated_tax, currently_selected, score) values (?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await db.run(sql,[date, model, registration, distance_traveled, co2_emitted, calculated_tax, currently_selected, score]);
    return result;

}

export async function history_totalDB() { //async marks as special function with await
    const sql = `SELECT registration, model, ROUND(SUM(distance_traveled),2) as total_distance, SUM(co2_emitted) as total_co2, ROUND(SUM(calculated_tax),2) as total_tax, ROUND(AVG(score),2) as avg_score 
    FROM history 
    GROUP BY registration;`;
    const result = await db.all(sql);
    return result;

}

/*

Why aren't export functions arrow functions despite being async?

export async function updatePlan(plan_name, sms_price, call_price) {
        
    const sql = `update price_plan set call_cost = ?, sms_cost = ? where plan_name = $1`
    await db.run(sql, [sms_price, call_price, plan_name]);
}

export async function totalPhonebill(id,itemString) {
        
    const sql1 = `SELECT plan_name FROM price_plan`;
    let planName = '';
    planName = await db.get(sql1);
    console.log(planName);
    const sql2 = `SELECT sms_price FROM price_plan`;
    let smsPrice = ''; 
    smsPrice = await db.get(sql2);
    console.log(smsPrice);

    if (taxis.taxi_queue_count >=1 && passengers.passenger_queue_count >=12) {
        const sql3 = `update taxi_queue 
        SET 
            taxi_queue_count = taxi_queue_count - 1, 
            passenger_queue_count = passenger_queue_count - 12`;
        await db.run(sql3);

    }

    var calls = 0;
        var smses = 0;
          var item = itemString.split(',');
        console.log(item);
  
        for (let i =0; i < item.length; i++) {
        console.log(item[i]);
            if (item[i].includes('call')) {
            calls++;
        }
            else {
            smses++
        }
    
    }
  var callcost = calls * 2.75;
  var smscost = smses * 0.65;
  var billtotal = (callcost + smscost);
  return 'R'+ billtotal.toFixed(2);
}

console.log('end')
//ctrl-shift-p  to open database explorer
*/