const express = require('express')
const members = require('../../Members.js')
const uuid = require('uuid')
const router = express.Router()

// Gets all members
router.get('/', (req,res) => res.json(members))

// Get single member
router.get('/:id',(req, res) => {

    const found = members.some(memmber => memmber.id === parseInt(req.params.id))
    if(found)
        res.json(members.filter(elem => elem.id === parseInt(req.params.id)))
    else
        res.status(400).json({messgae: `No member with id ${req.params.id}`})
}) 

// Add member
router.post('/', (req, res) => {

    //Simply returns the received data back to the sende
    //res.send(req.body)

    const newMember = {
         id: uuid.v4(),
         name: req.body.name,
         email: req.body.email,
         status: 'active'
    }

    if( !newMember.name || !newMember.email)
       return res.status(400).json({msg: "Please include name and email"})
    
    members.push(newMember)
    res.status(200).json(members)
})

// Update member
router.put('/:id', (req, res) =>{

    // check if the requested id exsits in our data
    const found = members.some(memmber => memmber.id === parseInt.req.params.id)
    if (!found)
        return res.status(400).json({msg:`There is now user with id ${parseInt(req.params.id)}`})
    
    const updatedMember = req.body

    members.forEach(memmber => {

        if(memmber.id === updatedMember.id){
            memmber.name = updatedMember.name
            memmber.email = updatedMember.email
            memmber.status = updatedMember.status

            return res.status(200).json(members)
        }
    })

    
})

// Delete member
router.delete('/:id', (req, res) => {

    const found = members.some(member => member.id === parseInt(req.body.id))
    if(found)
        return res.status(200).json({msg:`Member deleted`, members: members.filter(member =>{
            member.id !== parseInt(req.body.id)})})
    
    res.status(400).json({msg:`Member with id ${req.body.id} doesn't exists` })
})

module.exports = router