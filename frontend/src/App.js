import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";
import MainNavigation from "./components/navigation/MainNavigation";
import "./App.css";
import AuthContext from "./context/auth-context";
import { Component } from "react";

class App extends Component {
  state = {
    token: null,
    userId: null,
  };
  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };
  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout,
          }}
        >
          <MainNavigation />
          <main className="main-content">
            <Routes>
              {!this.state.token && (
                <Route
                  path="/bookings"
                  element={<Navigate replace to="/auth"></Navigate>}
                  exact
                />
              )}

              {this.state.token && (
                <Route
                  path="/"
                  element={<Navigate replace to="/events"></Navigate>}
                  exact
                />
              )}

              {this.state.token && (
                <Route
                  path="/auth"
                  element={<Navigate replace to="/events"></Navigate>}
                  exact
                />
              )}
              {!this.state.token && (
                <Route
                  path="/"
                  element={<Navigate replace to="/auth"></Navigate>}
                  exact
                />
              )}
              {!this.state.token && (
                <Route path="/auth" element={<AuthPage />} />
              )}
              <Route path="/events" element={<EventsPage />} />
              {this.state.token && (
                <Route path="/bookings" element={<BookingsPage />} />
              )}
            </Routes>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
