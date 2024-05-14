import { User } from '@enigma-laboratory/shared';
import { Avatar, Button, Card, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { convertToTitleCase, generateColorFromAlphabet } from 'utils';

interface InfoProfileProps {
  data: {
    user: User;
  };
}

export const InfoProfile = (props: InfoProfileProps) => {
  const {
    data: { user },
  } = props;

  const { t } = useTranslation('profile');

  return (
    <Card style={{ textAlign: 'center' }}>
      <Flex vertical justify="space-between" style={{ height: 400 }}>
        <div>
          <Avatar key={user._id} style={{ backgroundColor: generateColorFromAlphabet(user.name.charAt(0)) }} size={100}>
            {convertToTitleCase(user.name)}
          </Avatar>
          <div>
            <Typography.Text strong style={{ fontSize: 32 }}>
              {convertToTitleCase(user.name)}
            </Typography.Text>
          </div>
        </div>
        <Button>{t('editProfile')}</Button>
      </Flex>
    </Card>
  );
};
