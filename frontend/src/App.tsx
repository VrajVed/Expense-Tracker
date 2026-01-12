import { useEffect, useState } from 'react'
import { Card, CardHeader,  CardTitle, CardDescription, CardContent } from './components/ui/card';
import './App.css'

import { api } from '@/lib/api';



function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await client.api.expenses["total-spent"].$get();
      const data = await res.json();
      setTotalSpent(data.total);
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
