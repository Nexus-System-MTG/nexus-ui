import type { Meta, StoryObj } from '@storybook/react';
import { NexusChart } from './Chart/NexusChart';

const meta = {
  title: 'Data Display/Charts',
  tags: ['autodocs'],
} satisfies Meta<typeof NexusChart>;

export default meta;

/* --- Data --- */
const barData = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 75 },
  { name: 'May', value: 100 },
  { name: 'Jun', value: 140 },
  { name: 'Jul', value: 320 },
  { name: 'Aug', value: 250 },
  { name: 'Sept', value: 130 },
  { name: 'Oct', value: 55 },
  { name: 'Nov', value: 48 },
  { name: 'Dec', value: 25 },
];

const lineData = Array.from({ length: 40 }, (_, i) => ({
    year: 1980 + i,
    Germany: Math.random() * 5 + 2,
    UK: Math.random() * 8 + 3,
    France: Math.random() * 6 + 2
}));

const scatterData = Array.from({ length: 50 }, () => ({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 1000),
    z: Math.floor(Math.random() * 500)
})).sort((a,b) => a.x - b.x);

const pieData = [
    { name: 'Windows', value: 45 },
    { name: 'OS X', value: 25 },
    { name: 'Linux', value: 15 },
    { name: 'Chrome OS', value: 10 },
    { name: 'Other', value: 5 },
]

/* --- Stories --- */

export const BarChart: StoryObj<typeof NexusChart> = {
  render: () => (
     <div className="w-[600px]">
        <NexusChart 
            type="bar"
            title="Avg. annual rainfall in Seoul (in mm)"
            subtitle="Seoul rainfall"
            data={barData}
            dataKeys={['value']}
            colors={['#3b82f6']}
            moreInfoLink="#"
            height={300}
        />
     </div>
  )
};

export const LineChart: StoryObj<typeof NexusChart> = {
    render: () => (
       <div className="w-[600px]">
          <NexusChart 
              type="line"
              title="Inflation rates"
              subtitle="Comparison of EU countries"
              data={lineData} 
              indexKey="year"
              dataKeys={['Germany', 'UK', 'France']}
              colors={['#3b82f6', '#facc15', '#ef4444']}
              moreInfoLink="#"
              height={300}
          />
       </div>
    )
};

export const ScatterChart: StoryObj<typeof NexusChart> = {
    render: () => (
       <div className="w-[600px]">
          <NexusChart 
              type="scatter"
              title="Processor density"
              subtitle="(in transistor/mm²)"
              data={scatterData} 
              dataKeys={['x', 'y']}
              colors={['#3b82f6', '#facc15', '#ef4444', '#06b6d4', '#10b981']}
              moreInfoLink="#"
              axisLabelX="Year"
              axisLabelY="Density"
              height={300}
          />
       </div>
    )
};

export const DonutChart: StoryObj<typeof NexusChart> = {
    render: () => (
       <div className="w-[600px]">
          <NexusChart 
              type="donut"
              title="Desktop OS market share"
              data={pieData} 
              dataKeys={['value']}
              indexKey="name"
              centerLabel="1.9 Bn Desktops"
              moreInfoLink="#"
              height={300}
          />
       </div>
    )
};
