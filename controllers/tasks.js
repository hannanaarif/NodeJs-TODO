const Task=require('../models/Task')

const getAlltasks=async(req,res)=>{
    try {
        const tasks=await Task.find()
        if (tasks.length === 0) {
            return res.status(404).json({ msg: 'No tasks found.' });
        }
        res.status(200).json({alltasks:tasks})
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const createTask= async(req,res)=>{
    try {
          // Manual check for empty "name"
    // if (!req.body.name || req.body.name.trim() === "") {
    //     throw new Error("Name is required");
    //   }
        const task=await Task.create(req.body)
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const  getTask=async(req,res)=>{ 
    try {
        const data=await Task.findOne({_id:req.params.id})
        if (!data) {
            return res.status(404).json({ message: "Task not found"});
        }
        res.status(200).json({ message: "Found the task", data }); // Send data with success message
    } catch (error) {
        res.status(400).json({message:'unable to find task',error})
    }   
}

const  updateTask=async(req,res)=>{
    try {
        const {id}=req.params;
        const data=req.body
        if (!id) {
            return res.status(400).json({ msg: 'Invalid task ID' });
        }
        const updatedtask=await Task.findByIdAndUpdate(id,data,{ new: true });
        res.status(201).json({updatedtask})

        if (!updatedtask) {
            return res.status(404).json({ msg: 'Task not found.' });
        }
        
    } catch (error) {
        res.status(500).json({ msg: 'Server error occurred. Please try again later.' });
    }
    
}

const  deleteTask=async(req,res)=>{
    
    try {
        const {id:taskId}=req.params
        const task=await Task.findByIdAndDelete({_id:taskId})
        if (!task) {
            return res.status(404).json({ msg: 'Task not found.' });
        }
        res.status(200).json({task}) 
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports={
    getAlltasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}