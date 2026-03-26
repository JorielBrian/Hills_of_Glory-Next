import { signInWithCredentials } from "@/lib/actions/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await signInWithCredentials(body);

  return Response.json(result);
}