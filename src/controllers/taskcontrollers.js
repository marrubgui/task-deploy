import Task from '../models/Task'
import {getPagination} from '../libs/getPagination'



export const findAllTasks = async (req, res) => {
    try {    // se puede utilizar express promise router
        const {size, page, title} = req.query;
        const condition = title ? {
            title: {$regex:new RegExp(title), $options:"i"},
        }:{};
        const {limit, offset} = getPagination(page,size);
        const data = await Task.paginate(condition, {offset,limit})
        res.json({
            totalItems: data.totalItems,
            tasks: data.docs,
            totalPages:data.totalPages,
            current:data.page - 1

        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong retrieving the tasks'
        })
    }
}


export const createTasks = async (req, res) => {
    if (!req.body.title) {           //modulos para validar express validator, joi validator
        return res.status(400).send({
            message: ' Content cannot be empty'
        })
    }
    try {
        const newTask = new Task(
            {
                title: req.body.title,
                description: req.body.description,
                done: req.body.done || false
            })
        const taskSave = await newTask.save();
        res.json(taskSave)
    }
    catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong creating a tasks'
        })
    }
}


export const findOneTask = async (req, res) => {
    const { id } = req.params;
    try{    
        const task = await Task.findById(id)
    
        if (!task) 
            return res
                .status(404)
                .json({ message: `Task with id ${id} not exist` })
    
        res.json(task);
    }
    catch(error){
        res.status(500).json({
            message: error.message || `Error Retrieving task with id: ${id}`
        })
    }
}

export const deleteTask = async (req, res) => {
    const {id} = req.params;
    try{
        await Task.findByIdAndDelete(id)
        res.json({
            message: 'Task were deleted succesfully'
        });
    }
    catch(error){
        res.status(500).json({
            message:`cannot delete task with id: ${id}`,
        })
    }
}

export const findAllDoneTasks = async (req, res) => {
    const tasks = await Task.find({ "done": true });
    res.json(tasks);

}

export const updateTask = async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        useFindAndModify: false
    });
    res.json({ message: "task was updated successfully" })
}