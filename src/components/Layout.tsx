import {Link, Outlet} from "react-router";
import {FiSun, FiSettings} from 'react-icons/fi'

function Layout() {
  return (
    <div className={"w-full min-h-dvh flex"}>
      <div className={"w-full grid grid-rows-[auto_1fr_auto]"}>
        <header className={"border-b border-gray-100 dark:border-neutral-800"}>
          <nav className={"container mx-auto p-6 flex justify-between items-center"}>
            <FiSun className={"text-xl"} />
            <Link className={"text-xl"} to={"/"}>divvy</Link>
            <button className={"btn btn-sm btn-ghost"}>
              <FiSettings className={"text-xl"} />
            </button>
          </nav>
        </header>
        <main className={"container mx-auto p-6"}>
          <Outlet />
        </main>
        <footer className={"border-t border-gray-100 dark:border-neutral-800"}>
          <div className={"container mx-auto flex flex-col justify-center items-center p-6"}>
            <small className={"text-xs"}>Created by Carlos R. Rodriguez</small>
            <small className={"text-xs"}>Copyright &copy; 2024</small>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout;