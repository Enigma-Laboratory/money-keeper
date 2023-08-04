import { BaseSearch } from '../BaseSearch';
import { Avatar, Badge, Popover, Space } from 'antd';
import { UserOutlined, MessageOutlined } from '@ant-design/icons';
import { HeaderLayoutStyled } from './Header.styles';
export const HeaderLayout = () => {
  return (
    <HeaderLayoutStyled>
      <div className="logo">
        <p className="title">Money Keeper</p>
        <p className="created-by"> by VietNam Team</p>
      </div>

      <BaseSearch placeholder="Searching for everything" />
      <div className="container-notify">
        <Space size={24}>
          <Popover
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
              <Avatar shape="circle" size="large" icon={<MessageOutlined />} style={{ cursor: 'pointer' }} />
            </Badge>
          </Popover>

          <Badge>
            <Avatar shape="circle" size="large" icon={<UserOutlined />} />
          </Badge>
          <div className="info">
            <Popover
              content={
                <div>
                  <div>
                    <p>Le Tu Tuan</p>
                    <p>UIT</p>
                  </div>
                </div>
              }
              title="Title"
              trigger="hover"
            >
              <p
                style={{
                  width: '100px',
                  margin: 0,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Le Tu Tuan
              </p>
            </Popover>
            <p style={{ width: '100px', margin: 0 }}>admin</p>
          </div>
        </Space>
      </div>
    </HeaderLayoutStyled>
  );
};
