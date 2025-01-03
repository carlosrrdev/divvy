import React from "react";
import {Outlet, Link} from "react-router";
import {TbSettings} from 'react-icons/tb'
import {Button} from "@/components/ui/button.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {ToggleTheme} from "@/components/ToggleTheme.tsx";

export const Layout: React.FC = () => {
  return (
    <>
      <div className={"w-full min-h-dvh flex flex-col gap-y-6"}>
        <header className={"p-6"}>
          <nav className={"container mx-auto flex items-center justify-between"}>
            <Link className={"text-2xl font-bold"} to={"/"}>divvy</Link>
            <ul className={"flex gap-x-4 items-center"}>
              <li>
                <ToggleTheme/>
              </li>
              <li>
                <Button variant={"ghost"} size={"icon"}>
                  <TbSettings/>
                </Button>
              </li>
            </ul>
          </nav>
        </header>
        <main className={"flex-1 p-6 flex"}>
          <div className={"container flex flex-1 mx-auto"}>
            <Outlet/>
          </div>
        </main>
        <footer className={"p-6"}>
          <div className={"container flex justify-center mx-auto"}>
            <small>&copy; 2024 - Coded with &hearts; by Carlos Rodriguez</small>
          </div>
        </footer>
      </div>
      <Toaster/>
    </>
  )
}