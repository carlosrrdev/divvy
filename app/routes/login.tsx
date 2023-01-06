import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => ({
  title: "Divvy - Login",
});

export default function Login() {
  return (
    <div>
      <p>login page</p>
    </div>
  );
}
