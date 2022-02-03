import {StarOutlined} from '@ant-design/icons';
import {Table} from 'antd';

import colors from "../../values/colors";
import {Note} from "../../model/Note";

const NoteHistory = () => {
  const noteHistoryData = [
    {
      note: Note.POSITIVE,
      agronomist: 'Json Rajesh Junior',
      date: new Date("2011-09-02")
    },
    {
      note: Note.NEUTRAL,
      agronomist: 'Json Rajesh Junior',
      date: new Date("2011-08-01")
    },
    {
      note: Note.NEGATIVE,
      agronomist: 'Json Rajesh Junior',
      date: new Date("2011-09-01")
    },
  ]

  const noteHistoryColumns = [
    {
      title: () => {
        return <div style={{fontWeight: 'bold'}}>Note</div>;
      },
      dataIndex: 'note',
      key: 'note',
      render: (note: Note) => (
        <><StarOutlined
          style={{color: note === Note.POSITIVE ? colors.SUCCESS : note === Note.NEGATIVE ? colors.DANGER : undefined}}/> {note}
        </>
      )
    },
    {
      title: () => {
        return <div style={{fontWeight: 'bold'}}>Agronomist</div>;
      },
      dataIndex: 'agronomist',
      key: 'agronomist',
    },
    {
      title: () => {
        return <div style={{fontWeight: 'bold'}}>Date</div>;
      },
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => (
        <>{date.toLocaleDateString()}</>
      )
    },
  ]

  return (
    <>
      <h1 className={"dashboard-h1"}>Note history</h1>
      <Table dataSource={noteHistoryData} columns={noteHistoryColumns} pagination={{pageSize: 3}}/>
    </>
  );
}

export default NoteHistory;