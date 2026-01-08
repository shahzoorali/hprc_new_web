import Image from "next/image";
import Link from "next/link";

// Menu data from HPRC website
const menuPackages = [
  {
    name: "Silver Menu",
    price: "Rs. 900/-",
    gst: "+ GST",
    features: [
      "One Welcome Drink",
      "Starter - 1 Veg & 1 Non-veg (Chicken Only)",
      "Served For 90 Mins Only",
      "Two Salads",
      "One Soup (Veg / Non-veg)",
      "One Main Course Non-veg",
      "Two Main Courses Veg",
      "One Dal / One Noodles",
      "One Flavoured Rice Veg",
      "Two Indian Breads",
      "One Dessert",
      "One Ice Cream",
    ],
  },
  {
    name: "Gold Menu",
    price: "Rs. 1,200/-",
    gst: "+ GST",
    popular: true,
    features: [
      "Two Welcome Drinks",
      "Starters - 2 Veg & 2 Non-veg (Fish/Chicken Only)",
      "Served For 90 Mins Only",
      "Three Salads",
      "Two Soups (Veg / Non-veg)",
      "Two Main Courses Non-veg",
      "Two Main Courses Veg",
      "One Dal & One Paneer",
      "One Flavoured Noodles",
      "One Flavoured Rice Veg",
      "Two Indian Breads",
      "Two Desserts",
      "One Ice Cream",
    ],
  },
  {
    name: "Platinum Menu",
    price: "Rs. 1,800/-",
    gst: "+ GST",
    features: [
      "Two Welcome Drinks",
      "Starters - 2 Veg & 3 Non-veg (Fish/Prawns/Chicken/Mutton)",
      "Served For 90 Mins Only",
      "Five Salads",
      "Two Soups (Veg / Non-veg)",
      "Two Main Courses Non-veg",
      "Three Main Courses Veg",
      "One Dal & One Paneer",
      "One Flavoured Noodles",
      "One Flavoured Rice Veg",
      "Three Indian Breads",
      "Two Desserts",
      "Three Ice Creams",
    ],
  },
];

