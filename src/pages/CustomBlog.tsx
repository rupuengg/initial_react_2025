import { DefaultLayout } from 'layouts';
import { defaultEntityStatusDataEntity } from 'mock';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { IBlogEntity, IEntityStatusDataEntity } from 'entities';
import { E_Data_Load_Status } from 'enums';
import { ApiPath, IApplicationState, IUseDispatch, getBlogList, useAppDispatch } from 'store';

export interface ICustomBlog {
  isShowSingle?: boolean;
}

export const CustomBlog: React.FC<ICustomBlog> = ({ isShowSingle = false }) => {
  const { blogs } = useSelector((state: IApplicationState) => state.global);
  const dispatch: IUseDispatch = useAppDispatch();
  const startRef = useRef<IEntityStatusDataEntity>(defaultEntityStatusDataEntity);
  const navigate = useNavigate();
  const params = useParams();

  const blog = useMemo(() => {
    if (params.id && blogs) {
      return blogs.find(b => b.route?.toString() === params.id?.toString());
    }
    return null;
  }, [params.id, blogs]);

  useEffect(() => {
    if (startRef.current.blogs === E_Data_Load_Status.NOT_YET_STARTED) {
      startRef.current = { ...startRef.current, blogs: E_Data_Load_Status.PENDING };
      dispatch(getBlogList(ApiPath.PATH.BLOG_LIST.toString()));
    }
  }, [dispatch]);

  const handleClick = useCallback(
    (blog: IBlogEntity) => {
      navigate('/blog/' + blog.route);
    },
    [navigate]
  );

  return (
    <DefaultLayout>
      <div className='siteCssWidth1200'>
        <div className='blog-preview marginTop50 marginBottom100'>
          <div className='inner'>
            {isShowSingle && blog && (
              <>
                <div className='header'>
                  <NavLink to={'/blog'} title='Back'>
                    Back
                  </NavLink>
                  <h1 id='/blog' className='header1'>
                    <span>{blog.title}</span>
                  </h1>
                </div>

                {blog.description && <div dangerouslySetInnerHTML={{ __html: blog.description }}></div>}
              </>
            )}

            {!isShowSingle && (
              <>
                <h1 id='/blog' className='header1'>
                  Blogs
                </h1>

                <ul>
                  {blogs?.map(blog => (
                    <li key={blog.id} onClick={() => handleClick(blog)}>
                      <h2 className='header2'>{blog.title}</h2>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
