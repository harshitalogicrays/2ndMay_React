const express=require('express')
const cors=require('cors')
// Cross-Origin Resource Sharing (CORS)
const stripe=require('stripe')('sk_test_51NOvqGSAvExKFAjaTkSgqxNXs5WQ8TofJQrBOJIhdkFNDBKzqbWwMSYYzbsfP6ozzQ1n3sljsSbCVHYnMhcePzGz00PbYWzMiX')

const app=express()
app.use(express.json())
app.use(cors())
//http://localhost:1000
app.get('/',(req,res)=>{
    res.send("hello from server")
})

app.post('/payment',async(req,res)=>{
    // console.log(req.body)
    let {items,userEmail,userID,amount,shippingAddress,description}=req.body
    const paymentIntent=await stripe.paymentIntents.create({
            amount:amount,
            currency:"usd",
            automatic_payment_methods:{enabled:true},
            description:description,
            shipping:{
                address:{
                    line1:shippingAddress.line1,
                    line2:shippingAddress.line2,
                    city:shippingAddress.city,
                    state:shippingAddress.state,
                    postal_code:shippingAddress.postal_code,
                    country:shippingAddress.country
                },
                name:shippingAddress.name,
                phone:shippingAddress.mobile
            }
    })
    res.send({clientSecret:paymentIntent.client_secret})
})

let PORT=1000
app.listen(PORT,()=>{console.log(`server started at http://localhost:1000`)})