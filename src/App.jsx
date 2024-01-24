import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <>
     <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/profile/:account" element={<Profile/>} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
