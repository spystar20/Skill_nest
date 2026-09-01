import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
const data = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 1 },
  { day: "Wed", hours: 3 },
  { day: "Thu", hours: 2.5 },
  { day: "Fri", hours: 4 },
  { day: "Sat", hours: 1.5 },
  { day: "Sun", hours: 3 },
];
const TestChart = () => {
  return (
    <div className='w-full h-[356px]'>
<ResponsiveContainer width="100%" height="100%">
<LineChart data={data}>
<CartesianGrid/>
    <XAxis dataKey="day"/>
    <YAxis/>
    <Tooltip   labelFormatter={(label) => `Day: ${label}`}
  contentStyle={{
    backgroundColor: "white",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
  }}/>
    <Line type="natural" strokeWidth={2} dot={false} dataKey="hours"/>
</LineChart>
</ResponsiveContainer>
    </div>
  )
}

export default TestChart