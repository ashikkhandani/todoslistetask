import React from "react";

// import files
import ToDosList from "./components/ToDosList";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">To-Do Liste Task</h1>

      {/*Components */}
      <ToDosList />
      <Footer />
    </div>
  );
};

export default App;
