'use client';
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/lib/contexts";
import { ArrowRightIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { EmailInput, PasswordInput } from "@/app/components/common/forms";
import type { EmailInputRef, PasswordInputRef } from "@/lib/types/form";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, error: authError } = useAuth();
  const router = useRouter();
  const emailRef = useRef<EmailInputRef>(null);
  const passwordRef = useRef<PasswordInputRef>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate before submission
    const isEmailValid = emailRef.current?.validate() ?? false;
    const isPasswordValid = passwordRef.current?.validate() ?? false;
    
    if (!isEmailValid || !isPasswordValid) {
      return; // Validation messages will show from components
    }
    
    setIsLoading(true);

    const success = await login(email, password);

    if (success) {
      router.push("/account/profile");
    }
    
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="neumorphism-bg p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-green-tertiary">
              Welcome Back!
            </h1>
            <p>Sign in to your account</p>
          </div>


          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <EmailInput
                ref={emailRef}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={isLoading}
                showValidation={true}
                simpleError={true}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <PasswordInput
                ref={passwordRef}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
                showValidation={true}
                simpleError={true}
              />
            </div>

            {/* Error Message */}
          {authError && (
            <div className="mb-6 p-4 bg-white rounded-lg flex items-center gap-3">
              <WarningCircleIcon className="w-5 h-5 text-red-600 mt-0.5" weight="regular" />
              <p className="text-red-600 text-sm">{authError}</p>
            </div>
          )}

            {/* Submit Button */}
            <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full neumorphism-button gap-3 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRightIcon className="w-5 h-5" weight="regular" />
                </>
              )}
            </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link 
                href="/account/register" 
                className="text-green-tertiary font-semibold hover:text-green-700 transition-colors underline underline-offset-2"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
