import React, { useState } from "react";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // Connect to backend or mailing service here
    console.log("Subscribed:", email);
  };

  return (
    <section className="bg-primary-container py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative rounded-xl p-12 overflow-hidden">
        
        {/* Gradient overlay on the right */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/60 to-transparent pointer-events-none"></div>

        {/* Left content */}
        <div className="space-y-6 relative z-10">
          <h2 className="text-3xl font-headline font-bold text-on-primary">
            The Informed Citizen
          </h2>
          <p className="text-on-primary-container max-w-md leading-relaxed">
            Stay ahead of the electoral curve. Get verified updates on candidates
            and election data delivered weekly.
          </p>

          {/* Form */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="bg-white/10 border border-white/20 rounded-lg px-6 py-3 text-white placeholder:text-on-primary-container focus:ring-2 focus:ring-secondary w-full sm:w-64"
            />
            <button
              onClick={handleSubscribe}
              className="bg-secondary-fixed text-on-secondary-fixed font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-secondary transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Decorative verified icon */}
        <div className="hidden md:block relative">
          <div className="w-64 h-64 bg-secondary-container/30 rounded-full blur-3xl absolute -top-12 -right-12"></div>
          <span className="material-symbols-outlined text-[160px] text-white/10">
            verified
          </span>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
