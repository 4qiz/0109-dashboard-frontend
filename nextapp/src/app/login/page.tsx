import { LoginForm } from "@/features/auth/ui/login-form";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const error = params?.error;

  return <LoginForm error={error} />;
};

export default Page;
