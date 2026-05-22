import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const token = process.env.TMDB_API_TOKEN;
  const baseUrl = process.env.TMDB_BASE_URL;
  // Mantém a API do cliente simples, mas ainda permite paginação via React Query.
  const {searchParams} = new URL(request.url)
  const page = searchParams.get("page") ?? "1";

  if (!token || !baseUrl) {
    return NextResponse.json(
      { error: "Variáveis de ambientes não encontadas." },
      { status: 500 },
    );
  }

  const response = await fetch(
    `${baseUrl}/movie/popular?language=pt-BR&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Não foi possivel buscar os filmes da TMDB" },
      { status: response.status },
    );
  }

  const data = await response.json();

  return NextResponse.json(data);
}
