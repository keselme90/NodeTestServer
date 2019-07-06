const express = require('express')
const members = require('../../Members.js')
const uuid = require('uuid')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID
const uri =  process.env.mongo_connection_string


// Gets all members
router.get('/', (req,res) => {

    
    var response = []

    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        
        if(err){
            console.log(err)
            return res.status(500).json({msg:"Error occured while trying to connect to database", error: err})
        }

        const collection = client.db("first-test").collection("members").find({})
        
        // perform actions on the collection objec
        collection.forEach( member => {

            response.push(member)

        }, () => {
            //After pushing all the data into response array, return it.
            client.close();
            return res.status(200).json(response)
        })
       
    });
})

// Get single member
router.get('/:id',(req, res) => {

    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {

        if(err){
            console.log(err)
            res.status(500).json({msg:"Error while trying to connect to data base", error: err})
        }
        const collection = client.db("first-test").collection("members").findOne({"_id": objectId(req.params.id)}, (err, result) =>{
            if (err) throw err
            console.log(result.name)
            client.close()
            return res.status(200).json(result)
        })
    })
}) 

// Add member
router.post('/', (req, res) => {

    //Simply returns the received data back to the sender
    //res.send(req.body)

    const newMember = {
         name: req.body.name,
         email: req.body.email,
         status: 'active',
         age: 72
    }

    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {

        if(err){
            console.log(err)
            res.status(500).json({msg:"Error while trying to connect to data base", error: err})
        }
        const collection = client.db("first-test").collection("members").insertOne(newMember, (err, result) =>{
            if (err) throw err
            console.log(result.name)
            client.close()
            res.redirect('/api/members')
        })
    })
})

// Update member
router.put('/:id', (req, res) =>{
    
    const client = new MongoClient(uri, { useNewUrlParser: true });

    const member = {
        name: req.body.name,
        email: req.body.email,
        status: req.body.status,
        age: req.body.age
    }

    client.connect(err => {

        if(err){
            console.log(err)
            res.status(500).json({msg:"Error while trying to connect to data base", error: err})
        }
        const collection = client.db("first-test").collection("members").updateOne({"_id":objectId(req.params.id)}, {$set: member}, (err, result) =>{
            if (err) throw err
            client.close()
            res.redirect('/api/members')
        })
    })
})

// Delete member
router.delete('/:id', (req, res) => {

    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {

        if(err){
            console.log(err)
            res.status(500).json({msg:"Error while trying to connect to data base", error: err})
        }
        const collection = client.db("first-test").collection("members").deleteOne({"_id":objectId(req.params.id)}, (err, result) =>{
            if (err) throw err
            client.close()
            res.redirect('/api/members')
        })
    })
})

module.exports = router