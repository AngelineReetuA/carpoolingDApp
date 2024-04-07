import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Profile } from "./pages/Profile";
import {RidePage} from "./pages/RidePage";
import { LogoutPage } from "./pages/LogoutPage";

function App() {
  return (
    <>
     <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/profile/:account" element={<Profile/>} />
          <Route path="/profile/:account/ride-page" element={<RidePage/>}/>
          <Route path="/logout" element={<LogoutPage/>}></Route>
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
