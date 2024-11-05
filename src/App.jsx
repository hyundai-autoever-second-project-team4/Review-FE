import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <div>
      <Routes></Routes>
      <ReactQueryDevtools initialIsOpen={true} />
    </div>
  );
}

export default App;
