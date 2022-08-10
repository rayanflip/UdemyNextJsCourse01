import "./styles.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import AllMeetupsPage from "./pages/AllMeetups";
import Favorites from "./pages/Favorites";
import NewMeetup from "./pages/NewMeetup";
import { Fragment } from "react";
import MainNav from "./components/layout/MainNav";

export default function App() {
  return (
    <div>
      <MainNav />
      <Routes>
        <Fragment>
          <Route exact path="/" element={<AllMeetupsPage />}></Route>
          <Route path="/new-meetup" element={<NewMeetup />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
        </Fragment>
      </Routes>
    </div>
  );
}
