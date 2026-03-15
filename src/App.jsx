import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import MuseumScene from "./MuseumScene";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/museum" element={<MuseumScene />} />
      </Routes>
    </Router>
  );
}

export default App;