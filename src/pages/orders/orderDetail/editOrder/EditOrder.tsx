import { Avatar, Breadcrumb, Form, Input, Space, notification } from 'antd';
import { CreateOneOrderParams, Order } from '@enigma-laboratory/shared';
import { Link, useNavigate } from 'react-router-dom';
import { AppstoreOutlined, LeftOutlined } from '@ant-design/icons';
import { BaseButton } from 'components';
import { EditOrderStyled } from './EditOrder.styles';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EditOrderProps } from './withEditOrder';

export const EditOrder = (props: EditOrderProps) => {
  const {
    data: { isLoading },
    dispatch: { updateOrder, deleteOrder, fetchOneOrder },
  } = props;

  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const handleFetchOneOder = async (id: string) => {
      try {
        const orderResponse = await fetchOneOrder({ _id: id });
        setOrder(orderResponse);
      } catch {
        notification.error({
          message: 'Fetch Data fail',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
      }
    };
    id && handleFetchOneOder(id);
  }, [id]);

  const onFinish = async (values: CreateOneOrderParams): Promise<void> => {
    try {
      await updateOrder({ ...order, ...values });
      notification.success({
        message: 'Update Data success',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      });
      navigate(-1);
    } catch {
      notification.error({
        message: 'Update Data fail',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      });
    }
  };

  const onDeleteOrder = async (): Promise<void> => {
    await deleteOrder({ _id: id });
    navigate(-1);
  };

  useEffect(() => {
    if (!id) return;
    form.setFieldsValue({
      userId: order?.userId,
      orderName: order?.name,
    });
  }, [order]);

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
