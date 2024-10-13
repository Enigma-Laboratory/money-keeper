import { OperationalSetting, Order } from '@enigma-laboratory/shared';
import {
  Avatar,
  Space,
  Spin,
  Switch,
  Table,
  theme,
  Typography,
  Tooltip,
  Modal,
  Button,
  Form,
  Input,
  Select,
  message,
} from 'antd';
import type { TableProps } from 'antd/es/table';
import { ReactElement, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateColorFromAlphabet, THC } from 'utils';
import { format } from 'date-fns';

import { StyledGroupsSetting } from './Group.styles';
import { GroupsSettingProps } from './withGroupsController';
import { ProductSelect } from 'components';
import { AuthService } from 'stores';

export interface GroupsSetting extends OperationalSetting {}

const TABLE_HEIGHT =
  window.innerHeight -
  THC.HEADER_HEIGHT -
  THC.PADDING_MAIN_LAYOUT_HEIGHT * 2 -
  THC.ORDER_PAGE.HEADER_HEIGHT -
  THC.ORDER_PAGE.HEADER_MARGIN -
  THC.ORDER_PAGE.PAGINATION_HEIGHT -
  THC.ORDER_PAGE.PAGINATION_MARGIN * 2 -
  THC.ORDER_PAGE.HEADER_TABLE;

export const GroupsSetting = (props: GroupsSettingProps): ReactElement => {
  const { data, dispatch } = props;
  const { updateGroup, handleUpdateOrderStatus } = dispatch!;
  const { isLoading, groups, users } = data;
  const [isLoadingUpdateGroup, setIsLoadingUpdateGroup] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<GroupsSetting | null>(null);

  const auth = AuthService.instance.getAuth();

  const { t } = useTranslation('order');

  const columns: TableProps<GroupsSetting>['columns'] = [
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (value) => {
        return format(new Date(value), 'dd/MM/yyyy - HH:mm');
      },
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'userIds',
      dataIndex: 'userIds',
      key: 'userIds',
      render: (userIds: string[]) => {
        if (!userIds || userIds.length === 0) {
          return <Typography.Text>No users assigned to this group</Typography.Text>;
        }

        return (
          <Avatar.Group maxCount={7} maxPopoverTrigger="click" size="large">
            {userIds.map((userId) => {
              const user = users?.[userId];
              const { _id, name = 'N/A' } = user || {};

              const charAtFirstName = name.charAt(0);

              return (
                <Tooltip key={_id || userId} title={user ? name : 'User not found'}>
                  <Avatar style={{ backgroundColor: generateColorFromAlphabet(charAtFirstName) }}>
                    {charAtFirstName}
                  </Avatar>
                </Tooltip>
              );
            })}
          </Avatar.Group>
        );
      },
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (value, record) => {
        return (
          <Switch
            checkedChildren={t('', 'Opening')}
            unCheckedChildren={t('', 'Closed')}
            checked={value === 'opening'}
            onClick={(_, e: React.MouseEvent) => {
              e.stopPropagation();
            }}
          />
        );
      },
    },
  ];

  const dataSource: GroupsSetting[] = useMemo(
    () =>
      Object.values(groups).map((group) => {
        return {
          key: group._id,
          ...group,
        };
      }),
    [groups],
  );

  const handleRowClick = (record: GroupsSetting) => {
    setSelectedGroup({
      ...record,
      userIds: record.userIds || [],
    });
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedGroup(null);
  };

  const handleInputChange = (field: keyof GroupsSetting, value: any) => {
    if (selectedGroup) {
      setSelectedGroup({
        ...selectedGroup,
        [field]: value,
      });
    }
  };

  const handleUpdate = async (): Promise<void> => {
    if (selectedGroup) {
      setIsLoadingUpdateGroup(true);
      try {
        await updateGroup({
          _id: selectedGroup._id,
          name: selectedGroup?.name,
          description: selectedGroup?.description || '',
          userIds: selectedGroup?.userIds || [],
          status: selectedGroup.status,
        });
        handleModalClose();
      } catch (error) {
        message.error(`Can not update group: ${JSON.stringify(error)}`);
      } finally {
        setIsLoadingUpdateGroup(false);
      }
    }
  };

  return (
    <StyledGroupsSetting $tableBodyHeight={TABLE_HEIGHT}>
      <Space>
        <Typography.Title level={2}>Groups</Typography.Title>
      </Space>
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={dataSource}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </Spin>
      <Modal
        title="Update Group"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button loading={isLoadingUpdateGroup} key="submit" type="primary" onClick={handleUpdate}>
            Update
          </Button>,
        ]}
      >
        {selectedGroup && (
          <Form layout="vertical">
            <Form.Item label="Name" required>
              <Input value={selectedGroup.name} onChange={(e) => handleInputChange('name', e.target.value)} />
            </Form.Item>
            <Form.Item label="Status">
              <Select value={selectedGroup.status} onChange={(value) => handleInputChange('status', value)}>
                <Select.Option value="opening">Opening</Select.Option>
                <Select.Option value="closed">Closed</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Description">
              <Input.TextArea
                value={selectedGroup.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </Form.Item>
            <Form.Item label="User IDs">
              <Select
                mode="multiple"
                showSearch
                value={selectedGroup?.userIds || []}
                onChange={(value) => handleInputChange('userIds', value)}
                filterOption={(input, option) => option?.label.props.name.toLowerCase().includes(input.toLowerCase())}
                options={Object.entries(users).map(([userId, user]) => ({
                  value: userId,
                  label: <ProductSelect meId={auth._id} _id={userId} name={user.name} />,
                }))}
              ></Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </StyledGroupsSetting>
  );
};
