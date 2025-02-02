import { CopyBlock, dracula } from "react-code-blocks";

const code = `
<iframe src="https://your-chatbot-url.com" width="100%" height="600px"></iframe>
`;

export function How() {
  return (
    <div className="w-full space-y-4 flex flex-col lg:p-8">
      <ul className="list-disc space-y-4 list-inside">
        <li>Step 1: Copy the following code tsx CopyInsert</li>
        <CopyBlock
          language={"html"}
          text={code}
          showLineNumbers={true}
          theme={dracula}
          copied={false}
          //   wrapLines={true}
          codeBlock
        />
        <li>
          Step 2: Replace https://your-chatbot-url.com with the actual URL of
          your chatbot
        </li>
        <li>Step 3: Paste the code at the position</li>
        <li>
          Step 4: Make sure to keep the chatbot prop in the TestView component
        </li>
      </ul>
    </div>
  );
}
