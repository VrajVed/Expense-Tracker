import { useEffect, useState } from 'react'
import { Card, CardHeader,  CardTitle, CardDescription, CardContent } from './components/ui/card';
import './App.css'

import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) {
    throw new Error('Failed to fetch total spent');
  }
  const data = await res.json();
  return data
}

function App() {
  // RPC and async state management with react query without using useState and useEffect.
  const {isPending, error, data} = useQuery({queryKey: ['getTotalSpent'], queryFn: getTotalSpent});

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <Card className='w-[350]px'>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
        <CardContent>{isPending ? "Loading..." : data.total}</CardContent>
      </CardHeader>
    </Card>
  )
}

export default App
