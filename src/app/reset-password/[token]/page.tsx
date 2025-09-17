// app/reset-password/[token]/page.tsx
import ResetPasswordPage from "@/components/reset-password/ResetPasswordPage";

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params; // unwrap the Promise
  return <ResetPasswordPage token={token} />;
}
