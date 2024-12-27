import React from "react";
import {Link} from "react-router";
import {Button} from "@/components/ui/button.tsx";

export const HomeRoute: React.FC = () => {
  return (
    <div className={"flex flex-1 flex-col justify-center items-center"}>
      <div className={"flex flex-col gap-y-4"}>
        <Button asChild size={"lg"}>
          <Link to={"/new"}>Create new Divvy</Link>
        </Button>
        <Button variant={"outline"} size={"lg"}>View saved</Button>
      </div>
    </div>
  )
}