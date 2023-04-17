import React, { lazy, ReactNode, Suspense } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';

// 用懒加载实现优化
const SDKManagement = lazy(() => import('@/pages/SDKManagement'));

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode => {
	return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
};

export const routers: RouteObject[] = [
	{
		path: '/',
		element: <AppLayout />,
		children: [
      {
        index: true,
        element: <Navigate to="/sdk-management" replace />
      },
			{
				path: '/sdk-management',
				element: lazyLoad(<SDKManagement />),
			},
		],
	},
];
