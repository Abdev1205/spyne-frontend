"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("This is not a valid email."),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(3, { message: "Password must be at least 3 characters long" })
    .max(15, { message: "Password must not exceed 15 characters" }),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className=" w-[100%] min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <div className="w-[30rem] bg-white border-[1px] rounded-xl p-6 flex flex-col gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Email  */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem] font-[400]">
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Email"
                      {...field}
                      className="font-[400] rounded-[.2rem] outline-none focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem] font-[400]">
                    Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your Password"
                      {...field}
                      className="font-[400] rounded-[.2rem] outline-none focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className={`rounded-[.2rem] bg-primary hover:bg-primary/85 font-[500] font-poppins py-[1.3rem]  `}
            >
              Login
            </Button>
          </form>
        </Form>

        {/* Or line  */}

        <div className=" flex justify-center items-center gap-[.3rem] my-[.5rem] ">
          <div className=" w-[40%] h-[1px]  bg-[#336dff40] " />
          <span className=" text-gray-400 ">Or</span>
          <div className=" w-[40%] h-[1px] bg-[#336dff40] " />
        </div>

        {/* Google Login stuff */}

        <Button className=" bg-gray-50 text-black font-openSans font-[500] w-full hover:bg-gray-200 py-[1.3rem] shadow-none border-[1px] rounded-[.2rem] ">
          <FcGoogle className=" text-[1.2rem] " /> Login with Google
        </Button>

        {/* Extra Routing stuff */}
        <div className=" flex justify-center gap-[.4rem] mt-[.6rem] ">
          <p className="text-opacity-50 text-textSecondary ">
            Don't have account,
          </p>
          <Link
            className="underline text-black  underline-offset-3"
            href="/auth/register"
          >
            register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;