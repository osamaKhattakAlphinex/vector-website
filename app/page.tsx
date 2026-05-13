'use client'
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";


export default function Page() {

    return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-zinc-900 border border-red-500/30 rounded-2xl p-10 text-center shadow-2xl">
        
        {/* Badge */}
        <div className="inline-block px-4 py-1 mb-6 text-sm font-semibold tracking-wide text-red-400 bg-red-500/10 border border-red-500/20 rounded-full">
          WEBSITE SUSPENDED
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Coming Soon
        </h1>

        {/* Message */}
        <p className="text-zinc-300 text-lg leading-relaxed mb-8">
          This website is temporarily unavailable due to a pending payment.
          <br />
          Please clear the outstanding balance to continue the service.
        </p>

        {/* Highlight Box */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 mb-8">
          <p className="text-red-400 font-medium">
            “Complete the payment to reactivate the website.”
          </p>
        </div>

        {/* Button */}
        {/* <button className="px-6 py-3 bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-xl text-white font-semibold shadow-lg">
          Contact Developer
        </button> */}
      </div>
    </div>
  );
    // return (
    //     <>
    //         <Hero />
    //         <Portfolio />
    //         <Features />
    //         <Pricing />
    //         <Faq />
    //         <CTA />
    //     </>
    // );
}
