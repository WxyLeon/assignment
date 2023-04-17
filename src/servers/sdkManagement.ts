import { v4 as uuidv4 } from 'uuid';

interface DataType {
	id?: string;
	clientName: string;
	boardName: string;
	tags: string[];
	requestor: string;
	script: string;
}

function getLocalData(): DataType[] {
	const data = localStorage.getItem('SDK_MOCK_DATA');
	return JSON.parse(data) || [];
}

function setLocalData(data: DataType[]) {
	localStorage.setItem('SDK_MOCK_DATA', JSON.stringify(data));
}

/**
 * 获取数据
 */
export function getSDKData() {
	return new Promise<DataType[]>(resolve => {
		const data = getLocalData();
		resolve(data);
	});
}

/**
 * 新增数据
 */
export function addSDKData(data: DataType) {
	return new Promise(resolve => {
		const localData = getLocalData();
		localData.push({ ...data, id: uuidv4(), script: 'http://baidu.com' });
		setLocalData(localData);
		resolve({ message: 'success' });
	});
}

/**
 * 根据ID获取对应数据
 */
export function getSDKDataById(id: string) {
	return new Promise(resolve => {
		const localData = getLocalData();
		const data = localData.find(item => item.id === id);
		resolve({ message: 'success', data });
	});
}

/**
 * 根据ID编辑对应数据
 */
export function editSDKDataById(id: string, data: DataType) {
	return new Promise(resolve => {
		const localData = getLocalData();
		const newData = localData.map(item => {
			if (item.id === id) {
				return { ...item, ...data };
			}
			return item;
		});
		setLocalData(newData);
		resolve({ message: 'success' });
	});
}

/**
 * 根据ID删除对应数据
 */
export function deleteSDKDataById(id: string) {
	return new Promise(resolve => {
		const localData = getLocalData();
		const newData = localData.filter(item => item.id !== id);
		setLocalData(newData);
		resolve({ message: 'success' });
	});
}
