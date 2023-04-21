import { FC, memo } from 'react';
import { Doughnut } from 'react-chartjs-2';
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
    data: number[] | string[];
    backgroundColor: string[];
  }>;
}

const ComplianceWidget: FC<Props> = memo(({ labels, datasets }) => {
  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    cutoutPercentage: 50,
    plugins: {
      legend: {
        position: 'right' as any,
      },
    },
  };

  return (
    <section className='p-3 pb-6 bg-white rounded'>
      <h3 className='text-lg mb-5 font-normal'>
        <FormattedMessage {...trns.complianceWidgetTitle} />
      </h3>
      <Doughnut options={options} data={data} className='max-h-[240px]' />
    </section>
  );
});

ComplianceWidget.displayName = 'ComplianceWidget';

export default ComplianceWidget;
