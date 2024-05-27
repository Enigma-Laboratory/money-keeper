import { BellOutlined } from '@ant-design/icons';
import { Badge, Button } from 'antd';
import { ReactElement } from 'react';
import { StyledUserNotification } from './UserNotification.styles';

export const UserNotification = (): ReactElement => {
  return (
    <StyledUserNotification
      content={
        <div>
          <div>
            <p>Message ...</p>
            <p>Message...</p>
          </div>
        </div>
      }
      title="Title"
      trigger="click"
    >
      <Badge count={1} offset={[0, 5]}>
        <Button shape="circle" icon={<BellOutlined />} style={{ cursor: 'pointer' }} />
      </Badge>
    </StyledUserNotification>
  );
};
