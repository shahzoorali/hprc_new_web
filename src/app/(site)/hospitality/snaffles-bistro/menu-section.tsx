"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";

interface MenuItem {
  name: string;
  price?: string;
  note?: string;
}

interface MenuCategory {
  name: string;
  description?: string;
  items: MenuItem[];
}

const snafflesBistroDescription = "Welcome to Snaffles Bistro, your neighborhood coffee shop and casual dining destination. Whether you're starting your day with a hearty breakfast, grabbing a quick lunch, or enjoying a relaxed dinner with friends and family, Snaffles Bistro offers delicious comfort food prepared with care and served with warmth. From our signature rolls and sandwiches to our freshly brewed coffee and refreshing milkshakes, every item on our menu is crafted to bring a smile to your face.";

const snafflesBistroCategories: MenuCategory[] = [
  {
    name: "APPETIZERS & MAINS",
    items: [
      { name: "Garlic Vegetables Spring Roll", price: "₹160" },
      { name: "Chicken Spring Roll", price: "₹195" },
      { name: "Chicken 65 Kathi Roll with Fries", price: "₹225" },
    ],
  },
  {
    name: "SNAFFLES COMBO",
    items: [
      { name: "Masala Poha with Pepper Fried Egg", price: "₹110" },
      { name: "Piri Piri Fries & Cheese Balls", price: "₹110" },
      { name: "Masala Vada Pav (Cumin Fries, Mayo Mint & Podi)", price: "₹135" },
      { name: "Chicken Tikka & Masala Paneer Grill Cheese Sandwich", price: "₹195" },
    ],
  },
  {
    name: "APPETIZERS & MAINS (DAY)",
    items: [
      { name: "Vegetable Masala Poha", price: "₹95" },
      { name: "Local Dal Vada Pav (with Mayo Mint & Chutney)", price: "₹95" },
      { name: "French Fries", price: "₹95" },
      { name: "Masala Egg Maggi", price: "₹110" },
      { name: "Vegetable & Cheese Maggi", price: "₹125" },
      { name: "Chicken & Cheese Maggi", price: "₹160" },
      { name: "Ginger Garlic Maggi (Veg/Non-veg)", price: "₹110 / ₹160" },
      { name: "Penne in White / Red Sauce with Veggies", price: "₹225" },
      { name: "Classic Penne Arrabbiata (Red Sauce)", price: "₹225" },
      { name: "Spaghetti Aglio Olio with Olives", price: "₹225" },
      { name: "Penne in White / Red Sauce (Chicken)", price: "₹250" },
    ],
  },
  {
    name: "BREAKFAST",
    items: [
      { name: "Plain Dosa", price: "₹50" },
      { name: "Idly", price: "₹60" },
      { name: "Onion Dosa", price: "₹60" },
      { name: "Medu Wada", price: "₹70" },
      { name: "Poori Bhaji", price: "₹70" },
      { name: "Masala Utthappam", price: "₹70" },
      { name: "Ghee Upma", price: "₹70" },
      { name: "Masala Dosa", price: "₹75" },
      { name: "Ghee Karam Dosa", price: "₹85" },
      { name: "Punjabi Bhature Bhaji", price: "₹95" },
      { name: "Paneer Dosa", price: "₹95" },
      { name: "Mysore Masala Dosa", price: "₹95" },
      { name: "Cheese Dosa", price: "₹115" },
      { name: "Rava Dosa (20–25 Mins to Prepare)", price: "₹115", note: "Special preparation time" },
      { name: "Egg Dosa (2 Eggs)", price: "₹130" },
    ],
  },
  {
    name: "TEA & COFFEE",
    items: [
      { name: "Masala Tea", price: "₹40" },
      { name: "Cardamom Tea", price: "₹50" },
      { name: "Bru Coffee", price: "₹50" },
      { name: "South Indian Filter Coffee", price: "₹60" },
      { name: "Green Tea", price: "₹60" },
      { name: "Black Coffee (Single Shot)", price: "₹75" },
      { name: "Black Coffee (Double Shot)", price: "₹130" },
      { name: "Cappuccino", price: "₹120" },
      { name: "Cold Coffee", price: "₹150" },
      { name: "Ice Latte", price: "₹130" },
    ],
  },
  {
    name: "EGGS AND GUDLU",
    items: [
      { name: "Boiled Eggs (2 Nos)", price: "₹60" },
      { name: "Masala Omelette", price: "₹70" },
      { name: "Sunny Side Up / Fried Egg / Over Easy", price: "₹70" },
      { name: "Cheese & Mushroom Omelette", price: "₹90" },
      { name: "Masala Cheese Omelette", price: "₹90" },
      { name: "Double Cheese Omelette", price: "₹90" },
      { name: "Hyderabad Bread Omelette", price: "₹99" },
      { name: "Chicken Cheese Omelette", price: "₹135" },
    ],
  },
  {
    name: "BEVERAGES",
    items: [
      { name: "Soft Drinks", price: "₹20" },
      { name: "Fresh Lime Soda", price: "₹50" },
      { name: "Canned Fruit Juice", price: "₹60" },
      { name: "Masala Thums-up / Coke", price: "₹60" },
      { name: "Masala Butter Milk", price: "₹60" },
      { name: "Seasonal Fresh Juice", price: "₹75" },
    ],
  },
  {
    name: "MILKSHAKES",
    items: [
      { name: "Vanilla", price: "₹150" },
      { name: "Chocolate", price: "₹150" },
      { name: "Banana & Walnut (Smoothie)", price: "₹195" },
      { name: "Mango (Smoothie)", price: "₹160", note: "Seasonal" },
      { name: "Blueberry (Smoothie)", price: "₹195" },
    ],
  },
  {
    name: "BAKED BREADS",
    items: [
      { name: "Veg Grilled Sandwich", price: "₹125" },
      { name: "Veg & Paneer Grilled Sandwich", price: "₹150" },
      { name: "Veg & Cheese Sandwich", price: "₹150" },
      { name: "Chicken Grilled Sandwich", price: "₹165" },
      { name: "Chicken & Cheese Sandwich", price: "₹175" },
      { name: "Masala Cheese Burger with Fries", price: "₹165" },
      { name: "Piri Piri Egg & Cheese Burger with Fries", price: "₹165" },
      { name: "Chicken Tikka Burger with Fries", price: "₹195" },
      { name: "Chicken & Cheese Burger with Fries", price: "₹195" },
      { name: "Mixed Veg Quinoa Cheese Burger with Fries", price: "₹225" },
      { name: "3 Layered HPRC Club Sandwich with Fries (Fried Egg, Chicken, Tomato & Cheese)", price: "₹256" },
      { name: "Hyderabadi Exclusive Sheermal Grilled Sandwich (Served with House Salad & Mint Mayo)", price: "₹206 / ₹256" },
    ],
  },
  {
    name: "ROLLS OVERLOADED",
    items: [
      { name: "Mix Vegetable Kathi Roll", price: "₹195" },
      { name: "Paneer Tikka Kathi Roll", price: "₹225" },
      { name: "Chicken & Cheese Kathi Roll", price: "₹225" },
      { name: "Vegetable Falafel Kathi Roll", price: "₹250" },
    ],
  },
  {
    name: "DESSERT OF THE DAY",
    items: [
      { name: "Chef's Choice", price: "₹195", note: "**Chef's Recommendation**" },
    ],
  },
];

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>("APPETIZERS & MAINS");

  return (
    <section className="bg-gradient-to-br from-brand-50 to-brand-100/50 py-12 sm:py-16 border-t border-brand-200">
      <div className="container">
        <SectionHeading
          eyebrow="Our Menu"
          title="Coffee Shop"
          description="Discover our delicious selection of appetizers, mains, breakfast items, and refreshing beverages at Snaffles Bistro."
        />

        {/* About Section */}
        <div className="mb-8 p-6 sm:p-8 bg-white rounded-2xl border border-brand-200 shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-brand-900 mb-4 font-display">About Snaffles Bistro</h3>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {snafflesBistroDescription}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 border-b border-brand-200 pb-2">
            {snafflesBistroCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${
                  activeCategory === category.name
                    ? "text-brand-600 border-brand-600"
                    : "text-gray-500 border-transparent hover:text-brand-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {snafflesBistroCategories.map(
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
                              <div className="flex-1">
                                <h4 className="text-base sm:text-lg font-bold text-brand-900 group-hover:text-brand-600 transition-colors duration-300">
                                  {item.name}
                                </h4>
                                {item.note && (
                                  <p className="text-xs sm:text-sm text-brand-600 mt-1 font-medium">
                                    {item.note}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex-shrink-0 text-right">
                            {item.price && (
                              <div className="text-2xl sm:text-3xl font-bold text-brand-600">
                                {item.price}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>

        {/* Menu Info */}
        <div className="mt-8 p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="h-6 w-6 text-amber-600"
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
              </div>
              <div className="flex-1">
                <h4 className="text-lg sm:text-xl font-bold text-amber-900 mb-2">Special Notes</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Breakfast available from 7:00 AM to 11:00 AM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Mango smoothie is seasonal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Rava Dosa takes 20-25 minutes to prepare</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Look for Chef's special recommendations marked with **</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-amber-200 pt-4">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="h-6 w-6 text-green-600"
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
              </div>
              <div className="flex-1">
                <h4 className="text-lg sm:text-xl font-bold text-green-900 mb-1">Menu Highlights</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Freshly prepared comfort food</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Wide variety of breakfast options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Signature Kathi rolls and sandwiches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Refreshing milkshakes and beverages</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
