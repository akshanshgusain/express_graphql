import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";
import MainNavigation from "./components/navigation/MainNavigation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to="/auth"></Navigate>}
            exact
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
