import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <>
     <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
