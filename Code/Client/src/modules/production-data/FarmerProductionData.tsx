import React, {Key, useState} from 'react';
import ViewHeader from '../other/ViewHeader';
import strings from '../../values/strings';
import {Button, Col, Form, Row, Space, Table} from 'antd';
import {PlusOutlined} from '@ant-design/icons/lib/icons';
import {DeleteOutlined} from '@ant-design/icons';
import ModifyProductionDataItem, {ModifyProductionDataItemMode, ProductionDataItem} from './ModifyProductionDataItem';
import moment from 'moment';
import {farmerRequests} from '../../api/requests/farmerRequests';

const FarmerProductionData = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [isDetailedModalVisible, setDetailedModalVisible] = useState(false);
  const [detailedModalMode, setDetailedModalMode] = useState<ModifyProductionDataItemMode>("add");
  const [productionData, load] = farmerRequests.useGetFarmerProductionData()

  const columns = [
    {
      title: strings.FORM.LABEL.TYPE,
      dataIndex: "type",
      key: "type",
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
      render: (id: string) =>
        <Button
          type={"dashed"}
          size={"small"}
          onClick={() => {
            setDetailedModalMode("edit")
            const item = data.find(v => v.id === id)
            form.setFieldsValue({
              id: item!.id,
              type: item!.type,
              amount: +item!.amount,
              date: item!.date,
            })
            setDetailedModalVisible(true)
          }}
        >
          {strings.EDIT}
        </Button>
    },
  ]

  const data: ProductionDataItem[] = [
    {
      id: "1",
      type: "SuperCarrot",
      amount: 1.5,
      date: moment("2011-09-01"),
    },
    {
      id: "2",
      type: "Carrot",
      amount: 1.5,
      date: moment("2011-09-01"),
    },
    {
      id: "3",
      type: "Carrot",
      amount: 1.5,
      date: moment("2011-09-01"),
    },
  ]

  const tableData = data.map(value => ({
    ...value,
    amount: `${value.amount} kg`,
    key: value.id,
    date: value.date.toDate().toLocaleDateString(),
  }))

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
                  onClick={() => {
                  }}
                />
              </Col>
            </Space>
          </Row>
          <Row>
            <Col style={{width: "100%"}}>
              <Table
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