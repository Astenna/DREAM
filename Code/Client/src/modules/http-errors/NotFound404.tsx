import React from 'react';
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import strings from '../../values/strings';
import DefaultLayout from '../layout/DefaultLayout';

/**
 * 404 page.
 */
const NotFound404 = () => {

  const navigate = useNavigate()

  return (
    <DefaultLayout>
      <Result
        status="404"
        title="404"
        subTitle={strings.ERROR.NOT_FOUND_404}
        extra={<Button type="primary" onClick={() => navigate("/")}>{strings.RETURN_HOME}</Button>}
      />
    </DefaultLayout>
  );
};

export default NotFound404;