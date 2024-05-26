import { MenuFoldOutlined, MenuUnfoldOutlined, MessageFilled } from '@ant-design/icons';
import { User } from '@enigma-laboratory/shared';
import { Avatar, Badge, Button, Flex, Popover, Radio, Space, Typography, theme } from 'antd';
import { Languages, Mode, useConfigProvider } from 'context';
import { useLocalStorage } from 'hooks';
import { useTranslation } from 'react-i18next';
import { USER_IDENTITY, generateColorFromAlphabet } from 'utils';
import { BaseSearch } from '../BaseSearch';
import { HeaderLayoutStyled } from './Header.styles';
type HeaderLayoutProps = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

export const HeaderLayout = ({ collapsed, toggleCollapsed }: HeaderLayoutProps) => {
  const [user] = useLocalStorage<Pick<User, 'name'>>(USER_IDENTITY, { name: '' });

  const { mode, setMode, locate, setLocate } = useConfigProvider();

  const { t } = useTranslation('common');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const firstInitialName = user.name.charAt(0).toUpperCase();

  return (
    <HeaderLayoutStyled style={{ background: colorBgContainer }}>
      <Button type="text" onClick={toggleCollapsed} style={{ marginBottom: 0 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
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
              <Avatar shape="circle" size="default" icon={<MessageFilled />} style={{ cursor: 'pointer' }} />
            </Badge>
          </Popover>

          <Badge>
            <Avatar
              shape="circle"
              size="default"
              style={{ background: `${generateColorFromAlphabet(firstInitialName)}` }}
            >
              {firstInitialName}
            </Avatar>
          </Badge>
          <div className="info">
            <Popover
              content={
                <Space direction="vertical" style={{ width: 300 }}>
                  <Flex justify="space-between" align="center" gap={10}>
                    <Typography.Text>{t('language.title')} </Typography.Text>
                    <Radio.Group
                      optionType="button"
                      options={Object.values(Languages).map((value) => {
                        return { value, label: t(`language.${value}`) };
                      })}
                      onChange={(e) => setLocate(e.target.value)}
                      value={locate}
                    />
                  </Flex>
                  <Flex justify="space-between" align="center" gap={10}>
                    <Typography.Text>{t('mode.title')} </Typography.Text>
                    <Radio.Group
                      optionType="button"
                      options={Object.values(Mode).map((value) => {
                        return { value, label: t(`mode.${value}`) };
                      })}
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                    />
                  </Flex>
                </Space>
              }
              title={t('settings')}
              trigger="click"
            >
              <p
                style={{
                  width: '100px',
                  margin: 0,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                {user?.name}
              </p>
            </Popover>
            <p style={{ width: '100px', margin: 0 }}>admin</p>
          </div>
        </Space>
      </div>
    </HeaderLayoutStyled>
  );
};
