import React, {useState} from "react";
import {Col, Divider, Row} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import MyHelpRequestsShortItem, {MyHelpRequestsShortItemProps} from "./MyHelpRequestsShortItem";

let allMyHelpRequestsShortItems: MyHelpRequestsShortItemProps[] = [
  {
    id: "1",
    title: "Lorem ipsum blah blah blah blah blah",
    commentCount: 1,
    lastCommentDate: new Date("2011-10-05"),
    createDateTime: new Date("2011-10-05T14:48:00.000Z"),
    author: {
      name: "Grzegorz",
      surname: "Grzegoski",
    }
  },
  {
    id: "1",
    title: "sdfsdf Lorem ipsum blah blah blah blah blah",
    commentCount: 1,
    lastCommentDate: new Date("2011-10-05"),
    createDateTime: new Date("2011-10-05T14:48:00.000Z"),
    author: {
      name: "Grzegorz",
      surname: "Grzegoski",
    }
  },
  {
    id: "1",
    title: "aaaaasdfsdf Lorem ipsum blah blah blah blah blah",
    commentCount: 1,
    lastCommentDate: new Date("2011-10-05"),
    createDateTime: new Date("2011-10-05T14:48:00.000Z"),
    author: {
      name: "Grzegorz",
      surname: "Grzegoski",
    }
  },
]

const MyHelpRequestsShort = () => {
  const [pageSize, setPageSize] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  const [myHelpRequestsShortItem, setMyHelpRequestsShortItem] = useState(allMyHelpRequestsShortItems)

  return (
    <>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <h1 className={"dashboard-h1"}>My help requests</h1>
          <Divider style={{margin: "10px 0"}}/>
          <>
            {
              myHelpRequestsShortItem
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((item, key) =>
                  <MyHelpRequestsShortItem key={key} item={item}/>)
            }
          </>
          {/*TODO: Add navigation*/}
          <a style={{float: "right", marginRight: "0"}}>Manage my help requests <ArrowLeftOutlined rotate={180}/></a>
        </Col>
      </Row>
    </>
  );
}

export default MyHelpRequestsShort;