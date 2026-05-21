import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.TMDB_API_TOKEN;
  const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

  if (!token || !baseUrl) {
    return NextResponse.json(
      { error: "Variáveis de ambientes não encontadas." },
      { status: 500 },
    );
  }

  const response = await fetch(
    `${baseUrl}/movie/popular?language=en-US&page=1`,
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
