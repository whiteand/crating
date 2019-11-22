import React from "react";
import { Core } from "./containers/Core";
import { Provider as StoreProvider } from "./store";
import "./App.css";

function App() {
  return (
    <div className="app">
      <StoreProvider>
        <Core />
      </StoreProvider>
    </div>
  );
}

export default App;
