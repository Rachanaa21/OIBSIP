const { json } = require("express")
const order = require("../../../models/order")


function orderController(){
    return {
        index(req ,res){
            // $ne is not equal to  i.e. admin just want to see active order not completed
            order.find({status: { $ne : 'completed'} } ,
             null ,
              {sort : { 'createdAt' : -1}}).populate('customerId' , '-password').exec((err , orders)=>{
                if(req.xhr){
                    return res.json(orders)
                }
                else{                
                    return res.render('admin/orders')
                }
            })

        }
    }
}

module.exports = orderController