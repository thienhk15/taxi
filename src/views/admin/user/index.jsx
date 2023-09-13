import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
// Assets

import React, { useState, useEffect } from "react";

import ComplexTable from "views/admin/booking/components/ComplexTable";

import { columnsDataComplex } from "views/admin/booking/variables/columnsData";

import BookingForm from "./components/bookingForm"
import { ADMIN_API } from "../../../const";
import axios from "../../../config/axiosConfig";

export default function BookingManager() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(ADMIN_API + "/getAllBookingRequest")
      .then((response) => {
        const data = response.data;
        console.log(data);
        setBookings(data); // Cập nhật trạng thái với dữ liệu từ API
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleBookingSubmit = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <ComplexTable columnsData={columnsDataComplex} tableData={bookings} />
        <BookingForm onBookingSubmit={handleBookingSubmit} />
        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid> */}
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 1, xl: 1 }}
        gap="20px"
        mb="20px"
      ></SimpleGrid>
    </Box>
  );
}
