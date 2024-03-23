import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db, eq, User } from "astro:db";
import { useRef, type ElementRef, type RefObject } from "react";
import { nanoid } from 'nanoid';

const getUser = async (ref: RefObject<ElementRef<'input'>>) => {
    const { value } = ref!.current ?? { value: null};

    const userExists = await db.select().from(User).where(eq(User.username, value));

    if (!userExists) {
        createUser({
            id: nanoid(),
            username: value!,
            lastLoggedIn: new Date(),
        })
    }
}

const createUser = async (userData: { id: string, username: string, lastLoggedIn: Date }) => {
    const finalUserData = {
        ...userData,
        accountCreated: new Date(),
    }
    const result = await db.insert(User).values(userData);

    return result;
}

export function CreateUser() {

    const usernameInput = useRef<ElementRef<'input'>>(null);

    return <form onSubmit={() => getUser(usernameInput)}>
        <Label htmlFor="username">Enter username</Label>
        <Input id="username" ref={usernameInput} />
        <div>
            <Input type="submit" value="Login"/>
        </div>
    </form>

}