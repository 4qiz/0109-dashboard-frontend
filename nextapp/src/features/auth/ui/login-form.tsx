import { Button } from "@/shared/ui/button";
import { login } from "../actions/login";

type Props = {
  error: string | undefined;
};

export const LoginForm = ({ error }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 border p-6 rounded-lg">
        <h1 className="text-2xl font-semibold">Welcome back</h1>

        {error && (
          <div className="text-sm text-destructive border border-destructive p-2 rounded">
            {error}
          </div>
        )}

        <form action={login} className="space-y-4">
          <div>
            <label>Email</label>
            <input
              name="login"
              placeholder="email@example.com"
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="******"
              className="border p-2 w-full rounded"
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
