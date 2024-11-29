import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from "./pages/NotFound";
import {ThemeProvider} from "./components/ThemeProvider.tsx";
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index path={"/"} element={<Home />} />
          </Route>
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
