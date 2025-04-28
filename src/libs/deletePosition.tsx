import { getSession } from "next-auth/react";

export default async function deletePosition(pid: string) {
  const session = await getSession();
  
  if (!session || !session.user?.token) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/positions/${pid}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${session.user.token}`,
        "Content-Type": "application/json"
      }
    }
  );

  const data = await response.json();

    if (!response.ok) {
      console.log(data.message)
        const errorMessage = data.message || "Failed to delete position";
        throw new Error(errorMessage);
      }

      console.log("deletePositioin")
  return data;
}
