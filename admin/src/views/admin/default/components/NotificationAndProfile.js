import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Text,
  Badge,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const NotificationAndProfile = () => {
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [role, setRole] = useState(null); // State to store the role of the user
  const notifications = [
    { id: 1, message: 'New message from admin' },
    { id: 2, message: 'Your task is due tomorrow' },
    { id: 3, message: 'System update available' },
  ];
  
  useEffect(() => {
    // Fetch the role from localStorage (You can change this logic based on how you're storing the role)
    const userRole = localStorage.getItem('role'); // Assuming the role is stored as 'role'
    setRole(userRole);
  }, []);
  // Handle logout logic
  const handleLogout = () => {
    // Clear localStorage or any other storage where you save user tokens
    localStorage.removeItem('authToken'); // Example: assuming 'authToken' is your token key
    localStorage.removeItem('role', role);

    // Navigate the user to the login page after logout
    navigate('/auth/sign-in'); // Adjust the path to your login route
  };

  return (
    <Box p={4}>
      <Flex align="center" justify="flex-end" background="gray.100" borderRadius="25px">
        {/* Notification Icon with Popover */}
        <Popover>
          <PopoverTrigger>
            <IconButton
              icon={<BellIcon />}
              aria-label="Notifications"
              variant="ghost"
              position="relative"
              fontSize="26px"
            >
              <Badge
                colorScheme="red"
                position="absolute"
                top="0"
                right="0"
                borderRadius="full"
                px={2}
                fontSize="xs"
              >
                {notifications.length}
              </Badge>
            </IconButton>
          </PopoverTrigger>
          <PopoverContent
            width={{ base: '90vw', md: '250px' }} // Adjusts width for mobile and desktop
            maxW="400px" // Optional: Limits max width on larger screens
            shadow="lg"
            overflowY="auto" // Scroll if notifications exceed height
            maxH="300px" // Limits the height so it becomes scrollable with too many notifications
            mr={30}
            bg={'white'}
          >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              {notifications.length === 0 ? (
                <Text>No notifications</Text>
              ) : (
                notifications.map((notification) => (
                  <Box
                    key={notification.id}
                    p={2}
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    _last={{ borderBottom: 'none' }} // Removes bottom border for the last notification
                  >
                    <Text fontSize="sm" wordBreak="break-word">
                      {notification.message}
                    </Text>
                  </Box>
                ))
              )}
            </PopoverBody>
          </PopoverContent>

        </Popover>

        {/* Profile Icon with Menu */}
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<Avatar size="sm" name="John Doe" src="https://bit.ly/broken-link" />}
            ml={4}
            variant="ghost"
          />
          <MenuList>
            <MenuItem icon={<MdLogout />} onClick={handleLogout}>
              <Text color="red">Log Out</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default NotificationAndProfile;
