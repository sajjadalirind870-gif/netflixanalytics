import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { revenueData } from '../../data/netflixData'

const tooltipStyle = {
	contentStyle: {
		backgroundColor: '#181818',
		border: '1px solid #2F2F2F',
		borderRadius: '8px',
		color: '#FFFFFF',
		boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
	},
	labelStyle: { color: '#FFFFFF', fontWeight: 600, marginBottom: '4px' },
	itemStyle: { color: '#FFFFFF' },
	cursor: { fill: 'rgba(229, 9, 20, 0.1)' },
	wrapperStyle: { zIndex: 1000 },
}

export default function RevenueAreaChart({ data = revenueData, dataKey = 'revenue', height = 300 }) {
	return (
		<ResponsiveContainer width="100%" height={height}>
			<AreaChart data={data} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
				<defs>
					<linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#E50914" stopOpacity={0.32} />
						<stop offset="95%" stopColor="#E50914" stopOpacity={0.01} />
					</linearGradient>
				</defs>
				<CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" vertical={false} />
				<XAxis dataKey="month" stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} />
				<YAxis stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} tickFormatter={(value) => `$${value}B`} />
				<Tooltip {...tooltipStyle} formatter={(value) => [`$${value}B`, 'Revenue']} />
				<Area type="monotone" dataKey={dataKey} stroke="#E50914" strokeWidth={2.5} fill="url(#revenueFill)" activeDot={{ r: 5, fill: '#E50914', stroke: '#181818', strokeWidth: 2 }} />
			</AreaChart>
		</ResponsiveContainer>
	)
}
