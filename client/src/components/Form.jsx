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
      item: e.target.value,
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

  // submit function
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
    <div>
      <h2>This is form part</h2>
    </div>
  );
};

export default Form;
