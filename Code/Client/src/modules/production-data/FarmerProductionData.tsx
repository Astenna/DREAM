import React, {Key, useEffect, useState} from 'react';
import ViewHeader from '../other/ViewHeader';
import strings from '../../values/strings';
import {Button, Col, Form, Row, Space, Table} from 'antd';
import {PlusOutlined} from '@ant-design/icons/lib/icons';
import {DeleteOutlined} from '@ant-design/icons';
import ModifyProductionDataItem, {ModifyProductionDataItemMode} from './ModifyProductionDataItem';
import moment from 'moment';
import {farmerRequests} from '../../api/requests/farmerRequests';
import {useAppSelector} from '../../store/hooks';
import {selectAuthInfo} from '../../store/auth/authSlice';

const FarmerProductionData = () => {
  const authInfo = useAppSelector(selectAuthInfo)
  const farmerID: number | undefined = authInfo.farmerID ? +authInfo.farmerID : undefined
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [isDetailedModalVisible, setDetailedModalVisible] = useState(false);
  const [detailedModalMode, setDetailedModalMode] = useState<ModifyProductionDataItemMode>("add");
  const [productionData, load] = farmerRequests.useGetFarmerProductionData()

  const reload = () => {
    if (farmerID) {
      load(farmerID)
    }
  }

  useEffect(() => {
    reload()
  }, [farmerID])

  const columns = [
    {
      title: strings.FORM.LABEL.TYPE,
      dataIndex: "productionType",
      key: "productionType",
    },
    {
      title: strings.FORM.LABEL.AMOUNT,
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: strings.FORM.LABEL.DATE,
      dataIndex: "date",
      key: "date",

    },
    {
      title: strings.FORM.LABEL.ACTION,
      dataIndex: "id",
      key: "edit",
      render: (id: number) =>
        <Button
          type={"dashed"}
          size={"small"}
          onClick={() => {
            setDetailedModalMode("edit")
            const item = productionData?.find(v => v.id === id)
            form.setFieldsValue({
              id: item!.id,
              productionType: item!.productionType,
              amount: +item!.amount,
              date: moment(item!.date),
            })
            setDetailedModalVisible(true)
          }}
        >
          {strings.EDIT}
        </Button>
    },
  ]

  const tableData = productionData?.map(value => ({
    ...value,
    amount: `${value.amount} kg`,
    key: value.id,
    date: new Date(value.date).toLocaleDateString(),
    dateObject: new Date(value.date),
  })).sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime())

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: Key[]) => setSelectedRowKeys(selectedRowKeys as string[])
  }

  return (
    <>
      <ModifyProductionDataItem
        form={form}
        mode={detailedModalMode}
        isVisible={isDetailedModalVisible}
        setVisible={setDetailedModalVisible}
        productionDataChanged={reload}
        // item={detailedModelData}
      />
      <ViewHeader title={strings.SIDEBAR.PRODUCTION_DATA}/>
      <Row style={{padding: "0 35px 0 35px"}}>
        <Col style={{width: "100%"}}>
          <Row style={{justifyContent: 'flex-end', padding: "5px 0"}}>
            <Space>
              <Col>
                <Button
                  shape="circle" size="large" icon={<PlusOutlined/>}
                  onClick={() => {
                    setDetailedModalMode("add")
                    form.resetFields()
                    setDetailedModalVisible(true)
                  }}
                />
              </Col>
              <Col>
                <Button
                  shape="circle" size="large" icon={<DeleteOutlined/>}
                  onClick={() => console.log(selectedRowKeys)}
                />
              </Col>
            </Space>
          </Row>
          <Row>
            <Col style={{width: "100%"}}>
              <Table
                loading={!tableData}
                scroll={{x: 400}}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={tableData}
                pagination={{
                  pageSize: 5
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default FarmerProductionData;