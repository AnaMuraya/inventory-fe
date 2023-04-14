import { FC, memo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { FormattedMessage } from 'react-intl';

import { trns } from '../messages';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Props {
  labels: string[];
  datasets: Array<{
    label?: string;
    data: number[] | string[];
    backgroundColor: string[];
    borderColor: string[];
  }>;
}

const AgedBoatsWidget: FC<Props> = memo(({ labels, datasets }) => {
  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <section className='p-3 pb-6 bg-white rounded'>
      <h3 className='text-lg mb-5 font-normal'>
        <FormattedMessage {...trns.agedBoats} />
      </h3>
      <Bar options={options} data={data} className='max-h-[240px]' />
    </section>
  );
});

AgedBoatsWidget.displayName = 'AgedBoatsWidget';

export default AgedBoatsWidget;
