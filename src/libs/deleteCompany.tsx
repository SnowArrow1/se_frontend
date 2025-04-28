import { CompanyItem } from "../../interface";
import { getSession } from "next-auth/react";
export default async function deleteCompany(cid:string) {
    const session = await getSession();
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/companies/${cid}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${session?.user?.token}`
            }
        }
    );
    

  const data = await response.json();

    if (!response.ok) {
        
        const errorMessage = data.message || "Failed to delete company";
        throw new Error(errorMessage);

    }

    console.log("deleteComp")
    return data;
}