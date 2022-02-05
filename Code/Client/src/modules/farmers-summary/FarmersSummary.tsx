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
import {useParams} from 'react-router';
import {farmerRequests} from '../../api/requests/farmerRequests';
import DeleteAccount from '../delete-account/DeleteAccount';

const FarmersSummary = () => {
  const roleNavigation = useAppSelector(selectRoleNavigation);
  const {id} = useParams<string>()
  const farmerID: number | undefined = id ? +id : undefined
  const [farmerDetail, loadFarmerDetail] = farmerRequests.useGetFarmerDetail()
  const [productionData, loadProductionData] = farmerRequests.useGetFarmerProductionData()
  const [noteHistory, loadNoteHistory] = farmerRequests.useGetFarmerNoteHistory()
  const [helpRequests, loadHelpRequests] = farmerRequests.useGetFarmerRequests()


  useEffect(() => {
    if (farmerID) {
      loadFarmerDetail(farmerID)
      loadProductionData(farmerID)
      loadNoteHistory(farmerID)
      loadHelpRequests(farmerID)
    }
  }, [id])

  useEffect(() => {
    console.log(farmerDetail)
  }, [farmerDetail])

  return (
    <>
      <ViewHeader title={`Farmer: ${farmerDetail?.farmerNameAndSurname}`}/>
      <Row style={{padding: "15px 15px 0 15px"}}>
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

          {roleNavigation.role === Role.FARMER &&
          <DeleteAccount/>
          }

        </Col>
      </Row>
    </>
  );
}

export default FarmersSummary;