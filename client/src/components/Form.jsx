import React, { useState } from "react";
// axios
import axios from "axios";

const Form = ({ listSetter, msgSetter }) => {
  // form state
  const [formContent, setFormContent] = useState({
    task: "",
    priorität: 3,
  });

  // all functions

  // handleChange function to add new value
  const handleChange = (e) => {
    // updating state with new value
    setFormContent({
      ...formContent,
      task: e.target.value,
    });
  };

  // priority change function of tasks
  const priorityChange = (e) => {
    const number = parseInt(e.target.value);

    // updating state with new value
    setFormContent({
      ...formContent,
      [e.target.name]: number,
    });
  };

  // send to backend function
  const send = (e) => {
    e.preventDefault();

    // if condition
    if (formContent.task !== "" && formContent.priorität !== null) {
      // axios
      axios.post("/add", formContent).then((res) => {
        msgSetter(res.data.msg);
        axios.get("/add").then((res) => {
          listSetter(res.data);
        });
      });
    } else {
      msgSetter("Alle eingaben sind erforderlich!");
    }
    // set the previous state
    setFormContent({
      task: "",
      priorität: 3,
    });
  };

  return (
    <div className="form-container">
      <div className="form-center">
        <h4 className="container-title">Woran denkst du gerade ?</h4>
        <form className="task-form" onSubmit={send}>
          <label htmlFor="task">
            <p>Task : </p>
          </label>
          {/* Input */}
          <input
            type="text"
            id="task"
            name="task"
            onChange={handleChange}
            value={formContent.task}
            placeholder="Füge deine aufgabe hinzu.."
            minLength="10"
          />
          <label htmlFor="priotität">
            <p> Priorität : </p>
          </label>

          <div className="range-container">
            <div className="range">
              {/* Priority Range */}
              <input
                type="range"
                name="priorität"
                min="1"
                max="5"
                step="1"
                onChange={priorityChange}
                value={formContent.priorität}
              />
            </div>
            <div className="counter-form">{formContent.priorität}</div>
          </div>
          {/* Button */}
          <button type="submit" className="add-btn">
            Hinzufügen
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
