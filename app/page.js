"use client";

import Input from "@/components/Input";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import Error from "@/components/Error";
import { emailValidation, keyEmpty } from "@/helper/validations";
import { requestProcessor } from "@/helper/requester";
import { useStatusProvider } from "@/providers/status";
import { useAuthProvider } from "@/providers/auth";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function Estimation() {
  const router = useRouter();

  const [_, setStatus] = useStatusProvider();
  const [__, setAuth, ___, setJWT, getJWT] = useAuthProvider();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);

  const [result, setResult] = useState({
    status: "init",
    data: null,
  });

  const welcome = () => {
    router.push("/video");
  };

  useEffect(() => {
    // handle existing auth
    setStatus(false);

    const token = getJWT();

    if (token) {
      setAuth(true);

      welcome();
    } else {
      setShow(true);
    }

    return () => {
      setStatus(false);
    };
  }, []);

  const changehandler = (field, value) => {
    setForm((other_fields) => ({ ...other_fields, [field]: value }));
  };

  const requestHandler = async () => {
    if (emailValidation(form.email)) {
      setResult({ status: "init", data: null });
      setStatus(true);

      const response = await requestProcessor("login", form);

      if (response?.data?.jwt) {
        setResult({ status: "success", data: "Login successfull" });
        setJWT(response?.data?.jwt);
        setAuth(true);

        welcome();
      } else {
        setResult(response);
      }

      setStatus(false);
    } else {
      setResult({ status: "error", data: { message: "Invalid credentials" } });
    }
  };

  return (
    show && (
      <div className="flex flex-col space-y-10 h-full justify-center">
        <Title text="Login" />

        <section className="space-y-8 grid">
          <div className="flex gap-4 items-center flex-wrap">
            <span className="w-full md:w-3/5 m-auto">
              <Input
                placeholder="Enter email"
                changehandler={changehandler}
                form={form}
                field="email"
              />
            </span>
          </div>

          <div className="flex gap-4 items-center flex-wrap">
            <span className="w-full md:w-3/5 m-auto">
              <Input
                placeholder="Enter password"
                changehandler={changehandler}
                form={form}
                field="password"
                type="password"
              />
            </span>
          </div>
        </section>

        <section className="space-y-8 flex flex-col items-center m-auto">
          <section className="space-y-48 m-auto">
            {result.status === "error" && (
              <Error
                text={result.data?.message || "Error processing request"}
              />
            )}
          </section>

          <Button
            text="Login"
            disabled={!keyEmpty(form)}
            handler={requestHandler}
            bg="bg-secondary"
          />
        </section>
      </div>
    )
  );
}
