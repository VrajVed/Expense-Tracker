import { useEffect, useState } from 'react'
import { Card, CardHeader,  CardTitle, CardDescription, CardContent } from './components/ui/card';
import './App.css'

import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();
  const data = await res.json();
  return data
}

function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  const query = useQuery({queryKey: ['getTotalSpent'], queryFn: )

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await api.expenses["total-spent"].$get();
      // `hono/client` might return the parsed body or a Response-like object.
      if (res && typeof res === 'object' && 'total' in res) {
        setTotalSpent((res as any).total ?? 0);
      } else if (res && typeof (res as Response).json === 'function') {
        const data = await (res as Response).json();
        setTotalSpent(data.total ?? 0);
      } else {
        setTotalSpent(0);
      }
    }
    fetchTotalSpent();
  }, []);

  return (
    <Card className='w-[350]px'>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
        <CardContent>{totalSpent}</CardContent>
      </CardHeader>
    </Card>
  )
}

export default App
