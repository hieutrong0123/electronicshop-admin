import React, { Component } from "react";
import { CChartBar, CChartDoughnut } from "@coreui/react-chartjs";
import { CCard, CCardBody, CCardGroup, CCardHeader } from "@coreui/react";
import { DocsLink } from "src/reusable";
import orderservice_json from "src/service/orderservice_json";

class ChartBarOrders extends Component {
  state = {
    list: null,
    arrTotalMoney: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    arrTotalStatus: [0, 0, 0, 0, 0, 0, 0, 0]
  };
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    orderservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ list: res.data.resultObj }, () =>
            console.log(this.state.list)
          );

          res.data.resultObj.map(item => {
            let date = new Date(String(item.createdDate));
            this.state.arrTotalMoney[date.getMonth()] += item.totalMoney;
            return null
          });
          res.data.resultObj.map(item => {            
            this.state.arrTotalStatus[item.statusId-1] += 1;
            return null
          });
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <CCardGroup columns className="cols-2">
        <CCard>
          <CCardHeader>
            Thống kê doanh thu
            <DocsLink href="http://www.chartjs.org" />
          </CCardHeader>
          <CCardBody>
            <CChartBar
              datasets={[
                {
                  label: "Doanh thu theo tháng",
                  backgroundColor: "#1EBE53",
                  data: this.state.arrTotalMoney
                }
              ]}
              labels="months"
              options={{
                tooltips: {
                  enabled: true
                }
              }}
            />
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>Trạng thái đơn hàng</CCardHeader>
          <CCardBody>
            <CChartDoughnut
              datasets={[
                {
                  backgroundColor: [
                    "#41B883",
                    "#E46651",
                    "#00D8FF",
                    "#D53766",
                    "#1EBE53",
                    "#78D1c9",
                    "#321FDB",
                    "#DD1B16"
                  ],
                  data: this.state.arrTotalStatus
                }
              ]}
              labels={[
                "Đặt hàng thành công",
                "Đã tiếp nhận",
                "Đang lấy hàng",
                "Đóng gói xong",
                "Bàn giao vận chuyển",
                "Đang vận chuyển",
                "Giao hàng thành công",
                "Đơn hàng bị huỷ"
              ]}
              options={{
                tooltips: {
                  enabled: true
                }
              }}
            />
          </CCardBody>
        </CCard>
      </CCardGroup>
    );
  }
}

export default ChartBarOrders;
