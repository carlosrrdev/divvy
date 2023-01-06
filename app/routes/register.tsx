import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => ({
  title: "Divvy - Register",
});

export default function Register() {
  return (
    <div>
      <p>register page</p>
    </div>
  );
}
