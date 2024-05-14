import { Col, Row, Spin } from 'antd';
import { InfoProfile } from './InfoProfile';
import { StyledProfile } from './Profile.styles';
import { TabProfile } from './TabProfile';
import { ProfileProps } from './withProfileController';

export const Profile = (props: ProfileProps) => {
  const { data, dispatch } = props;

  return (
    <StyledProfile>
      <Spin spinning={data.isLoading}>
        <Row gutter={14}>
          <Col flex={3}>
            <InfoProfile data={{ user: data.user }} />
          </Col>
          <Col flex={9}>
            <TabProfile></TabProfile>
          </Col>
        </Row>
      </Spin>
    </StyledProfile>
  );
};
