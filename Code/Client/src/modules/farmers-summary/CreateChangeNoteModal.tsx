import React, {useState} from 'react';
import {Form, Modal, notification, Select} from 'antd';
import strings from '../../values/strings';
import {Rule} from 'antd/lib/form';
import {Note} from "../../model/Note";
import {problemTypeRequests} from '../../api/requests/problemTypeRequests';
import {farmerRequests} from '../../api/requests/farmerRequests';
import {PostFarmerNoteRequest} from '../../model/api/PostFarmerNote';

const {Option} = Select;

interface CreateChangeNoteModalProps {
  isVisible: boolean,
  setVisible: (value: boolean) => void,
  farmerID: number | undefined,
  noteChangedCB: () => void,
}

const CreateChangeNoteModal = (props: CreateChangeNoteModalProps) => {
  const [form] = Form.useForm();
  const [note, setNote] = useState<Note | undefined>(undefined);
  const [allProblemTypes] = problemTypeRequests.useGetProblemTypesOnRender()
  const postFarmerNote = farmerRequests.usePostFarmerNote()

  const requiredCheck: Rule = {
    required: true,
    message: strings.FORM.ERROR.REQUIRED,
  }

  const sendNoteForm = (form: any) => {
    if (props.farmerID != null) {
      postFarmerNote(form as PostFarmerNoteRequest, props.farmerID)
        .then(_ => {
          props.setVisible(false)
          notification['info']({message: strings.INFO.NOTE_SAVED})
          props.noteChangedCB()
        })
    }
  }

  const cancelChangeNoteForm = () => {
    props.setVisible(false)
  }

  const notes = {
    "Negative": {
      key: "Negative",
      value: "Negative",
      additional_fields: [
        <Form.Item
          name="problemTypeName"
          rules={[requiredCheck]}
        >
          <Select placeholder={strings.FORM.LABEL.PROBLEM_TYPE}>
            {
              allProblemTypes?.map(problemType =>
                <Option
                  key={problemType}
                  value={problemType}
                >
                  {problemType}
                </Option>
              )
            }
          </Select>
        </Form.Item>
      ]
    },
    "Neutral": {
      key: "Neutral",
      value: "Neutral",
      additional_fields: []
    },
    "Positive": {
      key: "Positive",
      value: "Positive",
      additional_fields: []
    },
  }

  return (
    <Modal
      title={strings.CHANGE_NOTE}
      visible={props.isVisible}
      onOk={form.submit}
      onCancel={cancelChangeNoteForm}
      okText={strings.SAVE_CHANGES}
    >
      <Form form={form} layout={"vertical"} onFinish={sendNoteForm}>
        <Form.Item
          name="note"
          rules={[requiredCheck]}
        >
          <Select onChange={setNote} placeholder={strings.FORM.LABEL.NOTE}>
            {
              Object.values(notes).map(note => <Option key={note.key} value={note.key}>{note.value}</Option>)
            }
          </Select>
        </Form.Item>

        {
          note !== undefined && notes[note]?.additional_fields
        }

      </Form>
    </Modal>
  );
};

export default CreateChangeNoteModal;