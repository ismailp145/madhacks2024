import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Use 'element' instead of 'component' and wrap the component in JSX */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
