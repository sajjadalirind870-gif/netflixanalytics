import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { genreData } from '../../data/netflixData'

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

export default function GenreBarChart({ data = genreData, height = 300 }) {
	return (
		<ResponsiveContainer width="100%" height={height}>
			<BarChart data={data} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
				<CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" vertical={false} />
				<XAxis dataKey="genre" stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} interval={0} />
				<YAxis stroke="#808080" tick={{ fill: '#808080', fontSize: 12 }} axisLine={{ stroke: '#2F2F2F' }} tickLine={{ stroke: '#2F2F2F' }} />
				<Tooltip {...tooltipStyle} />
				<Bar dataKey="hours" name="Watch hours (M)" fill="#E50914" radius={[4, 4, 0, 0]} maxBarSize={42} />
			</BarChart>
		</ResponsiveContainer>
	)
}
