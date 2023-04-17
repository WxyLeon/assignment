import React, { useState } from 'react';
import { Button, Input, Modal, Space, Typography, message } from 'antd';
import styles from './index.module.less';
import AddSvg from '@/assets/ESM@iconset_New.svg';
import SearchSvg from '@/assets/ESM@iconset_Search.svg';
import Icon from '@ant-design/icons';
import TableContent from './components/TableContent';
import ModalForm from './components/ModalForm';
import {
	addSDKData,
	deleteSDKDataById,
	editSDKDataById,
	getSDKData,
} from '@/servers/sdkManagement';
import { useDebounceFn, useRequest } from 'ahooks';
const { Title } = Typography;

export interface DataType {
	id?: string;
	clientName: string;
	boardName: string;
	tags: string[];
	requestor: string;
	script: string;
}

function SDKManagement() {
	const [searchKey, setSearchKey] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const hideModal = () => {
		setIsModalOpen(false);
	};

	// 获取SDK数据列表
	const sdkDataResult = useRequest<DataType[], undefined[]>(getSDKData);

	// 新增SDK数据 添加
	const onFinish = async (value: DataType) => {
		try {
			await addSDKData(value);
			message.success('Created successfully!');
			hideModal();
			sdkDataResult.refresh();
		} catch (err) {
			message.error('Creation failed!');
			console.log(err);
		}
	};

	// 删除SDK数据
	const deleteDataHandle = async (id: string) => {
		try {
			await deleteSDKDataById(id);
			message.success('Delete successfully!');
			sdkDataResult.refresh();
		} catch (err) {
			message.error('Delete failed!');
			console.log(err);
		}
	};

	// 编辑SDK数据
	const editDataHandle = async (id: string, data: DataType) => {
		try {
			await editSDKDataById(id, data);
			message.success('Edit successfully!');
			sdkDataResult.refresh();
		} catch (err) {
			message.error('Edit failed!');
			console.log(err);
		}
	};

	const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value || '';
		setSearchKey(value.toLowerCase());
	};

	const { run: debouncedSearchHandle } = useDebounceFn(searchHandle, {
		wait: 100,
    leading: true,
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Title level={5}>SDK Management</Title>
				<Space>
					<Input
						onChange={debouncedSearchHandle}
						style={{ width: 320 }}
						placeholder="Search client name, board name, tags, requestor"
            prefix={<Icon style={{fontSize: 22}} component={SearchSvg} />}
					/>
					<Button
						type="primary"
						onClick={showModal}
						icon={<Icon className={styles.addButton} component={AddSvg} />}>
						CreateSDK
					</Button>
				</Space>
			</div>
			<TableContent
				keyword={searchKey}
				deleteDataFn={deleteDataHandle}
				editDataFn={editDataHandle}
				loading={sdkDataResult.loading}
				data={sdkDataResult.data}
			/>
			<Modal
				onCancel={hideModal}
				width={700}
				title="Create SDK"
				open={isModalOpen}
				destroyOnClose
				footer={null}>
				<ModalForm<DataType> cancelFn={hideModal} finishFn={onFinish} />
			</Modal>
		</div>
	);
}

export default SDKManagement;
