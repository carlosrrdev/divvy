import React from "react";
import {Link} from "react-router";

export const HomeRoute: React.FC = () => {
  return (
    <div className={"w-full flex flex-col items-center justify-center"}>
      <div className={"grid grid-rows-2 md:gris-rows-1 md:grid-cols-2 gap-4"}>
        <Link className={"cta-btn cta-btn-filled"} to={"/new"}>Create new Divvy</Link>
        <button className={"cta-btn cta-btn-outline"}>View saved</button>
      </div>
    </div>
  )
}