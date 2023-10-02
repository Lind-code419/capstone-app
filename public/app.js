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
            journeys:[],
            showSection1: false,
            showSection2: false,
            showSection3: false,
            showSection4: false,
            showSection5: false,
            showSection6: false,
            searchVehicle: '',
            currentDate: '',
            make: '',
            model: '',
            myVehicles: [],
            signedIn: 0,
            username: '',
            password: '',
            searchResult: [],
            cylinders: '',
            users: [],
            vehicleSelection: '',
            resultsPerPage: '',



            init() {
                currentDate = new Date();
                console.log(currentDate);
                initialPosition = 0;
                this.viewHistory(5);
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
                        this.searchResult = result.data.result;
                        console.log(result.data.result);
                    })

            },

            viewHistory(resultsPerPage) {

                return axios
                    .post('/api/all_vehicles/view_history', {
                        "resultsPerPage" :`${resultsPerPage}`

                    })
                    .then(result => { 
                        this.journeys=result.data.history;
                        console.log(this.journeys);
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

                alert('Journey Ended!')


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