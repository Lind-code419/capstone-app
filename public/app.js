document.addEventListener("alpine:init", () => {

    Alpine.data('appData', () => {
        return {

            vehicles: [],
            latitude: '',
            longitude: '',
            currentVehicle: '',
            vehicleEmission: '',
            currentScore: '',
            history: [],
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
            searchResult: '',
            cylinders: '',
            users: [],



            init() {
                currentDate = new Date();
                console.log(currentDate);
                initialPosition = 0;
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

                return axios
                    .get('/api/my_vehicles')
                    .then(result => {
                        this.myVehicles = result.data.myVehicles;
                        console.log(result.data.myVehicles)


                    })


            },

            viewAccount() {

                return axios
                    .get('/api/view_users')
                    .then(result => {
                        this.users = result.data.users;
                        console.log(result.data.users);
                        //console.log(result.users.id)
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
            viewHistory() {

                return axios
                    .get('/api/current_vehicle/history ')
                    .then(result => { alert(`History list`); })


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



            searchVehicle(make, model) {

                return axios
                    .post('/api/search_vehicles', {

                        "make": `${make}`,
                        "model": `${model}`

                    })
                    .then(result => { alert(`Plan ${planID} deleted`); this.init(); })

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