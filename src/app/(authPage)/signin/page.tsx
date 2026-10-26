import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignInForm from "./SignInForm";

// signed-in users have nothing to do here → home with a toast
const SignInPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        redirect("/?toast=already-signed-in");
    }

    return <SignInForm />;
};

export default SignInPage;
