import React from 'react';
import {AutoComplete, DatePicker, Form, FormInstance, InputNumber, Modal, Select} from 'antd';
import strings from '../../values/strings';
import {Rule} from 'antd/lib/form';
import {Moment} from 'moment';

const {Option} = Select;

export interface ProductionDataItem {
  id: string
  type: string
  amount: number
  date: Moment
}

export type ModifyProductionDataItemMode = "edit" | "add"

export interface ModifyProductionDataItemProps {
  mode: ModifyProductionDataItemMode
  item?: ProductionDataItem
  isVisible: boolean,
  setVisible: (value: boolean) => void,
  form: FormInstance,
}

const requiredCheck: Rule = {
  required: true,
  message: strings.FORM.ERROR.REQUIRED,
}

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 18},
  },
};

const ModifyProductionDataItem = (props: ModifyProductionDataItemProps) => {
  const types = ["Type1", "Type2"]

  return (
    <Modal
      title={strings.FORM.LABEL.ADD_PRODUCTION_DATA}
      visible={props.isVisible}
      onOk={() => console.log(props.form.getFieldsValue())}
      onCancel={() => props.setVisible(false)}
      okText={strings.SUBMIT}
    >
      <Form
        {...formItemLayout}
        form={props.form}
        onFinish={() => {
        }}
        name={"addProductionData"}
        scrollToFirstError
      >
        <Form.Item key={"id"} name={"id"} hidden/>
        <Form.Item
          key="type" name="type" label={strings.FORM.LABEL.TYPE}
          rules={[requiredCheck]}
        >
          <AutoComplete onSearch={() => {
          }}>
            {types.map(m =>
              <Option key={m} value={m}>
                {m}
              </Option>
            )}
          </AutoComplete>
        </Form.Item>
        <Form.Item
          key="amount" name="amount" label={strings.FORM.LABEL.AMOUNT}
          rules={[requiredCheck]}
        >
          <InputNumber min={"0"} step="0.1" addonAfter={"kg"}/>
        </Form.Item>
        <Form.Item
          key="date" name="date" label={strings.FORM.LABEL.DATE}
          rules={[requiredCheck]}
        >
          <DatePicker/>
        </Form.Item>


      </Form>
    </Modal>
  );
};

export default ModifyProductionDataItem;