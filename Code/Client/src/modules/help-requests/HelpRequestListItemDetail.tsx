import React from 'react';
import {useParams} from 'react-router';

export interface HelpRequestListItemDetail {
  id: string
  title: string
  commentCount: number
  lastCommentDate: Date
  createDateTime: Date
  author: {
    name: string
    surname: string
  }
}

const HelpRequestListItemDetail = () => {
  const {stringID} = useParams()
  const id: number = +!stringID

  return (
    <div>
      {id}
    </div>
  );
};

export default HelpRequestListItemDetail;