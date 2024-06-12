import { DatePicker, Select, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { ReactElement, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardService, DateFilterType, FilterDateParams } from 'stores';

type DateFilterSelectProps = {
  onChange?: (params: FilterDateParams) => Promise<void>;
};

const filters: DateFilterType[] = ['lastWeek', 'lastMonth', 'custom'];

export const DateFilterSelect: React.FC<DateFilterSelectProps> = ({ onChange }): ReactElement => {
  const { t } = useTranslation('dashboard');
  const dateFilters = useMemo(() => {
    return filters.map((filter) => ({ value: filter, label: t(`filter.${filter}`) }));
  }, [t]);
  const [dateFilter, setDateFilter] = useState<DateFilterType>('lastWeek');

  const handleChangeSelect = async (value: DateFilterType) => {
    const params: FilterDateParams = { start: new Date(), end: new Date(), type: 'lastWeek' };

    setDateFilter(value);
    switch (value) {
      case 'lastWeek': {
        params.start = new Date(dayjs().subtract(6, 'd').format());
        params.end = new Date(dayjs().format());
        params.type = 'lastWeek';
        break;
      }
      case 'lastMonth': {
        params.start = new Date(dayjs().subtract(1, 'M').format());
        params.end = new Date(dayjs().format());
        params.type = 'lastMonth';
        break;
      }
      case 'custom': {
        return;
      }
    }
    await onChange?.(params);
    DashboardService.instance.setFilter(params);
  };

  const handleChangeRangePicker = async (dates: [Date, Date] | unknown) => {
    const [start, end] = dates as [Dayjs, Dayjs];
    const filter: FilterDateParams = {
      start: new Date(start.startOf('day').format()),
      end: new Date(end.startOf('day').format()),
      type: 'custom',
    };
    await onChange?.(filter);
    DashboardService.instance.setFilter(filter);
  };

  return (
    <Space size={10}>
      {dateFilter === 'custom' && (
        <DatePicker.RangePicker
          onChange={handleChangeRangePicker}
          placeholder={[t('dateFilter.startDate'), t('dateFilter.endDate')]}
        />
      )}
      <Select style={{ width: 120 }} defaultValue={dateFilter} options={dateFilters} onChange={handleChangeSelect} />
    </Space>
  );
};
