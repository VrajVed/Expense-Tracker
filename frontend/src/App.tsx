import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardHeader,  CardTitle, CardDescription, CardContent } from './components/ui/card';
import './App.css'

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/api/expenses')
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
