const express = require('express')
const User = require('../models/user');
const router = new express.Router();

router.post('/users', (req, res) => {
    const user = new User(req.body)
    
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

router.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)
        //becouse findandupdate bypass the mongoose  
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req , res) => {
    
    try {
         console.log(req.body)
        //making common function in schema..
        const user = await User.FinByCreadentials(req.body.email, req.body.password);    
        console.log('user data',user);
        res.send(user);
    } catch (error) {
        res.status(400).send();
    }
    
});


module.exports = router; 