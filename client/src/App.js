import "./App.css";

import Home from "./Home";
import Alta from "./Alta";
import NavBar from "./NavBar";
import Listado from "./Listado";
import { HashRouter as Router, Route, Routes } from "react-router-dom";


//hashrouter porque quiero que conserve f5 
function App() {
  return (
    <Router> 
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route   path="/" element={<Home />}></Route>
            <Route exact path="/alta" element={<Alta />}></Route>
            <Route exact path="/listado" element={<Listado />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
