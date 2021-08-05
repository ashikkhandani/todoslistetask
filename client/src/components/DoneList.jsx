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
    <div>
      <h2>This is ToDo container</h2>
      {visible ? (
        <div className="todo-container">
          {/*  delete button */}
          <div className="delete-box">
            <button type="button" onClick={del}>
              Löschen
            </button>
          </div>
          {/* Task details div */}
          <div className="task-organizer">
            <p>Task : </p>
            <h4>{task} </h4>
          </div>
          {/* Priority div */}
          <div className="task-organizer">
            <p>Priorität :</p>
            <h4>{priorität} </h4>
          </div>
          {/* buttons div */}
          <div className="btns-container">
            {/* update button */}
            <button type="button" onClick={mod} className="update-btn">
              Bearbeiten
            </button>
            {/* done button */}
            <button type="button" onClick={done} className="update-btn">
              Fertig
            </button>
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
  );
};

export default DoneList;
