import { ChatbotList } from "@/components/user/chatBotList";
import { DefaultComponent } from "@/components/user/defaultComponent";
import { Profile } from "@/components/user/profile";
import { getIdentity } from "@/lib/actions/auth.action";
import Link from "next/link";

export default async function UserPage() {
  const idendity = await getIdentity();
  if (!idendity?.data?.user?.id) {
    return <DefaultComponent />;
  }
  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto gap-4 h-screen px-4 lg:px-8">
      <section className="flex flex-col w-full mt-8">
        <Profile userId={idendity?.data?.user?.id} />
      </section>
      <section>
        <ChatbotList userId={idendity?.data?.user?.id} />
      </section>
    </div>
  );
}
