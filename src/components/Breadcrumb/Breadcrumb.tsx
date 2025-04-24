import React from 'react';
import { Link } from 'react-router-dom';

export interface IBreadcrumbData {
  title: string;
}

export interface IBreadcrumb {
  data: IBreadcrumbData[];
}

export const Breadcrumb: React.FC<IBreadcrumb> = ({ data }) => {
  return (
    <div className='breadcrub'>
      {data &&
        data.map(item => (
          <span key={item.title}>
            <Link to={''}>{item.title}</Link>
          </span>
        ))}
    </div>
  );
};
