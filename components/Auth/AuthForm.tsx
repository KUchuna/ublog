import Image from "next/image";
import Loading from "@/components/Globals/Loading";
import Link from "next/link";

export default function AuthForm({errors, handleSubmit, loading, registration, notFound} :
    {
        errors: {[key: string]: string},
        handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
        loading: boolean,
        registration: boolean,
        notFound? : boolean
    }
) {
    return (
        <>
            <div className="flex w-full max-w-[1200px] h-[700px] rounded-2xl shadow-2xl overflow-hidden">
                <div className="w-[60%] h-full relative">
                    <Image
                    src="/images/authimage.png"
                    alt="logo"
                    fill
                    className="object-cover"
                    />
                </div>
                <div className="w-[40%] py-10 px-10 flex flex-col justify-center">
                    <h1 className="text-5xl font-bold">{registration ? "Welcome!" : "Welcome back!"}</h1>
                    <p className="font-sm text-gray-500 my-5">Please login to continue.</p>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                        {registration && (
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Name</label>
                                <input name="name" id="name" className={`bg-white border focus:border-secondary outline-none rounded-lg px-2 py-2 ${errors.name ? "border-red-rich" : "border-gray-300"}`} placeholder="John Smith"></input>
                                {errors.name && <p className="text-sm text-red-rich italic -mt-2">{errors.name}</p>}
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input name="email" id="email" type="text" className={`bg-white border  focus:border-secondary outline-none rounded-lg px-2 py-2 ${errors.email || notFound ? "border-red-rich" : "border-gray-300"}`} placeholder="you@example.com"></input>
                            {errors.email && <p className="text-sm text-red-rich italic -mt-2">{errors.email}</p>}
                            {notFound && <p className="text-sm text-red-rich italic -mt-2">No such credentials were found</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <input name="password" id="password" type="password" className={`bg-white border focus:border-secondary outline-none rounded-lg px-2 py-2 ${errors.password || notFound ? "border-red-rich" : "border-gray-300"}`} placeholder="Enter your password"></input>
                            {errors.password && <p className="text-sm text-red-rich italic -mt-2">{errors.password}</p>}
                        </div>
                        <button className={`bg-main text-white font-bold rounded-lg py-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"} flex justify-center items-center hover:bg-main-hover`} disabled={loading}>{loading ? <Loading /> : (registration ? "Register" : "Log in")}</button>
                    </form>
                    <p className="text-sm text-center mt-10">{registration ? "Already have an account?" : "Don't have an account?"} <Link href={`${registration ? "/login" : "/register"}`} className="font-bold text-main hover:text-main-hover">{registration ? "Log in here" : "Sign up here"}</Link></p>
                </div>
            </div>
        </>
    )
}