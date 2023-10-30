document.addEventListener("alpine:init", () => {

    Alpine.data('appData', () => {
        return {

            vehicles: [],
            latitude: 0,
            longitude: 0,
            currentVehicle: '',
            vehicleEmission: '',
            currentScore: '',
            myHistory: [],
            journeys: [],
            showSection1: false,
            showSection2: false,
            showSection3: false,
            showSection4: false,
            showSection5: false,
            showSection6: false,
            showSubSection1: false,
            showSubSection2: false,
            showSubSection3: false,
            showSubSection4: false,
            searchVehicle: '',
            currentDate: '',
            currentDayNumber:'',
            currentMonth:'',
            currentYear:'',
            reformattedDate:'',
            make: '',
            model: '',
            myVehicles: [],
            signedIn: 0,
            username: '',
            password: '',
            searchResult_alpine: [],
            cylinders: '',
            users: [],
            vehicleSelection: '',
            resultsPerPage: 0,
            historyTotals: [],
            showHistorySection1: false,
            distanceTraveled: 0,
            taxResult: 0,
            carSelection: '',
            position: '',
            geoLoc: '',
            watchID: '',
            currentCoordinates:[],
            registrationNumber:'',
            currentDatePick:'',
            dateInput:'',
            flatpickrInstance: null,
            fuelType:'',
            vehicleSelectionTax:'',
            distanceEntered:'',
            combinedFuelConsumption:'',
            engineSize:'',
            makeAlpine:'',
            modelAlpine:'',
            selectedVehicleTax:'',
            predictedEmissions:'',
            currentVehicleEmissions: '',



            init() {
                currentDate = new Date();
                console.log(currentDate);
                this.currentDayNumber = currentDate.getDate();
                console.log(this.currentDayNumber);
                this.currentMonth = currentDate.getMonth() + 1;
                console.log(this.currentMonth);
                this.currentYear = currentDate.getFullYear();
                console.log(this.currentYear);
                this.reformattedDate = `${this.currentDayNumber}${this.currentMonth}${this.currentYear}`;
                console.log('Date = ' + this.reformattedDate);
                initialPosition = 0;
                this.viewHistory(10);
                //this.getLocationUpdate();
                this.createMap();

                console.log('initial position : ' + this.latitude);
                console.log('Login-status: ' + this.signedIn);
                axios
                    .get('/api/getcurrentvehicle/')
                    .then(result => {
                        this.plans = result.data.plans;
                        console.log(result.data)
                        console.log(result.data.plans)

                    });


            },

            viewMyVehicles() {

                return axios //this section works
                    .get('/api/my_vehicles')
                    .then(result => {
                        this.myVehicles = result.data.myVehicles;
                        console.log(result.data.myVehicles)


                    })


            },

            viewAccount() {

                return axios    //this section works
                    .get('/api/view_users')
                    .then(result => {
                        this.users = result.data.users;
                        console.log(result.data.users);

                    })

            },

            searchVehicle(make, model) {

                return axios ///this section works
                    .post('/api/search_vehicles', {

                        "make": `${make}`,
                        "model": `${model}`

                    })
                    .then(result => {
                        this.searchResult_alpine = result.data.searchResult;
                        console.log('here')
                        console.log(result.data.searchResult[0]);
                        console.log('check this');
                        console.log(this.searchResult_alpine);
                    })

            },

            viewHistory(resultsPerPage) {

                return axios //this section works
                    .post('/api/all_vehicles/view_history', {
                        "resultsPerPage": `${resultsPerPage}`

                    })
                    .then(result => {
                        this.journeys = result.data.history;
                        console.log(this.journeys);
                    })


            },

            viewHistoryTotals() {

                return axios    //this section works
                    .get('/api/history_totals')
                    .then(result => {
                        this.historyTotals = result.data.summary;//same as primary key?
                        console.log(result.data.summary);

                    })

            },

            showLocation(position) {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                currentCoordinates[0] =latitude;
                currentCoordinates[1] =longitude;
                console.log(this.currentCoordinates[0]);

                //this.currentCoordinates.push(position.coords.longitude);
                console.log(this.latitude + ' ' + this.longitude);
                alert("Latitude : " + latitude + " Longitude: " + longitude);
            },

            getLocationUpdate() {

                if (navigator.geolocation) {

                    // timeout at 60000 milliseconds (60 seconds)
                    var options = { timeout: 60000 };
                    geoLoc = navigator.geolocation;
                    watchID = geoLoc.watchPosition(this.showLocation, this.errorHandler, options);
                    console.log(this.watchID);
                } else {
                    alert("Browser does not support geolocation!");
                }
            },

            errorHandler(err) {
                if (err.code == 1) {
                    alert("Error: Access is denied!");
                } else if (err.code == 2) {
                    alert("Error: Position is unavailable!");
                }
            },

            onLocationFound(e) {
                var radius = e.accuracy;

                L.marker(e.latlng).addTo(map)
                    .bindPopup("You are within " + radius + " meters from this point").openPopup();

                L.circle(e.latlng, radius).addTo(map);

            },



            createMap(currentCoordinates) {
                //var map = L.map('map').setView(this.currentCoordinates, 13);
                const map = L.map('map').fitWorld();

                const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 15,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);

                function onLocationFound(e) {
                    const radius = e.accuracy / 2;

                    //var marker = L.marker([this.currentCoordinates]).addTo(map)
                    const locationMarker = L.marker(e.latlng).addTo(map)
                        console.log('location: ' + e.latlng) //this works
                        .bindPopup(`Starting Point`).openPopup();

                    //const locationCircle = L.circle(e.latlng, radius).addTo(map);
                    
                }

                function onLocationError(e) {
                    alert(e.message);
                }

                map.on('locationfound', onLocationFound);
                map.on('locationerror', onLocationError);

                map.locate({ setView: true, Zoom: 15 });
                //var map = L.map('map').setView([51.505, -0.09], 13);

                /*
                this.getLocationUpdate();
                console.log(this.latitude);
                var map = L.map('map').locate({setView: true, maxZoom: 16});//L.map('map').setView([this.latitude, this.longitude], 14);
                mapLink =
                  '<a href="http://openstreetmap.org">OpenStreetMap</a>';
                  map.on('locationfound', this.onLocationFound);
                L.tileLayer(
                  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; ' + mapLink + ' Contributors',
                  maxZoom: 18,
                }).addTo(map);
                L.marker(e.latlng).addTo(map); */
            },


            startRoute() {
                this.getLocationUpdate();               

                alert('Journey Started! lat: ' + this.latitude);

                /*return axios
                    .post('/api/price_plan/create ', {
                        "plan_name": `${planName}`,
                        "sms_price": `${smsPrice}`,
                        "call_price": `${callPrice}`

                    })
                    .then(result => {alert(`Journey Started!`);})
                    //.then(result => { this.showCartData() })
                    alert(`Journey Started!`);
                */

            },


            endRoute() {

                alert('Journey Ended!');
                var currentScore = Math.floor(Math.random() * 10);
                return axios
                    .post('/api/current_vehicle/add_journey', {
                        "date": `${reformattedDate}` ,
                        "model": "DB9",
                        "registration": `${this.vehicleSelection}`,
                        "distance_traveled": `${this.distanceEntered}`,
                        "co2_emitted": 6338,
                        "calculated_tax": 26.51,
                        "currently_selected": 1, //can you call method here?
                        "score": currentScore

                    })
                //.then(result => { alert(`Journey Started!`); })
                //.then(result => { this.showCartData() })



            },

            calculateTax(distanceEntered, currentVehicleEmissions) { //this section works 
                this.taxResult = this.distanceEntered * currentVehicleEmissions *  0.0002;
                return this.taxResult;

               /* return axios
                    .post('/api/all_vehicles/get_car_emissions', {
                        "selectedVehicleTax": `${selectedVehicleTax}`

                    })
                    .then(result => {
                        this.vehicleEmission = result.data.emission;//same as primary key?
                        console.log(result.data.emission);
                    })
                 */   
                },



            addExistingVehicle() {

                return axios
                    .post('/api/settings/add_existing_vehicle', {

                        "id": `${vehicleID}`

                    })
                    .then(result => { alert(`Plan ${planID} deleted`); this.init(); })

            },

           async predictVehicleEmissions(engineSize, fuelType, combinedFuelConsumption) {
                const bodyFormData = new FormData();
                bodyFormData.append('engine_size', `${engineSize}`);
                bodyFormData.append('fuel_type', `${fuelType}`);
                bodyFormData.append('consumption', `${combinedFuelConsumption}`);

                const response = await axios({
                    method: 'post',
                    url: 'https://ml-api-eqxs.onrender.com/predict',
                    data: bodyFormData,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': `multipart/form-data`
                    },
                });
                console.log(response);
                console.log('prediction answer: ' + response.data.prediction);
                this.predictedEmissions = response.data.prediction[0];
            },

            addNewVehicle() {

                const formData = new FormData();

                return axios
                    .post('https://ml-api-eqxs.onrender.com/predict', {

                        "id": `${vehicleID}`

                    })
                    .then(result => { alert(`Plan ${planID} deleted`); this.init(); })

                    //how to put two or more axios calls in same function

            },

            deleteVehicle(registration) { //this section possibly works, requires testing

                return axios
                    .post('/api/settings/delete_vehicle', {

                        "registration": `${registration}`,

                    })
                    .then(result => {



                    })

            },

            addJourney(registration) { //this section possibly works, requires testing

                var currentScore = Math.floor(Math.random() * 10);
                return axios
                    .post('/api/current_vehicle/add_journey', {
                        "date": `${reformattedDate}` ,
                        "model": "DB9",
                        "registration": `${this.vehicleSelection}`,
                        "distance_traveled": `${this.distanceEntered}`,
                        "co2_emitted": 6338,
                        "calculated_tax": 26.51,
                        "currently_selected": 1, //can you call method here?
                        "score": currentScore

                    })

                return axios
                    .post('/api/current_vehicle/add_journey', {

                        "date":`${reformattedDate}`, 
                        "model":"DB9",
                        "distance_traveled":34.3, 
                        "co2_emitted":3424, 
                        "calculated_tax":15.77, 
                        "currently_selected":1, 
                        "score":4

                    })
                    .then(result => {



                    })

                    

            },

            getCO2emitted() {

            },




            signOut() { //sort of works

                signedIn = 0;
                console.log('logged out');
                alert('Signed Out');
            },

            logIn() {

                signedIn = 1;
                console.log('logged in');
                alert('Signed In!');
            },





        }
    });



});