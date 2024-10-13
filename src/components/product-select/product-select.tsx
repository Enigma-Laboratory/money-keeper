import { useTranslation } from 'react-i18next';

export const ProductSelect = (props: { meId: string; _id: string; name: string }) => {
  const { meId, _id, name } = props;
  const { t } = useTranslation('order');
  if (meId === _id) {
    return (
      <>
        <strong>{name} </strong> ({t('me')})
      </>
    );
  }

  return <>{name}</>;
};
