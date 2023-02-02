const Tasks = require ("../model/tasks");
const asyncWrapper = require ("../middleware/async");

//get all the tasks
const getAllTasks = asyncWrapper(async (req,res) => {
    // res.send('get all tasks');
        const tasks = await Tasks.find();
        res.status(200).json({numOftasks: tasks.length, tasks});
});

//get a single task
const getTAsk = asyncWrapper(async (req,res) => {
    // res.send('get task');
    const {taskId} = req.params;
        const task = await Tasks.findOne({_id: taskId });
        if (!task){
            return res.status(404).json ({msg: `Task with the id : ${taskId} not found`})
        }
        res.status (200).json({task})
    
    });

//create task
const createTAsk = asyncWrapper(async (req,res) => {
    // res.send('create task');
        const {title, priority} = req.body
        if (!title || !priority) {
            return res.status(400).json ({msg:"Please provide necessary information"})
        }
        const task = await Tasks.create(req.body)
        res.status(201).json({msg:"Task created", task});
});

//update
const updateTAsk = asyncWrapper(async (req,res) => {
    // res.send('update task');
        const {taskId} = req.params;
        const Task = await Tasks.findOneAndUpdate({_id: taskId}, 
        req.body, {new: true, runValidators: true,
        })
        res.status (200).json({msg: "tasks updated successfully", Task});
});

//delete
const deleteTAsk = asyncWrapper(async (req,res) => {
    // res.send('delete task');
        const {taskId} = req.params
        const task = await Tasks.findOneAndDelete ({_id: taskId});
        res.status(200).json({msg:"Task Deleted", task});
});


//exports
module.exports = {
  getAllTasks, updateTAsk,deleteTAsk, getTAsk, createTAsk
}