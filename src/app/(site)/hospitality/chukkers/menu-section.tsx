"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";

interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  category?: string;
  popular?: boolean;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    name: "Starters",
    items: [
      { name: "Paneer Tikka", description: "Crispy cottage cheese cubes tempered with aromatic spices", popular: true },
      { name: "Chicken Tikka", description: "Tender chicken pieces cooked in traditional Mughlai gravy", popular: true },
      { name: "Seekh Kebab", description: "Minced lamb skewers grilled to perfection" },
      { name: "Hara Bhara Kabab", description: "Spiced green peas dumplings in a rich gravy" },
    ],
  },
  {
    name: "Main Course",
    items: [
      { name: "Butter Chicken", description: "Classic chicken curry in a rich tomato gravy", price: "Rs. 350" },
      { name: "Mutton Biryani", description: "Aromatic basmati rice layered with tender mutton", price: "Rs. 450", popular: true },
      { name: "Dal Makhani", description: "Black lentils cooked with aromatic spices", price: "Rs. 280" },
      { name: "Vegetable Biryani", description: "Fragrant rice with mixed vegetables", price: "Rs. 380" },
      { name: "Chicken Curry", description: "Chicken in a spiced onion-tomato gravy", price: "Rs. 320" },
      { name: "Kadai Paneer", description: "Cottage cheese cubes in a cashew gravy", price: "Rs. 380" },
    ],
  },
  {
    name: "Breads & Rice",
    items: [
      { name: "Naan", description: "Traditional tandoori bread", price: "Rs. 50" },
      { name: "Roti", description: "Whole wheat flatbread", price: "Rs. 40" },
      { name: "Jeera Rice", description: "Cumin-flavored basmati rice", price: "Rs. 180" },
      { name: "Garlic Naan", description: "Flavorful naan with garlic", price: "Rs. 60" },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Gulab Jamun", description: "Sweet rose water flavored dumplings", price: "Rs. 150", popular: true },
      { name: "Kheer", description: "Creamy rice pudding with nuts and saffron", price: "Rs. 180" },
      { name: "Ras Malai", description: "Velvety sweet milk dessert", price: "Rs. 200" },
    ],
  },
  {
    name: "Beverages",
    items: [
      { name: "Fresh Lime Soda", description: "Refreshing homemade lime soda", price: "Rs. 80" },
      { name: "Masala Chai", description: "Traditional spiced tea", price: "Rs. 60" },
      { name: "Buttermilk", description: "Cooling sweet yogurt drink", price: "Rs. 70" },
    ],
  },
];

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>("Starters");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleItem = (itemName: string) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };

  return (
    <section className="bg-gradient-to-br from-brand-50 to-brand-100/50 py-12 sm:py-16 border-t border-brand-200">
      <div className="container">
        <SectionHeading
          eyebrow="Our Menu"
          title="Authentic Flavors"
          description="Explore our carefully curated menu featuring the finest ingredients and traditional recipes passed down through generations."
        />

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 border-b border-brand-200">
            {menuCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category.name)}
                className={`flex-shrink-0 px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${
                  activeCategory === category.name
                    ? "text-brand-600 border-brand-600"
                    : "text-gray-500 border-transparent hover:text-brand-600"
                }`}
              >
                {category.name}
                {category.items.some((item) => item.popular) && (
                  <span className="ml-2 inline-flex items-center gap-1 bg-brand-500 text-[10px] sm:text-xs text-white px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Image Reference */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-brand-200 bg-white shadow-lg">
          <div className="relative h-48 sm:h-64 lg:h-80">
            <Image
              src="/documents/menu-chukkers-food-01.jpg"
              alt="Chukkers Food Menu"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent" />
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {menuCategories.map(
            (category) =>
              activeCategory === category.name && (
                <div key={category.name} className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-brand-900 font-display">
                      {category.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {category.items.length} items
                    </span>
                  </div>

                  {/* Category Items */}
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="group rounded-xl border border-brand-200 bg-white p-4 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                          <div className="flex-1 sm:flex-1">
                            <div className="flex items-start gap-3">
                              <div className="h-2 w-2 rounded-full bg-brand-500 flex-shrink-0 mt-1" />
                              <div>
                                <h4 className="text-base sm:text-lg font-bold text-brand-900 group-hover:text-brand-600 transition-colors duration-300">
                                  {item.name}
                                </h4>
                                {item.description && (
                                  <p className="text-sm text-gray-600 mt-1">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {item.price && (
                            <div className="flex-shrink-0 text-right">
                              <div className="text-2xl sm:text-3xl font-bold text-brand-600">
                                {item.price}
                              </div>
                            </div>
                          )}

                          {/* Expand/Collapse Button */}
                          <button
                            onClick={() => toggleItem(item.name)}
                            className="ml-auto flex-shrink-0 p-2 text-brand-500 hover:text-brand-600 transition-colors duration-300"
                            aria-expanded={expandedItem === item.name}
                            aria-label={`Toggle details for ${item.name}`}
                          >
                            <svg
                              className={`h-5 w-5 transition-transform duration-300 ${
                                expandedItem === item.name ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7m0 0l5 5 5h6m0 7 5v6m0 7l-7-7 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>

        {/* Menu Info */}
        <div className="mt-8 p-6 sm:p-8 bg-brand-50 rounded-2xl border border-brand-200">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="flex-1">
              <h4 className="text-lg sm:text-xl font-bold text-brand-900 mb-2">
                Special Dietary Requirements
              </h4>
              <p className="text-sm sm:text-base text-gray-700">
                Please inform our staff about any dietary restrictions or allergies. We're happy to accommodate your needs with customized dishes.
              </p>
            </div>
            <div className="flex-1 sm:flex-1">
              <h4 className="text-lg sm:text-xl font-bold text-brand-900 mb-2">
                Menu Timings
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg
                    className="h-5 w-5 text-brand-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3 3 3m0-0l3 3m0 0 1.414 1.414L16 13l-4-4-4-4h6m0 7l4 4m4-4H4c0-1.414L12 8z"
                    />
                  </svg>
                  <span className="text-base sm:text-lg font-semibold">
                    Lunch: 12:00 PM - 3:30 PM
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg
                    className="h-5 w-5 text-brand-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3 3 3m0 0l3 3m0 0 1.414 1.414L16 13l-4-4-4-4h6m0 7l4 4m4-4H4c0-1.414L12 8z"
                    />
                  </svg>
                  <span className="text-base sm:text-lg font-semibold">
                    Dinner: 7:30 PM - 11:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

