const Task = require("../models/ToDos");

// To display lists function
exports.displayList = (req, res) => {
  Task.find()
    .sort({ priorität: 1 })
    .exec((err, item) => {
      res.json(item);
    });
};

// to add items function
exports.addItemToList = (req, res) => {
  const newTask = new Task({
    task: req.body.task,
    priorität: req.body.priorität,
  });
  // save the new task added
  newTask.save((err, doc) => {
    res.json({ msg: `${doc.task} wurde erfolgreich  hinzugefügt.` });
  });
};

// to delete items function
exports.deleteItem = (req, res) => {
  const taskId = req.params.id;
  //   console.log(itemId, "id");
  Task.findByIdAndDelete(taskId, (err, item) => {
    res.json({ msg: `${item.task} wurde erfolgreich entfernt. ` });
  });
};

// to update items function
exports.updateItem = (req, res) => {
  taskId = req.body.id;
  // console.log(req.body,"controller 36 ");
  if (req.body.task == "") {
    Task.findById(taskId, (err, doc) => {
      // console.log(doc, "controller 39");
      Task.findByIdAndUpdate(
        taskId,
        {
          task: doc.task,
          priorität: req.body.priorität,
        },
        (err, doc) => {
          if (err) {
            console.log(err, "controller 48");
          } else {
            res.json({ msg: `${doc.task}, wurde aktulisiert` });
          }
        }
      );
    });
  } else {
    Task.findByIdAndUpdate(
      taskId,
      {
        task: req.body.task,
        priorität: req.body.priorität,
      },
      (err, doc) => {
        if (err) {
          console.log(err, "controller 64");
        } else {
          res.json({ msg: `${doc.task} wurde aktulisiert. ` });
        }
      }
    );
  }
};

// done function
exports.doneList = (req, res) => {
  const taskId = req.body.id;
  //   console.log(req.body.id, "Controller 18");
  Task.findByIdAndUpdate(taskId, { priorität: 5 }, (err, doc) => {
    if (err) {
      console.log(err, "controller 79");
    } else {
      res.json({ msg: "Erfolgreich Erledigt" });
    }
  });
};
