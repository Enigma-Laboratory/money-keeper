import { AppstoreOutlined, LeftOutlined, MinusCircleOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { CreateOneOrderParams, Order, User } from '@enigma-laboratory/shared';
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  InputRef,
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
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
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
  const { t } = useTranslation('order');
  const { token } = theme.useToken();
  const [user] = useLocalStorage<User>(USER_IDENTITY);
  const [currentOrderStep, setCurrentOrderStep] = useState(CreateOrderSteps.INFORMATION);
  const [order, setOrder] = useState<CreateOneOrderParams>({ userId: user?._id });
  const [isLoadingCreateOrder, setIsLoadingCreateOrder] = useState<boolean>(false);
  const [isLoadingCreateGroup, setIsLoadingCreateGroup] = useState<boolean>(false);

  const updateOrderParams = (params: CreateOneOrderParams) => {
    setOrder((prevOrder) => ({ ...prevOrder, ...params }));
  };

  const handleCreateOrder = async () => {
    setIsLoadingCreateOrder(true);
    try {
      await dispatch?.createOneOrder(order);
    } catch {
      message.error('can not create order');
    } finally {
      setIsLoadingCreateOrder(false);
    }
  };

  const [form] = Form.useForm();

  const formatToVnd = (value: any) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numericValue);
    return formattedValue;
  };

  const parseFromVnd = (value: any) => {
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

  const nextCurrentOrderStep = () => {
    form
      .validateFields()
      .then(async () => {
        const formValues = form.getFieldsValue();
        updateOrderParams({ ...formValues });
        if (currentOrderStep === CreateOrderSteps.CONFIRM) {
          await handleCreateOrder();
          setCurrentOrderStep(currentOrderStep + 1);
        } else {
          setCurrentOrderStep(currentOrderStep + 1);
        }
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const prevCurrentOrderStep = () => {
    setCurrentOrderStep(currentOrderStep - 1);
  };

  const inputRef = useRef<InputRef>(null);
  const [groupName, setGroupName] = useState('');

  const handleCreateOperationalSetting = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoadingCreateGroup(true);
    try {
      await dispatch?.createOperationalSettings({ name: groupName });
      setGroupName('');
    } finally {
      setIsLoadingCreateGroup(false);
    }
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const createOrderBySteps = [
    {
      key: CreateOrderSteps.INFORMATION,
      content: (
        <>
          <Form.Item
            label={t('form.group.title')}
            name="groupId"
            rules={[{ required: true, message: t('form.group.message') }]}
          >
            <Select
              showSearch
              loading={isLoading}
              options={Object.values(operationalSettings)

                ?.filter(({ status }) => status === 'opening')
                ?.map(({ _id, name }) => {
                  return {
                    label: name,
                    value: _id,
                  };
                })}
              placeholder={t('form.group.message')}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px' }}>
                    <Input
                      placeholder="Please enter new group"
                      ref={inputRef}
                      value={groupName}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={handleCreateOperationalSetting}
                      loading={isLoadingCreateGroup}
                    >
                      Create
                    </Button>
                  </Space>
                </>
              )}
            />
          </Form.Item>

          <Form.Item
            label={t('form.buyer.title')}
            name="userId"
            rules={[{ required: true, message: t('form.buyer.message') }]}
            initialValue={user?._id}
          >
            <Select
              loading={isLoading}
              options={users?.map(({ _id, name }) => ({
                label: name,
                value: _id,
              }))}
              value={user?._id}
            />
          </Form.Item>

          <Form.Item
            label={t('form.order.title')}
            name="name"
            rules={[{ required: true, message: t('form.order.message') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('form.createdOrderAt.title')}
            name="createdOrderAt"
            rules={[{ required: true, message: t('form.createdOrderAt.message') }]}
          >
            <DatePicker format={'YYYY-MM-DD'} />
          </Form.Item>
        </>
      ),
    },
    {
      key: CreateOrderSteps.PRODUCT,
      content: (
        <div>
          <Flex style={{ width: '100%', fontWeight: 'bold', marginTop: 10 }} justify="space-between">
            <Typography.Text style={{ width: 300 }}>{t('form.product.name')}</Typography.Text>
            <Typography.Text style={{ width: '100%' }}>{t('form.product.userIds')}</Typography.Text>
            <Typography.Text style={{ width: 300 }}>{t('form.product.price')}</Typography.Text>
          </Flex>
          <Divider />
          <Form.List name="products">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Flex key={key} align="start" gap={10}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      style={{ width: 300 }}
                      rules={[{ required: true, message: t('form.product.messageRequiredName') }]}
                    >
                      <Input placeholder="Product Name" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'userIds']}
                      style={{ width: '100%' }}
                      rules={[{ required: true, message: t('form.product.messageRequiredUserIds') }]}
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
                      rules={[{ required: true, message: t('form.product.price') }]}
                    >
                      <InputNumber addonBefore="$" placeholder="Price" formatter={formatToVnd} parser={parseFromVnd} />
                    </Form.Item>

                    <MinusCircleOutlined style={{ marginTop: 10 }} onClick={() => remove(name)} />
                  </Flex>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    {t('form.addProduct')}
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
      content: <OrderConfirm order={order as Order} users={users} operationalSettings={operationalSettings} />,
    },
    {
      key: CreateOrderSteps.DONE,
      content: (
        <Result
          title={'Create order successfully'}
          subTitle={'Order number: #2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'}
          status="success"
          extra={[
            <Button type="primary" key="console" onClick={nextCurrentOrderStep}>
              Go To Order Detail
            </Button>,
          ]}
        />
      ),
    },
  ];

  const orderStepItems = createOrderBySteps.map(({ key }) => ({ key, title: t(`createOrderStep.${key?.toString()}`) }));

  const contentStyle: React.CSSProperties = {
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
            <Form initialValues={{ remember: true }} autoComplete="off" layout="vertical" form={form}>
              <Steps style={{ padding: 10 }} current={currentOrderStep} size="small" items={orderStepItems} />
              <div className="form-container" style={contentStyle}>
                {createOrderBySteps[currentOrderStep]?.content}
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
                  {currentOrderStep < createOrderBySteps.length - 1 && (
                    <Button type="primary" onClick={() => nextCurrentOrderStep()} loading={isLoadingCreateOrder}>
                      <Space>
                        {currentOrderStep === CreateOrderSteps.CONFIRM ? 'Create' : 'Next'}
                        <RightOutlined />
                      </Space>
                    </Button>
                  )}
                  {currentOrderStep === createOrderBySteps.length - 1 && (
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
