import LoginForm from "@/components/LoginForm";
export default function Home() {
  return (
    <main className="">
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoginForm />
      </div>
    </main>
  );
}
