"use client"

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [kycData, setKycData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    fetchKycData();
  }, []);

  useEffect(() => {
    if (kycData.length > 0) {
      startInfiniteScroll();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [kycData]);

  const fetchKycData = async () => {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      setKycData(data.kyc || []);
    } catch (error) {
      console.error('Error fetching KYC data:', error);
    } finally {
      setLoading(false);
    }
  };

  const startInfiniteScroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (!scrollContainer.dataset.original) {
      scrollContainer.dataset.original = scrollContainer.innerHTML;
    }

    const original = scrollContainer.dataset.original;
    scrollContainer.innerHTML = original + original;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    const maxScroll = scrollContainer.scrollHeight / 2;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // When we reach the end, reset to beginning
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
        // Optional: Add a flash effect when restarting
        scrollContainer.style.transition = 'opacity 0.2s';
        scrollContainer.style.opacity = '0.5';
        setTimeout(() => {
          scrollContainer.style.opacity = '1';
          setTimeout(() => {
            scrollContainer.style.transition = '';
          }, 200);
        }, 50);
      }
      
      scrollContainer.style.transform = `translateY(-${scrollPosition}px)`;
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-red-50 dark:bg-red-950">
      {/* Surveillance Banner */}
      <div className="fixed top-0 left-0 right-0 bg-black text-yellow-400 text-center py-2 z-50 font-mono text-sm animate-pulse">
        ⚠️ SITE UNDER ACTIVE SURVEILLANCE - ALL ACTIVITIES ARE BEING MONITORED ⚠️
      </div>

      <main className="flex flex-col gap-8 row-start-2 items-center text-center max-w-6xl w-full mt-8">
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

        {/* KYC Data Scroller */}
        <div className="w-full bg-white dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-200">
              ⚠️ SITE UNDER ACTIVE SURVEILLANCE - SCAM DATA ⚠️ (Live Feed)
            </h2>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-sm text-red-600 dark:text-red-400">LIVE</span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-red-600 dark:text-red-400">
              Loading surveillance data...
            </div>
          ) : (
            <div className="relative h-96 overflow-hidden border border-red-300 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-950">
              {/* Gradient Overlays */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-red-50 dark:from-red-950 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-red-50 dark:from-red-950 to-transparent z-10"></div>
              
              {/* Scrolling Content */}
              <div 
                ref={scrollRef}
                className="absolute inset-0 overflow-hidden p-4"
                style={{ willChange: 'transform' }}
              >
                <div className="space-y-3">
                  {kycData.map((kyc, index) => (
                    <div 
                      key={`${kyc.clerkId}-${index}`}
                      className="bg-white dark:bg-red-900 p-4 rounded-lg border border-red-200 dark:border-red-700 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="text-start">
                          <span className="text-red-500 dark:text-red-400 font-mono text-xs">NAME</span>
                          <p className="font-medium text-red-800 dark:text-red-200">
                            {kyc.firstName} {kyc.lastName}
                          </p>
                        </div>
                        <div className="text-start">
                          <span className="text-red-500 dark:text-red-400 font-mono text-xs">EMAIL</span>
                          <p className="font-medium text-red-800 dark:text-red-200 truncate">
                            {kyc.email}
                          </p>
                        </div>
                        <div className="text-start">
                          <span className="text-red-500 dark:text-red-400 font-mono text-xs">LOCATION</span>
                          <p className="font-medium text-red-800 dark:text-red-200">
                            {kyc.country}, {kyc.state}
                          </p>
                        </div>
                        <div className="text-start">
                          <span className="text-red-500 dark:text-red-400 font-mono text-xs">ACCOUNT</span>
                          <p className="font-medium text-red-800 dark:text-red-200 font-mono text-xs truncate">
                            CLASSIFIED
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="bg-white dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6 w-full">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800 dark:text-red-200 text-start text-sm">
                ⚠️ SURVEILLANCE ACTIVE: Potential security loophole detected in website&apos;s hostname, path, or protocol. All KYC submissions are being logged and monitored.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800 dark:text-red-200 text-start text-sm">
                🔍 UNDER INVESTIGATION: Possible URL vulnerability detected. All traffic is being recorded and analyzed. IP addresses and user agents are being logged.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-4 w-full">
          <p className="text-red-600 dark:text-red-400 text-sm">
            If you believe this is an error, please contact our support team. All communications are recorded for security purposes.
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
          Case #: <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded">SURV-{Math.floor(Math.random() * 10000)}</code>
        </span>
      </footer>
    </div>
  );
}