"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { DeskTop } from "../devices/desktop";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Chatbot, User } from "@/lib/db/schema";

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
  const commonClass = "font-bold rounded px-4 py-2";
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
          Test Chatbot
        </button>
        <button
          onClick={() => setView(Views.Integration)}
          className={cn(
            commonClass,
            view === Views.Integration ? activeClass : inactiveClass
          )}
        >
          Integration
        </button>
        <button
          onClick={() => setView(Views.TestIntegration)}
          className={cn(
            commonClass,
            view === Views.TestIntegration ? activeClass : inactiveClass
          )}
        >
          Test Integration
        </button>
      </div>
      <div className="pt-4">
        {
          {
            [Views.Test]: (
              <div>
                <div>
                  <div className="w-full mx-auto mt-8">
                    <div className="w-full h-11 rounded-t-lg bg-gray-200 flex justify-start items-center space-x-1.5 px-3">
                      <span className="w-3 h-3 rounded-full bg-red"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow"></span>
                      <span className="w-3 h-3 rounded-full bg-green"></span>
                    </div>
                    <div className="bg-gray-100 border-t-0 w-full h-[60vh] rounded-b-lg">
                      <iframe
                        src="https://youtub.com"
                        referrerPolicy="no-referrer"
                        security="sandbox"
                        same-origin="false"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            ),
            [Views.Integration]: <div>Integration</div>,
            [Views.TestIntegration]: <div>Test Integration</div>,
          }[view]
        }
      </div>
    </div>
  );
}
