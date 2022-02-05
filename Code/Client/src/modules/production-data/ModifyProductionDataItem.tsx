import React from 'react';
import {AutoComplete, DatePicker, Form, FormInstance, InputNumber, Modal, Select} from 'antd';
import strings from '../../values/strings';
import {Rule} from 'antd/lib/form';
import {Moment} from 'moment';
import {farmerRequests} from '../../api/requests/farmerRequests';

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
  productionDataChanged: () => void,
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
  const [types] = farmerRequests.useGetProductionTypesOnRender()
  const postProductionDate = farmerRequests.usePostProductionData()
  const putProductionDate = farmerRequests.usePutProductionData()

  const addProductionData = (form: any) => {
    postProductionDate({
      date: form.date.toISOString(),
      amount: form.amount,
      productionType: form.productionType,
    }).then(_ => {
      props.setVisible(false)
      props.productionDataChanged()
    })
  }

  const editProductionData = (form: any) => {
    putProductionDate({
      date: form.date.toISOString(),
      amount: form.amount,
      productionType: form.productionType,
    }, form.id).then(_ => {
      props.setVisible(false)
      props.productionDataChanged()
    })
  }

  return (
    <Modal
      title={strings.FORM.LABEL.MANAGE_PRODUCTION_DATA}
      visible={props.isVisible}
      onOk={props.form.submit}
      onCancel={() => props.setVisible(false)}
      okText={strings.SUBMIT}
    >
      <Form
        {...formItemLayout}
        form={props.form}
        onFinish={props.mode === "add" ? addProductionData : editProductionData}
        name={"addProductionData"}
        scrollToFirstError
      >
        <Form.Item key={"id"} name={"id"} hidden/>
        <Form.Item
          key="productionType" name="productionType" label={strings.FORM.LABEL.TYPE}
          rules={[requiredCheck]}
        >
          <AutoComplete onSearch={() => {
          }}>
            {types?.map(m =>
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