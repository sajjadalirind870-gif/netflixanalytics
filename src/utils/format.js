export const formatCurrency = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(n) || 0)
export const formatNumber = (n) => {
  const value = Number(n) || 0
  if (value >= 1e12) return (value / 1e12).toFixed(1) + 'T'
  if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B'
  if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M'
  if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K'
  return value.toString()
}
export const formatPercent = (n) => `${n > 0 ? '+' : ''}${Number(n || 0).toFixed(1)}%`
export const formatDate = (d) => d ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(d)) : '—'
