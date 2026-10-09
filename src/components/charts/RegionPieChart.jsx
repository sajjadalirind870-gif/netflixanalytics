import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { regionalData } from '../../data/netflixData'

const colors = ['#E50914', '#B20710', '#FF6B6B', '#FFA00A']
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

export default function RegionPieChart({ data = regionalData, dataKey = 'users', height = 300 }) {
	return (
		<ResponsiveContainer width="100%" height={height}>
			<PieChart>
				<Pie
					data={data}
					dataKey={dataKey}
					nameKey="region"
					cx="50%"
					cy="46%"
					innerRadius={58}
					outerRadius={94}
					paddingAngle={4}
					stroke="none"
					label={({ name, value, x, y, textAnchor }) => (
						<text x={x} y={y} textAnchor={textAnchor} fill="#FFFFFF" style={{ fill: '#FFFFFF', fontSize: 12, fontWeight: 500 }}>
							{`${name}: ${value}`}
						</text>
					)}
					labelLine={{ stroke: '#2F2F2F' }}
				>
					{data.map((entry, index) => <Cell key={entry.region || index} fill={colors[index % colors.length]} />)}
				</Pie>
				<Tooltip {...tooltipStyle} formatter={(value, name) => [value, name]} />
				<Legend
					iconType="circle"
					iconSize={8}
					wrapperStyle={{ color: '#FFFFFF', paddingTop: '10px' }}
					formatter={(value) => <span style={{ color: '#FFFFFF', fontSize: '12px' }}>{value}</span>}
				/>
			</PieChart>
		</ResponsiveContainer>
	)
}
