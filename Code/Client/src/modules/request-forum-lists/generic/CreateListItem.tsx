import React from 'react';
import {Form, Input, Modal} from 'antd';
import strings from '../../../values/strings';
import {Rule} from 'antd/lib/form';

interface CreateForumModalProps {
  isVisible: boolean,
  setVisible: (value: boolean) => void,
  title: string;
  onFormSubmit: (formValues: any) => void
}

const CreateListItem = (props: CreateForumModalProps) => {
  const [form] = Form.useForm();

  const requiredCheck: Rule = {
    required: true,
    message: strings.FORM.ERROR.REQUIRED,
  }

  return (
    <Modal
      title={props.title}
      visible={props.isVisible}
      onOk={form.submit}
      onCancel={() => props.setVisible(false)}>
      <Form
        form={form}
        layout={"vertical"}
        onFinish={(formValues) => props.onFormSubmit(formValues)}>
        <Form.Item
          name="topic"
          rules={[requiredCheck]}
        >
          <Input
            placeholder={strings.FORM.LABEL.TOPIC}
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[requiredCheck]}
        >
          <Input.TextArea
            placeholder={strings.FORM.LABEL.DESCRIPTION}
            style={{minHeight: "200px"}}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateListItem;