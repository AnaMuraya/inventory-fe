import { FC, memo } from 'react';
import { Row, Col } from 'antd';

import AmountWidget from './Widgets/AmountWidget';
import ComplianceWidget from './Widgets/ComplianceWidget';
import ComplianceHistoryWidget from './Widgets/ComplianceHistoryWidget';
import AgedBoatsWidget from './Widgets/AgedBoatsWidget';
import InventoryHistoryWidget from './Widgets/InvetoryHistoryWidget';

const topWidgetsMock = [
  {
    label: 'boats available',
    value: 131
  },
  {
    label: 'New boats',
    value: 98
  },
  {
    label: 'Used boats',
    value: 30
  },
  {
    label: 'Brokerage boats',
    value: 3
  },
  {
    label: 'Non-Compliant Listings',
    value: 2,
    highlighted: true
  }
];

const complianceWidgetMock = {
  labels: ['Non-compliant listings', 'Approved Listings', 'Expired', 'Expiring Soon (<1 week)'],
  datasets: [
    {
      data: [20, 107, 35, 18],
      backgroundColor: [
        '#ED3124',
        '#13C2C2',
        '#FFC53D',
        '#006EC2'
      ]
    }
  ]
};

const complianceHistoryWidgetLabelsMock = [
  '2021-01',
  '2021-02',
  '2021-03',
  '2021-04',
  '2021-05',
  '2021-06',
  '2021-07',
  '2021-08',
]
const complianceHistoryWidgetMock = {
  labels: complianceHistoryWidgetLabelsMock,
  datasets: [
    {
      label: 'Compliance Issues',
      data: complianceHistoryWidgetLabelsMock.map(() => Math.floor(Math.random() * 1000)),
      borderColor: '#ED3124',
      backgroundColor: '#ED3124',
    },
    {
      label: 'Approved Listings',
      data: complianceHistoryWidgetLabelsMock.map(() => Math.floor(Math.random() * 1000)),
      borderColor: '#13C2C2',
      backgroundColor: '#13C2C2',
    },
  ],
};

const agedBoatsWidgetColors = ['#13C2C2', '#13C2C2', '#FFC53D', '#FFC53D', '#F28B0C', '#F28B0C', '#ED3124', '#ED3124'];
const agedBoatsWidgetLabelMock = ['<30 days', '31-90', '91-135', '91-135', '91-135', '226-270', '271-365', '365+']
const agedBoatsWidgetMock = {
  labels: agedBoatsWidgetLabelMock,
  datasets: [{
    data: agedBoatsWidgetLabelMock.map(() => Math.floor(Math.random() * 16)),
    borderColor: agedBoatsWidgetColors,
    backgroundColor: agedBoatsWidgetColors,
    barThickness: 26
  }]
}

const invetoryHistoryWidgetLabelsMock = ['2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09', '2021-10', '2021-11', '2021-12', '2022-01', '2022-02']
const invetoryHistoryWidget = {
  labels: invetoryHistoryWidgetLabelsMock,
  datasets: [
    {
      label: 'New Inventory',
      data: invetoryHistoryWidgetLabelsMock.map(() => Math.floor(Math.random() * 16)),
      backgroundColor: '#006EC2',
      stack: 'Stack 0',
    },
    {
      label: 'Used Inventory',
      data: invetoryHistoryWidgetLabelsMock.map(() => Math.floor(Math.random() * 16)),
      backgroundColor: '#FFC53D',
      stack: 'Stack 0',
    },
    {
      label: 'Broker Inventory',
      data: invetoryHistoryWidgetLabelsMock.map(() => Math.floor(Math.random() * 16)),
      backgroundColor: '#13C2C2',
      stack: 'Stack 0',
    },
  ]
}

const DashboardContainer: FC = memo(() => (
  <div>
    <div className="grid grid-flow-col auto-cols-fr gap-x-6 mb-6">
      {topWidgetsMock.map(data => (
        <AmountWidget key={data.label} {...data} />
      ))}
    </div>
    <Row gutter={[24, 24]} className="mb-6">
      <Col span={10}>
        <ComplianceWidget {...complianceWidgetMock} />
      </Col>
      <Col span={14}>
        <ComplianceHistoryWidget {...complianceHistoryWidgetMock} />
      </Col>
    </Row>
    <Row gutter={[24, 24]}>
      <Col span={10}>
        <AgedBoatsWidget {...agedBoatsWidgetMock} />
      </Col>
      <Col span={14}>
        <InventoryHistoryWidget {...invetoryHistoryWidget} />
      </Col>
    </Row>
  </div>
));

DashboardContainer.displayName = 'DashboardContainer';

export default DashboardContainer;
