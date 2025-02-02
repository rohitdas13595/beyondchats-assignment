import { cn } from "@/lib/utils";
import { Clock1, SendHorizontal, X } from "lucide-react";
import { useState } from "react";
import Iframe from "react-iframe";
import styles from "./styles.module.css";

export function Integration({ chatbot }: { chatbot: any }) {
  const [extended, setExtended] = useState(false);
  return (
    <div>
      <div>
        <div className="w-full mx-auto mt-8">
          <div className="w-full h-11 rounded-t-lg bg-gray-200 flex justify-start items-center space-x-1.5 px-3">
            <span className="w-3 h-3 rounded-full bg-red"></span>
            <span className="w-3 h-3 rounded-full bg-yellow"></span>
            <span className="w-3 h-3 rounded-full bg-green"></span>
          </div>
          <div className="bg-gray-100 border-t-0 w-full h-[60vh] rounded-b-lg relative">
            <div className="w-full h-full">
              <Iframe
                url={chatbot.website ?? ""}
                width="100%"
                height="100%"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
              />
            </div>
            <div className="absolute bottom-4 right-4  ">
              {extended ? (
                <div className="rounded-xl overflow-hidden border border-crust bg-white shadow-2xl">
                  <div className="flex bg-crust p-2 gap-2 items-center justify-between">
                    <img src="/images/logo.png" alt="" height={30} width={30} />
                    <h2 className="text-center text-teal ">
                      {chatbot?.name ?? "chatbot"}
                    </h2>
                    <X
                      className="p-1  hover:bg-red  text-white rounded-full "
                      onClick={() => setExtended(false)}
                    />
                  </div>
                  <div
                    className={cn(
                      "h-[400px] w-full relative overflow-y-auto",
                      styles.container
                    )}
                  >
                    <ChatConversation />
                  </div>
                  <div className=" flex  p-2  gap-2  w-full h-full justify-center items-center ">
                    <input
                      type="text"
                      placeholder="Message"
                      className="focus:outline-none  rounded-xl border border-crust w-full p-1 text-black"
                    />
                    <SendHorizontal
                      size={38}
                      className="text-teal-500 bg-crust p-2 rounded-full hover:bg-mantle"
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setExtended(true);
                  }}
                  className="flex justify-center items-center p-1 rounded-full bg-green hover:bg-blue"
                >
                  <img src="/images/logo.png" alt="" height={50} width={50} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ChatConversation = () => {
  const messages = [
    { id: 1, text: "Hello, how are you?", sender: "other" },
    { id: 2, text: "I'm good, thanks!", sender: "other" },
    { id: 3, text: "Hi, what's up?", sender: "me" },
    { id: 4, text: "Not much, just chillin'", sender: "me" },
    { id: 5, text: "That sounds great!", sender: "other" },
    { id: 6, text: "Yeah, it is!", sender: "me" },
  ];

  return (
    <div className="flex-1 w-full p-2 ">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex w-full gap-2 my-2 ",
            message.sender === "me"
              ? "justify-end flex-row-reverse"
              : "justify-start"
          )}
        >
          <div
            className={cn(
              "flex w-full gap-1 ",
              message.sender === "me" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div className="flex w-8 h-8 p-1 bg-crust rounded-full">
              <img src="/images/logo.png" alt="" />
            </div>
            <div
              className={cn(
                "flex flex-col gap-2 max-w-[80%] p-2 rounded-lg",
                message.sender === "me"
                  ? "items-end bg-crust text-white rounded-tr-none"
                  : "bg-surface0 text-white rounded-tl-none"
              )}
            >
              <div className="flex items-center gap-2  p-1 rounded-full">
                <Clock1 size={14} />
                <span className="text-xs">1:30 PM</span>
              </div>
              <p className={cn("text-sm")}>{message.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
