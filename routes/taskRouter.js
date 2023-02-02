const router = require("express").Router();
const  {
    getAllTasks, updateTAsk,deleteTAsk, getTAsk, createTAsk
} = require ("../controller/taskController");

router.route("/").get(getAllTasks).post(createTAsk);
router.route("/:taskId").get(getTAsk).patch(updateTAsk).delete(deleteTAsk);

module.exports = router;
