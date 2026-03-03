import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import { isAuthenticated } from './utils/auth';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'));
const FriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const AddPetPage = lazy(() => import('./pages/AddPetPage/AddPetPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const FavoritesList = lazy(
  () => import('./components/FavoritesList/FavoritesList')
);
const ViewedList = lazy(() => import('./components/ViewedList/ViewedList'));

function LoadingWrapper({ children }) {
  const [showLoader, setShowLoader] = useState(() => {
    const loaderShown = sessionStorage.getItem('loaderShown');
    return !loaderShown;
  });

  const handleComplete = () => {
    sessionStorage.setItem('loaderShown', 'true');
    setShowLoader(false);
  };

  if (showLoader) {
    return <LoadingPage onComplete={handleComplete} />;
  }

  return children;
}

const PrivateRoute = ({ children }) => {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    window.location.href = '/login';
    return null;
  }

  return children;
};

const PublicRoute = ({ children, restricted = false }) => {
  const isAuth = isAuthenticated();

  if (restricted && isAuth) {
    window.location.href = '/profile/favorites';
    return null;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#333333',
            border: '2px solid #10b981',
            borderRadius: '50px',
            padding: '12px 24px',
            fontFamily: 'Manrope, sans-serif',
            fontWeight: '500',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          error: {
            duration: 5000,
            style: {
              border: '2px solid #ef4444',
              background: '#fee2e2',
              color: '#dc2626',
            },
          },
        }}
      />

      <LoadingWrapper>
        <Layout>
          <Suspense
            fallback={<div style={{ display: 'none' }}>Loading...</div>}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/notices" element={<NoticesPage />} />
              <Route path="/friends" element={<FriendsPage />} />

              <Route
                path="/login"
                element={
                  <PublicRoute restricted={true}>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute restricted={true}>
                    <RegisterPage />
                  </PublicRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              >
                <Route path="favorites" element={<FavoritesList />} />
                <Route path="viewed" element={<ViewedList />} />
              </Route>

              <Route
                path="/add-pet"
                element={
                  <PrivateRoute>
                    <AddPetPage />
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </LoadingWrapper>
    </BrowserRouter>
  );
}

export default App;
