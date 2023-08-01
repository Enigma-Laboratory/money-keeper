import { Avatar, Breadcrumb, Form, Input, Space } from 'antd';
import { CreateOrderParams } from 'stores';
import { Link, useNavigate } from 'react-router-dom';
import { AppstoreOutlined, LeftOutlined } from '@ant-design/icons';
import { BaseButton } from 'components';
import { EditOrderStyled } from './EditOrder.styles';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { EditOrderProps } from './withEditOrder';

export const EditOrder = (props: EditOrderProps) => {
  const {
    data: { orders },
    dispatch: { updateOrder, deleteOrder },
  } = props;

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const order = useMemo(() => {
    return orders.find((order) => order.id === id);
  }, [id]);

  const onFinish = async (values: CreateOrderParams): Promise<void> => {
    await updateOrder({ ...order, ...values });
    navigate(-1);
  };

  const onDeleteOrder = async (): Promise<void> => {
    await deleteOrder({ id });
    navigate(-1);
  };

  useEffect(() => {
    if (!id) return;
    form.setFieldsValue({
      userId: order?.userId,
      orderName: order?.orderName,
    });
  }, [id, order]);

  const breadcrumb = () => {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <AppstoreOutlined /> Order
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={'/order'}>List</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Order</Breadcrumb.Item>
      </Breadcrumb>
    );
  };
  const headerCreateOrder = () => {
    return (
      <Space>
        <BaseButton onClick={() => navigate(-1)} type="link">
          <Avatar shape="circle" size="default" icon={<LeftOutlined />} style={{ cursor: 'pointer' }} />
        </BaseButton>
        <Space>
          <BaseButton onClick={() => onDeleteOrder()}>Delete</BaseButton>
          <BaseButton onClick={() => form.submit()} type="primary">
            Update
          </BaseButton>
        </Space>
      </Space>
    );
  };

  return (
    <EditOrderStyled>
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
    </EditOrderStyled>
  );
};
