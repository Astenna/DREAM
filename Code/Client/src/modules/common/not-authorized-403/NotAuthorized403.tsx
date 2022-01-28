import React from 'react';
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import strings from '../../../values/strings';
import DefaultLayout from '../layout/DefaultLayout';

/**
 * Not Authorized page.
 */
const NotAuthorized403 = () => {

  const navigate = useNavigate()

  return (
    <DefaultLayout>

      <Result
        status="403"
        title="403"
        subTitle={strings.ERROR.NO_AUTHORIZED_403}
        extra={<Button type="primary" onClick={() => navigate("/")}>{strings.RETURN_HOME}</Button>}
      />

    </DefaultLayout>
  );
};

export default NotAuthorized403;