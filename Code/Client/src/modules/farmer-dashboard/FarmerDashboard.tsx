import React from "react";
import {Col, Row} from "antd";
import SummaryShort from "./SummaryShort";
import TipsAndSuggestions from "./TipsAndSuggestions";
import RecentProductionData from "./RecentProductionData";
import MyHelpRequestsShort from "./MyHelpRequestsShort";

const FarmerDashboard = () => {
  return (
    <>
      <Row style={{padding: "15px 15px 0 15px"}}>
        <Col style={{width: "100%"}}>
          <Row>
            <Col style={{width: "50%", padding: "0 20px 0 0"}}>
              <SummaryShort/>
            </Col>

            <Col style={{width: "50%", padding: "0 0 0 20px"}}>
              <TipsAndSuggestions/>
            </Col>
          </Row>

          <Row>
            <Col style={{width: "50%", padding: "0 20px 0 0"}}>
              <RecentProductionData/>
            </Col>

            <Col style={{width: "50%", padding: "0 0 0 20px"}}>
              <MyHelpRequestsShort/>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default FarmerDashboard;