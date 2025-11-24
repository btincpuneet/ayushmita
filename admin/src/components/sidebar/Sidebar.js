import React, { useState, useEffect } from 'react';

// chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { Scrollbars } from 'react-custom-scrollbars-2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Image } from '@chakra-ui/react';

// Component Imports

//import ManageAgent from 'views/admin/default/components/ManageAgent';
import ManageCategory from 'views/admin/default/components/ManageCategory';

import logo from 'assets/img/axiom_logo.png';
//import ManageAgentImg from 'assets/img/sidebarmenu/managentAgentImg.png';
//import ManageAgentImgSel from 'assets/img/sidebarmenu/ManageAgentImgSel.png';

// Only keep Manage Agent section
const routes = [
  // {
  //   name: 'Manage Agent',
  //   layout: '/admin',
  //   path: '/manage-agent',
  //   icon: {
  //     default: ManageAgentImg,
  //     selected: ManageAgentImgSel,
  //   },
  //   component: <ManageAgent />,
  //   roles: ['superadmin'],
  // },
  {
    name: 'Manage Category',
    layout: '/admin',
    path: '/manage-category',
    // icon: {
    //   default: ManageAgentImg,
    //   selected: ManageAgentImgSel,
    // },
    component: <ManageCategory />,
    roles: ['superadmin'],
  },
];

const Sidebar = () => {
  const navigate = useNavigate(); // Use navigate hook
  const [selectedRoute, setSelectedRoute] = useState('/default'); // Set initial route
  const [role, setRole] = useState(null); // State to store the role of the user

  useEffect(() => {
    // Fetch the role from localStorage (You can change this logic based on how you're storing the role)
    const userRole = localStorage.getItem('role'); // Assuming the role is stored as 'role'
    //const userRole = localStorage.setItem('role', role);
    setRole(userRole);
  }, []);

  let variantChange = '0.2s linear';
  let shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset'
  );
  let sidebarBg = useColorModeValue('white', 'white');
  let sidebarMargins = '0px';
  
  // Only show Manage Agent, ignore role
  const filteredRoutes = routes;

  // Function to render the appropriate icon based on the selected route
  const renderIcon = (route) => {
    // Defensive: route.icon may be undefined if route entry is incomplete
    const iconObj = route && route.icon ? route.icon : null;
    const iconSrc = iconObj ? (selectedRoute === route.path ? iconObj.selected : iconObj.default) : null;
    if (!iconSrc) return null;
    return (
      <Image
        src={iconSrc}
        width="20px"
        height="20px"
        alt={route && route.name ? route.name : 'menu-icon'} // Always include alt text for accessibility
      />
    );
  };

  return (
    <Box display={{ sm: 'none', xl: 'block' }} w="100%" position="fixed" minH="100%">
      <Box bg={sidebarBg} transition={variantChange} w="300px" h="100vh" m={sidebarMargins} minH="100%" overflowX="hidden" overflowY={'hidden'} boxShadow={shadow}>
        
        <Flex justifyContent="center" py="20px">
          <Text fontSize="lg" fontWeight="700" color="#2B3D49">Admin Dashboard</Text>
        </Flex>

        <Scrollbars autoHide>
          {filteredRoutes.map((route, index) => (
            <Flex
              key={index}
              align="center"
              p="12px"
              cursor="pointer"
              onClick={() => {
                setSelectedRoute(route.path);
                navigate(route.layout + route.path); // Navigate to the selected route
              }}
              bg="transparent"
              fontWeight={selectedRoute === route.path ? 'bold' : 'normal'}
              color={selectedRoute === route.path ? '#2B3D49' : 'gray.600'}
            >
              {renderIcon(route)} {/* Conditionally render the icon */}
              <Box ml="12px">{route.name}</Box>
            </Flex>
          ))}
        </Scrollbars>
      </Box>
    </Box>
  );
};

export default Sidebar;
