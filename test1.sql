-- SQLite
--UPDATE my_vehicles SET make = 'Aston-Martin', total_jorneys = 0
--WHERE id=1;

--INSERT INTO my_vehicles (make, model, engine_size, cylinders, transmission, fuel_type, city_consumption, highway_consumption, combined_consumption_lp100km,combined_consumption_mpg,carbon_emissions,registration,currently_selected,total_jorneys)
--VALUES('TOYOTA','Prius',1.8,4,'AV','X',	4.4,4.6,4.4,64.0,105.0,'DBZ103GP',0,43)

DELETE FROM my_vehicles
WHERE id = 3;

SELECT * FROM my_vehicles;

--UPDATE my_vehicles SET currently_selected = 0
--WHERE id=1;


-- SQLite
INSERT INTO user (user_name, user_surname, email_address, password, sharing_email, sharing_whatsapp, signed_in, last_signin)
VALUES ('Smith', 'MacSmith', 'smithy@random.com', '12345', 'smithy@random.com', '27724357876',1,'23092023');

SELECT * FROM user;

update user set user_name='Smith', email_address='smithy@random.com', signed_in=1, last_signin='23092023', sharing_email='mrssmithy@random.com' where id =1;
update user set user_name='Jane' where id =2;

INSERT INTO history (date, model, registration, distance_traveled, co2_emitted, calculated_tax, currently_selected, score)
VALUES (24092023, 'Prius', 'CBZ454GP', 28.4, 263, 1.65, 1, 8);

SELECT * FROM history;

select * from history limit 10

SELECT registration, SUM(distance_traveled) as total_distance, SUM(co2_emitted) as total_co2, SUM(calculated_tax) as total_tax, AVG(score) as avg_score FROM history GROUP BY registration;