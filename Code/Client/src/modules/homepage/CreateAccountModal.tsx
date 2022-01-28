import React, {useState} from 'react';
import {AutoComplete, Form, Input, Modal, Select} from 'antd';
import strings from '../../values/strings';
import {mandals as allMandals} from '../../values/mandals';
import {Rule} from 'antd/lib/form';
import {useCreateAccount} from '../../hooks/authHooks';
import {CreateAccountForm} from '../../model/CreateAccountForm';
import {Role} from '../../model/Role';

const {Option} = Select;

/**
 * Incoming properties managing visibility of current modal dialog.
 */
interface CreateAccountModalProps {
  isVisible: boolean,
  setVisible: (value: boolean) => void
}

/**
 * Modal dialog responsible for account creation process.
 * Renders fields based on chosen role.
 */
const CreateAccountModal = (props: CreateAccountModalProps) => {
  const [form] = Form.useForm();
  const [mandals, setMandals] = useState(allMandals);
  const [role, setRole] = useState<Role | undefined>(undefined);
  const [createAccount, loading] = useCreateAccount();


  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
    },
  };

  // Rule responsible for checking if required field is filled.
  const requiredCheck: Rule = {
    required: true,
    message: strings.FORM.ERROR.REQUIRED,
  }

  const sendCreateAccountForm =
    (formValues: any) => createAccount(formValues as CreateAccountForm)

  const cancelCreateAccountForm = () =>
    props.setVisible(false)

  // Mandal search for Farmer
  const onMandalSearch = (searchText: string) => {
    setMandals(!searchText ? [] : allMandals.filter(m => m.startsWith(searchText)).sort().slice(0, 5))
  }

  // Object defining specifics of roles - key, role name and (!) additional form items.
  const roles = {
    "farmer": {
      key: "farmer",
      value: strings.ROLE.FARMER,
      additional_fields: [
        <Form.Item
          key="sensorID" name="sensorID" label={strings.FORM.LABEL.SENSOR_SYSTEM_ID}
          rules={[requiredCheck]}
        >
          <Input/>
        </Form.Item>,
        <Form.Item
          key="waterID" name="waterID" label={strings.FORM.LABEL.WATER_IRRIGATION_ID}
          rules={[requiredCheck]}
        >
          <Input/>
        </Form.Item>,
        <Form.Item
          key="address1" name="address1" label={strings.FORM.LABEL.ADDRESS_LINE_1}
          rules={[requiredCheck]}
        >
          <Input/>
        </Form.Item>,
        <Form.Item
          key="address2" name="address2" label={strings.FORM.LABEL.ADDRESS_LINE_2}
          rules={[requiredCheck]}
        >
          <Input/>
        </Form.Item>,
        <Form.Item
          key="city" name="city" label={strings.FORM.LABEL.CITY}
          rules={[requiredCheck]}
        >
          <Input/>
        </Form.Item>,
        <Form.Item
          key="postalCode" name="postalCode" label={strings.FORM.LABEL.POSTAL_CODE}
          rules={[requiredCheck]}
        >
          <Input/>
        </Form.Item>,
        <Form.Item
          key="mandal" name="mandal" label={strings.FORM.LABEL.MANDAL}
          rules={[requiredCheck]}
        >
          <AutoComplete onSearch={onMandalSearch}>
            {mandals.map(m =>
              <Option key={m} value={m}>
                {m}
              </Option>
            )}
          </AutoComplete>
        </Form.Item>,

      ]
    },
    "policy_maker": {
      key: "policy_maker",
      value: strings.ROLE.POLICY_MAKER,
      additional_fields: []
    },
  }

  return (
    <>
      <Modal
        confirmLoading={loading}
        title={strings.CREATE_ACCOUNT}
        visible={props.isVisible}
        onOk={form.submit}
        onCancel={cancelCreateAccountForm}
        okText={strings.SUBMIT}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={sendCreateAccountForm}
          scrollToFirstError
        >
          <Form.Item
            name="name" label={strings.FORM.LABEL.NAME}
            rules={[requiredCheck]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            name="surname" label={strings.FORM.LABEL.SURNAME}
            rules={[requiredCheck]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            name="email" label={strings.FORM.LABEL.EMAIL}
            rules={[{
              type: "email",
              required: true,
              message: strings.FORM.ERROR.EMAIL_INCORRECT_FORMAT,
            }]}
          >
            <Input type={"email"}/>
          </Form.Item>

          <Form.Item
            name="password" label={strings.FORM.LABEL.PASSWORD}
            rules={[requiredCheck, {min: 8, message: strings.FORM.ERROR.PASSWORD_INCORRECT_FORMAT}]}
            hasFeedback
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item
            name="confirm" label={strings.FORM.LABEL.CONFIRM_PASSWORD}
            dependencies={['password']}
            hasFeedback
            rules={[
              requiredCheck,
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(strings.FORM.ERROR.PASSWORD_DO_NOT_MATCH));
                },
              }),
            ]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item
            name="role" label={strings.FORM.LABEL.ROLE}
            rules={[requiredCheck]}
          >
            <Select onChange={setRole}>
              {
                Object.values(roles).map(role => <Option key={role.key} value={role.key}>{role.value}</Option>)
              }
            </Select>
          </Form.Item>

          {/* Insert role dependent form components here.*/}
          {
            role !== undefined && roles[role]?.additional_fields
          }

        </Form>
      </Modal>
    </>
  )
    ;
};

export default CreateAccountModal;