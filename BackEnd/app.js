const process = require('process');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

const server = express();

let port = process.argv[2];

//clave secreta de la "base de datos"
let secrets = JSON.parse(fs.readFileSync(path.join(__dirname, 'secrets.json')))

server.use(bodyParser.json())
//cors middleware
server.use(cors())
//middleware para proteger rutas 
/* server.use(expressJWT({
    secret: secrets["jwtKey"]
}).unless({
    path: ['/login', '/register']
})) */


//username : admin ,  pass : admin

server.get('/categories', (request, response) => {
    console.log("he recibido una llamada GET al endpoint /categories")
    fs.readFile(path.join(__dirname, 'categories.json'), (err, data) => {
        response.send(JSON.parse(data))

    })
})

server.get('/subcategories/:categoryReferenceId', (request, response) => {
    console.log("he recibido una llamada GET al endpoint /subcategories/:categoryReferenceId")
    let categoryReference = request.params.categoryReferenceId;
    fs.readFile(path.join(__dirname, 'subcat.json'), (err, data) => {
        let subCatList = JSON.parse(data)
        let filterSubCat = subCatList.filter(function (element) {
            return (element["categoryReferenceId"] == categoryReference)
        });
        response.send(filterSubCat)
    })
})

//server.get('/products/:categoryid/:subcategoryid',(request,response)=> {
server.get('/products', (request, response) => {
    console.log("he recibido una llamada GET al endpoint /products")
    fs.readFile(path.join(__dirname, 'products.json'), (err, data) => {
        response.send(JSON.parse(data))

    })
})

server.get('/products/category/:categoryid', (request, response) => {
    console.log("he recibido una llamada GET al endpoint /products/category/:categoryid")
    let categoryId = request.params.categoryid;
    fs.readFile(path.join(__dirname, 'products.json'), (err, data) => {
        let prodCatList = JSON.parse(data)
        let filterProdCat = prodCatList.filter(function (element) {
            return (element["categoryId"] == categoryId)
        });
        response.send(filterProdCat)

    })
})

server.get('/products/subcategory/:subCategoryid', (request, response) => {
    console.log("he recibido una llamada GET al endpoint /products/subcategory/:subCategoryid")
    let subCategoryId = request.params.subCategoryid;
    fs.readFile(path.join(__dirname, 'products.json'), (err, data) => {
        let prodSubCatList = JSON.parse(data)
        let filterSubProdCat = prodSubCatList.filter(function (element) {
            return (element["subCategoryId"] == subCategoryId)
        });
        response.send(filterSubProdCat)

    })
})

server.post('/addProducts', (req, res) => {
    console.log('eh recibido una peticion al endpoint /addProducts')
    if (req.body["categoryId"] != undefined && req.body["subCategoryId"] != undefined && req.body["id"] != undefined && req.body["name"] != undefined && req.body["imageURL"] != undefined && req.body["price"] != undefined && req.body["unit"] != undefined && req.body["description"] != undefined && req.body["sizes"] != undefined && req.body["categoryId"] != "" && req.body["subCategoryId"] != "" && req.body["id"] != "" && req.body["name"] != "" && req.body["imageURL"] != "" && req.body["price"] != "" && req.body["unit"] != "" && req.body["description"] != "" && req.body["sizes"] != "") {
        fs.readFile(path.join(__dirname, 'products.json'), (err, data) => {
            if (err) {
                console.log(err)
            }
            let dataComplete = JSON.parse(data)
            let flag = false
            for (let i = 0; i < dataComplete.length; i++) {
                if (req.body["id"] === dataComplete[i]["id"]) {
                    
                    flag = true;
                }
            }
            if (!flag) {
                    dataComplete.push({
                        "categoryId": req["body"]["categoryId"],
                        "subCategoryId" : req["body"]["subCategoryId"],
                        "id": req["body"]["id"],
                        "name": req["body"]["name"],
                        "imageURL": req["body"]["imageURL"],
                        "price": req["body"]["price"],
                        "unit": req["body"]["unit"],
                        "description": req["body"]["description"],
                        "sizes": ["S","M","L","XL"]
                    })
                    fs.writeFile(path.join(__dirname, 'products.json'), JSON.stringify(dataComplete), (err, data) => {
                        console.log("product loaded correctly".green)
                        res.send({
                            "messege": "product loaded correctly"
                        })
                    }) //end writefile

            } else{
                console.log("product already exist, please check it")
                res.send({
                "messege": "product already exist, please check it"
            })}

        }) //end readfile

    }  else {
        console.log("please check the parameters")
        res.send({
        "messege": "please check the parameters"
        })
    }

}) //end post 


