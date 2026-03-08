"use client"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-red-50 dark:bg-red-950">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center max-w-2xl">
        {/* Warning Icon */}
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
          <svg 
            className="w-10 h-10 text-red-600 dark:text-red-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>

        {/* Main Message */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-red-800 dark:text-red-200">
            Page Temporarily Unavailable
          </h1>
          <p className="text-lg text-red-700 dark:text-red-300 leading-relaxed">
            This page has been temporarily taken down due to excessive spam activity.
          </p>
        </div>

        {/* Additional Information */}
        <div className="bg-white dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6 w-full">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800 dark:text-red-200 text-start text-sm">
                Potential security loophole detected in website&apos;s hostname, path, or protocol. Recommend verifying URL structure for security risks.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800 dark:text-red-200 text-start text-sm">
               Possible URL vulnerability. Check hostname, path, and protocol and authenticate domain database for complete data closure and eraser at the backend.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-4 w-full">
          <p className="text-red-600 dark:text-red-400 text-sm">
            If you believe this is an error, please contact our support team.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              className="rounded-full border border-solid border-red-300 dark:border-red-700 transition-colors flex items-center justify-center bg-white dark:bg-red-900 text-red-700 dark:text-red-300 gap-2 hover:bg-red-50 dark:hover:bg-red-800 font-medium text-sm h-10 px-4 sm:px-5"
              href="mailto:support@yourcompany.com"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </a>
            <button
              className="rounded-full border border-solid border-red-300 dark:border-red-700 transition-colors flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium text-sm h-10 px-4 sm:px-5"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-red-600 dark:text-red-400">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all"
          href="/"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Return Home
        </Link>
        <div className="w-px h-4 bg-red-300 dark:bg-red-700"></div>
        <span className="text-sm">
          Error Code: <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded">SPAM_LOCKOUT_429</code>
        </span>
      </footer>
    </div>
  );
}