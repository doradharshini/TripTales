import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/NavBar";

import Home from "./pages/Home";
import MyTrips from "./pages/MyTrips";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import MemoryGram from "./pages/MemoryGram";
import Journal from "./pages/Journal";
import Timeline from "./pages/Timeline";

import "./App.css";


function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/trips"
          element={<MyTrips />}
        />

        <Route
          path="/create-trip"
          element={<CreateTrip />}
        />

        <Route
          path="/trip/:id"
          element={<TripDetails />}
        />

        <Route
          path="/memorygram"
          element={<MemoryGram />}
        />

        <Route
          path="/journal"
          element={<Journal />}
        />

        <Route
          path="/timeline"
          element={<Timeline />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;