server.post('/register', (req, res) => {
    console.log('eh recibido una peticion al endpoint / register ')
    if (req.body["username"] != undefined && req.body["password"] != undefined &&           req.body["username"] != "" && req.body["password"] != "") {
        fs.readFile(path.join(__dirname, 'users.json'), (err, data) => {
            if (err) {
                console.log(err)
            }
            let dataComplete = JSON.parse(data)
            let flag = false
            let usernameData;
            for (let i = 0; i < dataComplete.length; i++) {
                if (req.body["username"] === dataComplete[i]["username"]) {
                    usernameData = dataComplete[i]
                    
                }}
            if(usernameData != undefined){
                flag = true;
                console.log("user already exist! please Login".red)
                res.send({
                    "message": "User already exist! please Login"
                })
                    
            }
                
            if (flag === false) {
                bcrypt.hash(req.body["password"], 10, function (err, hash) {
                    let password = hash
                    dataComplete.push({
                        "username": req.body["username"],
                        "password": password,
                        "admin" : 0
                    })
                    fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(dataComplete), (err, data) => {
                        console.log("usuario registrado".green)
                        res.send({
                            "message": "User created successfully!, you can log in now"
                        })
                    }) //end writefile
                });

            } // end if !flag


            /* }  */ //end for

        }) //end readfile

    } else {
        console.log("register incorrect".red)
        res.send({
            "message": "Parameters mustn't be empty"
        })
    }
}) //end post 

server.post('/login', (req, res) => {
    //compruebo que el mensaje llegue bien
    if (req.body["username"] != undefined && req.body["password"] != undefined && req.body["username"] != "" && req.body["password"] != "") {
        //leemos los contenidos del archivo de usuarios

        fs.readFile(path.join(__dirname, 'users.json'), (err, data) => {
            if (err) {
                console.log(err)
            } //log errors
            let dataComplete = JSON.parse(data);
            let userData;
            for (let i = 0; i < dataComplete.length; i++) {
                if (req.body["username"] === dataComplete[i]["username"]) {
                    userData = dataComplete[i]
                }
            }
            if (userData != undefined) {
                //check if password is correct. compare hash with the one in the users.json file
                bcrypt.compare(req.body["password"], userData["password"], (err, result) => {
                    if (!result) {
                        console.log("Password incorrect".red);
                        res.send({
                            "message": "Login incorrect, please check it!"
                        })
                    } else {
                        //create token
                        jwt.sign({
                            "username": userData["username"]
                        }, secrets["jwtKey"], (err, token) => {
                            console.log("Login correct".green)
                            res.send({
                                "message": "Login correct",
                                "token": token,
                                "admin" : userData["admin"]
                            })
                        })
                    }

                }) // end bcrypt

            } else {
                console.log("user doesnt't exist".red)
                res.send({
                    "message": "user doesnt't exist, please register"
                })
            }
        }) //end readfile
    } else {
        console.log("Login incorrect".red)
        res.send({
            "message": "Fields must be complete!"
        })
    }

})



server.put("/edit", (req, res) => {
    console.log("He recibido una llamada PUT al endpoint /edit");
    //deberia cambiar el req.body a una variable y modificarlo aca abajo en cada uno
    if (req.body["categoryId"] != undefined && req.body["subCategoryId"] != undefined && req.body["id"] != undefined && req.body["name"] != undefined && req.body["imageURL"] != undefined && req.body["price"] != undefined && req.body["unit"] != undefined && req.body["description"] != undefined && req.body["sizes"] != undefined && req.body["categoryId"] != "" && req.body["subCategoryId"] != "" && req.body["id"] != "" && req.body["name"] != "" && req.body["imageURL"] != "" && req.body["price"] != "" && req.body["unit"] != "" && req.body["description"] != "" && req.body["sizes"] != "") {
        fs.readFile(path.join(__dirname, 'products.json'), (err, data) => {
            let products = JSON.parse(data);
            let position = -1;
            for (let i = 0; i < products.length; i++) {
                if (products[i]["id"] === req["body"]["id"]) {                    
                    position = i;
                }
            }
            
            if (position == -1) {
                let error = {
                    status: "error",
                    message: "Ese productID no existe. Por favor, indique otro."
                }
                res.send(error);
            } else { 
                let keys = Object.keys(req["body"]);
                for (let i = 0; i < keys.length; i++) {
                   products[position][keys[i]] = req["body"][keys[i]]                    
                }
              
                fs.writeFile(path.join(__dirname, 'products.json'), JSON.stringify(products), () => {
                    let response = {
                        status: "OK",
                        message: "Perfecto! Producto modificado!"
                    }
                    res.send(response);
                })
            }
        })
    } else { let error = {
        status: "error",
        message: "incorrect Data. Send a  JSON with productID, subcategoryID,id, name, image, price, unit, description and sizes "
    }
    res.send(error)
    }
});



//creando json de usuarios
if (!fs.existsSync(path.join(__dirname, 'users.json'))) {
    fs.writeFileSync(path.join(__dirname, 'users.json'), "[]");
}


server.listen(port, () => {
    console.log("escuchando en puerto" + port)
})