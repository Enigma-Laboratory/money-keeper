import { DatePicker, Select, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { DailyParams } from 'pages/dashboard/withDashboardController';
import { ReactElement, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardService, DateFilter } from 'stores';

type DateFilterSelectProps = {
  onChange?: (params: DailyParams) => Promise<void>;
};

const filters: DateFilter[] = ['lastWeek', 'lastMonth', 'custom'];

export const DateFilterSelect: React.FC<DateFilterSelectProps> = ({ onChange }): ReactElement => {
  const { t } = useTranslation('dashboard');
  const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilter>(filters[0]);

  const dateFilters = useMemo(() => {
    return filters.map((filter) => ({ value: filter, label: t(`filter.${filter}`) }));
  }, [t]);

  const handleChangeSelect = async (value: DateFilter) => {
    setSelectedDateFilter(value);
    const params: DailyParams = { start: new Date(), end: new Date() };

    switch (value) {
      case 'lastWeek': {
        params.start = new Date(dayjs().subtract(6, 'd').format());
        params.end = new Date(dayjs().format());
        break;
      }
      case 'lastMonth': {
        params.start = new Date(dayjs().subtract(1, 'M').format());
        params.end = new Date(dayjs().format());
        break;
      }
      default:
        return;
    }
    await onChange?.(params);
    DashboardService.instance.setFilter(value);
  };

  const handleChangeRangePicker = async (dates: [Date, Date] | unknown) => {
    const [start, end] = dates as [Dayjs, Dayjs];
    await onChange?.({ start: new Date(start.startOf('day').format()), end: new Date(end.startOf('day').format()) });
    DashboardService.instance.setFilter('custom');
  };

  return (
    <Space size={10}>
      {selectedDateFilter === 'custom' && (
        <DatePicker.RangePicker
          onChange={handleChangeRangePicker}
          placeholder={[t('dateFilter.startDate'), t('dateFilter.endDate')]}
        />
      )}
      <Select
        style={{ width: 120 }}
        defaultValue={dateFilters[0].value}
        options={dateFilters}
        onChange={handleChangeSelect}
      />
    </Space>
  );
};
