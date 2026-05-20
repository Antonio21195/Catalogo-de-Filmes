import Image from "next/image";
import { Example } from "@/components/getMovies";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <div>
        <Example/>
        <h1>Hi</h1>    
    </div>
  );
}
