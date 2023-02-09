import { FC, useState } from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import { data } from './utils'


const CustomBarChart: FC = () => {
  const [key, setKey] = useState(
    {
      "2021": false,
      "2020": false,
      "current": false,
    }
  );

  const toogle_area = (dataKey: string) => {
    setKey({
      ...key,
      [dataKey]: !key[dataKey as keyof typeof key]
    })
  }
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend
          verticalAlign='top'
          height={60}
          iconType={'rect'}
          iconSize={20}
          onClick={data => toogle_area(data.dataKey)}
        />

        <Bar dataKey="2021" stackId="a" fill="#5594f3" hide={key[2021]} />
        <Bar dataKey="2020" stackId="a" fill="#6cd6ff" hide={key[2020]} />
        <Bar dataKey="current" stackId="a" fill="#e7e7eb" hide={key.current} />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default CustomBarChart;
