import { CreateUserParams } from '@enigma-laboratory/shared';
import { Button, Form, Input, Typography, theme } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PasswordStrengthIndicator } from 'components';
import { AlertModalPayload } from 'interfaces';
import { Link } from 'react-router-dom';
import { NavigateService } from 'services';
import { AuthService } from 'stores';
import { EVENT_NAME, EventAction, checkPasswordStrength } from 'utils';

export const RegisterPage: React.FC = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation('auth');
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const handleOnRegisterUser = async ({ name, email, password }: CreateUserParams): Promise<void> => {
    const strength = checkPasswordStrength(password);
    if (!strength.minLength || !strength.hasUppercase || !strength.hasLowercase) {
      form.setFields([{ name: 'password', errors: [t('register.validation.passwordWeak')] }]);
      return;
    }

    setIsLoading(true);

    const { success, error } = await AuthService.instance.register({ name, email, password });
    if (success) {
      EventAction.dispatch<AlertModalPayload>(EVENT_NAME.OPEN_MODAL, {
        data: { type: 'success', content: t('register.message.success'), subContent: t('register.message.subSuccess') },
      });
      NavigateService.instance.navigate('/login');
    } else {
      if (error?.message === 'Email already exists.') {
        form.setFields([{ name: 'email', errors: [t('register.validation.emailExist')] }]);
      } else {
        EventAction.dispatch<AlertModalPayload>(EVENT_NAME.OPEN_MODAL, {
          data: { type: 'error', content: t('register.message.failure') },
        });
      }
    }
    setIsLoading(false);
  };
  return (
    <Form layout="vertical" form={form} onFinish={handleOnRegisterUser} requiredMark={false}>
      <Form.Item
        name="email"
        label={'Email'}
        rules={[
          { required: true, message: t('register.validation.emailEmpty') },
          {
            type: 'email',
            message: t('register.validation.emailInvalidFormat'),
          },
        ]}
      >
        <Input size="large" placeholder={t('register.placeholder.email')} />
      </Form.Item>

      <Form.Item
        name="name"
        label={t('register.name')}
        rules={[{ required: true, message: t('register.validation.nameEmpty') }]}
      >
        <Input placeholder={t('register.placeholder.name')} size="large" />
      </Form.Item>

      <Form.Item
        name="password"
        label={t('register.password')}
        rules={[{ required: true, message: t('register.validation.passwordEmpty') }]}
      >
        <Input.Password
          placeholder={t('register.placeholder.password')}
          size="large"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <PasswordStrengthIndicator password={password} />

      <Form.Item
        label={t('register.confirmPassword')}
        name="confirmPassword"
        rules={[
          { required: true, message: t('register.validation.confirmPasswordEmpty') },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t('register.validation.confirmPasswordDontMatch')));
            },
          }),
        ]}
      >
        <Input.Password size="large" placeholder={t('register.placeholder.confirmPassword')} />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, marginTop: 60 }}>
        <Button type="primary" size="large" htmlType="submit" block loading={isLoading}>
          {t('register.submitBtn')}
        </Button>
      </Form.Item>
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <Typography.Text style={{ fontSize: 12 }}>
          {t('register.hasAccount')}
          <Link to="/login" style={{ fontWeight: 'bold', color: token.colorPrimaryText }}>
            {t('register.signIn')}
          </Link>
        </Typography.Text>
      </div>
    </Form>
  );
};
