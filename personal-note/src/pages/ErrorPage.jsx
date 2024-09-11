import { useEffect, useState } from "react";
import { MessagesError } from "@components/MessagesError";
import { LogoutButton } from '@components/Button/LogoutButton';
import { RetryButton } from '@components/Button/RetryButton';
import { useAppContext } from '@contexts/AppContext';


export default function ErrorPage() {
  const {errorMessage} = useAppContext();
  const [error, setError] = useState('')

  useEffect(() => {
    const errMsg = errorMessage || `Lỗi đăng nhập!!!`
    setError(errMsg );
  }, [errorMessage]);

  return (
    <main  className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12 bg-black">
    <section className="mx-auto max-w-md">
        <div className="px-4 ">
            <MessagesError message={error}  />

            { !errorMessage && (
              <div className="pt-4 text-center">
              <LogoutButton />
              </div>
            )}

            { errorMessage && (
              <div className="pt-4 text-center">
              <RetryButton />
              </div>
            )}

        </div>
      </section>
    </main>
  );
}
