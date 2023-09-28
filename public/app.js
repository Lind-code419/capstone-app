document.addEventListener("alpine:init", () => {

    Alpine.data('appData', () => {
        return {

            vehicles: [],
            latitude: '',
            longitude: '',
            currentVehicle: '',
            vehicleEmission: '',
            currentScore: '',
            history:[],
            showSection1: false,
            showSection2: false,
            showSection3: false,
            showSection4: false,
            showSection5: false,
            showSection6: false,
            searchVehicle:'',
            currentDate:'',
            make:'',
            model:'',
            myVehicles:[],
            signedIn:1,



            init() {
                currentDate = new Date();
                console.log(currentDate);
                axios
                    .get('/api/getcurrentvehicle/')
                    .then(result => {
                        this.plans = result.data.plans;
                        console.log(result.data)
                        console.log(result.data.plans)

                    });


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


            viewHistory() {
                
                return axios
                    .get('/api/current_vehicle/history ', {
                        "plan_name": `${planName}`,
                        "sms_price": `${smsPrice}`,
                        "call_price": `${callPrice}`

                    })
                    //.then(result => { this.showCartData() })

                    .then(result => {alert(`Plan ${planName} updated`);this.init();})
                    

            },

            addVehicle() {
                
                return axios
                    .post('/api/settings/add_vehicle', {
                        
                            "id" : `${vehicleID}`
                        
                    })
                    .then(result => {alert(`Plan ${planID} deleted`);this.init();})
                    
            },

            deleteVehicle(vehicleID) {
                
                return axios
                    .post('/api/settings/delete_vehicle', {
                        
                            "id" : `${vehicleID}`
                        
                    })
                    .then(result => {alert(`Plan ${planID} deleted`);this.init();})
                    
            },

            searchVehicle(make, model) {
                
                return axios
                    .post('/api/searchVehicles', {
                        
                            "make" : `${make}`,
                            "model" :`${model}`
                        
                    })
                    .then(result => {alert(`Plan ${planID} deleted`);this.init();})
                    
            },

            myVehicles() {
                
                return axios
                    .get('/api/my_vehicles', {
                        "plan_name": `${planName}`,
                        "sms_price": `${smsPrice}`,
                        "call_price": `${callPrice}`

                    })
                    //.then(result => { this.showCartData() })

                    .then(result => {alert(`Plan ${planName} updated`);this.init();})
                    

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