const banquetMenu = {
  welcomeDrinks: [
    "Watermelon Juice",
    "Pineapple Juice",
    "Jal Jeera / Strawberry Crush Delight",
    "Assorted Soft Drinks",
  ],
  soupsVeg: [
    "Tomatar Dhaniya Shorba",
    "Dal Shorba",
    "Subzi Shorba",
    "Cream of Tomato / Mushroom / Vegetable",
    "Veg Clear Soup",
    "Veg Manchow Soup",
    "Veg Hot & Sour Soup",
    "Veg Noodles Soup",
    "Veg Sweet Corn",
    "Veg Green Peas Soup",
  ],
  soupsNonVeg: [
    "Murgh Subzi Shorba",
    "Chicken Hot & Sour Soup",
    "Chicken Clear Soup",
    "Sweet Corn Chicken Soup",
    "Chicken Manchow Soup",
    "Chicken Noodles Soup",
    "Chicken Lemon Coriander Soup",
  ],
  startersVeg: [
    "Veg Manchuria Dry",
    "Cauliflower Manchuria (Dry)",
    "Aloo-65",
    "Gobi-65",
    "Veg Salt & Pepper",
    "Chilly Gobi",
    "Crispy Potato",
    "Veg Spring Roll",
    "Veg Shangri Roll",
    "Veg Van Ten Roll",
    "Okra (Bhendi)-65",
    "Aloo Tikki",
    "Harabhara Kabab",
    "Veg Sheek Kabab",
    "Makkai Sheek Kabab",
    "Mirchi Bhajji",
    "Masala Vada",
    "Cut Mirchi",
    "Aloo Bajji",
    "Banana Bajji",
  ],
  startersNonVeg: [
    "Red Chilly Fried Chicken",
    "Chicken '65",
    "Ajwaini Fish Tikka",
    "Achari Murgh",
    "Sichuan Chicken",
    "Andhra Chilly Chicken",
    "Chilly Fish",
    "Murgh Mirchi Kebab",
    "Kozhi Sukka Fry",
    "Apollo Fish",
    "Murgh Banno Kebab",
    "Chicken Fried Winglet",
    "Chicken Roast",
    "Murgh Malai Kebab",
    "Pepper Chicken",
    "Andhra Fried Fish",
    "Murgh Angaare",
    "Chicken Manchurian",
    "Fish Amritsari",
    "Murgh Hariyali Kebab",
    "Chilly Chicken",
    "Fish Finger",
  ],
  mainCourseVeg: [
    "Gobi Capsicum Masala",
    "Veg Kholapuri",
    "Aloo Mutter Masala",
    "Channa Masala",
    "Veg Chat Pat",
    "Veg Jaipuri",
    "Nizami Hundi",
    "Baghara Baingan",
    "Baby Corn Masala",
    "Green Peas Masala",
    "Andhra Veg Kurma",
    "Kadai Vegetables",
    "Kasturi Vegetables",
  ],
  paneer: [
    "Paneer Butter Masala",
    "Paneer Chat Pat",
    "Palak Paneer",
    "Methi Chaman Bhahar",
    "Paneer Pasanda",
    "Paneer Kofta Curry",
    "Paneer Mutter Masala",
    "Paneer Kholapuri",
    "Kadai Paneer",
    "Paneer Makhani",
    "Paneer Lababdhar",
  ],
  rice: [
    "Hyd Veg Dum Biryani",
    "Green Peas Pulao",
    "Corn Pulao",
    "Jeera Pulao",
    "Tomato Pulao",
    "Veg Fried Rice",
    "Lemon Rice",
    "Kashmiri Pulao",
    "Navarathan Pulao",
  ],
  desserts: [
    "Double Ka Meetha",
    "Qubani Ka Meetha",
    "Shahi Tukda",
    "Gulab Jamun",
    "Carrot Halwa",
    "Fruit Trifle",
    "Custard With Fruit Salad",
    "Rice Phirni",
    "Moong Dal Halwa",
    "Rasgulla",
    "Khubani-ka-Meetha",
  ],
  iceCream: ["Vanilla", "Strawberry", "Butterscotch"],
};

const termsAndConditions = [
  "The tariff is for the use of the lawns for the agreed period only (For 12 hours from setup to clearance).",
  "You may select One vegetarian dish Rs. 50/- and One Non-vegetarian dish Rs. 75/- extra.",
  "All charges will carry GST 5% and will be as per the norms on the date of billing.",
  "Live Counters: Extra Charge Rs. 150/- per counter (Chat counters 2 varieties, DOSA 2 varieties, NOODLES 2 varieties, PASTA 2 varieties, JELABI).",
  "Party bookings will be considered & confirmed upon payment of 100% of the total payment.",
  "The billing will be on actuals or minimum guaranteed persons as agreed. Children will be charged same as adult.",
  "Buffet & BAR closes at 22:30 hrs. Outside food & beverages are strictly not allowed.",
  "Decoration, stage, DJ, generator with diesel, chairs, round tables, lighting, music & sound will be charged extra.",
  "For generator with diesel Rs. 20,000 will be charged for 7 hours only.",
  "Basic setup will be provided by HPRC. Anything surplus would need to be arranged by the Guest.",
  "All Starters are served for 90 minutes only.",
  "No fireworks shall be entertained as there is livestock all over HPRC.",
  "Usage of Music system (45 decibels) will be allowed up to 10:00 PM with prior permission.",
];

