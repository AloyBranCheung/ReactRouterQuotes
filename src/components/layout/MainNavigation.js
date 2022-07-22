import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <NavLink to="/quotes" className={classes.logo}>
        Great Quotes
      </NavLink>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/quotes" activeClassName={classes.active}>
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-quote" activeClassName={classes.active}>
              Add a Quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
