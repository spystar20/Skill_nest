import React from 'react'
import { Area, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const data = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 1 },
  { day: "Wed", hours: 3 },
  { day: "Thu", hours: 2 },
  { day: "Fri", hours: 4 },
  { day: "Sat", hours: 1.5 },
  { day: "Sun", hours: 3 },
];

const LearningChart = ({periods,period,setPeriod}) => {
  return (
    <div className="bg-white rounded-lg p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold font-heading">
            Learning Activity
          </h2>
    
          <p className="text-sm text-neutral-500 mt-1">
            Track your learning time over the selected period.
          </p>
        </div>
    
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
          {periods.map((item) => (
            <button
              key={item}
              onClick={() => setPeriod(item)}
              className={`px-3 py-1.5 text-sm rounded-md capitalize transition-all ${
                period === item
                  ? "bg-[#0A1931] text-white"
                  : "text-neutral-600 hover:text-[#0A1931]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    

    <div className='w-full h-[345px]'>
        <ResponsiveContainer>
            <LineChart data={data} margin={{left:-30,right:0}}>
                <defs>
    <linearGradient id="learningGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#0A1931" stopOpacity={0.25} />
      <stop offset="100%" stopColor="#0A1931" stopOpacity={0} />
    </linearGradient>
  </defs>
<CartesianGrid stroke="#0A1931" strokeOpacity={0.08} />
<XAxis  dataKey="day" axisLine={false} tickLine={false} />

<YAxis axisLine={false} tickLine={false}/>
<Tooltip/>
<Area  type="monotone"
    dataKey="hours"
    stroke="none"
    fill="url(#learningGradient)"/>
<Line type="monotone" dataKey="hours"  stroke="#0A1931"
  strokeWidth={1}  dot={{ r: 4 }}
activeDot={{ r: 6 }}/>
            </LineChart >
        </ResponsiveContainer>

    </div>  
      </div>  
    
  )
}

export default LearningChart