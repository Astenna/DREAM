import {Col, Descriptions, Row, Space} from 'antd';
import React, {useState} from 'react';
import {Note} from "../../model/Note";
import strings from "../../values/strings";
import {EditOutlined, StarOutlined} from "@ant-design/icons";
import CreateChangeNoteModal from "./CreateChangeNoteModal";
import {useAppSelector} from "../../store/hooks";
import {selectRoleNavigation} from "../../store/auth/authSlice";
import colors from "../../values/colors";
import {Role} from "../../model/Role";


const userData = {
  name: "Assish Rai",
  email: "user@farmer.it",
  note: Note.POSITIVE,
  mandal: "Mavala",
  fullAddress: "Street 1, Mavala 12039"
}

const FarmerDetails = () => {
  const roleNavigation = useAppSelector(selectRoleNavigation);
  const [isChangeNoteFormVisible, setChangeNoteFormVisible] = useState(false);

  return (
    <>
      <CreateChangeNoteModal isVisible={isChangeNoteFormVisible} setVisible={setChangeNoteFormVisible}/>
      <Row style={{padding: "15px 0 15px 0"}}>

        <Col style={{width: "50%", padding: "0 20px 0 0"}}>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Name">{userData.name}</Descriptions.Item>
            <Descriptions.Item label="E-mail">{userData.email}</Descriptions.Item>
            <Descriptions.Item label="Note">
              <Space size={"middle"}>
                <Col>
                  <StarOutlined
                    style={{
                      color: userData.note === Note.POSITIVE ?
                        colors.SUCCESS : userData.note === Note.NEGATIVE ? colors.DANGER : undefined
                    }}/> {userData.note}
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
            <Descriptions.Item label="Number of help requests">{userData.name}</Descriptions.Item>
            <Descriptions.Item label="Mandal">{userData.mandal}</Descriptions.Item>
            <Descriptions.Item label="Full address">{userData.fullAddress}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </>
  );
}

export default FarmerDetails;