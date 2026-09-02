import React from 'react'
import { Area, CartesianGrid, ComposedChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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
    
  <div className='w-full h-[345px] bg-[#FFFFFF] p-4 rounded-xl'>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ left: -30, right: 0, top: 10 }}>
          <defs>
            {/* Gradient using your theme's Accent color (#7C8FD6) fading to transparent */}
            <linearGradient id="learningGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C8FD6" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#7C8FD6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          
          {/* Subtle grid lines matching your design structure */}
          <CartesianGrid stroke="#111827" strokeOpacity={0.04}  strokeDasharray="3 3" />
          
          {/* X & Y Axis configured to match the clean minimalist style */}
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12, fontFamily: 'Inter' }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12, fontFamily: 'Inter' }}
            domain={[0, 'dataMax + 2']}
            ticks={[0, 2, 4, 6, 8]}
            unit="h"
          />
          
<Tooltip
  contentStyle={{
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    padding: "10px 12px"
  }}
  labelStyle={{
    color: "#111827",
    fontSize: "12px",
    fontWeight: 600,
    marginBottom: "4px"
  }}
  itemStyle={{
    color: "#7C8FD6",
    fontSize: "13px",
    fontWeight: 500
  }}
  formatter={(value) => [`${value}h`, "Learning"]}
  cursor={{
    stroke: "#7C8FD6",
    strokeWidth: 1,
    strokeDasharray: "4 4"
  }}
/>          
          {/* 
            type="monotoneX" gives the exact horizontal-to-slope bending 
            seen in your screenshot 
          */}
          <Area
            type="monotoneX"
            dataKey="hours"
            fill="url(#learningGradient)"
            stroke="none"
            tooltipType='none'
          />
          
          {/* Main stroke line using your theme's Accent color */}
          <Line
            type="monotoneX"
            dataKey="hours"
            stroke="#7C8FD6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: '#7C8FD6', stroke: '#FFFFFF', strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
      </div>  
    
  )
}

export default LearningChart