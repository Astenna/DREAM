import React, {useEffect} from "react";
import {Col, Divider, Row} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import MyHelpRequestsShortItem from "./MyHelpRequestsShortItem";
import {requestRequests} from '../../api/requests/requestRequests';
import {useAppSelector} from '../../store/hooks';
import {selectAuthInfo} from '../../store/auth/authSlice';
import links from '../../values/links';
import {Link} from 'react-router-dom';

const MyHelpRequestsShort = () => {
  const [allMyRequest, load] = requestRequests.useGetFarmerRequests()
  const farmerID = useAppSelector(selectAuthInfo)?.farmerID

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
          <h1 className={"dashboard-h1"}>My help requests</h1>
          <Divider style={{margin: "10px 0"}}/>
          <>
            {
              allMyRequest
                ?.slice(0, 3)
                ?.map((item, key) =>
                  <MyHelpRequestsShortItem key={key} item={item}/>)
            }
          </>
          <Link
            to={links.DASHBOARD.URL + links.MY_HELP_REQUESTS.URL}
            style={{float: "right", marginRight: "0"}}>Manage my help requests <ArrowLeftOutlined rotate={180}/></Link>
        </Col>
      </Row>
    </>
  );
}

export default MyHelpRequestsShort;