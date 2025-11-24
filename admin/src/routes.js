import React from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from 'react-router-dom';

import { Icon } from '@chakra-ui/react';
import { MdCall, MdCallEnd, MdHome, MdLock, MdOutlineElevator, MdElevator, MdOutlineAssignment, MdSupervisorAccount, MdSupervisedUserCircle, MdArchitecture, MdSpeakerNotes } from 'react-icons/md';
// Auth Imports
import SignInCentered from 'views/auth/signIn';
import ManageCategory from 'views/admin/default/components/ManageCategory';
//const isUserLoggedIn = true;
//const aunthicatedStatus = localStorage.getItem('authenticated');

const routes = [
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
 
  {
    name: 'Manage Category',
    layout: '/admin',
    path: '/manage-category',
    icon: <Icon as={MdOutlineAssignment} width="20px" height="20px" color="inherit" />,
    component: <ManageCategory />,
  },
];

export default routes;
