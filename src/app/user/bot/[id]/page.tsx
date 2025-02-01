import { ChatbotPage } from "@/components/chatbot/main";
import { DefaultComponent } from "@/components/user/defaultComponent";
import { getIdentity } from "@/lib/actions/auth.action";
import { getChatbot } from "@/lib/actions/chatbot.action";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SingleChatbotPage({
  params,
}: {
  params: { id: string };
}) {
  const idendity = await getIdentity();
  if (!idendity?.data?.user?.id) {
    return <DefaultComponent />;
  }
  if (!params.id) {
    return redirect("/user");
  }
  const chatbot = await getChatbot(params.id);
  if (!chatbot) {
    return redirect("/user");
  }
  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto gap-4 h-screen px-12 lg:px-8">
      <section className="flex flex-col w-full mt-8">
        <ChatbotPage user={idendity?.data?.user} chatbot={chatbot} />
      </section>
    </div>
  );
}
