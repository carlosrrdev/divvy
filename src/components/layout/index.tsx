import {Link, Outlet} from "react-router";
import styles from "./layout.module.css"
import {TbSunMoon, TbSettings} from 'react-icons/tb'

function Layout() {
  return (
    <div className={styles.wrapper}>
      <header>
        <nav>
          <TbSunMoon />
          <Link to="/">Divvy</Link>
          <TbSettings />
        </nav>
      </header>
      <Outlet />
    </div>
  )
}

export default Layout;