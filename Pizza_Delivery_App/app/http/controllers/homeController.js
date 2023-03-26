//controller are use to write logic of routers so that router file will be clean
//Controller contain CRUD operation according requirement as in home page we just neeed read operation

const Menu = require('../../models/menu')
function homeController(){
    //factory function - which return object
    return{
        //returning reading object
        // index :function(){}

        async index(req,res){
    
            const pizzas = await Menu.find()
            return res.render('home' , {pizzas : pizzas})

            // Menu.find().then(function(pizzas){
            //     //pizzas in paranthesis of fun as well as second pizzas in render method is  array obj of all pizza
                // console.log(pizzas)
            //     return res.render('home' , {pizzas : pizzas})
            //  })
         
        }
    }

}

module.exports = homeController
