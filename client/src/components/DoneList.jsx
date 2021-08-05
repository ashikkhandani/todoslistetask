import React, { useState } from "react";
// axios
import axios from "axios";
// import files
import UpdateModal from "./Update";

const DoneList = ({
  index,
  id,
  task,
  priorität,
  deleteItem,
  listSetter,
  msgSetter,
}) => {
  // visibility state
  const [visible, setVisible] = useState(true);

  // delete function
  const del = () => {
    deleteItem(id);
  };

  // modify function
  const mod = (e) => {
    setVisible(false);
  };

  // visibility function
  const invisible = () => {
    setVisible(true);
  };

  // done function
  const done = (e) => {
    console.log(e.target.id);
    axios.post("/done", { id: id }).then((res) => {
      msgSetter(res.data.msg);
      axios.get("/add").then((res) => {
        listSetter(res.data);
      });
    });
  };

  return (
    <div className="main-todo">
      <div className="todo-container">
        {visible ? (
          <div className="todo-list-container">
            {/* Task details div */}
            <div className="task-organizer">
              <h3 className="task-header">Task : </h3>
              <br />
              <p className="task-title">{task} </p>
            </div>
            {/* Priority div */}
            <div className="priority-container">
              <h3 className="task-header">Priorität :</h3>
              <br />
              <p className="task-title">{priorität} </p>
            </div>
            {/* buttons div */}
            <div className="btns-container">
              <div className="child-btn">
                {/* update button */}
                <button type="button" onClick={mod} className="update-btn">
                  <i class="fas fa-edit"></i>

                  {/* Bearbeiten */}
                </button>
              </div>
              <div className="child-btn">
                {/* done button */}
                <button type="button" onClick={done} className="update-btn">
                  <i class="fas fa-check-circle"></i>
                  {/* Fertig */}
                </button>
              </div>
              <div className="child-btn">
                {/* delete button */}
                <button type="button" onClick={del}>
                  <i class="fas fa-trash-alt"></i>
                  {/* Löschen */}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <UpdateModal
            id={id}
            task={task}
            invisible={invisible}
            msgSetter={msgSetter}
            listSetter={listSetter}
          />
        )}
      </div>
    </div>
  );
};

export default DoneList;
