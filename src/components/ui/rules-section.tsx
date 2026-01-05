type RuleCategory = {
  category: string;
  items: string[];
};

type RulesSectionProps = {
  categories: RuleCategory[];
  eyebrow?: string;
  title: string;
  description?: string;
};

// Category color themes
const getCategoryTheme = (category: string) => {
  const lowerCategory = category.toLowerCase();
  
  if (lowerCategory.includes("safety") || lowerCategory.includes("hygiene")) {
    return { bg: "bg-emerald-50", border: "border-emerald-200", iconBg: "bg-emerald-100", iconText: "text-emerald-600", badge: "bg-emerald-600" };
  }
  if (lowerCategory.includes("equipment")) {
    return { bg: "bg-blue-50", border: "border-blue-200", iconBg: "bg-blue-100", iconText: "text-blue-600", badge: "bg-blue-600" };
  }
  if (lowerCategory.includes("etiquette") || lowerCategory.includes("conduct") || lowerCategory.includes("ground")) {
    return { bg: "bg-violet-50", border: "border-violet-200", iconBg: "bg-violet-100", iconText: "text-violet-600", badge: "bg-violet-600" };
  }
  if (lowerCategory.includes("general")) {
    return { bg: "bg-amber-50", border: "border-amber-200", iconBg: "bg-amber-100", iconText: "text-amber-600", badge: "bg-amber-600" };
  }
  if (lowerCategory.includes("important") || lowerCategory.includes("guideline")) {
    return { bg: "bg-rose-50", border: "border-rose-200", iconBg: "bg-rose-100", iconText: "text-rose-600", badge: "bg-rose-600" };
  }
  return { bg: "bg-brand-50", border: "border-brand-200", iconBg: "bg-brand-100", iconText: "text-brand-600", badge: "bg-brand-600" };
};

// Icon mapping based on category keywords
const getCategoryIcon = (category: string) => {
  const lowerCategory = category.toLowerCase();
  
  if (lowerCategory.includes("safety") || lowerCategory.includes("hygiene")) {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }
  
  if (lowerCategory.includes("equipment")) {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    );
  }
  
  if (lowerCategory.includes("etiquette") || lowerCategory.includes("conduct") || lowerCategory.includes("ground")) {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  }
  
  // Default icon
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

export function RulesSection({ categories, eyebrow, title, description }: RulesSectionProps) {
  return (
    <section className="container space-y-8 sm:space-y-12">
      {(eyebrow || title || description) && (
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          {eyebrow && (
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-brand-600">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-900">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-6 sm:space-y-8">
        {categories.map((ruleCategory, categoryIndex) => {
          const theme = getCategoryTheme(ruleCategory.category);
          return (
            <div
              key={ruleCategory.category}
              className={`group overflow-hidden border-2 ${theme.border} bg-white rounded-3xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}
            >
              {/* Category Header */}
              <div className={`relative overflow-hidden bg-gradient-to-r ${theme.bg} px-6 py-5 sm:py-6`}>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="relative flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${theme.iconBg} ${theme.iconText} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    {getCategoryIcon(ruleCategory.category)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {ruleCategory.category}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {ruleCategory.items.length} {ruleCategory.items.length === 1 ? 'rule' : 'rules'}
                    </p>
                  </div>
                  <div className={`hidden sm:flex h-10 w-10 items-center justify-center rounded-full ${theme.badge} text-white font-bold`}>
                    {String(categoryIndex + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
              
              {/* Rules Grid */}
              <div className="p-5 sm:p-6">
                <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {ruleCategory.items.map((item, itemIndex) => (
                    <div
                      key={item}
                      className="group/item relative flex items-start gap-3 p-4 bg-gray-50 hover:bg-white border border-gray-200 hover:border-brand-300 rounded-xl transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${theme.iconBg} ${theme.iconText} font-bold transition-all duration-300 group-hover/item:scale-110 group-hover/item:${theme.badge} group-hover/item:text-white`}>
                          {itemIndex + 1}
                        </div>
                      </div>
                      <span className="flex-1 text-sm text-gray-700 leading-relaxed">
                        {item}
                      </span>
                      <div className={`absolute right-3 top-3 h-1.5 w-1.5 rounded-full ${theme.badge} opacity-0 transition-opacity duration-300 group-hover/item:opacity-100`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
