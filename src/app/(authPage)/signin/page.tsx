import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignInForm from "./SignInForm";

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
