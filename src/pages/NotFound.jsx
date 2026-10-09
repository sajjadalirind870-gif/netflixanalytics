import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'
export default function NotFound() { return <div className="flex min-h-[70vh] flex-col items-center justify-center text-center"><p className="text-8xl font-black tracking-tighter text-[#E50914]">404</p><h1 className="mt-4 text-2xl font-bold text-white">Page not found</h1><p className="mt-2 text-sm text-gray-500">The page you are looking for may have moved or no longer exists.</p><Link to="/" className="mt-6"><Button variant="primary"><ArrowLeft size={15} />Go to Dashboard</Button></Link></div> }
