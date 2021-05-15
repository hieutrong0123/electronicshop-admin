import React, { Component } from "react";
import { CChartBar, CChartDoughnut } from "@coreui/react-chartjs";
import { CCard, CCardBody, CCardGroup, CCardHeader } from "@coreui/react";
import { DocsLink } from "src/reusable";
import orderservice_json from "src/service/orderservice_json";

import moment from "moment";

class ChartBarOrders extends Component {
  state = {
    list: null,
    arrTotalMoney: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    arrTotalMoney2020: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    arrTotalMoney2021: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

          for (let i = 0; i < res.data.resultObj.length; i++) {
            if (res.data.resultObj[i].createdDate !== null) {
              if (res.data.resultObj[i].createdDate.substring(0, 4) == 2020) {
                // console.log(res.data.resultObj[i].createdDate.substring(0,4));
                if(res.data.resultObj[i].statusId !== 0)
                {
                // console.log(res.data.resultObj[i].statusId);

                let date = new Date(String((res.data.resultObj[i].createdDate)));
                this.state.arrTotalMoney2020[date.getMonth()] += res.data.resultObj[i].totalMoney;
                }
              }
              else
              {
                // console.log(res.data.resultObj[i].createdDate.substring(0,4));
                if(res.data.resultObj[i].statusId !== 0)
                {
                  // console.log(res.data.resultObj[i].statusId);

                  let date = new Date(String((res.data.resultObj[i].createdDate)));
                  this.state.arrTotalMoney2021[date.getMonth()] += res.data.resultObj[i].totalMoney;
                }
              }
            }
          }

          // res.data.resultObj.map(item => {
          //   let date = new Date(String(item.createdDate));
          //   this.state.arrTotalMoney[date.getMonth()] += item.totalMoney;
          //   return null
          // });
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
                  label: "Doanh thu năm 2020",
                  backgroundColor: "#321fdb",
                  data: this.state.arrTotalMoney2020
                },
                {
                  label: "Doanh thu năm 2021",
                  backgroundColor: "#FF0000",
                  data: this.state.arrTotalMoney2021
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
