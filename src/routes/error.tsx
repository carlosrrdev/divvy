import React from 'react';
import {Link} from "react-router";

export const NotFoundRoute: React.FC = () => {
  return (
    <div className={"w-full min-h-dvh flex flex-col items-center justify-center"}>
      <h1 className={"text-[clamp(1rem,20vw,8rem)] font-bold"}>404</h1>
      <p>Seems this page no longer exists...</p>
      <Link className={"mt-4 underline"} to={"/"}>Return to Home page</Link>
    </div>
  )
}