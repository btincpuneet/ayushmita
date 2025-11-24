import React, {useState, useEffect } from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
// Background image removed; use solid color
//import dash_bgimg from 'assets/img/dash_bgimg.jpg';
//import Navbar from 'components/navbar/NavbarAdmin.js';
// Profile/notification component removed as requested
//import NotificationAndProfile from './NotificationAndProfile';
import 'assets/css/DashboardHeader.css';

const DashboardHeader = ({ pageName }) => {
  const [role, setRole] = useState(null); // State to store the role of the user
  useEffect(() => {
    const userRole = localStorage.getItem('role'); // Assuming the role is stored as 'role'
    setRole(userRole);
  }, []);
  document.documentElement.dir = 'ltr';
  //const { onOpen } = useDisclosure();
  return (
    <Flex
      className="my_dashboard_header_flex"
      justifyContent="space-between"
      mb={1}
        // Use a solid blue background instead of the image
        bg="#4B84D6"
        backgroundSize="cover"
        backgroundPosition="right"
      mt="-5"
      pl="5"
      pr="-2"
      pt="5"
      ml="-4"
      mr="-7"
      //minH={['52vh', '72vh', '35vh']}
      maxH="10"
      display="flex"
    >
      <Text fontSize="2xl" fontWeight="bold" color="blue.700">
        {/* role badge removed as requested */}
        <span
          style={{
            fontSize: '48px',
            color: '#0F405B',
            fontWeight: 'bold',
            marginTop: '5px',
            display: 'inline-block',
          }}
        >
          {pageName}
        </span>
      </Text>

      <Box>
        <Button
          bg="#F13130"
          color="#ffffff"
          onClick={() => {
            // Clear authentication-related localStorage keys and redirect to sign-in
            try {
              localStorage.removeItem('token');
              localStorage.removeItem('role');
              localStorage.removeItem('authenticated');
            } catch (e) {
              // ignore
            }
            const navigate = window.location; // fallback
            // Use react-router if available
            try {
              const nav = require('react-router-dom').useNavigate();
              nav('/auth/sign-in');
            } catch (err) {
              // fallback to full reload
              window.location.href = '/auth/sign-in';
            }
          }}
        >
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default DashboardHeader;
