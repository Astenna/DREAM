import {Card, Col, List, Row} from 'antd';
import "../dashboard/Dashboard.less"
import {Link} from 'react-router-dom';
import {EnvironmentOutlined, StarOutlined} from '@ant-design/icons';
import colors from "../../values/colors";


const posFarmers = [
  {
    name: "P. K. Banerjee",
    location: "Mavala",
    note: "Positive"
  },
  {
    name: "P. Raj",
    location: "Mavala",
    note: "Positive"
  },
  {
    name: "Json Rajesh",
    location: "Mavala",
    note: "Positive"
  }
]

const negFarmers = [
  {
    name: "P. K. Banerjee",
    location: "Mavala",
    note: "Negative"
  },
  {
    name: "P. Raj",
    location: "Mavala",
    note: "Negative"
  },
  {
    name: "Json Rajesh",
    location: "Mavala",
    note: "Negative"
  }
]

const PMDashboard = () => {

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
                        {item.name}
                      </Col>
                      <Col span={12} style={{textAlign: 'right'}}>
                        <EnvironmentOutlined style={{color: colors.PRIMARY}}/> {item.location} | <StarOutlined
                        style={{color: colors.SUCCESS}}/> {item.note}
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
              <Link to={"/"} style={{float: 'right'}}>
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
                        {item.name}
                      </Col>
                      <Col span={12} style={{textAlign: 'right'}}>
                        <EnvironmentOutlined style={{color: colors.PRIMARY}}/> {item.location} | <StarOutlined
                        style={{color: colors.DANGER}}/> {item.note}
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
              <Link to={"/"} style={{float: 'right'}}>
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