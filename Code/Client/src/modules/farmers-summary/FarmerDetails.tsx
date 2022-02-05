import {Col, Descriptions, Row, Space, Spin} from 'antd';
import React, {useState} from 'react';
import strings from "../../values/strings";
import {EditOutlined, StarOutlined} from "@ant-design/icons";
import CreateChangeNoteModal from "./CreateChangeNoteModal";
import {useAppSelector} from "../../store/hooks";
import {selectRoleNavigation} from "../../store/auth/authSlice";
import colors from "../../values/colors";
import {Role} from "../../model/Role";
import {GetFarmerDetailResponse} from '../../model/api/GetFarmerDetail';

const FarmerDetails = (props: { data: GetFarmerDetailResponse | undefined, noteChangedCB: () => void }) => {
  const roleNavigation = useAppSelector(selectRoleNavigation);
  const [isChangeNoteFormVisible, setChangeNoteFormVisible] = useState(false);
  const data = props.data

  return (
    <Spin spinning={!data}>
      <CreateChangeNoteModal
        isVisible={isChangeNoteFormVisible}
        setVisible={setChangeNoteFormVisible}
        farmerID={data?.id}
        noteChangedCB={props.noteChangedCB}
      />
      <Row style={{padding: "15px 0 15px 0"}}>

        <Col style={{width: "50%", padding: "0 20px 0 0"}}>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Name">{data?.farmerNameAndSurname}</Descriptions.Item>
            <Descriptions.Item label="E-mail">{data?.farmerEmail}</Descriptions.Item>
            <Descriptions.Item label="Note">
              <Space size={"middle"}>
                <Col>
                  <StarOutlined
                    style={{
                      color:
                        data?.currentNote === "Positive" ? colors.SUCCESS :
                          data?.currentNote === "Negative" ? colors.DANGER :
                            undefined
                    }}/> {data?.currentNote}
                </Col>

                {roleNavigation.role === Role.POLICY_MAKER &&
                    <Col>
                        <a onClick={() => setChangeNoteFormVisible(true)}>
                          {strings.CHANGE} <EditOutlined/>
                        </a>
                    </Col>
                }
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col style={{width: "50%", padding: "0 0 0 20px"}}>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Number of help requests">{data?.helpRequestsCount}</Descriptions.Item>
            <Descriptions.Item label="Mandal">{data?.farmMandalName}</Descriptions.Item>
            <Descriptions.Item label="Full address">
              {data ? `${data?.farmAddressLine1}, ${data?.farmAddressLine2}, ${data?.farmPostalCode} ${data?.farmMandalName}` : ""}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Spin>
  );
}

export default FarmerDetails;