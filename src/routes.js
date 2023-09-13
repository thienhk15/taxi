import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdAirplaneTicket,
  MdManageAccounts,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import BookingManager from "views/admin/booking";

// Auth Imports
import SignInCentered from "views/auth/signIn/index";
import Logout from "views/auth/logout/index";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
    hideInSidebar: true,
  },
  
  {
    name: "Booking",
    layout: "/admin",
    path: "/booking",
    icon: <Icon as={MdAirplaneTicket} width='20px' height='20px' color='inherit' />,
    component: BookingManager,
  },
  // {
  //   name: "User",
  //   layout: "/admin",
  //   path: "/user",
  //   icon: <Icon as={MdManageAccounts} width='20px' height='20px' color='inherit' />,
  //   component: BookingManager,
  // },
  {
    name: "Logout",
    layout: "/auth",
    path: "/logout",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: Logout,
  }
];

export default routes;
