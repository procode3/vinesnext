import React from 'react'
import { LayoutDashboard } from 'lucide-react';
import { Wallet, Settings, LayoutList, FilePlus2, List } from 'lucide-react';






type UserType = 'ADMIN' | 'CLIENT' | 'MANAGER' | 'WRITER' | "SUPER_ADMIN";


interface Route {
  path: string;
  sidebarProps: {
    displayText: string;
    icon: JSX.Element | string;
    child?: {
      path: string;
      displayText: string;
      icon: React.JSX.Element | string;
      active: boolean;
    }[];

  };
  active: boolean;

}

//routes for Admin


const adminRoutes: Route[] = [
  {
    "path": "/admin",
    "sidebarProps": {
      "displayText": "Dashboard",
      "icon": <LayoutDashboard strokeWidth={0.75} />,

    },
    "active": false,
  },
  {
    "path": "/admin/createorder",
    "sidebarProps": {
      "displayText": "Create Order",
      "icon": <FilePlus2 strokeWidth={0.75} />,
    },
    "active": false,
  },
  {
    "path": "/admin/orders",
    "active": false,
    "sidebarProps": {
      "displayText": "Orders",
      "icon": <LayoutList strokeWidth={0.75} />,
    }
  },
  {
    "path": "/admin/finance",
    "sidebarProps": {
      "displayText": "Finances",
      "icon": <Wallet strokeWidth={0.75} />,
    },
    "active": false,
  },
  {
    "path": "/admin/settings",
    "sidebarProps": {
      "displayText": "Settings",
      "icon": <Settings strokeWidth={0.75} />,
    },
    "active": false,
  },

]

//routes for Manager
const managerRoutes: Route[] = [
  {
    "path": "/manager",
    "sidebarProps": {
      "displayText": "Dashboard",
      "icon": <LayoutDashboard strokeWidth={0.75} />,

    },
    "active": false,
  },
  {
    "path": "/manager/createorder",
    "sidebarProps": {
      "displayText": "Create Order",
      "icon": <FilePlus2 strokeWidth={0.75} />,
    },
    "active": false,
  },
  {
    "path": "/manager/orders",
    "active": false,
    "sidebarProps": {
      "displayText": "Orders",
      "icon": <LayoutList strokeWidth={0.75} />,
    }
  },
  {
    "path": "/manager/finance",
    "sidebarProps": {
      "displayText": "Finances",
      "icon": <Wallet strokeWidth={0.75} />,
    },
    "active": false,
  },
  {
    "path": "/manager/settings",
    "sidebarProps": {
      "displayText": "Settings",
      "icon": <Settings strokeWidth={0.75} />,
    },
    "active": false,
  },

]

//routes for Writer
const writerRoutes: Route[] = [
  {
    "path": "/",
    "sidebarProps": {
      "displayText": "Dashboard",
      "icon": <LayoutDashboard strokeWidth={0.75} />,

    },
    "active": false,
  },
  {
    "path": "/available",
    "active": false,
    "sidebarProps": {
      "displayText": "Available",
      "icon": <List strokeWidth={0.75} />,
    }
  },
  {
    "path": "/orders",
    "active": false,
    "sidebarProps": {
      "displayText": "Orders",
      "icon": <LayoutList strokeWidth={0.75} />,
    }
  },
  {
    "path": "/finance",
    "sidebarProps": {
      "displayText": "Finances",
      "icon": <Wallet strokeWidth={0.75} />,
    },
    "active": false,
  },
  {
    "path": "/settings",
    "sidebarProps": {
      "displayText": "Settings",
      "icon": <Settings strokeWidth={0.75} />,
    },
    "active": false,
  },
]


//routes for Clients
const clientRoutes: Route[] = [
  {
    "path": "/dashboard",
    "sidebarProps": {
      "displayText": "Dashboard",
      "icon": <LayoutDashboard strokeWidth={0.75} />,

    },
    "active": false,
  },
  {
    "path": "/createorder",
    "sidebarProps": {
      "displayText": "Create Order",
      "icon": <FilePlus2 strokeWidth={0.75} />,
    },
    "active": false,
  },
  {
    "path": "/myorders",
    "active": false,
    "sidebarProps": {
      "displayText": "Orders",
      "icon": <LayoutList strokeWidth={0.75} />,
    }
  },
  {
    "path": "/profile",
    "sidebarProps": {
      "displayText": "Settings",
      "icon": <Settings strokeWidth={0.75} />,
    },
    "active": false,
  },

]


const getAdminRoutes = () => adminRoutes;
const getManagerRoutes = () => managerRoutes;
const getWriterRoutes = () => writerRoutes;
const getClientRoutes = () => clientRoutes;


function getRoutesByUserType(userType: UserType): Route[] {
  switch (userType) {
    case 'ADMIN':
      return getAdminRoutes();
    case 'CLIENT':
      return getClientRoutes();
    case 'MANAGER':
      return getManagerRoutes();
    case 'WRITER':
      return getWriterRoutes();
    default:
      throw new Error('Invalid user type');
  }
}

export { getRoutesByUserType, getAdminRoutes, type Route }
