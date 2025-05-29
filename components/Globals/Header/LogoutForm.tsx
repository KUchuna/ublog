import { signoutAction } from "@/app/actions";
import { LogoutButton } from "./LogoutButton";

export default function LogoutForm() {
    return (
        <form action={signoutAction} className="w-fit"><LogoutButton /></form>
    )
}