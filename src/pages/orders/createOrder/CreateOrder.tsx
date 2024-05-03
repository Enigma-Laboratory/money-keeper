import { Avatar, Breadcrumb, Form, Input, Space } from 'antd';
import { CreateOrderStyled } from './CreateOrder.styles';
import { CreateOrderProps } from './withCreateOrder';
import { CreateOrderParams } from '/stores';
import { Link, useNavigate } from 'react-router-dom';
import { AppstoreOutlined, LeftOutlined } from '@ant-design/icons';
import { BaseButton } from 'components';

export const CreateOrder = (props: CreateOrderProps) => {
  const { data, dispatch } = props;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values: CreateOrderParams): Promise<void> => {
    await dispatch?.createOrder(values);
    navigate(-1);
  };

  const breadcrumb = () => {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <AppstoreOutlined /> Order
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={'/order'}>List</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Order</Breadcrumb.Item>
      </Breadcrumb>
    );
  };
  const headerCreateOrder = () => {
    return (
      <Space>
        <BaseButton onClick={() => navigate(-1)} type="link">
          <Avatar shape="circle" size="default" icon={<LeftOutlined />} style={{ cursor: 'pointer' }} />
        </BaseButton>
        <BaseButton onClick={() => form.submit()} type="primary" loading={!data?.isLoading}>
          Create
        </BaseButton>
      </Space>
    );
  };

  return (
    <CreateOrderStyled>
      {breadcrumb()}
      {headerCreateOrder()}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="UserId" name="userId" rules={[{ required: true, message: 'Please input your userId!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Order Name"
          name="orderName"
          rules={[{ required: true, message: 'Please input your order name!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </CreateOrderStyled>
  );
};
