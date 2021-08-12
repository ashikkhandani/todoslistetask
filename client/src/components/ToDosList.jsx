import React, { useState, useEffect } from "react";
// axios
import axios from "axios";
// import files
import Form from "./Form";
import DoneList from "./DoneList";

const ToDosList = () => {
  // done list state
  const [list, setList] = useState([]);

  // message state
  const [msgCenter, setMsgCenter] = useState("");

  // print the content of database (useEffect)
  useEffect(() => {
    axios.get("/add").then((res) => {
      setList(res.data);
    });
  }, []);

  // message fade-out
  const fade = () => {
    setMsgCenter("");
  };
  // useEffect
  useEffect(() => {
    setTimeout(fade, 4000);
  }, [msgCenter]);

  // delete item function
  const deleteItem = (id) => {
    // deleting item
    axios
      .delete("/delete/" + id)
      .then((res) => {
        // console.log(res.data);
        setMsgCenter(res.data.msg);

        axios.get("/add").then((res) => {
          // console.log(res.data);
          setList(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get the database content from components
  const listSetter = (data) => {
    setList(data);
  };

  // get message from components
  const msgSetter = (msg) => {
    setMsgCenter(msg);
  };

  return (
    <div>
      {/* Form component */}
      <Form listSetter={listSetter} msgSetter={msgSetter} />
      {/* Display status message container */}
      <div className="message-container">
        <div className="message-center">
          {msgCenter === "" ? (
            <p className="status-text">
              <b>Status</b> : Keine neue Aufgabe hinzugefügt..
            </p>
          ) : (
            <p className="status-text">
              <b>Status</b> : {msgCenter}
            </p>
          )}
        </div>
      </div>
      <h2 className="app-title">Meine Liste</h2>

      {/* Display ToDosList Task list container */}
      <div className="task-list-container">
        {/* <h3>ToDo Liste :</h3> */}

        {/* using map method to display task lists */}
        {list.map((item, index) => {
          return (
            // Passing Data to DoneList Component
            <DoneList
              key={index}
              id={item._id}
              task={item.task}
              priorität={item.priorität}
              deleteItem={deleteItem}
              listSetter={listSetter}
              msgSetter={msgSetter}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ToDosList;
