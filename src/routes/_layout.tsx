import React from "react";
import {Outlet, Link} from "react-router";
import {TbSun, TbSettings} from 'react-icons/tb'

export const Layout: React.FC = () => {
  return (
    <div className={"w-full flex flex-col min-h-dvh"}>
      <header>
        <nav className={"flex container mx-auto p-6 justify-between items-center"}>
          <Link className={"text-2xl font-bold"} to={"/"}>divvy</Link>
          <ul className={"flex gap-x-6 items-center"}>
            <li>
              <button className={"icon-btn"}>
                <TbSun className={"text-2xl"}/>
              </button>
            </li>
            <li>
              <button className={"icon-btn"}>
                <TbSettings className={"text-2xl"}/>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className={"flex-1 flex container mx-auto p-6"}>
        <Outlet/>
      </main>
      <footer>
        <div className={"container justify-center flex mx-auto p-6"}>
          <small className={"text-slate-500"} >&copy; 2024 - Coded with &hearts; by Carlos Rodriguez</small>
        </div>
      </footer>
    </div>
  )
}