"use client";

// import { Button } from "@/components/ui/button";
import Link from "next/link";

import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useState } from "react";

// import AddDoctorForm from "@/components/forms/AddDoctor";
import {
  Query,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
// import { getDoctorList } from "@/lib/actions/chatbot.actions";
import dayjs from "dayjs";
import { getInitials } from "@/lib/utils";
import { DataTable } from "./dataTable";
import { listChatbots } from "@/lib/actions/chatbot.action";
import { AddChatbot } from "./addChatbot";
import { Edit, Eye } from "lucide-react";

export function ChatbotList({ userId }: { userId: string }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChatbotListComponent userId={userId} />
    </QueryClientProvider>
  );
}

export const ChatbotListComponent = ({ userId }: { userId: string }) => {
  const [pagination, setpagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [query, setQuery] = useState<string | undefined>();

  const columns: ColumnDef<any | undefined>[] = [
    {
      accessorKey: "id",
      header: "Chat Bot",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <img
            src={row.original?.avatar ?? "https://github.com/shadcn.png"}
            alt=""
            width={30}
            height={30}
            className="w-10 h-10 rounded-full"
          />
          <p>{row.original?.name}</p>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",

      cell: ({ row }) => {
        return (
          <>{dayjs(row.original?.createdAt).format("MMM DD, YYYY, hh:mm A")}</>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <>{row.original?.status === "active" ? "Active" : "Inactive"}</>;
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <Link
              href={`/user/bot/${row.original?.id}`}
              className="flex gap-2 text-black bg-crust py-1 px-4  font-bold text-white  rounded-2xl text-white shadow-xl border border-white hover:bg-mantle"
            >
              <Eye />
              View
            </Link>
          </div>
        );
      },
    },
  ];

  const {
    data: chatbots,
    isLoading: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["chatbots", pagination.pageIndex, pagination.pageSize, query],
    queryFn: async () => {
      const res = listChatbots({
        limit: pagination.pageSize,
        offset: pagination.pageIndex * pagination.pageSize,
        query,
        userId,
      });
      return res;
    },
    enabled: !!userId,
    staleTime: 1000,
  });

  console.log("chatbots", chatbots);

  return (
    <div className="flex flex-col w-full bg-mantle p-4 rounded-xl">
      <h4 className="text-2xl font-bold">Chatbots</h4>

      <div className="flex flex-col-reverse  lg:flex-row w-full   justify-between gap-4 my-4">
        <div>
          <input
            type="text"
            className="w-full p-2 rounded-xl bg-mantle border"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
        <AddChatbot userId={userId} />
      </div>
      <div className="flex flex-col w-full hidden lg:flex">
        <DataTable
          columns={columns}
          data={chatbots?.data || []}
          pagination={pagination}
          setPagination={setpagination}
          rowCount={chatbots?.total ?? 0}
        />
      </div>
      <div className="flex flex-col w-full lg:hidden">
        {chatbots?.data?.length === 0 ? (
          <div className="flex flex-col w-full items-center justify-center gap-4">
            <p className="text-2xl font-bold">No Chatbots</p>
          </div>
        ) : (
          <div>
            {chatbots?.data?.map((chatbot: any) => (
              <Link
                href={`/user/bot/${chatbot?.id}`}
                key={chatbot.id}
                className="flex flex-col w-full items-center justify-center gap-4 bg-crust p-4 rounded-xl"
              >
                <div className="flex flex-col  items-center justify-between w-full">
                  <div className="flex flex-col items-center gap-2">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={chatbot?.avatar ?? "https://github.com/shadcn.png"}
                      alt=""
                    />
                    <p className="text-xl font-bold">{chatbot?.name}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xl font-bold">
                      {dayjs(chatbot?.createdAt).format(
                        "MMM DD, YYYY, hh:mm A"
                      )}
                    </p>
                    <p className="text-xl font-bold">
                      {chatbot?.status === "active" ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
