import React from 'react';
import {useParams} from 'react-router';
import FarmersSummary from './FarmersSummary';

const PMFarmersSummary = () => {
  const {id} = useParams<string>()
  const farmerID: number | undefined = id ? +id : undefined

  return (
    <FarmersSummary farmerID={farmerID}/>
  );
};

export default PMFarmersSummary;