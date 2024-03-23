import { User_type } from "@prisma/client";

interface User {
	id: string;
	name: string;
	email: string;
	userType: User_type;
}

export interface SessionType {
	user: User;
}
