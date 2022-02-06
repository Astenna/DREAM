import {Col, Row} from 'antd';

import React, {useEffect} from 'react';
import NoteHistory from "./NoteHistory";
import ProductionData from "./ProductionData";
import Weather from "./Weather";
import HelpRequests from "./HelpRequests";
import FarmerDetails from "./FarmerDetails";
import SoilHumidity from "./SoilHumidity";
import WaterUsage from "./WaterUsage";
import {selectRoleNavigation} from '../../store/auth/authSlice';
import {useAppSelector} from "../../store/hooks";
import {Role} from "../../model/Role";
import ViewHeader from '../other/ViewHeader';
import {farmerRequests} from '../../api/requests/farmerRequests';
import DeleteAccount from '../delete-account/DeleteAccount';
import {requestRequests} from '../../api/requests/requestRequests';

const FarmersSummary = (props: { farmerID: number | undefined, inModal?: boolean }) => {
  const roleNavigation = useAppSelector(selectRoleNavigation);
  const [farmerDetail, loadFarmerDetail] = farmerRequests.useGetFarmerDetail()
  const [productionData, loadProductionData] = farmerRequests.useGetFarmerProductionData()
  const [noteHistory, loadNoteHistory] = farmerRequests.useGetFarmerNoteHistory()
  const [helpRequests, loadHelpRequests] = requestRequests.useGetFarmerRequests()
  const farmerID = props.farmerID;

  useEffect(() => {
    if (farmerID) {
      loadFarmerDetail(farmerID)
      loadProductionData(farmerID)
      loadNoteHistory(farmerID)
      loadHelpRequests(farmerID)
    }
  }, [farmerID])

  return (
    <>
      <ViewHeader title={`Farmer: ${farmerDetail?.farmerNameAndSurname}`} hideArrow={props.inModal}/>
      <Row style={!props.inModal ? {padding: "15px 15px 0 15px"} : {}}>
        <Col style={{width: "100%"}}>

          <FarmerDetails data={farmerDetail} noteChangedCB={() => {
            if (farmerID) {
              loadNoteHistory(farmerID)
              loadFarmerDetail(farmerID)
            }
          }}
          />

          <NoteHistory data={noteHistory}/>

          <ProductionData data={productionData}/>

          <Weather/>

          <Row>
            <Col style={{width: "50%", padding: "0 20px 0 0"}}>
              <SoilHumidity/>
            </Col>

            <Col style={{width: "50%", padding: "0 0 0 20px"}}>
              <WaterUsage/>
            </Col>
          </Row>

          <HelpRequests data={helpRequests}/>

          {
            (roleNavigation.role === Role.FARMER && !props.inModal) &&
            <DeleteAccount/>
          }

        </Col>
      </Row>
    </>
  );
}

export default FarmersSummary;