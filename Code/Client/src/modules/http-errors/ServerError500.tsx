import React from 'react';
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import strings from '../../values/strings';
import DefaultLayout from '../layout/DefaultLayout';

/**
 * Error 500 page.
 */
const ServerError500 = () => {

  const navigate = useNavigate()

  return (
    <DefaultLayout>
      <Result
        status="403"
        title="500"
        subTitle={strings.ERROR.SERVER_ERROR_500}
        extra={<Button type="primary" onClick={() => navigate("/")}>{strings.RETURN_HOME}</Button>}
      />
    </DefaultLayout>
  );
};

export default ServerError500;