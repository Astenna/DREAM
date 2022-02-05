import React, {Key, useState} from 'react';
import {Button, Col, Modal, Row, Table} from 'antd';
import strings from '../../values/strings';
import {DeleteOutlined} from '@ant-design/icons';

interface MandalTypeProps {
  value?: string[],
  onChange?: (value: string[]) => void
}

interface TableData {
  key: string,
  mandal: string
}

/**
 * @deprecated
 * Swapped by Select component in CreateAccount modal dialog.
 * Would be useful for Agronomist role, but it won't be implemented.
 */
const MandalTable = (props: MandalTypeProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [data, setData] = useState<TableData[]>([])
  const [isAddMandalModalVisible, setAddMandalModalVisibility] = useState<boolean>(false)

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: Key[]) => setSelectedRowKeys(selectedRowKeys as string[])
  }

  const columns = [{
    title: strings.FORM.LABEL.MANDALS,
    dataIndex: "mandal",
  }]

  const removeSelectedRows = () => {
    const filteredData = data.filter(value => !selectedRowKeys.includes(value.key))
    setData(filteredData)
    setSelectedRowKeys([])
    if (props?.onChange) {
      props.onChange(filteredData.map(value => value.mandal))
    }
  }

  return (
    <>
      <Modal
        title={strings.FORM.LABEL.ADD_MANDALS}
        visible={isAddMandalModalVisible}
        onOk={() => setAddMandalModalVisibility(false)}
        onCancel={() => setAddMandalModalVisibility(false)}
        okText={strings.ADD}
      >

      </Modal>
      <Row style={{justifyContent: 'flex-end', padding: "5px 0"}}>
        <Col>
          <Button shape="circle" icon={<DeleteOutlined/>} onClick={removeSelectedRows}/>
        </Col>
      </Row>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 5
        }}
      />
      <Row style={{justifyContent: 'flex-end', padding: "5px 0"}}>
        <Col>
          <Button
            type={"primary"}
            onClick={() => setAddMandalModalVisibility(true)}
          >
            {strings.FORM.LABEL.ADD_MANDALS}
          </Button>
        </Col>
      </Row>
    </>
  );
};

// interface MandalTypeProps {
//   value?: number,
//   onChange?: (value: number) => void
// }
//
// const MandalTable = (props: MandalTypeProps) => {
//   const [i, setI] = useState(0);
//   const onChange = props?.onChange ? props.onChange : () => {}
//   useEffect(() => {
//     if (!props?.onChange) {
//       console.error("MandalTable created incorrectly. No onChange handler")
//     }
//   }, [])
//
//   return (
//     <>
//       <Button onClick={() => {
//         setI(i + 1);
//         onChange(i + 1);
//       }}>click {i}</Button>
//     </>
//   );
// };

export default MandalTable;