import React, { useState } from "react";
// import axios
import axios from "axios";

const Update = ({ id, task, invisible, msgSetter, listSetter }) => {
  // form content state
  const [formContent, setFormContent] = useState({
    task: "",
    priorität: 3,
    id: id,
  });

  // all functions

  // handleChange function
  const handleChange = (e) => {
    // console.log(e.target.value, "value");
    setFormContent({
      ...formContent,
      task: e.target.value,
    });
    // console.log(formContent, "handleChange");
  };

  // priority change function
  const priorityChange = (e) => {
    // console.log(e.target.value,"priority");
    const number = parseInt(e.target.value);
    // console.log(number);
    setFormContent({
      ...formContent,
      [e.target.name]: number,
    });
  };

  // send to backend  function
  const send = (e) => {
    e.preventDefault();
    if (formContent.task !== "" || formContent.priorität !== null) {
      // axios
      axios.post("/update", formContent).then((res) => {
        // console.log(res.data, "Update");
        msgSetter(res.data.msg);
        // axios
        axios.get("/add").then((res) => {
          // console.log(res.data, "Add");
          listSetter(res.data);
        });
      });
    }
    // reset the form
    setFormContent({
      task: "",
      priorität: 3,
    });

    // close modify form
    invisible();
  };

  // close modify form
  const undo = () => {
    invisible();
  };

  return (
    <div className="update-container">
      <form className="task-form" onSubmit={send}>
        <label htmlFor="task">Task :</label>
        {/* Input */}
        <input
          type="text"
          id="task"
          name="task"
          onChange={handleChange}
          value={formContent.task}
          placeholder={task}
          minLength="10"
        />
        <label htmlFor="priorität">Priorität :</label>

        <div className="range-container">
          <div className="range">
            {/* Priority Range */}
            <input
              type="range"
              id="priorität"
              name="priorität"
              min="1"
              max="5"
              step="1"
              onChange={priorityChange}
              value={formContent.priorität}
            />
          </div>
          <div className="counter-form">
            <p>{formContent.priorität}</p>
          </div>
        </div>
        {/* buttons div */}
        <div className="btns-container">
          {/* update button */}
          <button type="button" onClick={undo} className="undo-btn">
            Abbrechen
          </button>
          {/* done button */}
          <button type="submit" className="add-btn">
            Update
          </button>
        </div>
      </form>
      {/* <h2>This is update container</h2> */}
    </div>
  );
};

export default Update;
