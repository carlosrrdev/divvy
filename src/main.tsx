import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import NewDivvy from "./pages/NewDivvy";
import NewSimpleDivvy from "./pages/NewSimpleDivvy";
import NewComplexDivvy from "./pages/NewComplexDivvy";
import NotFound from "./pages/NotFound";
import {ThemeProvider} from "./components/ThemeProvider.tsx";
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={"new"} element={<NewDivvy />} />
            <Route path={"new/sd"} element={<Navigate to={"/new"} replace />} />
            <Route path={"new/dd"} element={<Navigate to={"/new"} replace />} />
            <Route path={"new/sd/:dId"} element={<NewSimpleDivvy />} />
            <Route path={"new/dd/:dId"} element={<NewComplexDivvy />} />
          </Route>
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
