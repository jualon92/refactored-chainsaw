import "./App.css";

import Home from "./Home";
import Agregar from "./Agregar";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/agregar" element={<Agregar />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
