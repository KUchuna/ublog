import AuthForm from "@/components/Auth/AuthForm";
import { signInAction } from "@/app/actions";

export default function Login() {

    async function handleLogin(formData: FormData) {
        "use server"

        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const rememberMe = formData.get("remember") == "on" ? true : false
        const callbackUrl = formData.get("callbackUrl") as string

        try {
           const response = await signInAction({email, password, rememberMe, callbackUrl})
           return response
        } catch (error) {
            return
        }
        
    }

    return (
        <div className="flex justify-center items-center w-full h-full px-10">
            <AuthForm 
                handleLogin={handleLogin}
                registration={false}
            />
        </div>
    )
}