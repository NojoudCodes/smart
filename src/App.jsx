import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import PlaceLayout from "./pages/PlaceDetails/PlaceLayout";
import PlaceOverview from "./pages/PlaceDetails/PlaceOverview";
import InsightsTab from "./pages/PlaceDetails/InsightsTab";
import Reviews from "./pages/PlaceDetails/Reviews";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/place/:id" element={<PlaceLayout />}>
          <Route index element={<PlaceOverview />} />
          <Route path="insights" element={<InsightsTab />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </>
  );
}
