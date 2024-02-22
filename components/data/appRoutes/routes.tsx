import { LayoutDashboard } from 'lucide-react';
import { Wallet } from 'lucide-react';
import { Settings } from 'lucide-react';
import { LayoutList } from 'lucide-react';
import React from 'react'
import { FilePlus2 } from 'lucide-react';




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


//routes for Writer


//routes for Clients



const getAdminRoutes = () => adminRoutes;

export { getAdminRoutes, type Route }
