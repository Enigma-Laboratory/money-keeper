import { Card } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const TabProfile = () => {
  const { t } = useTranslation('profile');
  const [activeTabKey, setActiveTabKey] = useState<string>('tab1');

  const tabList = [
    {
      key: 'tab1',
      tab: t('editPassword'),
    },
    {
      key: 'tab2',
      tab: t('notifications'),
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    tab1: <div>Edit Password</div>,
    tab2: <div>Notifications</div>,
  };

  const changeTab = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <Card activeTabKey={activeTabKey} tabList={tabList} onTabChange={changeTab}>
      {contentList[activeTabKey]}
    </Card>
  );
};
