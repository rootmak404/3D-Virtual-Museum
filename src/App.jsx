import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import MuseumScene from "./MuseumScene";
import SubscriptionPage from "./SubscriptionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/museum" element={<MuseumScene />} />
        <Route path="/subscribe" element={<SubscriptionPage />} />
      </Routes>
    </Router>
  );
}

export default App;