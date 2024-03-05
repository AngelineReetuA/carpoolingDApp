import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Profile } from "./pages/Profile";
import {RidePage} from "./pages/RidePage";

function App() {
  return (
    <>
     <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/profile/:account" element={<Profile/>} />
          <Route path="/profile/:account/ride-page" element={<RidePage/>}/>
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
