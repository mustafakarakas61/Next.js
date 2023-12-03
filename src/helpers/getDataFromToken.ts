import jwt from "jsonwebtoken";
import { cookies} from "next/headers";

export const getDataFromToken = () => {
    try {
        const cookieStore = cookies();
        const token =cookieStore.get('token')?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}