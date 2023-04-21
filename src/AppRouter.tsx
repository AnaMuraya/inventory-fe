import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import PageLayout from 'src/layout/Page';

// Common routes
import Dasboard from 'src/page-components/Dashboard/DashboardContainer';
import Inventory from 'src/page-components/Inventory/InventoryContainer';
import Compliance from 'src/page-components/Compliance/ComplianceContainer';

// Auth routes
import Login from 'src/page-components/Auth/LoginContainer';

// Admin routes
import ModelBoats from 'src/page-components/ModelBoats/ModelBoatsContainer';
import Users from 'src/page-components/Users/UsersContainer';
import Locations from 'src/page-components/Locations/LocationsContainer';
import Settings from 'src/page-components/Settings/SettingsContainer';

// Not found
import NotFound from 'src/shared-components/NotFound/NotFound';


const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  let location = useLocation();
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const AppRouter = () => (
  <Routes>
    <Route path="/" element={
      <RequireAuth>
        <PageLayout />
      </RequireAuth>
    }>
      <Route index element={<Dasboard />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="compliance" element={<Compliance />} />
      <Route path="/admin/">
        <Route path="model-boats" element={<ModelBoats />} />
        <Route path="users" element={<Users />} />
        <Route path="locations" element={<Locations />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="login/" >
      <Route index element={<Login />} />
      <Route path="callback" element={<Login />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;
