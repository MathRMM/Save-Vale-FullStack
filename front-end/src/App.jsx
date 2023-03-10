import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import MainPaige from './pages/MainPage';
import SearchPage from './pages/MainPage/Search';
import HomePage from './pages/MainPage/Home';
import FillSubscription from './pages/Dashboard/FillSubscription';

import { UserProvider } from './contexts/UserContext';
import useToken from './hooks/useToken';

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<MainPaige />}>
              <Route path="" element={<HomePage />} />
              <Route path="search" element={<SearchPage />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}

export default App;
