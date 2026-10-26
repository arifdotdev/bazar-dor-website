import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileView from "./ProfileView";

const ProfilePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // protected → sign in first (with a toast), then come back here
    if (!session) {
        redirect("/signin?toast=login-required&redirect=/profile");
    }

    const { name, email, image } = session.user;

    return <ProfileView user={{ name, email, image: image ?? null }} />;
};

export default ProfilePage;
