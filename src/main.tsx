import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router'
import {Layout} from "./routes/_layout.tsx";
import {HomeRoute} from "./routes/home.tsx";
import {NewDivvyRoute} from "./routes/new.tsx";
import {NotFoundRoute} from "./routes/error.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index={true} element={<HomeRoute/>}/>
          <Route path={"new"} element={<NewDivvyRoute/>}/>
        </Route>
        <Route path={"*"} element={<NotFoundRoute/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
