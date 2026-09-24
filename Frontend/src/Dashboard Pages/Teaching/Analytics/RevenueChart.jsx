import React from 'react'
import { FiTrendingUp } from 'react-icons/fi'
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const RevenueChart = ({data}) => {
    return (
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6 xl:col-span-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="font-heading text-lg font-semibold text-text">
                        Revenue Overview
                    </h3>
                    <p className="mt-1 font-body text-xs text-text-light">
                        Revenue generated from your courses.
                    </p>
                </div>

                <div className="flex items-center gap-2 font-body text-xs text-success">
                    <FiTrendingUp />
                    14.2% this period
                </div>
            </div>

            <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
                <ResponsiveContainer width='100%' height="100%">
                    <ComposedChart data={data} margin={{ left: -15, right: 0, top: 10 }}>
                        <defs>
                            <linearGradient id='revenueGradient'
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'>
                                <stop offset='0%'
                                    stopColor='#7C8FD6'
                                    stopOpacity={0.25} />
                                <stop offset='100%'
                                    stopColor='#7C8FD6'
                                    stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke='#111827' strokeOpacity={0.04} strokeDasharray='3 3' />
                        <XAxis dataKey='label' axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontFamily: 'Inter' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{
                            fill: '#6B7280',
                            fontSize: 12,
                            fontFamily: 'Inter'
                        }}  unit='' />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                padding: '10px 12px'
                            }}
                            labelStyle={{
                                color: '#111827',
                                fontSize: '12px',
                                fontWeight: 600,
                                marginBottom: '4px'
                            }}
                            itemStyle={{
                                color: '#7C8FD6',
                                fontSize: '13px',
                                fontWeight: 500
                            }}
formatter={(value) => [`₹${value}`, 'Revenue']}
cursor={{
                                stroke: '#7C8FD6',
                                strokeWidth: 1,
                                strokeDasharray: '4 4'
                            }}
                        />
                        <Area
                            type='monotoneX'
                            dataKey='revenue'
                            fill='url(#revenueGradient)'
                            stroke='none'
                            tooltipType='none'
                        />
                        <Line
                            type='monotoneX'
                            dataKey='revenue'
                            stroke='#7C8FD6'
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                r: 5,
                                fill: '#7C8FD6',
                                stroke: '#FFFFFF',
                                strokeWidth: 2
                            }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>)
}

export default RevenueChart