import { Input, Typography } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { AlertModalProps } from './AlertModal';

export const AlertModalExtra = (props: {
  value?: string;
  confirmName?: string;
  placeholder?: string;
  setModalSource: Dispatch<SetStateAction<AlertModalProps>>;
}) => {
  const { value, placeholder, confirmName } = props;

  return (
    <>
      <Typography.Text>{`Please type in the order name「${confirmName}」to delete:`}</Typography.Text>
      <Input
        value={value}
        onChange={(e) => {
          props.setModalSource((prev) => ({
            ...prev,
            resultData: {
              ...prev.resultData,
              deleteType: {
                ...prev.resultData.deleteType,
                input: e.target.value,
              },
            },
          }));
        }}
        placeholder={placeholder}
        style={{ width: 400 }}
      />
    </>
  );
};
