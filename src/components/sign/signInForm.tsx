"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { Infer } from "next/dist/compiled/superstruct";
import { toast } from "sonner";
import { Spinner } from "../loader/spinner";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { z } from "zod";
import { InputFieldSign, PasswordFieldSign } from "./signFormFilelds";
import Image from "next/image";
import { signIn, signUp, verifyUserOtp } from "@/lib/actions/auth.action";
import { OtpInput } from "../input/OtpInput";
import { Info } from "lucide-react";
import { signIn as signInWithGoogle } from "@/auth";

const UserSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function SignInForm() {
  //   const client = new QueryClient();
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const verifyOtp = async () => {
    setLoading(true);
    try {
      if (!otp || otp.length !== 6 || otp !== "000000") {
        toast.error("Invalid OTP");
        return;
      }
      if (!email) {
        toast.error("Email not found");
        return;
      }
      const res = await verifyUserOtp(otp, email);
      console.log("res.................................", res);
      if (res) {
        setOtp("");
        toast.success("OTP verified successfully");
        router.push("/user");
      } else {
        toast.error("Error verifying OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: Infer<typeof UserSignInSchema>) => {
    setLoading(true);

    console.log("Candidate Sign in form values", values);

    try {
      const response = await signIn({
        email: values.email.trim().toLowerCase(),
        password: values.password.trim(),
      });
      if (response?.error || !response?.data?.user) {
        toast.error(response?.error ?? "Error signing up");
        setLoading(false);
        return;
      }
      toast.success("Signed in successfully");
      if (!response?.data?.user?.isVerified) {
        setShowOtp(true);
        setLoading(false);
        setEmail(values.email.trim().toLowerCase());
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again later");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h2 className="text-2xl font-bold">
        {showOtp ? "Verify OTP" : "Wecome Back 👋"}
      </h2>
      {showOtp ? (
        <div className="w-full flex-col gap-6 flex items-center justify-center py-4">
          <div className="flex gap-4 items-center justify-center text-yellow">
            <Info />
            <span>{`Enter the test otp: 000000, sent to ${
              email ?? "email"
            }`}</span>
          </div>
          <OtpInput
            value={otp}
            onChange={(value) => {
              setOtp(value);
            }}
            autoFocus={false}
          />
          <button
            onClick={() => {
              verifyOtp();
            }}
            type="button"
            disabled={loading}
            style={{ cursor: "pointer", width: "100%", marginTop: "1rem" }}
            className="text-white  bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center justify-center"
          >
            {loading ? <Spinner /> : "Verify"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit, (error) => {
              console.error(error);
            })}
            className="flex flex-col gap-4 max-w-[800px] w-full justify-center items-center"
          >
            <InputFieldSign
              register={register}
              name="email"
              type="email"
              label="Email Id*"
              error={errors.email}
            />

            <PasswordFieldSign
              register={register}
              name="password"
              label="Password *"
              error={errors.password}
            />

            <button
              type="submit"
              disabled={loading}
              style={{ cursor: "pointer", width: "100%", marginTop: "1rem" }}
              className="text-white  bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex gap-2 items-center justify-center"
            >
              {loading ? (
                <span className="flex gap-2 items-center">
                  <span>Signing In</span>
                  <Spinner />
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
