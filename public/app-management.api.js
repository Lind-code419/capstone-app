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

        






            init() {
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
                    .post('/api/settings/delete_vehicle', {
                        
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

           


        }
    });



});