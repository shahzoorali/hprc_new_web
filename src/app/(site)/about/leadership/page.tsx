import Image from "next/image";
import Link from "next/link";

import { aboutContent } from "@/content/about";

export default function LeadershipPage() {
  // Separate president/VP from other members for featured display
  const featuredLeaders = aboutContent.leadership.slice(0, 2);
  const executiveMembers = aboutContent.leadership.slice(2);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20 sm:py-28">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
        />
      </div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-brand-500/0 via-brand-500/20 to-brand-500/0" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-brand-500/0 via-brand-500/20 to-brand-500/0" />

        <div className="container px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Leadership Team
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Stewards of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-300">
                Excellence
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              A passionate executive team with global experience guides HPRC&apos;s growth 
              across sport, hospitality, and community initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Leaders - President & VP */}
      <section className="relative -mt-16 sm:-mt-20 pb-16 sm:pb-20">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {featuredLeaders.map((leader, index) => (
            <div
              key={leader.name}
                className="group relative"
              >
                {/* Card Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/30 to-brand-600/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
                  {/* Image */}
                  <div className="relative h-72 sm:h-80 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
                    {leader.name === "Chaitanya R. Kumar" ? (
                      <>
                        <Image
                          src="/images/chaitania.jpg"
                          alt={leader.name}
                          fill
                          className="object-cover object-top"
                          quality={90}
                        />
                        {/* Decorative overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                      </>
                    ) : leader.name === "Kunwar Sai Vijender Singh" ? (
                      <>
                        <Image
                          src="/images/kunwar.jpg"
                          alt={leader.name}
                          fill
                          className="object-cover object-top"
                          quality={90}
                        />
                        {/* Decorative overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                      </>
                    ) : (
                      <>
                        {/* Placeholder Pattern */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-slate-400/50 flex items-center justify-center mb-3">
                              <svg className="h-12 w-12 sm:h-16 sm:w-16 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <span className="text-slate-500 text-sm font-medium">Photo Coming Soon</span>
                          </div>
                        </div>
                        {/* Decorative overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                      </>
                    )}
                    
                    {/* Role Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                        index === 0 
                          ? "bg-amber-500 text-amber-950" 
                          : "bg-brand-500 text-white"
                      }`}>
                        {index === 0 && (
                          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                          </svg>
                        )}
                {leader.role}
                      </span>
                    </div>

                    {/* Name on Image */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
                        {leader.name}
                      </h3>
                    </div>
                  </div>

                  {/* Bio Content */}
                  <div className="p-6 sm:p-8">
                    <p className="text-slate-600 leading-relaxed">
                      {leader.bio}
                    </p>
                    
                    {/* Social Links Placeholder */}
                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100">
                      <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Connect</span>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-brand-500 hover:text-white transition-colors">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </button>
                        <button className="p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-brand-500 hover:text-white transition-colors">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Committee Section */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container px-4">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-brand-600 text-sm font-semibold tracking-wider uppercase mb-3">
              Executive Committee
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              The Team Behind Our Success
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Dedicated professionals bringing diverse expertise to drive HPRC forward
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {executiveMembers.map((member, index) => (
              <div
                key={member.name}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-brand-200"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                  {member.name === "C. Sanjay Reddy" ? (
                    <>
                      <Image
                        src="/images/sanjay.jpg"
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        quality={90}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors duration-300" />
                    </>
                  ) : member.name === "Rupesh Y. Shah" ? (
                    <>
                      <Image
                        src="/images/rupesh.jpg"
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        quality={90}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors duration-300" />
                    </>
                  ) : member.name === "Syed Ahmed (Shahbaz)" ? (
                    <>
                      <Image
                        src="/images/syed.jpg"
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        quality={90}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors duration-300" />
                    </>
                  ) : member.name === "Sanjeev Kumar Agarwal" ? (
                    <>
                      <Image
                        src="/images/madhu.jpg"
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        quality={90}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors duration-300" />
                    </>
                  ) : member.name === "Mohammed Nayeem Uddin" ? (
                    <>
                      <Image
                        src="/images/mohammed.jpg"
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        quality={90}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors duration-300" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-slate-300/70 flex items-center justify-center">
                          <svg className="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors duration-300" />
                    </>
                  )}
                  
                  {/* Role Tag */}
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-Committees Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container px-4">
          <div className="space-y-16 max-w-6xl mx-auto">
            {/* Equestrian Committee */}
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  Equestrian Committee Members
                </h3>
                <p className="text-slate-600">
                  Overseeing equestrian activities, training programs, and horse welfare
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {aboutContent.subCommittees.equestrian.map((member, index) => {
                  // Get image path for member
                  const getImagePath = (name: string) => {
                    if (name === "Chaitanya R. Kumar") return "/images/chaitania.jpg";
                    if (name === "Kunwar Sai Vijender Singh") return "/images/kunwar.jpg";
                    if (name === "C. Sanjay Reddy") return "/images/sanjay.jpg";
                    return null;
                  };
                  
                  const imagePath = getImagePath(member.name);
                  
                  return (
                    <div
                      key={index}
                      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 hover:border-brand-300"
                    >
                      {/* Image */}
                      <div className="relative aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                        {imagePath ? (
                          <>
                            <Image
                              src={imagePath}
                              alt={member.name}
                              fill
                              className="object-cover object-top"
                              quality={90}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors duration-300" />
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-20 h-20 rounded-full bg-slate-300/70 flex items-center justify-center">
                                <svg className="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            </div>
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors duration-300" />
                          </>
                        )}
                        
                        {/* Role Tag */}
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6">
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                          {member.name}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Polo Committee */}
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  Polo Committee Members
                </h3>
                <p className="text-slate-600">
                  Overseeing polo activities, tournaments, and player development
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {aboutContent.subCommittees.polo.map((member, index) => {
                  // Get image path for member
                  const getImagePath = (name: string) => {
                    if (name === "Chaitanya R. Kumar") return "/images/chaitania.jpg";
                    if (name === "Kunwar Sai Vijender Singh") return "/images/kunwar.jpg";
                    if (name === "C. Sanjay Reddy") return "/images/sanjay.jpg";
                    if (name === "Arsalan Khan") return "/images/arsalan-khan.jpeg";
                    return null;
                  };
                  
                  const imagePath = getImagePath(member.name);
                  
                  return (
                    <div
                      key={index}
                      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 hover:border-brand-300"
                    >
                      {/* Image */}
                      <div className="relative aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                        {imagePath ? (
                          <>
                            <Image
                              src={imagePath}
                              alt={member.name}
                              fill
                              className="object-cover object-top"
                              quality={90}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors duration-300" />
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-20 h-20 rounded-full bg-slate-300/70 flex items-center justify-center">
                                <svg className="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            </div>
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors duration-300" />
                          </>
                        )}
                        
                        {/* Role Tag */}
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6">
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                          {member.name}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sports Arena Committee */}
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  Sports Arena Committee Members
                </h3>
                <p className="text-slate-600">
                  Managing sports facilities, programs, and athletic activities
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {aboutContent.subCommittees.sportsArena.map((member, index) => {
                  // Get image path for member
                  const getImagePath = (name: string) => {
                    if (name === "Chaitanya R. Kumar") return "/images/chaitania.jpg";
                    if (name === "Kunwar Sai Vijender Singh") return "/images/kunwar.jpg";
                    return null;
                  };
                  
                  const imagePath = getImagePath(member.name);
                  
                  return (
                    <div
                      key={index}
                      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 hover:border-brand-300"
                    >
                      {/* Image */}
                      <div className="relative aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                        {imagePath ? (
                          <>
                            <Image
                              src={imagePath}
                              alt={member.name}
                              fill
                              className="object-cover object-top"
                              quality={90}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors duration-300" />
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-20 h-20 rounded-full bg-slate-300/70 flex items-center justify-center">
                                <svg className="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            </div>
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors duration-300" />
                          </>
                        )}
                        
                        {/* Role Tag */}
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6">
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                          {member.name}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container px-4">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-brand-600 text-sm font-semibold tracking-wider uppercase mb-3">
              What Drives Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles that guide our leadership and shape our community
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {aboutContent.values.map((value, index) => {
              const icons = [
                <svg key="1" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
                <svg key="2" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                <svg key="3" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                <svg key="4" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                <svg key="5" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
              ];
              
              return (
                <div
                  key={value.title}
                  className="group relative bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-5 sm:p-6 hover:border-brand-300 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-100 text-brand-600 mb-4 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                    {icons[index]}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Join Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-300">
                Distinguished Community
              </span>
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
              Become part of Hyderabad&apos;s premier equestrian and lifestyle club, 
              led by a team committed to excellence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/30"
              >
                Explore Membership
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about/heritage"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                Discover Our Heritage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
