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
    if (formContent.task!== "" || formContent.priorität !== null) {
      // axios
      axios.post("/update", formContent).then((res) => {
        console.log(res.data, "Update");
        msgSetter(res.data.msg);
        // axios
        axios.get("/add").then((res) => {
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
      <form className="modal-form" onSubmit={send}>
        <label htmlFor="task">Task :</label>
        <input
          type="text"
          id="task"
          name="task"
          onChange={handleChange}
          value={formContent.task}
          placeholder={task}
          minLength="10"
        />
        <div className="range-container">
          <div className="range-modal">
            <input
              type="range"
              id="priority"
              name="priority"
              min="1"
              max="5"
              step="1"
              onChange={priorityChange}
              value={formContent.priority}
            />
          </div>
          <div className="modal-counter">
            <p>{formContent.priority}</p>
          </div>
        </div>
        {/* buttons div */}
        <div className="btns-container">
          {/* update button */}
          <button type="button" onClick={undo} className="undo-btn">
            Abbrechen
          </button>
          {/* done button */}
          <button type="submit" className="fertig-btn">
            Fertig
          </button>
        </div>
      </form>
      {/* <h2>This is update container</h2> */}
    </div>
  );
};

export default Update;
