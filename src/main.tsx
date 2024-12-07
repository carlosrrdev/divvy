import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes";
import { BrowserRouter, Routes, Route } from "react-router";

import { Home } from "./pages/Home";
import { NewDivvy } from "./pages/NewDivvy";
import { NotFound } from "./pages/NotFound.tsx";
import { Layout } from "./components/Layout.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme appearance={"dark"} radius={"small"} accentColor={"indigo"}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index={true} element={<Home />} />
            <Route path={"new"} element={<NewDivvy />} />
          </Route>
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  </StrictMode>,
)
