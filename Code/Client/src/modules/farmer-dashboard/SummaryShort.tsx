import React from "react";
import {Col, Divider, Image, Row} from "antd";
import {ArrowLeftOutlined, EnvironmentOutlined} from "@ant-design/icons";
import colors from "../../values/colors";
import {Link} from 'react-router-dom';
import links from '../../values/links';

const summaryData = {
  dayAndDate: 'Wednesday, 8.12.2021',
  temperature: '15°C',
  precipitation: '22mm',
  waterUsage: '1.2 m3',
  soilHumidity: '1.2 g/kg',
  location: 'Mavala, Adilabad'
}

const SummaryShort = () => {
  return (
    <>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <h1 className={"dashboard-h1"}>Summary</h1>
          <Divider style={{margin: "10px 0"}}/>
          <h3>{summaryData.dayAndDate}</h3>
          <Divider style={{margin: '12px'}}/>
          <Row>
            <Col span={12}>
              <Row>
                <Col span={8}>
                  <Image style={{width: '100', height: '100'}}
                         src={"https://ssl.gstatic.com/onebox/weather/64/cloudy.png"}/>
                </Col>
                <Col span={16}>
                  <h2 style={{margin: '0 4px'}}>{summaryData.temperature}</h2>
                  <h4 style={{margin: '0 6px'}}>{summaryData.precipitation}</h4>
                </Col>
              </Row>
            </Col>
            <Col span={12}
                 style={{display: 'flex', justifyContent: 'right', alignItems: 'start'}}>
              <h3 style={{margin: '0'}}><EnvironmentOutlined style={{color: colors.PRIMARY}}/> {summaryData.location}</h3>
            </Col>
          </Row>
          <Divider style={{margin: "10px 0"}}/>
          <Row justify={'space-between'}>
            <div>Today's water usage:</div>
            <span className={"dashboard-item-attribute"}>{summaryData.waterUsage}</span>
          </Row>
          <Divider style={{margin: "10px 0"}}/>
          <Row justify={'space-between'}>
            <div>Average soil humidity:</div>
            <span className={"dashboard-item-attribute"}>{summaryData.soilHumidity}</span>
            {/*TODO: Add navigation*/}
          </Row>
          <Divider style={{margin: "10px 0"}}/>
          <Link
            to={links.DASHBOARD.URL + links.SUMMARY.URL}
            style={{float: "right", marginRight: "0"}}
          >
            See all relevant data&nbsp;
            <ArrowLeftOutlined rotate={180}/>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default SummaryShort;