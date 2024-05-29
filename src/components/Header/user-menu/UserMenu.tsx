import { DownOutlined, EyeOutlined, LogoutOutlined, SettingOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { User } from '@enigma-laboratory/shared';
import { Avatar, Button, Divider, Dropdown, Flex, Popover, Space, Typography } from 'antd';
import { IconMoon, IconSun } from 'assets/icons';
import { Languages, Mode, useConfigProvider } from 'contexts';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { generateColorFromAlphabet } from 'utils';
import { StyledUserMenu } from './UserMenu.styles';

type UserMenuProps = {
  user: Partial<User>;
};

export const UserMenu = ({ user }: UserMenuProps): ReactElement => {
  const { mode, setMode, locate, setLocate } = useConfigProvider();

  const { t } = useTranslation('common');

  const firstInitialName = user?.name?.[0]?.toUpperCase() || 'unknown';

  return (
    <StyledUserMenu>
      <Popover
        content={
          <Space direction="vertical">
            <div style={{ width: 270, padding: 16 }}>
              <Flex gap={10} justify="space-between">
                <Space>
                  <Avatar
                    shape="circle"
                    size="default"
                    style={{ background: `${generateColorFromAlphabet(firstInitialName)}` }}
                  >
                    {firstInitialName}
                  </Avatar>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    {user.name}
                  </Typography.Title>
                </Space>

                <Space>
                  <UserSwitchOutlined />
                  Admin
                </Space>
              </Flex>

              <Divider />

              <Flex justify="space-between" align="center" gap={10} style={{ marginBottom: 5 }}>
                <Button type="link">
                  <SettingOutlined />
                  <Typography.Text> {t('language.title')} </Typography.Text>
                </Button>

                <Dropdown
                  menu={{
                    items: Object.values(Languages).map((key) => ({ label: t(`language.${key}`), key })),
                    selectable: true,
                    defaultSelectedKeys: [locate],
                    onClick: (e) => setLocate(e.key as Languages),
                  }}
                >
                  <Space>
                    {t(`language.${locate}`)}
                    <Button type="text" icon={<DownOutlined />} />
                  </Space>
                </Dropdown>
              </Flex>

              <Flex justify="space-between" align="center" gap={10} style={{ marginBottom: 5 }}>
                <Button type="link">
                  <EyeOutlined />
                  <Typography.Text>{t('mode.title')} </Typography.Text>
                </Button>

                <Space>
                  <Typography.Text> {t(`mode.${mode}`)}</Typography.Text>
                  <Button
                    shape="circle"
                    type="text"
                    icon={mode === Mode.LIGHT ? <IconMoon /> : <IconSun />}
                    onClick={() => {
                      setMode(mode === Mode.LIGHT ? Mode.DARK : Mode.LIGHT);
                    }}
                  />
                </Space>
              </Flex>

              <Flex justify="space-between" align="center" gap={10} style={{ marginBottom: 5 }}>
                <Button type="link">
                  <LogoutOutlined />
                  <Typography.Text> {t('sidebar.logout')} </Typography.Text>
                </Button>
              </Flex>
            </div>
          </Space>
        }
        trigger="click"
      >
        <Space>
          <Avatar
            shape="circle"
            size="default"
            style={{ background: `${generateColorFromAlphabet(firstInitialName)}`, cursor: 'pointer' }}
          >
            {firstInitialName}
          </Avatar>
        </Space>
      </Popover>
    </StyledUserMenu>
  );
};