import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignUpForm from "./SignUpForm";

const SignUpPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        redirect("/?toast=already-signed-in");
    }

    return <SignUpForm />;
};

export default SignUpPage;
