import React from 'react';
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
interface IProps<T> {
	finishFn: (data: T) => void;
	cancelFn: () => void;
	initData?: T;
}

export default function ModalForm<T>({ finishFn, cancelFn, initData }: IProps<T>) {
	return (
		<Form
			name="basic"
			layout="vertical"
      initialValues={initData}
			onFinish={finishFn}
			autoComplete="off">
			<Form.Item
				label="Client name"
				name="clientName"
				rules={[{ required: true, message: 'Please input client name!' }]}>
				<Input />
			</Form.Item>
			<Form.Item
				label="Board name"
				name="boardName"
				rules={[{ required: true, message: 'Please input board name!' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="Tags" name="tags">
				<Select mode="tags">
					<Option value="Story">Story</Option>
					<Option value="Onescr">Onescr</Option>
				</Select>
			</Form.Item>
			<Form.Item
				label="Requestor"
				name="requestor"
				rules={[{ required: true, message: 'Please input requestor!' }]}>
				<Input />
			</Form.Item>
			<Form.Item style={{ textAlign: 'right' }}>
				<Button type="link" onClick={cancelFn}>
					Cancel
				</Button>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}
