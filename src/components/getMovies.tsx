"use client";

import { useQuery } from "@tanstack/react-query";

export function Example() {

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDRmOWJjNDE4M2IwMDhmMTZhNjkwMmQ3M2E5Yzk5NCIsIm5iZiI6MTc3OTIxODg2OC4yNzcsInN1YiI6IjZhMGNiOWI0YzcyNDI3YzIzMTA2OWI3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jMdBZqPEbN4bEek5-2e2V-tL1p7Jb4Z79XM7kRH_krQ'
  }
};

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options).then((res) =>
        res.json(),
),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
        <h1>Dados da API:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong> */}
    </div>
  )
}
