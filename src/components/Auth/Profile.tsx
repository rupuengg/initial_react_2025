import { ReadOnlyField } from 'forms';
import { DashboardLayout } from 'layouts';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'store';

export const Profile = () => {
  const { authProfile } = useSelector((state: IApplicationState) => state.global);

  return (
    <DashboardLayout>
      <h1 className='header1'>My Profile</h1>
      <div className='form-layouts'>
        <ReadOnlyField fieldName='firstName' fieldLabel='Firstname' fieldValue={authProfile?.firstName} />
        <ReadOnlyField fieldName='lastName' fieldLabel='Lastname' fieldValue={authProfile?.lastName} />
        <ReadOnlyField fieldName='email' fieldLabel='Email' fieldValue={authProfile?.email} />
        <ReadOnlyField fieldName='username' fieldLabel='Username' fieldValue={authProfile?.username} />
      </div>
    </DashboardLayout>
  );
};
