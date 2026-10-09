import Card from '../ui/Card'
export default function MetricGrid({ metrics, columns = 'xl:grid-cols-4' }) { return <div className={`mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 ${columns}`}>{metrics.map((metric) => <Card key={metric.title} {...metric} />)}</div> }
