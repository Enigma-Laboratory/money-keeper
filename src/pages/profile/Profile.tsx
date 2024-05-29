import { Col, Row, Spin } from 'antd';

import { StyledProfile } from './Profile.styles';
import { InfoProfile } from './info-profile';
import { TabProfile } from './tab-profile';
import { ProfileProps } from './withProfileController';

export const Profile = (props: ProfileProps) => {
  const { data } = props;

  return (
    <StyledProfile>
      <Spin spinning={data.isLoading}>
        <Row gutter={[14, 14]}>
          <Col span={24} lg={6}>
            <InfoProfile data={{ user: data.user }} />
          </Col>
          <Col span={24} lg={18}>
            <TabProfile></TabProfile>
          </Col>
        </Row>
      </Spin>
    </StyledProfile>
  );
};
