import { cn } from "@/lib/utils";

export function Modal({
  children,
  open,
  setOpen,
  title = "Modal",
}: {
  children: React.ReactNode;
  open: boolean;
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: any;
  title?: string;
}) {
  return (
    <div className="relative z-50">
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tab-index={-1}
        aria-hidden="true"
        className={cn(
          " scrollbar-events-none  bg-black min-h-screen min-w-screen bg-opacity-95 flex h-full w-screen overflow-y-auto overflow-x-hidden fixed top-0 bottom-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full",
          open ? "" : "hidden"
        )}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-crust text-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold ">{title}</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600/90 dark:hover:text-white"
                data-modal-hide="static-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">{children}</div>
            {/* <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="static-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              data-modal-hide="static-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Decline
            </button>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
