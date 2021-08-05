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
    setFormContent({
      ...formContent,
      task: e.target.value,
    });
  };

  // priority change function of tasks
  const priorityChange = (e) => {
    const number = parseInt(e.target.value);
    setFormContent({
      ...formContent,
      [e.target.name]: number,
    });
  };

  // send to backend function
  const send = (e) => {
    e.preventDefault();
    if (formContent.task !== "" && formContent.priorität !== null) {
      axios.post("/add", formContent).then((res) => {
        msgSetter(res.data.msg);
        axios.get("/add").then((res) => {
          listSetter(res.data);
        });
      });
    } else {
      msgSetter("Alle eingaben sind erforderlich!");
    }
    setFormContent({
      task: "",
      priorität: 3,
    });
  };

  return (
    <div className="form-container">
      <div className="form-center">
        <h3 className="container-title">Woran denkst du gerade ?</h3>
        <form className="task-form" onSubmit={send}>
          <label htmlFor="task">
            <p>Task : </p>
          </label>

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
          <button type="submit" className="add-btn">
            Hinzufügen
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
