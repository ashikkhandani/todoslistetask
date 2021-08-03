import React from "react";
// import files 
import List from "./components/Done";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="app-container">
      {/* <h1>hello world</h1>
       */}
      <List />
      <Footer />
    </div>
  );
};

export default App;
