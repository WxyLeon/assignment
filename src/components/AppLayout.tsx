import React, { useEffect, useState } from 'react';
import { matchRoutes, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import Icon from '@ant-design/icons';
import ProfileSvg from '@/assets/ICON2_API.svg';
import { routers } from '../routes';
const { Sider, Content } = Layout;

export default function AppLayout() {
	const navigate = useNavigate();
	const location = useLocation();
	const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
	const [isInit, setIsInit] = useState<boolean>(false);

	useEffect(() => {
		// 返回匹配到的路由数组对象，每一个对象都是一个路由对象
		const routes = matchRoutes(routers, location.pathname);
		const pathArr: string[] = [];
		if (routes !== null) {
			routes.forEach(item => {
				const path = item.route.path;
				if (path) {
					pathArr.push(path);
				}
			});
		}
		setSelectedKeys(pathArr);
		setIsInit(true);
	}, [location.pathname]);

	if (!isInit) {
		return null;
	}

	const items: MenuProps['items'] = [
		{
			key: '/sdk-management',
			icon: <Icon style={{ fontSize: 20 }} component={ProfileSvg} />,
			label: `SDK Management`,
		},
	];

	const onClick: MenuProps['onClick'] = ({ key }) => {
		navigate(key);
	};

	return (
		<Layout style={{ height: '100%' }}>
			{/* <Header /> */}
			<Layout>
				<Sider theme="light">
					<Menu selectedKeys={selectedKeys} items={items} onClick={onClick} />
				</Sider>
				<Content>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
}
