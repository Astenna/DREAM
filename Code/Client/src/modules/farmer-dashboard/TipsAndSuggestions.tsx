import React, {useEffect, useState} from "react";
import {Col, Divider, Pagination, Row} from "antd";
import TipsAndSuggestionsItem from "./TipsAndSuggestionsItem";
import {useAppSelector} from '../../store/hooks';
import {selectAuthInfo} from '../../store/auth/authSlice';
import {suggestionRequests} from '../../api/requests/suggestionRequests';


const TipsAndSuggestions = () => {
  const [pageSize, setPageSize] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  const [suggestions, load] = suggestionRequests.useGetSuggestions()
  const farmerID = useAppSelector(selectAuthInfo)?.farmerID

  const reload = () => {
    if (farmerID) {
      load(+farmerID)
    }
  }

  useEffect(() => {
    reload()
  }, [farmerID])

  return (
    <>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <h1 className={"dashboard-h1"}>Tips & Suggestions</h1>
          <Divider style={{margin: "10px 0"}}/>
          <>
            {
              suggestions
                ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                ?.map((item, key) =>
                  <TipsAndSuggestionsItem key={key} item={item}/>)
            }
          </>
          <Row justify={'end'}>
            <Col>
              <Pagination
                style={{paddingBottom: "15px"}}
                showSizeChanger
                total={suggestions?.length}
                pageSizeOptions={[3, 5, 10, 20]}
                pageSize={pageSize}
                onChange={(c, s) => {
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