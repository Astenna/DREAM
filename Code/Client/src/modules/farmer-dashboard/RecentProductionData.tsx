import React, {useState} from "react";
import {Col, Divider, Row} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import RecentProductionDataItem, {RecentProductionDataItemProps} from "./RecentProductionDataItem";
import moment from "moment";


let allRecentProductionDataItems: RecentProductionDataItemProps[] = [
  {
    id: "1",
    type: "SuperCarrot",
    amount: 1.5,
    date: moment("2011-09-01"),
  },
  {
    id: "2",
    type: "Carrot",
    amount: 1.5,
    date: moment("2011-09-01"),
  },
  {
    id: "3",
    type: "Carrot",
    amount: 1.5,
    date: moment("2011-09-01"),
  },
]

const RecentProductionData = () => {
  const [pageSize, setPageSize] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  const [recentProductionDataItem, setRecentProductionDataItem] = useState(allRecentProductionDataItems)

  return (
    <>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <h1 className={"dashboard-h1"}>Recent production data</h1>
          <Divider style={{margin: "10px 0"}}/>
          <>
            {
              recentProductionDataItem
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((item, key) =>
                  <RecentProductionDataItem key={key} item={item}/>)
            }
          </>
          {/*TODO: Add navigation*/}
          <a style={{float: "right", marginRight: "0"}}>Manage production data <ArrowLeftOutlined rotate={180}/></a>
        </Col>
      </Row>
    </>
  );
}

export default RecentProductionData;