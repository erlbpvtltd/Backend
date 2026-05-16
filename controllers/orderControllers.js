import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
    

// placing the user order on the frontend page
const placeOrder = async (req, res) => {
    
    
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save(); // saving in the database 


        res.json({success:true, message:"Order Placed Successfull!\n Soon you will get a conformation Call!! "})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error in placing order"})
    }
};


//Creating a tempararily verifying payment system (devops is a proper way to verify the order)
const verifyOrder = async (req, res) =>{
    const {orderId, success} = req.body
    try {
        if(success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            res.json({success:true, message:'payment done successfully'})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false, message:'payment not done'})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error in verifying order"})
    }
}

//fetching all orders of a user
const userOrders = async (req, res) => {
    try {
        const userOrders = await orderModel.find({userId: `${req.body.userId}`})
        res.json({success: true, data: userOrders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error in fetching orders"})
    }
}

// fetchin all the orders in the database
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        const order = orders.filter((order) => {return order.payment === true});
        res.json({ success: true, data: order })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error in fetching orders" })
    }
}

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.id, { status:req.body.status})
        res.json({ success: true, message: 'Status updated successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error in updating status' })
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus}
