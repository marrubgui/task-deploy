import {Router} from 'express'


import * as tasksCtrl from '../controllers/taskcontrollers'


const router = Router();

router.get('/', tasksCtrl.findAllTasks);

router.post('/', tasksCtrl.createTasks)

router.get('/done',tasksCtrl.findAllDoneTasks);

router.get('/:id',tasksCtrl.findOneTask);

router.delete('/:id',tasksCtrl.deleteTask);

router.put('/:id',tasksCtrl.updateTask);

export default router;