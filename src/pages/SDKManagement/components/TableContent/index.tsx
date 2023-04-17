import React, { ReactNode, useEffect, useState } from 'react';
import { Popconfirm, Space, Table, Tag, Modal } from 'antd';
import Icon from '@ant-design/icons';
import EditSvg from '@/assets/ESM@iconset_Edit.svg';
import DeleteSvg from '@/assets/ESM@iconset_Delete.svg';
import type { ColumnsType } from 'antd/es/table';
import type { DataType } from '../../index';
import ModalForm from '../ModalForm';
import styles from './index.module.less';
import { escapeSpecialCharacter } from '@/utils/format';

interface IProps {
	data: DataType[];
	loading: boolean;
	deleteDataFn: (id: string) => void;
	editDataFn: (id: string, data: DataType) => void;
	keyword: string;
}

export default function TableContent({
	data = [],
	loading,
	editDataFn,
	deleteDataFn,
	keyword,
}: IProps) {
	const [filteredData, setFilteredData] = useState([]);

	// 检测数据里是否包含关键字
	const matchValueFn = (value: string) => {
		return value?.toLowerCase().indexOf(keyword) !== -1;
	};

	// 关键字高亮
	const textHighlightFn = (text: string): ReactNode | string => {
		if (keyword && matchValueFn(text)) {
			const splitArr = text.split(new RegExp(escapeSpecialCharacter(keyword), 'ig'));
			return splitArr
				.flatMap((str, i) => {
					const startIndex = splitArr.slice(0, i).join('').length + keyword.length * (i - 1);
					return [
						<span style={{ color: 'red' }} key={keyword + i}>
							{text.slice(startIndex, startIndex + keyword.length)}
						</span>,
						str,
					];
				})
				.slice(1);
		}
		return text;
	};

	const columns: ColumnsType<DataType> = [
		{
			title: 'Client name',
			dataIndex: 'clientName',
			key: 'clientName',
			render: text => {
				return textHighlightFn(text);
			},
		},
		{
			title: 'Board name',
			dataIndex: 'boardName',
			key: 'boardName',
			render: text => {
				return textHighlightFn(text);
			},
		},
		{
			title: 'Tags',
			dataIndex: 'tags',
			key: 'tags',
			render: (_, { tags }) => (
				<>
					{tags.map(tag => {
						return (
							<Tag color={'grey'} key={tag}>
								{textHighlightFn(tag)}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			title: 'Requestor',
			key: 'requestor',
			dataIndex: 'requestor',
			render: text => {
				return textHighlightFn(text);
			},
		},
		{
			title: 'SDK script',
			dataIndex: 'script',
			key: 'script',
			render: text => (
				<a target="_blank" rel="noreferrer" href={text}>
					{'</> SDK'}
				</a>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => {
				const { id } = record;

				return (
					<Space size="middle" style={{ fontSize: 20 }}>
						<Icon
							component={EditSvg}
							onClick={() => {
								const temp = {
									destroy: function () {
										// 默认的弹窗销毁函数
									},
								};
								const { destroy } = Modal.confirm({
									content: (
										<ModalForm
											finishFn={(data: DataType) => {
												editDataFn(id, data);
												temp.destroy();
											}}
											cancelFn={() => {
												temp.destroy();
											}}
											initData={record}
										/>
									),
									className: styles.modal,
									icon: null,
									footer: null,
									width: 700,
									closable: true,
									title: 'Update SDK',
								});

								temp.destroy = destroy;
							}}
						/>
						<Popconfirm
							title="Are you sure you want to delete this data?"
							onConfirm={() => deleteDataFn(id)}>
							<Icon component={DeleteSvg} />
						</Popconfirm>
					</Space>
				);
			},
		},
	];

	useEffect(() => {
		// 如果搜索关键字为空字符串，则显示所有数据
		if (keyword === '') {
			setFilteredData(data);
			return;
		}

		const filterData = data.filter(item => {
			const { clientName, boardName, tags, requestor } = item;
			if (
				matchValueFn(clientName) ||
				matchValueFn(boardName) ||
				matchValueFn(requestor) ||
				tags.some(matchValueFn)
			) {
				return true;
			}
			return false;
		});

		setFilteredData(filterData);
	}, [data, keyword]);

	return (
		<Table
			loading={loading}
			rowKey={'id'}
			size="middle"
			columns={columns}
			dataSource={filteredData}
		/>
	);
}
