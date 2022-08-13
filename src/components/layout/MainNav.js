import { useContext } from "react";
import { Link } from "react-router-dom";
import FavoritesContext from "../../store/favorites-context";
import classes from "./MainNav.module.css";
function MainNav() {
  const favoriteCtx = useContext(FavoritesContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new-meetup">Add New Meetup</Link>
          </li>
          <li>
            <Link to="/favorites">
              My Favorites
              <span className={classes.badge}>
                {favoriteCtx.totalFavorites}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default MainNav;
