import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function PasswordFieldSign(props: any) {
  const { register, error, name, label, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full">
      <div className="relative">
        <input
          id={`recuiter_signup_${name}`}
          aria-describedby="outlined_success_help"
          className={cn(
            "flex px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-2 border-subtext0 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-600 peer",
            error && "border-red"
          )}
          placeholder=" "
          {...register(name)}
          {...rest}
          type={showPassword ? "text" : "password"}
        />
        <label
          htmlFor="outlined_success"
          className="rounded-2xl pointer-events-none absolute  bg-mantle text-sm text-subtext0 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]   px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          {label}
        </label>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {!showPassword ? (
            <Eye
              onClick={() => setShowPassword(!showPassword)}
              size={20}
              className="cursor-pointer"
            />
          ) : (
            <EyeOff
              onClick={() => setShowPassword(!showPassword)}
              size={20}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
      <p
        id={`recuiter_signup_${name}`}
        className="mt-2 text-xs text-red dark:text-red max-w-[200px]"
      >
        {error?.message ?? ""}
      </p>
    </div>
  );
}

export function InputFieldSign(props: any) {
  const { register, error, name, label, ...rest } = props;
  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="text"
          id={`recuiter_signup_${name}`}
          aria-describedby="outlined_success_help"
          className={cn(
            "flex px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-2 border-subtext0 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-600 peer",
            error && "border-red"
          )}
          placeholder=" "
          {...register(name)}
          {...rest}
        />
        <label
          htmlFor="outlined_success"
          className="rounded-2xl pointer-events-none absolute  bg-mantle text-sm text-subtext0 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]   px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          {label}
        </label>
      </div>
      <p
        id={`recuiter_signup_${name}`}
        className="mt-2 text-xs text-red dark:text-red"
      >
        {error?.message ?? ""}
      </p>
    </div>
  );
}

export function SelectFieldSign(props: any) {
  const { register, error, name, label, disabled, options, ...rest } = props;
  return (
    <div className="w-full">
      <div className="relative grid">
        <select
          id={`abc_${name}`}
          aria-describedby="outlined_success_help"
          className={cn(
            disabled && " cursor-not-allowed pointer-events-none",
            "flex gap-2 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-0 peer bg-white"
          )}
          placeholder=""
          {...register(name)}
          {...rest}
        >
          <option value="" className="capitalize text-gray-300">
            {`----None-----`}
          </option>
          {options?.map((option: any, index: number) => (
            <option
              key={`${option.value}_${index}`}
              value={option.value}
              className="capitalize pt-2 "
            >
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="w-5 h-5 text-gray-600 absolute right-2.5 bottom-4 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M19 9l-7 7-7-7"
          />
        </svg>

        <label
          htmlFor={`recuiter_signup_${name}`}
          className="rounded-2xl pointer-events-none absolute bg-white text-sm text-gray-600 dark:text-gray-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          {label}
        </label>
      </div>
      <p
        id={`recuiter_signup_${name}`}
        className="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        {error?.message ?? ""}
      </p>
    </div>
  );
}
