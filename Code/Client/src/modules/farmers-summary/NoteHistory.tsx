import {StarOutlined} from '@ant-design/icons';
import {Table} from 'antd';

import colors from "../../values/colors";
import {GetFarmerNoteResponse} from '../../model/api/GetFarmerNote';
import {FarmerNote} from '../../model/FarmerNote';

const NoteHistory = (props: { data: GetFarmerNoteResponse | undefined }) => {
  const noteHistoryColumns = [
    {
      title: () => {
        return <div style={{fontWeight: 'bold'}}>Note</div>;
      },
      dataIndex: 'note',
      key: 'note',
      render: (note: FarmerNote) => (
        <><StarOutlined
          style={{
            color: note === "Positive" ? colors.SUCCESS :
              note === "Negative" ? colors.DANGER :
                undefined
          }}
        />
          &nbsp;{note}
        </>
      )
    },
    {
      title: () => {
        return <div style={{fontWeight: 'bold'}}>Policy maker</div>;
      },
      dataIndex: 'policyMaker',
      key: 'policyMaker',
    },
    {
      title: () => {
        return <div style={{fontWeight: 'bold'}}>Date</div>;
      },
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => <>{new Date(date).toLocaleDateString()}</>
    },
  ]

  return (
    <>
      <h1 className={"dashboard-h1"}>Note history</h1>
      <Table
        loading={!props.data}
        dataSource={props.data}
        columns={noteHistoryColumns}
        pagination={{pageSize: 3}}
      />
    </>
  );
}

export default NoteHistory;