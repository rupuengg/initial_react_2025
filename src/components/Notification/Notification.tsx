import { faCheck, faExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { E_Notification_Type } from 'enums';
import { GlobalActions, IApplicationState, IUseDispatch, useAppDispatch } from 'store';
import { FontIcon } from 'components/Icon';

const NOTIFICATION_INITIAL_TIME = 20;

export const Notification = () => {
  const { notification } = useSelector((state: IApplicationState) => state.global);
  const dispatch: IUseDispatch = useAppDispatch();
  const [time, setTime] = useState(NOTIFICATION_INITIAL_TIME);

  const handleClearNotification = useCallback(
    (interval?: any) => {
      dispatch(GlobalActions.clearNotification());
      interval && clearInterval(interval);
    },
    [dispatch]
  );

  useEffect(() => setTime(NOTIFICATION_INITIAL_TIME), [notification.notificationMessage, notification.notificationType]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (time > 0) {
        setTime(prevState => prevState - 1);
      } else {
        handleClearNotification(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [time, handleClearNotification]);

  if (!notification.isShowNotification) return null;

  return (
    <div className='notification'>
      <div>
        <div>
          {notification.notificationType === E_Notification_Type.SUCCESS && <FontIcon color='#bb8f71' isDisabled={false} icon={faCheck} />}
          {notification.notificationType === E_Notification_Type.ALERT && <FontIcon isDisabled={false} color='#ff4633' icon={faExclamation} />}
          <span className='message'>{notification.notificationMessage}</span>
        </div>

        <div>
          <Link to='' onClick={() => handleClearNotification()}>
            <FontIcon icon={faXmark} color='#bb8f71' isDisabled={false} />
          </Link>
        </div>
      </div>
    </div>
  );
};
