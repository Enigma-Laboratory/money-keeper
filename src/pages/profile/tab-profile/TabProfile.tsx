import { Button, Form, FormProps, Input } from 'antd';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AlertModalPayload } from 'interfaces';
import { AuthService, UsersService } from 'stores';
import { EVENT_NAME, EventAction } from 'utils';

import { StyledCard } from './TabProfile.styles';

export type FieldType = {
  currentPassword?: string;
  password?: string;
  passwordConfirm?: string;
};

export const TabProfile = () => {
  const { t } = useTranslation('profile');
  const [activeTabKey, setActiveTabKey] = useState<string>('passwordTab');
  const user = AuthService.instance.getAuth();

  const tabList = [
    {
      key: 'passwordTab',
      tab: t('password'),
    },
    {
      key: 'notification',
      tab: t('notifications'),
    },
  ];

  const onFinish: FormProps<FieldType>['onFinish'] = async (value: FieldType) => {
    try {
      await UsersService.instance.updateOneUser({ password: value.password, email: user.email });

      EventAction.dispatch<AlertModalPayload>(EVENT_NAME.OPEN_MODAL, {
        data: { type: 'info', content: t('message.changePasswordSuccess') },
      });
    } catch (error) {
      EventAction.dispatch<AlertModalPayload>(EVENT_NAME.OPEN_MODAL, {
        data: { type: 'warning', content: t('message.changePasswordFail') },
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  const PasswordTab = (): React.ReactElement => {
    return (
      <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} style={{ width: 300 }}>
        {/* <Form.Item<FieldType>
          label={t('currentPassword')}
          name="currentPassword"
          rules={[{ required: true, message: t('validation.passwordInput') }]}
        >
          <Input.Password />
        </Form.Item> */}
        <Form.Item<FieldType>
          label={t('password')}
          name="password"
          rules={[{ required: true, message: t('validation.passwordInput') }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label={t('passwordConfirm')}
          name="passwordConfirm"
          rules={[
            { required: true, message: t('validation.passwordConfirmInput') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('validation.passwordConfirmInputDontMatch')));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" block style={{ marginTop: 40 }} htmlType="submit">
          {t('changePassword')}
        </Button>
      </Form>
    );
  };

  const contentList: Record<string, ReactNode> = {
    passwordTab: <PasswordTab />,
    notification: <div>Notifications</div>,
  };

  const changeTab = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <StyledCard activeTabKey={activeTabKey} tabList={tabList} onTabChange={changeTab}>
      {contentList[activeTabKey]}
    </StyledCard>
  );
};
