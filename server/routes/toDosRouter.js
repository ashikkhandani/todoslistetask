const express = require("express");
const router = express.Router();

// import controller file
const toDosController = require("../controller/toDosController");

// get method to display
router.get("/add", toDosController.displayList);
// post method to add tasks to list
router.post("/add", toDosController.addItemToList);
// done list
router.post("/done", toDosController.doneList);
// delete task with id
router.delete("/delete/:id", toDosController.deleteItem);
// update added task with new value
router.post("/update", toDosController.updateItem);

// export module
module.exports = router;
