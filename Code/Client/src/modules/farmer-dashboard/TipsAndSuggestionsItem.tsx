import {Col, Divider, Row} from "antd";
import React from "react";

export interface TipsAndSuggestionsItemProps {
  id: string
  text: string
}

const TipsAndSuggestionsItem = (props: { item: TipsAndSuggestionsItemProps }) => {
  const item = props.item

  return (
    <>
      <Row className={"list-item"}>
        <Col style={{width: "100%"}}>
          <Row justify={'space-between'}>
            <div style={{fontWeight: "normal"}} className={"dashboard-list-item-title "}>
              {item.text}
            </div>
          </Row>
        </Col>
      </Row>
      <Divider style={{margin: "10px 0"}}/>
    </>
  );
}

export default TipsAndSuggestionsItem;