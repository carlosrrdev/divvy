import type { LinksFunction } from "@remix-run/node";
import { BiKey, BiDetail } from "react-icons/bi";
import { Link } from "@remix-run/react";

import indexCssUrl from "~/styles/index.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: indexCssUrl,
  },
];

export default function Index() {
  return (
    <>
      <header>
        <nav>
          <p className="brand">Divvy</p>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <main>
        <article className="hero">
          <section>
            <h1>
              Expense
              <br />
              Sharing
              <br />
              Made <span>Easy</span>
            </h1>
          </section>
          <section>
            <p>
              Divvy is an expense tracking and sharing tool that allows you to
              easily track and split your expenses between groups of people
            </p>
          </section>
          <section>
            <Link id="cta-btn" to="/register">
              Get Started
            </Link>
          </section>
        </article>
        <article className="info">
          <section>
            <div className="icon">
              <BiKey />
            </div>
            <h2>Total control</h2>
            <p>
              Sharing expenses can be as easy or complex as you need it. Divvy
              provides you with absolute control and allows you to manage your
              expenses exactly how you want to.
            </p>
            <p>
              Split all expenses evenly between everyone with a single click of
              a button. Assign individual expenses to single or groups of
              people. However you want to manage your expenses, Divvy aims to
              provide with all the tools you'll need to get the job done right.
            </p>
          </section>
          <section>
            <div className="icon">
              <BiDetail />
            </div>
            <h2>Meaningful results</h2>
            <p>
              Divvy generates detailed results that show exactly who is paying
              what and how much. These results can be shared as a downloadable
              image or sent directly to other Divvy users.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
