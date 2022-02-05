import React from 'react';
import {useAppSelector} from '../../store/hooks';
import {selectAuthInfo} from '../../store/auth/authSlice';
import FarmersSummary from './FarmersSummary';

const MyFarmersSummary = () => {
  const authInfo = useAppSelector(selectAuthInfo)
  const farmerID: number | undefined = authInfo.farmerID ? +authInfo.farmerID : undefined

  return (
    <FarmersSummary farmerID={farmerID}/>
  );
};

export default MyFarmersSummary;