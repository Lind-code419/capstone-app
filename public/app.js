document.addEventListener("alpine:init", () => {

    Alpine.data('appData', () => {
        return {

            vehicles: [],
            latitude: '',
            longitude: '',
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
            searchVehicle: '',
            currentDate: '',
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
            historyTotals:[],
            showHistorySection1:false,
            distanceEntered: 0,
            taxResult:0,
            showSubSection2:false,
            carSelection:'',



            init() {
                currentDate = new Date();
                console.log(currentDate);
                initialPosition = 0;
                this.viewHistory(10);
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

                return axios
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

                return axios
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



            startRoute() {

                alert('Journey Started!')
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
                return axios
                    .post('/api/current_vehicle/add_journey', {
                        "date": 25092023,
                        "model": "DB9",
                        "registration": "CB439GP",
                        "distance_traveled": 52.3,
                        "co2_emitted": 6338,
                        "calculated_tax": 26.51,
                        "currently_selected": 0,
                        "score": 3.5

                    })
                    //.then(result => { alert(`Journey Started!`); })
                //.then(result => { this.showCartData() })



            },

            calculateTax(distanceEntered) {
                 this.taxResult =this.distanceEntered * 0.2;
            },



            addVehicle() {

                return axios
                    .post('/api/settings/add_vehicle', {

                        "id": `${vehicleID}`

                    })
                    .then(result => { alert(`Plan ${planID} deleted`); this.init(); })

            },

            deleteVehicle(registration) {

                return axios
                    .post('/api/settings/delete_vehicle', {

                        "registration": `${registration}`

                    })
                    .then(result => {



                    })

            },




            signOut() {

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