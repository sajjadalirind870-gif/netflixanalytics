import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
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

export default function ChurnLineChart({ data = revenueData, height = 300 }) {
	return (
		<ResponsiveContainer width="100%" height={height}>
			<LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
				<CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" vertical={false} />
				<XAxis dataKey="month" stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} />
				<YAxis stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} tickFormatter={(value) => `${value}%`} />
				<Tooltip {...tooltipStyle} formatter={(value) => [`${value}%`, 'Churn rate']} />
				<Line
					type="monotone"
					dataKey="churn"
					stroke="#E50914"
					strokeWidth={2}
					dot={{ fill: '#E50914', stroke: '#181818', strokeWidth: 2, r: 4 }}
					activeDot={{ r: 6, fill: '#E50914', stroke: '#FFFFFF', strokeWidth: 2 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}
