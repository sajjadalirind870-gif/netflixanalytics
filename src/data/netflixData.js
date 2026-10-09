export const kpis = { totalSubscribers: 260300000, monthlyRevenue: 9800000000, arpu: 11.64, churnRate: 2.1, watchTime: 145000000000, dauMau: 42, completionRate: 87, netAdditions: 8400000 }
export const kpiChanges = { totalSubscribers: 12.5, monthlyRevenue: 8.2, arpu: 3.4, churnRate: -0.3, watchTime: 5.6, dauMau: 2.1, completionRate: 1.8, netAdditions: 15.2 }
export const revenueData = [
  { month: 'Jan', revenue: 8.2, subscribers: 240, churn: 2.5 }, { month: 'Feb', revenue: 8.5, subscribers: 244, churn: 2.4 },
  { month: 'Mar', revenue: 8.7, subscribers: 248, churn: 2.3 }, { month: 'Apr', revenue: 8.9, subscribers: 250, churn: 2.2 },
  { month: 'May', revenue: 9.0, subscribers: 252, churn: 2.2 }, { month: 'Jun', revenue: 9.1, subscribers: 254, churn: 2.1 },
  { month: 'Jul', revenue: 9.2, subscribers: 255, churn: 2.1 }, { month: 'Aug', revenue: 9.3, subscribers: 256, churn: 2.0 },
  { month: 'Sep', revenue: 9.4, subscribers: 257, churn: 2.0 }, { month: 'Oct', revenue: 9.5, subscribers: 258, churn: 2.1 },
  { month: 'Nov', revenue: 9.6, subscribers: 259, churn: 2.1 }, { month: 'Dec', revenue: 9.8, subscribers: 260, churn: 2.1 },
]
export const regionalData = [
  { region: 'US & Canada', users: 73, revenue: 3.2, arpu: 14.2 }, { region: 'Europe', users: 78, revenue: 2.8, arpu: 11.8 },
  { region: 'Asia Pacific', users: 65, revenue: 2.1, arpu: 9.4 }, { region: 'Latin America', users: 44, revenue: 1.7, arpu: 7.8 },
]
export const genreData = [
  { genre: 'Drama', hours: 45, views: 320 }, { genre: 'Comedy', hours: 32, views: 280 }, { genre: 'Action', hours: 38, views: 310 },
  { genre: 'Thriller', hours: 28, views: 210 }, { genre: 'Documentary', hours: 15, views: 90 }, { genre: 'Sci-Fi', hours: 22, views: 180 },
]
export const topContent = [
  { rank: 1, title: 'Stranger Things', views: '1.2B', hours: '850M', completion: 92, genre: 'Sci-Fi' }, { rank: 2, title: 'Wednesday', views: '980M', hours: '720M', completion: 88, genre: 'Comedy' },
  { rank: 3, title: 'Squid Game', views: '890M', hours: '640M', completion: 85, genre: 'Thriller' }, { rank: 4, title: 'The Crown', views: '760M', hours: '580M', completion: 82, genre: 'Drama' },
  { rank: 5, title: 'Money Heist', views: '650M', hours: '510M', completion: 79, genre: 'Action' }, { rank: 6, title: 'The Witcher', views: '580M', hours: '440M', completion: 76, genre: 'Action' },
  { rank: 7, title: 'Bridgerton', views: '520M', hours: '410M', completion: 74, genre: 'Drama' }, { rank: 8, title: 'Ozark', views: '480M', hours: '380M', completion: 71, genre: 'Thriller' },
  { rank: 9, title: 'Dark', views: '420M', hours: '340M', completion: 68, genre: 'Sci-Fi' }, { rank: 10, title: 'Narcos', views: '380M', hours: '300M', completion: 65, genre: 'Drama' },
]
export const recentSignups = [
  { id: 1, email: 'user1@netflix.com', plan: 'Premium', country: 'US', date: '2025-01-15' }, { id: 2, email: 'user2@netflix.com', plan: 'Standard', country: 'UK', date: '2025-01-15' },
  { id: 3, email: 'user3@netflix.com', plan: 'Basic', country: 'IN', date: '2025-01-14' }, { id: 4, email: 'user4@netflix.com', plan: 'Premium', country: 'DE', date: '2025-01-14' },
  { id: 5, email: 'user5@netflix.com', plan: 'Standard', country: 'BR', date: '2025-01-13' },
]
export const planData = [ { plan: 'Basic', users: 52, revenue: 1.2, price: 6.99 }, { plan: 'Standard', users: 104, revenue: 3.6, price: 15.49 }, { plan: 'Premium', users: 104, revenue: 5.0, price: 22.99 } ]
export const deviceData = [ { device: 'Smart TV', users: 120, percentage: 46 }, { device: 'Mobile', users: 78, percentage: 30 }, { device: 'Laptop', users: 42, percentage: 16 }, { device: 'Tablet', users: 20, percentage: 8 } ]
export const funnelData = [ { stage: 'Signups', value: 100 }, { stage: 'Activated', value: 85 }, { stage: 'Watched 1st', value: 78 }, { stage: 'Completed 1st', value: 62 }, { stage: 'Returned W1', value: 54 }, { stage: 'Active 30d', value: 42 } ]
export const peakStreams = [ { hour: '00:00', streams: 45 }, { hour: '06:00', streams: 32 }, { hour: '12:00', streams: 78 }, { hour: '18:00', streams: 145 }, { hour: '21:00', streams: 220 }, { hour: '23:00', streams: 180 } ]
export const mockSubscribers = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, email: `user${i + 1}@netflix.com`, plan: ['Basic', 'Standard', 'Premium'][i % 3], country: ['US', 'UK', 'IN', 'DE', 'BR', 'JP', 'CA', 'AU'][i % 8], status: i % 7 === 0 ? 'Cancelled' : 'Active', joinDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`, monthlySpend: [6.99, 15.49, 22.99][i % 3] }))