export default function BanquetsPage() {
  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - Using Chukkers venue image */}
        <div className="absolute inset-0">
          <Image
            src="/documents/gallery/chukkers/cha01.jpeg"
            alt="HPRC Banquets Venue"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-stone-950" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              Outdoor & Indoor Options Available
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Banquets & <span className="text-amber-400">Events</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-10">
              At the Hyderabad Polo & Riding Club, we offer banquet facilities with Outdoor & Indoor
              options for our guests to choose from. Our versatile and elegant space is perfect for
              any occasion.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30"
              >
                Plan Your Event
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <a
                href="tel:+919177000056"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +91 9177 00 00 56
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="h-8 w-8 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <span className="inline-block text-amber-600 text-sm font-semibold tracking-wider uppercase mb-3">
                Perfect Venue
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
                Host Unforgettable Events at HPRC
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed mb-6">
                Whether it&apos;s an intimate soiree, a gala dinner, a corporate gathering, or a
                family get-together, our venues can be tailored to meet your needs. With
                state-of-the-art amenities and a dedicated team to ensure seamless execution, we
                guarantee a memorable event for you and your guests.
              </p>
              <p className="text-stone-600 text-lg leading-relaxed mb-8">
                Host your next celebration at HPRC, where sophistication and impeccable service come
                together.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🎪", label: "Outdoor Lawns" },
                  { icon: "🏛️", label: "Indoor Venue" },
                  { icon: "👨‍🍳", label: "Expert Catering" },
                  { icon: "🎵", label: "Entertainment" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 bg-stone-50 rounded-lg p-4"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-stone-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/documents/gallery/chukkers/cha4.jpeg"
                  alt="HPRC Banquet Venue"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-amber-500 text-stone-950 p-6 rounded-xl shadow-xl max-w-[200px]">
                <div className="text-3xl font-bold mb-1">10+</div>
                <div className="text-sm font-medium">Acres of Scenic Venue</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Gallery Section */}
      <section className="py-16 sm:py-24 bg-stone-100">
        <div className="container px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-amber-600 text-sm font-semibold tracking-wider uppercase mb-3">
              Our Spaces
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">Venue Gallery</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Explore our elegant spaces perfect for your special occasions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { src: "/documents/gallery/chukkers/cha01.jpeg", alt: "HPRC Venue - Main Hall" },
              { src: "/documents/gallery/chukkers/cha4.jpeg", alt: "HPRC Venue - Dining Area" },
              { src: "/documents/gallery/chukkers/cha5.jpeg", alt: "HPRC Venue - Event Space" },
              { src: "/documents/gallery/snaffles/bis01.jpeg", alt: "HPRC Bistro Setting" },
              { src: "/documents/gallery/snaffles/bis02.jpeg", alt: "HPRC Indoor Dining" },
              { src: "/documents/gallery/snaffles/bis03.jpeg", alt: "HPRC Restaurant Ambiance" },
              { src: "/documents/gallery/swimming/pool1.jpg", alt: "HPRC Poolside Venue" },
              { src: "/documents/gallery/swimming/pool2.jpg", alt: "HPRC Outdoor Area" },
            ].map((image, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl shadow-lg ${
                  index === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <div className={`relative ${index === 0 ? "h-80 md:h-full" : "h-40 md:h-48"}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes={
                      index === 0
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 50vw, 25vw"
                    }
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <svg
                        className="h-6 w-6 text-stone-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/events/photo-gallery"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
            >
              View Full Gallery
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Menu Packages Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-stone-900 to-stone-950">
        <div className="container px-4">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-amber-400 text-sm font-semibold tracking-wider uppercase mb-3">
              Catering Packages
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Our Menu Packages
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto text-lg">
              Choose from our carefully curated menu packages designed to delight your guests
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {menuPackages.map((pkg, idx) => (
              <div
                key={pkg.name}
                className={`relative group ${pkg.popular ? "md:-mt-4 md:mb-4" : ""}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      ★ MOST POPULAR
                    </span>
                  </div>
                )}

                <div
                  className={`relative h-full rounded-2xl overflow-hidden ${
                    pkg.popular
                      ? "bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 shadow-2xl shadow-amber-500/20 ring-2 ring-amber-400"
                      : "bg-stone-800 border border-stone-700 hover:border-stone-600"
                  } transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
                >
                  <div className="p-6 sm:p-8">
                    <h3
                      className={`text-2xl font-bold mb-2 ${pkg.popular ? "text-stone-950" : "text-white"}`}
                    >
                      {pkg.name}
                    </h3>
                    <div className="mb-6 pb-6 border-b border-white/20">
                      <span
                        className={`text-4xl sm:text-5xl font-extrabold ${pkg.popular ? "text-stone-950" : "text-amber-400"}`}
                      >
                        {pkg.price}
                      </span>
                      <span
                        className={`text-sm ml-2 ${pkg.popular ? "text-stone-800" : "text-stone-500"}`}
                      >
                        {pkg.gst}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIdx) => (
                        <li
                          key={featureIdx}
                          className={`flex items-start gap-3 text-sm ${pkg.popular ? "text-stone-900" : "text-stone-300"}`}
                        >
                          <svg
                            className={`h-5 w-5 flex-shrink-0 mt-0.5 ${pkg.popular ? "text-stone-950" : "text-amber-400"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="inline-flex items-center gap-2 text-stone-400 text-sm bg-stone-800/50 px-5 py-3 rounded-full">
              <svg
                className="h-4 w-4 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                <strong className="text-stone-300">Note:</strong> Plain rice, Sambar, Mirchi ka
                salan, Raitha, Curd, Papad, pickles are accompaniments.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Full Menu Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container px-4">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-amber-600 text-sm font-semibold tracking-wider uppercase mb-3">
              Complete Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">Banquet Menu</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Explore our extensive menu selection and customize your event catering
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Welcome Drinks */}
            <MenuCard title="Welcome Drinks" items={banquetMenu.welcomeDrinks} icon="🍹" />

            {/* Soups Veg */}
            <MenuCard title="Soups (Veg)" items={banquetMenu.soupsVeg} icon="🥣" />

            {/* Soups Non-Veg */}
            <MenuCard title="Soups (Non-Veg)" items={banquetMenu.soupsNonVeg} icon="🍲" />

            {/* Starters Veg */}
            <MenuCard title="Starters (Veg)" items={banquetMenu.startersVeg} icon="🥗" />

            {/* Starters Non-Veg */}
            <MenuCard title="Starters (Non-Veg)" items={banquetMenu.startersNonVeg} icon="🍗" />

            {/* Main Course Veg */}
            <MenuCard title="Main Course (Veg)" items={banquetMenu.mainCourseVeg} icon="🍛" />

            {/* Paneer */}
            <MenuCard title="Paneer Dishes" items={banquetMenu.paneer} icon="🧀" />

            {/* Rice */}
            <MenuCard title="Rice & Biryani" items={banquetMenu.rice} icon="🍚" />

            {/* Desserts */}
            <MenuCard title="Desserts" items={banquetMenu.desserts} icon="🍮" />

            {/* Ice Cream */}
            <MenuCard title="Ice Cream" items={banquetMenu.iceCream} icon="🍨" />
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-16 sm:py-24 bg-stone-100">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-amber-600 text-sm font-semibold tracking-wider uppercase mb-3">
                Important Information
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
                Terms & Conditions
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-stone-200">
              <ul className="space-y-4">
                {termsAndConditions.map((term, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-7 h-7 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-semibold">
                      {idx + 1}
                    </span>
                    <p className="text-stone-600 leading-relaxed">{term}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-stone-200">
                <div className="flex flex-wrap gap-4 text-sm text-stone-500">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-amber-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Buffet closes at 22:30 hrs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-amber-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>100% advance payment required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-amber-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                    <span>No outside food allowed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/documents/gallery/chukkers/cha5.jpeg"
            alt="HPRC Event Venue"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/80" />
        </div>

        <div className="container px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Plan Your <span className="text-amber-400">Perfect Event?</span>
            </h2>
            <p className="text-stone-300 text-lg mb-10 max-w-xl mx-auto">
              Contact us today to discuss your requirements and let our team create an unforgettable
              celebration for you and your guests.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30"
              >
                Get in Touch
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <a
                href="mailto:info@hprc.co.in"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                info@hprc.co.in
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Menu Card Component
function MenuCard({ title, items, icon }: { title: string; items: string[]; icon: string }) {
  return (
    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 px-5 py-4 flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
      <div className="p-5 max-h-64 overflow-y-auto">
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-stone-600">
              <span className="text-amber-500 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
