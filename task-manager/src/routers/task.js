const express = require('express');
const Task = require('../models/task');
const Inventory = require('../models/inventory');
const router = new express.Router();
//var cors = require('cors');

// use it before all route definitions
//app.use(cors({origin: 'http://localhost:3000'}));

router.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.get('/tasks', (req, res) => {
    Task.find({}).sort([['_id', -1]]).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send()
    })
})

router.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

router.delete('/delete_tasks/:id', (req, res) => {
    const _id = req.params.id
    console.log(_id);
    Task.deleteOne({_id : _id }).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})


router.get('/find_task/:description', (req, res) => {
    const description = req.params.description
        
    Task.find({ description: { $regex: description} }).then((task) => {
        if (!task) {
            //return res.status(404).send()
        }
        console.log(task);
        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

 /**query mongo data */
 router.post('/query_embedded_documents',(req , res)=> {

  Inventory.insertMany(req.body).then(() => {
        res.status(201).send("success");
    }).catch((e) => {
        res.status(400).send(e)
    });
 });

 router.get('/get_query_embedded_documents',(req, res) => {
    
    Inventory.find(
        { size : 
            { h : req.body.h, w : req.body.w , uom : req.body.uom } 
        }).then( (inventory) => {
            res.send(inventory);
    }).catch((e)=> {
        res.status(500).send(e);
    });
 })

/*delete and count incompleted tasks*/
router.get('/deleteAndCountIncomplteTask', async (req , res) => {
    try {
        const delte_task = await Task.findByIdAndDelete({_id : req.body.id});
        //const find_incompleted = await Task.countDocuments({completed : false});
       // find_incompleted2 = find_incompleted;
       if(!delte_task){
           res.status(400).send();
       }
        res.send(delte_task);

    } catch (error) {
        console.log(error);
    } 
});
module.exports = router;