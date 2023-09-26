document.addEventListener("alpine:init", () => {

    Alpine.data('appData', () => {
        return {

            plans: [],
            latitude: '',
            longitude: '',





            init() {
                axios
                    .get('/api/price_plans/')
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


            updatePlan(planName,  smsPrice, callPrice) {
                
                return axios
                    .post('/api/price_plan/create ', {
                        "plan_name": `${planName}`,
                        "sms_price": `${smsPrice}`,
                        "call_price": `${callPrice}`

                    })
                    //.then(result => { this.showCartData() })

                    .then(result => {alert(`Plan ${planName} updated`);this.init();})
                    

            },

            deletePlan(planID) {
                
                return axios
                    .post('/api/price_plan/delete', {
                        
                            "id" : `${planID}`
                        
                    })
                    .then(result => {alert(`Plan ${planID} deleted`);this.init();})
                    
            },

            pay(amount) {
                return axios
                    .post('https://pizza-api.projectcodex.net/api/pizza-cart/pay', {
                        "cart_code": "AaaCpfsnf8",
                        amount
                    })
                    .then(result => {
                        if (result.data.status == 'failure') {
                            this.message = result.data.message;
                            setTimeout(() => this.message = '', 3000)
                        }
                        else {
                            this.message = 'Payment successful';
                            setTimeout(() => {
                                this.message = '';
                                this.cartPizzas = [];
                                this.cartTotal = 0;
                                this.paymentAmount = 0.00;
                                this.cartId = ''
                            }, 5000)

                        }
                    })
            },



        }
    });



});