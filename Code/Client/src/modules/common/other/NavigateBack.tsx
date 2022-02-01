import React from 'react';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {useNavigate} from 'react-router';

const NavigateBack = () => {
  const navigate = useNavigate()

  return (
    <Button onClick={() => navigate(-1)} style={{border: 0, padding: 0}}>
      <ArrowLeftOutlined/>
    </Button>
  );
};

export default NavigateBack;