import { DownOutlined } from '@ant-design/icons';
import { Button, DatePicker, Dropdown, MenuProps } from 'antd';
import dayjs from 'dayjs';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledDropdownDateFilter } from './DropdownDateFilter.styles';

const { RangePicker } = DatePicker;

type QueryDateType = { start: string; end: string };

type DropdownDateFilterProps = {
  onChange: (queryDateType: QueryDateType) => void;
};

type DateFilter = 'lastWeek' | 'lastMonth' | 'custom';

const filters: DateFilter[] = ['lastWeek', 'lastMonth', 'custom'];

export const DropdownDateFilter: React.FC<DropdownDateFilterProps> = ({ onChange }): ReactElement => {
  const { t } = useTranslation('dashboard');
  const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilter>(filters[0]);
  const [customRange, setCustomRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

  const handleMenuClick = useCallback((filter: DateFilter) => {
    setSelectedDateFilter(filter);
  }, []);

  const dateFilters: MenuProps['items'] = useMemo(() => {
    return filters.map((filter: DateFilter) => {
      return {
        key: filter,
        label: t(`${filter}`),
        onClick: () => handleMenuClick(filter),
      };
    });
  }, []);

  const dateFilterQuery = useMemo(
    () => getDateFilterQuery(selectedDateFilter, customRange || undefined),
    [selectedDateFilter, customRange],
  );

  useEffect(() => {
    onChange(dateFilterQuery);
  }, [dateFilterQuery, selectedDateFilter]);

  return (
    <StyledDropdownDateFilter>
      <Dropdown menu={{ items: dateFilters }}>
        <Button>
          {t(`${selectedDateFilter}`)}
          <DownOutlined />
        </Button>
      </Dropdown>
      {selectedDateFilter === 'custom' && (
        <RangePicker
          style={{ marginLeft: 10 }}
          onChange={(dates) => {
            if (dates) {
              setCustomRange(dates as [dayjs.Dayjs, dayjs.Dayjs]);
            }
          }}
        />
      )}
    </StyledDropdownDateFilter>
  );
};

const getDateFilterQuery = (
  selectedDateFilter: DateFilter,
  customRange?: [dayjs.Dayjs, dayjs.Dayjs],
): QueryDateType => {
  const now = dayjs();
  switch (selectedDateFilter) {
    case 'lastWeek':
      return {
        start: now.subtract(6, 'days').startOf('day').format(),
        end: now.endOf('day').format(),
      };
    case 'lastMonth':
      return {
        start: now.subtract(1, 'month').startOf('day').format(),
        end: now.endOf('day').format(),
      };
    case 'custom':
      if (customRange) {
        return {
          start: customRange[0].startOf('day').format(),
          end: customRange[1].endOf('day').format(),
        };
      }
      return {
        start: now.subtract(6, 'days').startOf('day').format(),
        end: now.endOf('day').format(),
      };
    default:
      return {
        start: now.subtract(7, 'days').startOf('day').format(),
        end: now.endOf('day').format(),
      };
  }
};
