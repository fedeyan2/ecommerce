import { Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Nav from "./Components/Nav/Nav";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { checked } = useContext(AuthContext);

  return !checked ? null : (
    <div className="App">
      <header className="App-header">
        <Nav></Nav>
      </header>
      <Routes>
        <Route index element={<div>Pajaro inicio</div>} />
        <Route path="/auth">
          <Route path="/auth/register" element={<Auth />} />
          <Route path="/auth/login" element={<Auth />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
