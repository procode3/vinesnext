import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ViewListIcon from '@mui/icons-material/ViewList';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import RotateLeftSharpIcon from '@mui/icons-material/RotateLeftSharp';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import GppMaybeSharpIcon from '@mui/icons-material/GppMaybeSharp';
import PlaylistRemoveSharpIcon from '@mui/icons-material/PlaylistRemoveSharp';
import PlaylistPlaySharpIcon from '@mui/icons-material/PlaylistPlaySharp';
import PlaylistAddCheckSharpIcon from '@mui/icons-material/PlaylistAddCheckSharp';
import RateReviewSharpIcon from '@mui/icons-material/RateReviewSharp';
import NotesSharpIcon from '@mui/icons-material/NotesSharp';
import WrapTextSharpIcon from '@mui/icons-material/WrapTextSharp';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import PaymentsIcon from '@mui/icons-material/Payments';
import React from 'react'


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
      "icon": <SpaceDashboardIcon color="primary" />,

    },
    "active": false,
  },
  {
    "path": "/admin/createorder",
    "sidebarProps": {
      "displayText": "Create Order",
      "icon": <LibraryAddIcon color="secondary" />,
    },
    "active": false,
  },
  {
    "path": "/admin/orders",
    "active": false,
    "sidebarProps": {
      "displayText": "Orders",
      "icon": <ViewListIcon color="action" />,
      "child": [
        // {
        //   "path": "/admin/orders/new",
        //   "displayText": "New",
        //   "icon": <PlaylistAddSharpIcon color="info" />,
        //   "active": false,
        // },
        // {
        //   "path": "/admin/orders/unconfirmed",
        //   "displayText": "Unconfirmed",
        //   "icon": <GppMaybeSharpIcon color="error" />,
        //   "active": false,
        // },
        // {
        //   "path": "/admin/orders/available",
        //   "displayText": "Available",
        //   "icon": <NotesSharpIcon color="info" />,
        //   "active": false,
        // },
        // {
        //   "path": "/admin/orders/inprogress",
        //   "displayText": "In Progress",
        //   "icon": <PlaylistPlaySharpIcon color="info" />,
        //   "active": false,
        // },
        // {
        //   "path": "/admin/orders/editing",
        //   "displayText": "Editing",
        //   "icon": <EditNoteSharpIcon color="info" />,
        //   "active": false,
        // },
        // {
        //   "path": "/admin/orders/completed",
        //   "displayText": "Completed",
        //   "icon": <PlaylistAddCheckSharpIcon color="info" />,
        //   "active": false,
        // },
        // {
        //   "path": "/admin/orders/revision",
        //   "displayText": "Revision",
        //   "icon": <WrapTextSharpIcon color="info" />,
        //   "active": false,
        // },
        // {
        //   "path": "/admin/orders/disputes",
        //   "displayText": "Disputes",
        //   "icon": <PlaylistRemoveSharpIcon color="info" />,
        //   "active": false,
        // }
      ]
    }
  },
  {
    "path": "/admin/finance",
    "sidebarProps": {
      "displayText": "Finances",
      "icon": <PaymentsIcon color="secondary" />,
    },
    "active": false,
  },
  {
    "path": "/admin/settings",
    "sidebarProps": {
      "displayText": "Settings",
      "icon": <PaymentsIcon color="secondary" />,
    },
    "active": false,
  },

]

//routes for Manager


//routes for Writer


//routes for Clients



const getAdminRoutes = () => adminRoutes;

export { getAdminRoutes, type Route }
