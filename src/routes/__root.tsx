import {createRootRoute, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";

export const Route = createRootRoute({
    component: () => (
        <>
            <div>
                <h1>hello from root</h1>
                <Outlet />
            </div>
            <TanStackRouterDevtools />
        </>
    )
})