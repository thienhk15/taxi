import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import axios from "../../../../config/axiosConfig";
import { ADMIN_API } from "../../../../const";

function BookingForm({ onBookingSubmit }) {
  const [bookingData, setBookingData] = useState({
    customer_name: "",
    phone: "+84 ",
    pickup_address: "",
    dropoff_address: "",
    car_type: "BIKE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      !bookingData.customer_name ||
      !bookingData.phone ||
      !bookingData.pickup_address ||
      !bookingData.dropoff_address
    ) {
      alert("Vui lòng điền đầy đủ thông tin trước khi đặt xe.");
      return;
    }
    try {
      let pickup = await axios.get(
        ADMIN_API + "/geoCoding?address=" + bookingData.pickup_address
      );
      let dropoff = await axios.get(
        ADMIN_API + "/geoCoding?address=" + bookingData.dropoff_address
      );
      let bookingRequest = bookingData;
      bookingRequest.customer_id = "null";
      bookingRequest.driver_id = "null";
      bookingRequest.status = "PENDING";
      const currentDate = new Date();
      bookingRequest.booking_time = currentDate.toISOString();
      bookingRequest.pickup_latitude = pickup.data.latitude;
      bookingRequest.pickup_longitude = pickup.data.longitude;
      bookingRequest.dropoff_latitude = dropoff.data.latitude;
      bookingRequest.dropoff_longitude = dropoff.data.longitude;
      bookingRequest.price = 0;
      bookingRequest.distance = 0;
      bookingRequest.duration = 0;
      

      const response = await axios.post(
        ADMIN_API + "/createBookingRequest",
        bookingRequest
      );
      console.log("Kết quả từ API:", response);
      // if (onBookingSubmit) {
      //   console.log("submited")
      //   onBookingSubmit();
      // }
      
      // Reset form về giá trị mặc định sau khi đặt xe thành công
      setBookingData({
        customer_name: "",
        phone: "+84 ",
        pickup_address: "",
        dropoff_address: "",
        car_type: "BIKE",
      });

      // Hiển thị thông báo hoặc thực hiện hành động sau khi đặt xe thành công
      alert("Đặt xe thành công!");
    } catch (error) {
      // Xử lý lỗi nếu có
      console.log("Lỗi khi gọi API:", error);

      // Hiển thị thông báo hoặc thực hiện hành động khác sau khi xảy ra lỗi
      alert("bugs!");
    }
  };

  return (
    <Box bg="white" p={4} borderRadius="md" shadow="md">
      <form>
        <Stack spacing={3}>
          <FormControl id="customer_name">
            <FormLabel>Tên khách hàng</FormLabel>
            <Input
              type="text"
              name="customer_name"
              value={bookingData.customer_name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="phone">
            <FormLabel>Số điện thoại</FormLabel>
            <Input
              type="text"
              name="phone"
              value={bookingData.phone}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="pickup_address">
            <FormLabel>Điểm đón</FormLabel>
            <Input
              type="text"
              name="pickup_address"
              value={bookingData.pickup_address}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="dropoff_address">
            <FormLabel>Điểm trả</FormLabel>
            <Input
              type="text"
              name="dropoff_address"
              value={bookingData.dropoff_address}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="car_type">
            <FormLabel>Loại xe</FormLabel>
            <Select
              name="car_type"
              value={bookingData.car_type}
              onChange={handleChange}
            >
              <option value="BIKE">Bike</option>
              <option value="CAR">Car</option>
            </Select>
          </FormControl>
          <Button
            colorScheme="teal"
            type="button"
            onClick={handleSubmit}
            mt={4}
          >
            Đặt xe
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default BookingForm;
