import {Col, Divider, Row} from "antd";
import React from "react";
import {Suggestion} from '../../model/api/GetSuggestion';

const TipsAndSuggestionsItem = (props: { item: Suggestion }) => {
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