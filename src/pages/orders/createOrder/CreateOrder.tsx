import { AppstoreOutlined, LeftOutlined, MinusCircleOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { User } from '@enigma-laboratory/shared';
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Result,
  Row,
  Select,
  Space,
  Steps,
  Typography,
  message,
  theme,
} from 'antd';
import { CardWithContent } from 'components/CardWithPlot';
import { USER_IDENTITY } from 'context/authProvider';
import { useLocalStorage } from 'hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { CreateOneOrderParams } from 'stores';
import { CreateOrderStyled } from './CreateOrder.styles';
import { OrderConfirm } from './orderConfirm';
import { CreateOrderProps } from './withCreateOrder';

export enum CreateOrderSteps {
  INFORMATION,
  PRODUCT,
  CONFIRM,
  DONE,
}

export const CreateOrder = (props: CreateOrderProps) => {
  const { data, dispatch } = props;
  const { users, operationalSettings, isLoading } = data || {};
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const [user] = useLocalStorage<User>(USER_IDENTITY);

  const [form] = Form.useForm();
  const onFinish = async (values: CreateOneOrderParams): Promise<void> => {
    await dispatch?.createOrder(values);
    navigate(-1);
  };

  const formatToVnd = (value: any) => {
    // Remove any non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    // Format the numeric value to VND format
    const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numericValue);
    return formattedValue;
  };

  const parseFromVnd = (value: any) => {
    // Remove any non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    return numericValue;
  };

  const breadcrumb = () => {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to={'/orders'}>
            <Space>
              <AppstoreOutlined /> Orders
            </Space>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Order</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  const steps = [
    {
      key: CreateOrderSteps.INFORMATION,
      content: (
        <>
          <Form.Item label="Group" name="GroupId" rules={[{ required: true, message: 'Please input your Group!' }]}>
            <Select
              loading={isLoading}
              options={operationalSettings
                ?.filter(({ status }) => status === 'opening')
                ?.map(({ _id, group }) => {
                  return {
                    label: group,
                    value: _id,
                  };
                })}
            />
          </Form.Item>

          <Form.Item label="Buyer" name="userId" rules={[{ required: true, message: 'Please input your Group!' }]}>
            <Select
              loading={isLoading}
              options={users?.map(({ _id, name }) => {
                return {
                  label: name,
                  value: _id,
                };
              })}
              defaultValue={user?._id}
            />
          </Form.Item>

          <Form.Item
            label="Order Name"
            name="name"
            rules={[{ required: true, message: 'Please input your order name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Created Order At"
            name="CreatedOrderAt"
            rules={[{ required: true, message: 'Please input your order name!' }]}
          >
            <DatePicker />
          </Form.Item>
        </>
      ),
    },
    {
      key: CreateOrderSteps.PRODUCT,
      content: (
        <div>
          <Flex style={{ width: '100%' }} justify="space-between">
            <Typography.Text style={{ width: 150 }}>ProductName</Typography.Text>
            <Typography.Text>UserIds</Typography.Text>
            <Typography.Text>Price</Typography.Text>
          </Flex>
          <Form.List name="products">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Flex key={key} align="start" gap={10}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      style={{ width: 300 }}
                      rules={[{ required: true, message: 'Missing product name' }]}
                    >
                      <Input placeholder="Product Name" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'userIds']}
                      style={{ width: '100%' }}
                      rules={[{ required: true, message: 'Missing users' }]}
                    >
                      <Select
                        loading={isLoading}
                        style={{ width: '100%' }}
                        options={users?.map(({ _id, name }) => {
                          return {
                            label: name,
                            value: _id,
                          };
                        })}
                        mode="multiple"
                        maxTagCount={'responsive'}
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      style={{ width: 300 }}
                      rules={[{ required: true, message: 'Missing price' }]}
                    >
                      <InputNumber addonBefore="$" placeholder="Price" formatter={formatToVnd} parser={parseFromVnd} />
                    </Form.Item>

                    <MinusCircleOutlined style={{ marginTop: 10 }} onClick={() => remove(name)} />
                  </Flex>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add product
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: CreateOrderSteps.CONFIRM,
      content: <OrderConfirm />,
    },
    {
      key: CreateOrderSteps.DONE,
      content: (
        <Result
          title={'Create order successfully'}
          subTitle={'Order number: #2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'}
          status="success"
          extra={[
            <Button type="primary" key="console">
              Go To Order Detail
            </Button>,
          ]}
        />
      ),
    },
  ];

  const orderStepItems = steps.map(({ key }) => ({ key, title: t(`createOrderStep.${key?.toString()}`) }));
  const [currentOrderStep, setCurrentOrderStep] = useState(0);

  const nextCurrentOrderStep = () => {
    setCurrentOrderStep(currentOrderStep + 1);
  };

  const prevCurrentOrderStep = () => {
    setCurrentOrderStep(currentOrderStep - 1);
  };

  const contentStyle: React.CSSProperties = {
    // lineHeight: '260px',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: 10,
  };

  return (
    <CreateOrderStyled>
      {breadcrumb()}

      <Row gutter={[16, 16]} justify={'center'}>
        <Col xl={15} lg={15} md={24} sm={24} xs={24}>
          <CardWithContent
            bodyStyles={{
              height: '600px',
              overflowY: 'auto',
              padding: 10,
            }}
            title={t('create.form.title')}
          >
            <Form
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              form={form}
            >
              <Steps style={{ padding: 10 }} current={currentOrderStep} size="small" items={orderStepItems} />
              <div className="form-container" style={contentStyle}>
                {steps[currentOrderStep].content}
              </div>
              {currentOrderStep !== CreateOrderSteps.DONE && (
                <Flex className="step-action" justify="space-between">
                  <Button type="text" onClick={() => prevCurrentOrderStep()}>
                    {currentOrderStep > 0 && (
                      <Space>
                        <LeftOutlined />
                        Previous
                      </Space>
                    )}
                  </Button>
                  {currentOrderStep < steps.length - 1 && (
                    <Button type="primary" onClick={() => nextCurrentOrderStep()}>
                      <Space>
                        Next <RightOutlined />
                      </Space>
                    </Button>
                  )}
                  {currentOrderStep === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                      Done
                    </Button>
                  )}
                </Flex>
              )}
            </Form>
          </CardWithContent>
        </Col>
      </Row>
    </CreateOrderStyled>
  );
};
