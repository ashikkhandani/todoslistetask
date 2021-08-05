import React from "react";

// import files
import ToDosList from "./components/ToDosList";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="app-container">
      {/* <h1>hello world</h1>
       */}
      <ToDosList />
      <Footer />
    </div>
  );
};

export default App;
