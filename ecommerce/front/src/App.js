import { Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav></Nav>
      </header>
      <Routes>
        <Route path="/auth">
          <Route path="/auth/register" element={<Auth />} />
          <Route path="/auth/login" element={<Auth />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
