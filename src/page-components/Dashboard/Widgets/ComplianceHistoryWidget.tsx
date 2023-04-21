import { FC, memo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { FormattedMessage } from 'react-intl';

import { trns } from '../messages';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface Props {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[] | string[];
    backgroundColor: string;
    borderColor: string;
  }>;
}

const ComplianceHistoryWidget: FC<Props> = memo(({ labels, datasets }) => {
  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <section className='p-3 pb-6 bg-white rounded'>
      <h3 className='text-lg mb-5 font-normal'>
        <FormattedMessage {...trns.complianceHistory} />
      </h3>
      <Line options={options} data={data} className='max-h-[240px]' />
    </section>
  );
});

ComplianceHistoryWidget.displayName = 'ComplianceHistoryWidget';

export default ComplianceHistoryWidget;
