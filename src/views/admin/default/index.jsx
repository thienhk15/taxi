import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useState, useEffect } from "react";
import { MdAttachMoney, MdBarChart } from "react-icons/md";
import PieCard from "views/admin/default/components/PieCard";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import { ADMIN_API } from "../../../const";
import axios from "../../../config/axiosConfig";

export default function UserReports() {
  // const [bookings, setBookings] = useState([]);
  const [revenueOfThisMonth, setRevenueOfThisMonth] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pieChartData, setPieChartData] = useState([94, 6, 0]);
  const [bar, setBar] = useState([
    {
      name: "A",
      data: [222139, 112456, 101462, 24677, 102997, 259048, 103019, 228890, 117044],
    },]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const booking_response = await axios.get(ADMIN_API + "/getAllBookingRequest");
        const revenue_response = await axios.get(ADMIN_API + "/getRevenue");
        // const allBookings = booking_response.data;
        const revenue = revenue_response.data;
        console.log("revenue")
        console.log(revenue);

        // setBookings(allBookings);

        setRevenueOfThisMonth(revenue.total_revenue_thisMonth);
        setTotalRevenue(revenue.total_revenue);
        let incompleted = 100 - revenue.completed;
        incompleted = parseFloat(incompleted.toFixed(2));
        let pie = [revenue.completed, incompleted, 0];
        console.log("pie m");
        console.log(pieChartData);
        setPieChartData(pie);
        
        console.log("cccccccccccc");
        console.log(bar);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2, "2xl": 2 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Total"
          value={totalRevenue}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name="This Year"
          value={revenueOfThisMonth}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <WeeklyRevenue bar={bar} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px">
          <PieCard pieChartData={pieChartData} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
