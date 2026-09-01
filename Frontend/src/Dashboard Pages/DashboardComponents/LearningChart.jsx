import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const data = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 1 },
  { day: "Wed", hours: 3 },
  { day: "Thu", hours: 2 },
  { day: "Fri", hours: 4 },
  { day: "Sat", hours: 1.5 },
  { day: "Sun", hours: 3 },
];

const LearningChart = () => {
  return (
    <div className='w-full h-[345px]'>
        <ResponsiveContainer>
            <LineChart data={data}>
<CartesianGrid stroke="#0A1931" strokeOpacity={0.08} />
<XAxis  dataKey="day" axisLine={false} tickLine={false} />

<YAxis axisLine={false} tickLine={false}/>
<Tooltip/>
<Line type="monotone" dataKey="hours"  stroke="#0A1931"
  strokeWidth={1}  dot={{ r: 4 }}
activeDot={{ r: 6 }}/>
            </LineChart>
        </ResponsiveContainer>

    </div>
  )
}

export default LearningChart