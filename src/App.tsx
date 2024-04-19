import React, { useState } from "react";
import "./App.css";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import AuthenticationService from "./services/AuthenticationService";
import Login from "./pages/login";
import OrderPage from "./pages/order";
import CreateAccount from "./pages/createAccount";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    AuthenticationService.isAuthenticated()
  );

  return (
    <div className="App">
      <Header
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />
      <main>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" Component={OrderPage} />
          ) : (
            <Route
              path="/"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
          )}
          <Route path="/createAccount" Component={CreateAccount} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
