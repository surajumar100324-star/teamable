const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const {isInvalidEmail, isEmptyPayload} = require('./validator')


//const url1 = 'mongodb://myapp:mysecretpass@127.0.0.1:27017?authSource=comapny_db'

const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
const dbName = 'company_db'
const collName ='employees'


app.use(express.json())

//app.use(bodyParser.json())

app.use('/',express.static(__dirname + '/dist'))

app.get('/get-profile',async function(req , res){
  
    /// connect to db
    await client.connect()
    console.log('Connected successfully to server')

    //initiate or get the database & collections
   const db = client.db(dbName)
   const collection = db.collection(collName)


    // get data from database

   const result = await collection.findOne({id: 1})
   console.log(result)

   const  response = {
        name: result.name,
        email: result.email,
        interest: result.interest


   }

    res.send(result)
})

app.post('/update-profile',async function(req , res){
   const payload = req.body
   console.log(payload)

   await client.connect()
   console.log('Connected successfully to server')

   //initiate or get the database & collections
   const db = client.db(dbName)
   const collection = db.collection(collName)



 if(isEmptyPayload(payload) || isInvalidEmail(payload)){
    res.status(400).send({error: "empty payload. Couldnt update user profile"})
   }

   else {

     // connect to mongodb database
   await  client.connect()
   console.log('Connected successfully to server')

   //initiate the database
   const db = client.db(dbName)
   const collection = db.collection(collName)
    
   //save payload data to database */

   payload['id'] = 1
    const updatedValues = {$set: payload}
   await collection.updateOne({id: 1},updatedValues, {upsert: true})
   client.close()


    res.status(200).send({info: "user profile data updated successfully"})
    

   }
})

   

   



const server = app.listen(3000, function(){
    console.log("app listening on port 3000")
})

module.exports = {
    app, 
    server}