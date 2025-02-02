"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { DeskTop } from "../devices/desktop";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Chatbot, User } from "@/lib/db/schema";
import { fetchTitle } from "@/lib/actions/chatbot.action";
import { FlaskConical, MonitorCheck, Workflow, X } from "lucide-react";
import Iframe from "react-iframe";
import { Integration } from "./integration";
import { TestView } from "./test";
import { How } from "./how";

export enum Views {
  Test = "test",
  Integration = "integration",
  TestIntegration = "test-integration",
}

export function ChatbotPage({
  user,
  chatbot,
}: {
  user: Partial<typeof User.$inferSelect>;
  chatbot: typeof Chatbot.$inferSelect;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChatbotPageComponent user={user} chatbot={chatbot} />
    </QueryClientProvider>
  );
}
export function ChatbotPageComponent({
  user,
  chatbot,
}: {
  user: Partial<typeof User.$inferSelect>;
  chatbot: typeof Chatbot.$inferSelect;
  component?: any;
}) {
  const [view, setView] = useState(Views.Test);
  const [extended, setExtended] = useState(true);
  const commonClass =
    "font-bold rounded px-4 py-2 flex items-center gap-2 justify-center";
  const inactiveClass = "text-gray-400";
  const activeClass = "text-white bg-crust border-b border-teal-400";

  return (
    <div>
      <div className="flex flex-row gap-4 border-b-2  border-surface0 border-collapse">
        <button
          onClick={() => setView(Views.Test)}
          className={cn(
            commonClass,
            view === Views.Test ? activeClass : inactiveClass
          )}
        >
          <FlaskConical />
          <p className="hidden lg:block"> Test Chatbot</p>
        </button>
        <button
          onClick={() => setView(Views.Integration)}
          className={cn(
            commonClass,
            view === Views.Integration ? activeClass : inactiveClass
          )}
        >
          <Workflow />
          <p className="hidden lg:block">Integration</p>
        </button>
        <button
          onClick={() => setView(Views.TestIntegration)}
          className={cn(
            commonClass,
            view === Views.TestIntegration ? activeClass : inactiveClass
          )}
        >
          <MonitorCheck />
          <p className="hidden lg:block"> Test Integration</p>
        </button>
      </div>
      <div className="pt-4">
        {
          {
            [Views.Test]: <TestView chatbot={chatbot} />,
            [Views.Integration]: <How />,
            [Views.TestIntegration]: <Integration chatbot={chatbot} />,
          }[view]
        }
      </div>
    </div>
  );
}
