import { getSession } from "@/lib/serverApi/server";
import { redirect } from "next/navigation";

const ProfileLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return <>{children}</>;
};

export default ProfileLayout;