import React, {useEffect} from "react";
import {Col, Divider, Row} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import RecentProductionDataItem from "./RecentProductionDataItem";
import {farmerRequests} from '../../api/requests/farmerRequests';
import {useAppSelector} from '../../store/hooks';
import {selectAuthInfo} from '../../store/auth/authSlice';
import {Link} from 'react-router-dom';
import links from '../../values/links';


const RecentProductionData = () => {
  const farmerID = useAppSelector(selectAuthInfo)?.farmerID
  const [productionData, load] = farmerRequests.useGetFarmerProductionData()

  const reload = () => {
    if (farmerID) {
      load(+farmerID)
    }
  }

  useEffect(() => {
    reload()
  }, [farmerID])

  return (
    <>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <h1 className={"dashboard-h1"}>Recent production data</h1>
          <Divider style={{margin: "10px 0"}}/>
          <>
            {
              productionData
                ?.slice(0, 3)
                ?.map((item, key) =>
                  <RecentProductionDataItem key={key} item={item}/>)
            }
          </>
          <Link
            to={links.DASHBOARD.URL + links.PRODUCTION_DATA.URL}
            style={{float: "right", marginRight: "0"}}>Manage production data <ArrowLeftOutlined rotate={180}/></Link>
        </Col>
      </Row>
    </>
  );
}

export default RecentProductionData;