// const { parse } = require("dotenv")
import axios from 'axios'
import Noty from 'noty'
import {initAdmin} from './admin'
import moment from 'moment'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
    //axios lib use widely for production
    axios.post('/update-cart', pizza).then((res) =>{
        console.log(res)
        cartCounter.innerText = res.data.totalQty

        new Noty({
            type : 'success',
            timeout : 1000,
            progressBar : false,
            // layout : 'topLeft',
            text : "Your item added to cart😋"
        }).show();

        // console.log(cartCounter.innerText)
    }).catch(err=>{
        new Noty({
            type : 'error',
            timeout : 1000,
            progressBar : false,
            layout : 'topLeft',
            text : "Something went wrong😕"
        }).show();

    })


}

addToCart.forEach((btn) =>{
    btn.addEventListener('click' , (e) =>{

        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        // console.log(pizza)
    })
})

//remove alert measssages after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(() =>{
        alertMsg.remove()
    } , 2000 ) 
}


// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}
updateStatus(order);

//socket
let socket = io()
//join
//creating private room for each order using unique id here we can use order id it is itself unique

if(order){
    socket.emit('join' ,`order_${order._id}`)
}

let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')){
    initAdmin(socket)
    socket.emit('join' , 'adminRoom')
}

socket.on('orderUpdated' , (data)=>{
    //copy object
    const updatedOrder = {...order}
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    // console.log(updatedOrder.status)
    updateStatus(updatedOrder)
    new Noty({
            type : 'success',
            timeout : 1000,
            text : "Order soon to come😋",
            progressBar : false,
            // layout : 'topLeft',
        }).show();
})
