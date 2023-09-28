CREATE TABLE if not exists history (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    date              NUMERIC,
    model             TEXT,
    registration      TEXT,
    distance_traveled REAL,
    co2_emitted       REAL,
    calculated_tax    REAL
);


create table if not exists my_vehicles (
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

