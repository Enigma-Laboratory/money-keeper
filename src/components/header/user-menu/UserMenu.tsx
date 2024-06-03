import { DownOutlined, EyeOutlined, LogoutOutlined, SettingOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { User } from '@enigma-laboratory/shared';
import { Avatar, Button, Divider, Dropdown, Flex, Popover, Space, Typography } from 'antd';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { IconMoon, IconSun } from 'assets/icons';
import { Languages, Mode, useConfigProvider } from 'contexts';
import i18n from 'contexts/config-provider/i18n';
import { LANGUAGE, generateColorFromAlphabet } from 'utils';

import { StyledUserMenu, StyledWrap } from './UserMenu.styles';

type UserMenuProps = {
  user: Partial<User>;
};

export const UserMenu = ({ user }: UserMenuProps): ReactElement => {
  const { mode, setMode } = useConfigProvider();

  const { t } = useTranslation('common');

  const firstInitialName = user?.name?.[0]?.toUpperCase() || 'unknown';

  const content = (
    <Space direction="vertical">
      <StyledWrap style={{ width: 270 }}>
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

        <Divider style={{ margin: '16px 0 16px' }} />

        <Flex justify="space-between" align="center" gap={10}>
          <Button type="link">
            <SettingOutlined />
            <Typography.Text> {t('language.title')} </Typography.Text>
          </Button>

          <Dropdown
            menu={{
              items: Object.values(Languages).map((key) => ({
                label: key === Languages.EN ? LANGUAGE.EN : LANGUAGE.VI,
                key,
              })),
              selectable: true,
              defaultSelectedKeys: [i18n.language],
              onClick: (e) => i18n.changeLanguage(e.key as Languages),
            }}
          >
            <Space>
              {t`language.lang`}
              <Button type="text" icon={<DownOutlined />} />
            </Space>
          </Dropdown>
        </Flex>

        <Flex justify="space-between" align="center" gap={10}>
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

        <Flex justify="space-between" align="center" gap={10}>
          <Button type="link">
            <LogoutOutlined />
            <Typography.Text> {t('sidebar.logout')} </Typography.Text>
          </Button>
        </Flex>
      </StyledWrap>
    </Space>
  );

  return (
    <StyledUserMenu>
      <Popover content={content} trigger="click" placement="bottomRight">
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
