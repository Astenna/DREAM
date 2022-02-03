import React, {useState} from 'react';
import {Form, Modal, Select} from 'antd';
import strings from '../../values/strings';
import {Rule} from 'antd/lib/form';
import {Note} from "../../model/Note";

const {Option} = Select;

interface CreateChangeNoteModalProps {
  isVisible: boolean,
  setVisible: (value: boolean) => void
}

const CreateChangeNoteModal = (props: CreateChangeNoteModalProps) => {
  const [form] = Form.useForm();
  const [note, setNote] = useState<Note | undefined>(undefined);
  const [problemType, setProblemType] = useState<string | undefined>(undefined);

  const requiredCheck: Rule = {
    required: true,
    message: strings.FORM.ERROR.REQUIRED,
  }

  const cancelChangeNoteForm = () =>
    props.setVisible(false)

  //TODO: To read problemTypes from database
  const problemTypes = {
    "ProblemType1": {
      key: "ProblemType1",
      value: "ProblemType1",
    },
    "ProblemType2": {
      key: "ProblemType2",
      value: "ProblemType2",
    },
    "ProblemType3": {
      key: "ProblemType3",
      value: "ProblemType3",
    }
  }

  const notes = {
    "Negative": {
      key: Note.NEGATIVE,
      value: strings.NOTE.NEGATIVE,
      additional_fields: [
        <Form.Item
          name="problemType"
          rules={[requiredCheck]}
        >
          <Select onChange={setProblemType} placeholder={strings.FORM.LABEL.PROBLEM_TYPE}>
            {
              Object.values(problemTypes).map(problemType => <Option key={problemType.key}
                                                                     value={problemType.key}>{problemType.value}</Option>)
            }
          </Select>
        </Form.Item>
      ]
    },
    "Neutral": {
      key: Note.NEUTRAL,
      value: strings.NOTE.NEUTRAL,
      additional_fields: []
    },
    "Positive": {
      key: Note.POSITIVE,
      value: strings.NOTE.POSITIVE,
      additional_fields: []
    },
  }

  //TODO: Add yellow warning about changing note
  return (
    <Modal
      title={strings.CHANGE_NOTE}
      visible={props.isVisible}
      onOk={form.submit}
      onCancel={cancelChangeNoteForm}
      okText={strings.SAVE_CHANGES}
    >
      <Form form={form} layout={"vertical"} onFinish={() => {
      }}> {/*TODO*/}
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