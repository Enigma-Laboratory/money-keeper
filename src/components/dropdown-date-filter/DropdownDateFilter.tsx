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

const DATE_FILTERS: Record<
  DateFilter,
  {
    text: string;
    value: DateFilter;
  }
> = {
  lastWeek: {
    text: 'lastWeek',
    value: 'lastWeek',
  },
  lastMonth: {
    text: 'lastMonth',
    value: 'lastMonth',
  },
  custom: {
    text: 'custom',
    value: 'custom',
  },
};

export const DropdownDateFilter: React.FC<DropdownDateFilterProps> = ({ onChange }): ReactElement => {
  const { t } = useTranslation();
  const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilter>(DATE_FILTERS.lastWeek.value);
  const [customRange, setCustomRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

  const handleMenuClick = useCallback((filter: DateFilter) => {
    setSelectedDateFilter(filter);
  }, []);

  const dateFilters: MenuProps['items'] = useMemo(() => {
    const filters = Object.keys(DATE_FILTERS) as DateFilter[];

    return filters.map((filter) => {
      return {
        key: DATE_FILTERS[filter].value,
        label: t(`dashboard.filter.date.${DATE_FILTERS[filter].text}`),
        onClick: () => {
          handleMenuClick(DATE_FILTERS[filter].value);
        },
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
          {t(`dashboard.filter.date.${DATE_FILTERS[selectedDateFilter].text}`)}
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
