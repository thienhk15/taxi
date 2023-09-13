import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }
  componentDidUpdate(prevProps) {
    // Kiểm tra xem props.chartData có thay đổi so với lần render trước đó không
    if (prevProps.chartData !== this.props.chartData) {
      // Nếu có sự thay đổi, cập nhật state chartData
      this.setState({
        chartData: this.props.chartData,
      });
    }
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='pie'
        width='100%'
        height='55%'
      />
    );
  }
}

export default PieChart;
