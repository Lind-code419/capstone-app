create table carbon_data (
    id integer primary key AUTOINCREMENT,
    registration,
    model,
    journey_date date,
    distance_traveled real,
    score real,
    co2_emitted,
    calculated_tax
   
);

create table my_vehicles (
    id integer primary key AUTOINCREMENT
    make,
    model,
    engine_size,
    cylinders,
    transmission,
    fuel_type,
    city_consumption,
    highway_consumption,
    combined_consumption_lp100km,
    combined_consumption_mpg,
    carbon_emissions
    
);

