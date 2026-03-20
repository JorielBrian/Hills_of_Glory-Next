// import members from "@/app/api/db";

// export async function PUT (
//     request: Request,
//     context: { params: { id: string } }
// ) {
//     const { id } = context.params;
//     const member = await request.json();

//     const index = members.findIndex(m => m.id === id);
//     members[index] = { id, ...member };
//     return Response.json(members);
// }