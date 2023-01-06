import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import cssSharedUrl from "./styles/shared.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: cssSharedUrl },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Divvy - Expense tracker",
  description:
    "Manage and track your expenses between multiple groups of people",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
