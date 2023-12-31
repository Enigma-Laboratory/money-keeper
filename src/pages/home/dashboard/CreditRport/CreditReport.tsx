import { CreditReportStyled } from './CreditReport.styles';
import { BaseButton } from 'components';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Image, Space } from 'antd';

export const CreditReport = () => {
  return (
    <CreditReportStyled
      bordered={false}
      style={{
        width: 300,
        borderRadius: '20',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div className="header">
        <p>Credit report</p>
      </div>
      <Space size={24}>
        <BaseButton>
          <LeftOutlined />
        </BaseButton>
        <Image
          width={100}
          height={100}
          preview={false}
          src={require('assets/images/payment.jpg')}
          style={{ borderRadius: '50%' }}
        />
        <BaseButton>
          <RightOutlined />
        </BaseButton>
      </Space>
    </CreditReportStyled>
  );
};
