import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import DashboardLayout from './layouts/DashboardLayout'
import Overview from './pages/Overview'
import Subscribers from './pages/Subscribers'
import Content from './pages/Content'
import Revenue from './pages/Revenue'
import Analytics from './pages/Analytics'
import Regions from './pages/Regions'
import Engagement from './pages/Engagement'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import { ToastProvider } from './context/ToastContext'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Overview /> },
      { path: 'subscribers', element: <Subscribers /> },
      { path: 'content', element: <Content /> },
      { path: 'revenue', element: <Revenue /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'regions', element: <Regions /> },
      { path: 'engagement', element: <Engagement /> },
      { path: 'reports', element: <Reports /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
