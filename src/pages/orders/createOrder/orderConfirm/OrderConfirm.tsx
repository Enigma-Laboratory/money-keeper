import { Avatar, Divider, Flex, Tag, Typography } from 'antd';
import { ReactElement } from 'react';
import { generateColorFromAlphabet } from 'utils';
import { StyledOrderConfirm } from './OrderConfirm.styles';

export const OrderConfirm = (): ReactElement => {
  const total = 150000;

  const productList = [
    { name: 'Classic T-Shirt' },
    { name: 'Leather Wallet' },
    { name: 'Wireless Headphones' },
    { name: 'Coffee Maker' },
    { name: 'Running Shoes' },
    { name: 'Denim Jeans' },
    { name: 'Smartphone Case' },
    { name: 'Backpack' },
    { name: 'Sunglasses' },
    { name: 'Yoga Mat' },
    { name: 'Rau' },
    { name: 'Thit' },
    { name: 'Sua' },
    // Add more product names as needed
  ];

  return (
    <StyledOrderConfirm>
      <Flex justify="space-between" align="center" gap={10} className="item">
        <Typography.Title style={{ margin: 0 }} level={3}>
          Payment
        </Typography.Title>
        <Typography.Text type="secondary">Sat May 04 2024 23:34:53 GMT+0700</Typography.Text>
      </Flex>

      <Flex justify="space-between" gap={10} className="item">
        <Typography.Text>Total:</Typography.Text>
        <Typography.Text>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
      </Flex>
      <Divider />
      <Flex justify="space-between" gap={10} className="item">
        <Typography.Text>Name:</Typography.Text>
        <Typography.Text>Tien Nhau Thang 4</Typography.Text>
      </Flex>
      <Divider />

      <Flex justify="space-between" gap={10} className="item">
        <Typography.Text style={{ minWidth: 100 }}>Products:</Typography.Text>
        <div>
          <Flex gap="7px 0" wrap="wrap">
            {productList.map((product, index) => {
              return (
                <Tag key={index} color={generateColorFromAlphabet(product.name.charAt(0))}>
                  {product.name}
                </Tag>
              );
            })}
          </Flex>
        </div>
      </Flex>
      <Divider />
      <Flex justify="space-between" gap={10} className="item">
        <Typography.Text style={{ minWidth: 100 }}>Users:</Typography.Text>
        <div>
          <Flex gap="4px 0" wrap="wrap">
            <Avatar.Group
              maxCount={7}
              maxPopoverTrigger="click"
              size="large"
              maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
            >
              <Avatar style={{ backgroundColor: '#f56a00' }}>Sy</Avatar>
              <Avatar style={{ backgroundColor: '#020202' }}>Tai</Avatar>
              <Avatar style={{ backgroundColor: '#d22bb3' }}>Vinh</Avatar>
              <Avatar style={{ backgroundColor: '#dd9c3a' }}>Thang</Avatar>
              <Avatar style={{ backgroundColor: '#321a9d' }}>Quyen</Avatar>
              <Avatar style={{ backgroundColor: '#289682' }}>Tuan</Avatar>
              <Avatar style={{ backgroundColor: '#7d736b' }}>Nghia</Avatar>
            </Avatar.Group>
          </Flex>
        </div>
      </Flex>
      <Divider />
      <Flex justify="space-between" gap={10} className="item">
        <Typography.Text>Total:</Typography.Text>
        <Typography.Text>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography.Text>
      </Flex>
    </StyledOrderConfirm>
  );
};
