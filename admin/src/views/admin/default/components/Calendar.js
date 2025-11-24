import React, { useState } from 'react';
import { Box, Select, Text, Grid } from '@chakra-ui/react';

const Calendar = () => {
  // Define an array with all months
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get the current date details
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  // Generate years from 2001 to currentYear + 5
  const years = Array.from({ length: currentYear - 2001 + 1 + 5 }, (_, i) => 2001 + i);

  // State to manage selected month, year, and day
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [selectedDay, setSelectedDay] = useState(currentDay);

  // Days of the week
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // Calculate days in the selected month and year
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Render days in the month, with the selected day highlighted
  const renderDays = () => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const dayNumber = i + 1;
      const isSelected = dayNumber === selectedDay;

      return (
        <Box
          key={dayNumber}
          p="2"
          borderRadius="full"
          bg={isSelected ? "green.300" : "gray.100"}
          color={isSelected ? "white" : "black"}
          fontWeight={isSelected ? "bold" : "normal"}
          textAlign="center"
          cursor="pointer"
          onClick={() => setSelectedDay(dayNumber)}  // Update selected day on click
        >
          {dayNumber}
        </Box>
      );
    });
  };

  return (
    <Box width="99%" p="4" boxShadow="md" borderRadius="md" bg="white">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="4">
        <Select 
          value={month} 
          onChange={(e) => {
            setMonth(parseInt(e.target.value));
            setSelectedDay(null);  // Reset selected day on month change
          }} 
          size="sm" 
          w="100px"
        >
          {months.map((m, index) => (
            <option key={m} value={index}>
              {m}
            </option>
          ))}
        </Select>
        
        <Select 
          value={year} 
          onChange={(e) => {
            setYear(parseInt(e.target.value));
            setSelectedDay(null);  // Reset selected day on year change
          }} 
          size="sm" 
          w="100px"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>
      </Box>

      <Grid templateColumns="repeat(7, 1fr)" gap={2} textAlign="center">
        {daysOfWeek.map((day) => (
          <Text key={day} fontWeight="bold" color="gray.600">
            {day}
          </Text>
        ))}
        {renderDays()}
      </Grid>
    </Box>
  );
};

export default Calendar;
