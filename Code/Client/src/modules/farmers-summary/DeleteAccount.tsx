import {Button, Col, Row} from "antd";
import React from "react";

const DeleteAccount = () => {
  return <>
    <Row style={{padding: "10px 0 5px 0"}}>
      <Col>
        <h1 className={"dashboard-h1"}>
          Delete account
        </h1>
      </Col>
    </Row>
    <Row>
      <Col>
        By clicking the button below you can delete your account completely. Please note, that this action is
        irreversible.
      </Col>
    </Row>
    <Button type={"primary"} style={{margin: "15px 0"}} danger>
      Delete account
      {/*  TODO: Add on click action*/}
    </Button>
  </>;
}

export default DeleteAccount;