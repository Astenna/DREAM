import React, {useState} from "react";
import {Col, Divider, Pagination, Row} from "antd";
import TipsAndSuggestionsItem, {TipsAndSuggestionsItemProps} from "./TipsAndSuggestionsItem";


let allTipsAndSuggestionsItems: TipsAndSuggestionsItemProps[] = [
  {
    id: "1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget mauris ante."
  },
  {
    id: "2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget mauris ante."
  },
  {
    id: "3",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget mauris ante."
  },
  {
    id: "4",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget mauris ante."
  },
];
const TipsAndSuggestions = () => {
  const [pageSize, setPageSize] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  const [tipsAndSuggestionsItem, setTipsAndSuggestionsItem] = useState(allTipsAndSuggestionsItems)

  return (
    <>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <h1 className={"dashboard-h1"}>Tips & Suggestions</h1>
          <Divider style={{margin: "10px 0"}}/>
          <>
            {
              tipsAndSuggestionsItem
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((item, key) =>
                  <TipsAndSuggestionsItem key={key} item={item}/>)
            }
          </>
          {/*TODO: Add navigation*/}
          <Row justify={'end'}>
            <Col>
              <Pagination
                style={{paddingBottom: "15px"}}
                showSizeChanger
                total={tipsAndSuggestionsItem.length}
                pageSizeOptions={[3, 5, 10, 20]}
                pageSize={pageSize}
                onChange={(c, s) => {
                  console.log(s, c)
                  setCurrentPage(c)
                  setPageSize(s)
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>

  );
}

export default TipsAndSuggestions;