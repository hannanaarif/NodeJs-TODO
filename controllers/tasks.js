const Task=require('../models/Task')

const getAlltasks=(req,res)=>{
    res.send("All tasks from controller")
}

const createTask= async(req,res)=>{
    try {
        const task=await Task.create(req.body)
        res.status(201).json({task})
    } catch (error) {
        res.status(400).json('unable to create task',error.message)
    }
}

const  getTask=async(req,res)=>{ 
    try {
        const data=await Task.findById(req.params.id)
        if (!data) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Found the task", data }); // Send data with success message
    } catch (error) {
        res.status(400).json({message:'unable to find task',error})
    }   
}

const  updateTask=(req,res)=>{
    res.send("update task")
}

const  deleteTask=(req,res)=>{
    res.send("delete task")
}

module.exports={
    getAlltasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}