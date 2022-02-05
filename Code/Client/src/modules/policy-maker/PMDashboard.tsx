import {Card, Col, List, Row} from 'antd';
import "../dashboard/Dashboard.less"
import {Link} from 'react-router-dom';
import {EnvironmentOutlined, StarOutlined} from '@ant-design/icons';
import colors from "../../values/colors";
import {farmerRequests} from '../../api/requests/farmerRequests';
import links from '../../values/links';

const PMDashboard = () => {
  const [farmers] = farmerRequests.useGetFarmerOnRender()
  const posFarmers = farmers?.filter(x => x.currentNote === "Positive")?.slice(0, 3)
  const negFarmers = farmers?.filter(x => x.currentNote === "Negative")?.slice(0, 3)

  return (
    <>
      <div style={{padding: 12, minHeight: 360}}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card style={{minHeight: '200px'}} title={"Farmers | Positive note"}
                  headStyle={{fontSize: '16px', fontWeight: 'bold'}}>
              <List
                itemLayout="horizontal"
                dataSource={posFarmers}
                renderItem={item => (
                  <List.Item style={{display: "block", padding: '8px'}}>
                    <Row>
                      <Col span={12} style={{textAlign: 'left'}}>
                        {item.farmerNameAndSurname}
                      </Col>
                      <Col span={12} style={{textAlign: 'right'}}>
                        <EnvironmentOutlined style={{color: colors.PRIMARY}}/> {item.farmMandalName} | <StarOutlined
                        style={{color: colors.SUCCESS}}/> {item.currentNote}
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
              <Link to={links.DASHBOARD.URL + links.FARMERS.TYPE.POSITIVE} style={{float: 'right'}}>
                View farmers →
              </Link>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card style={{minHeight: '200px'}} title={"Farmers | Negative note"}
                  headStyle={{fontSize: '16px', fontWeight: 'bold'}}>
              <List
                itemLayout="horizontal"
                dataSource={negFarmers}
                renderItem={item => (
                  <List.Item style={{display: "block", padding: '8px'}}>
                    <Row>
                      <Col span={12} style={{textAlign: 'left'}}>
                        {item.farmerNameAndSurname}
                      </Col>
                      <Col span={12} style={{textAlign: 'right'}}>
                        <EnvironmentOutlined style={{color: colors.PRIMARY}}/> {item.farmMandalName} | <StarOutlined
                        style={{color: colors.DANGER}}/> {item.currentNote}
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
              <Link to={links.DASHBOARD.URL + links.FARMERS.TYPE.NEGATIVE} style={{float: 'right'}}>
                View farmers →
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PMDashboard;