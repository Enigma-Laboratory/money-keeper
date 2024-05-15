import { Input, Typography } from 'antd';

export const AlertModalExtra = (props: {
  value: string;
  confirmName: string;
  placeholder: string;
  setModalSource: any;
}) => {
  const { value, placeholder, confirmName } = props;

  return (
    <>
      <Typography.Text>{`Please type in the order name「${confirmName}」to delete:`}</Typography.Text>
      <Input
        value={value}
        onChange={(e) => {
          props.setModalSource((prev: any) => ({ ...prev, confirmInput: e.target.value }));
        }}
        placeholder={placeholder}
        style={{ width: 400 }}
      />
    </>
  );
};
