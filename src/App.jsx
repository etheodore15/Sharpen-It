import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter basename="/Sharpen-It">
      <AppProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
