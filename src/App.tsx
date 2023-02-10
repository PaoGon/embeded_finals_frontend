import { FC } from 'react'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Dashboard from './components//dashboard';

import './App.css'

const  App: FC = () =>{


  const queryClient = new QueryClient();

  const date_now = new Date();
  console.log(date_now.getMonth());


  return (

    <QueryClientProvider client={queryClient}>
      <Dashboard/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
