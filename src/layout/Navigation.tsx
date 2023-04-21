import { FC, memo, useMemo } from 'react';
import { DashboardOutlined, ExclamationCircleOutlined, SettingOutlined } from '@ant-design/icons';

import { BoatOutlined, UsersOutlined, LocationOutlined } from 'src/shared-components/Icons';
import NavLink from 'src/shared-components/NavLink/NavLink';

interface NavigationItem {
  path: string;
  icon: JSX.Element;
  label: string;
}

interface SubNavigation {
  title?: string;
  routes: NavigationItem[]
}

const commonNavItems: SubNavigation[] = [
  {
    routes: [
      {
        path: '/',
        icon: <DashboardOutlined />,
        label: 'Dashboard'
      }
    ]
  },
  {
    title: 'Inventory',
    routes: [
      {
        path: '/inventory',
        icon: <BoatOutlined />,
        label: 'Inventory'
      },
      {
        path: '/compliance',
        icon: <ExclamationCircleOutlined />,
        label: 'Compliance'
      }
    ]
  }
];

const adminNavItems: SubNavigation = {
  title: 'Admin',
  routes: [
    {
      path: '/admin/model-boats',
      icon: <BoatOutlined />,
      label: 'Model Boats'
    },
    {
      path: '/admin/users',
      icon: <UsersOutlined />,
      label: 'Users'
    },
    {
      path: '/admin/locations',
      icon: <LocationOutlined />,
      label: 'Locations'
    },
    {
      path: '/admin/settings',
      icon: <SettingOutlined />,
      label: 'Settings'
    },
  ]
};


const Navigation: FC = memo(() => {
  const navItems = useMemo(() => {
    return [...commonNavItems, adminNavItems];
  }, []);
  return (
    <div className="p-3">
      {navItems.map((subNav, index, array)  => (
        <div className="pt-5">
          {!!subNav.title && <h4 className="text-blue7 text-sm pl-4 mb-4">{subNav.title}</h4>}
          {
            subNav.routes.map(item => (
              <NavLink key={item.path} to={item.path} icon={item.icon} label={item.label} />
            ))
          }
          {index < array.length - 1 && <div className="h-px w-full bg-gray4 mt-5"/>}
        </div>
      ))}
    </div>
  )
});

Navigation.displayName = 'Navigation';

export default Navigation;
