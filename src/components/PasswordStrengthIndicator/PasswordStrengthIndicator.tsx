import { CheckCircleTwoTone } from '@ant-design/icons';
import { Flex, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { checkPasswordStrength } from 'utils';

type PasswordStrengthIndicatorProps = {
  password: string;
};

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const { token } = theme.useToken();
  const strength = checkPasswordStrength(password);
  const { t } = useTranslation('auth', { keyPrefix: 'register' });

  const criteria = [
    { label: t('passwordStrength.minLength'), valid: strength.minLength },
    { label: t('passwordStrength.hasUppercase'), valid: strength.hasUppercase },
    { label: t('passwordStrength.hasLowercase'), valid: strength.hasLowercase },
  ];

  return (
    <Flex wrap="wrap" gap={10} style={{ marginBottom: 10 }}>
      {criteria.map((criterion, index) => (
        <Flex key={index}>
          {criterion.valid ? (
            <CheckCircleTwoTone twoToneColor={token.green} />
          ) : (
            <CheckCircleTwoTone twoToneColor={token.colorBorder} />
          )}
          <span
            style={{
              marginLeft: '5px',
              fontSize: 12,
              color: criterion.valid ? token.green7 : token.colorTextPlaceholder,
            }}
          >
            {criterion.label}
          </span>
        </Flex>
      ))}
    </Flex>
  );
};
