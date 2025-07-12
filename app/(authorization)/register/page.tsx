import AuthForm from "@/components/Auth/AuthForm";
import { signUpAction } from "@/app/actions";


export default function Register() {

    async function handleSignUp(formData: FormData) {
        "use server"

        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const response = await signUpAction({name, email, password})
            return response
        } catch (error) {
            return
        }
            
    }

    return (
        <div className="flex justify-center items-center w-full h-full px-10">
            <AuthForm 
                handleSignUp={handleSignUp}
                registration
            />
        </div>
    )
}