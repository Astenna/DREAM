import {Col, Row} from 'antd';

import React from 'react';
import NoteHistory from "./NoteHistory";
import ProductionData from "./ProductionData";
import Weather from "./Weather";
import HelpRequests from "./HelpRequests";
import FarmerDetails from "./FarmerDetails";
import SoilHumidity from "./SoilHumidity";
import WaterUsage from "./WaterUsage";
import DeleteAccount from "./DeleteAccount";
import {selectRoleNavigation} from '../../store/auth/authSlice';
import {useAppSelector} from "../../store/hooks";
import {Role} from "../../model/Role";
import ViewHeader from '../other/ViewHeader';

const FarmersSummary = () => {
  const roleNavigation = useAppSelector(selectRoleNavigation);

  return (
    <>
      <ViewHeader title={`Farmer: Name Here`}/>
      <Row style={{padding: "15px 15px 0 15px"}}>
        <Col style={{width: "100%"}}>
          <FarmerDetails/>

          <NoteHistory/>

          <ProductionData/>

          <Weather/>

          <Row>
            <Col style={{width: "50%", padding: "0 20px 0 0"}}>
              <SoilHumidity/>
            </Col>

            <Col style={{width: "50%", padding: "0 0 0 20px"}}>
              <WaterUsage/>
            </Col>
          </Row>

          <HelpRequests/>

          {roleNavigation.role === Role.FARMER &&
              <DeleteAccount/>
          }

        </Col>
      </Row>
    </>
  );
}

export default FarmersSummary;