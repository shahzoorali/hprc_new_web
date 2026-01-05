"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";

interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  price30ml?: string;
  priceBottle?: string;
  category?: string;
  popular?: boolean;
  note?: string;
}

interface MenuCategory {
  name: string;
  description?: string;
  items: MenuItem[];
}

const loungeBarDescription = "Since initiation, Chukker Lounge has been a beacon for those seeking a welcoming atmosphere, delicious food and expertly crafted drinks. Featuring everything from artisanal cocktails and fine wines to a diverse range of craft beers. Our warm and inviting ambience is perfect for any gathering, whether it's an intimate date night, a lively group outing, a solo retreat or simply enjoying a night out with friends. Our skilled bartenders are here to mix the perfect drink to suit your mood. Chukker Lounge is more than just a place to eat and drink; it's a social hub where connections are made, and stories are shared. Cheers!";

const loungeBarCategories: MenuCategory[] = [
  {
    name: "BEER",
    items: [
      { name: "Bira (White)", price: "₹320" },
      { name: "Bira Tap Beer (Blonde)", price: "₹205" },
      { name: "Bira Tap Beer (White)", price: "₹265" },
      { name: "Bitburger Beer", price: "₹575" },
      { name: "Budweiser", price: "₹180" },
      { name: "Carlsberg Smooth Beer", price: "₹165" },
      { name: "Carlsberg Strong Beer", price: "₹140" },
      { name: "Coopers Ex Stout Beer", price: "₹750" },
      { name: "Corona Extra", price: "₹310" },
      { name: "Heineken", price: "₹195" },
      { name: "Hoegaarden Beer", price: "₹330" },
      { name: "KF Premium", price: "₹155" },
      { name: "KF Ultra", price: "₹180" },
      { name: "KF Witbier", price: "₹280" },
      { name: "Peroni Beer", price: "₹519" },
      { name: "Singha Beer", price: "₹485" },
      { name: "Tuborg Beer", price: "₹150" },
    ],
  },
  {
    name: "MOCKTAIL",
    items: [
      { name: "Blue Lagoon", price: "₹150" },
      { name: "Fruit Punch", price: "₹150" },
      { name: "Lazy Diana", price: "₹175" },
      { name: "Mocktail", price: "₹150" },
      { name: "Pink Slinger", price: "₹175" },
      { name: "Safe Sex On The Beach", price: "₹175" },
      { name: "Summer Cooler", price: "₹175" },
      { name: "Virgin Pina Colada", price: "₹175" },
      { name: "Virgin Miami Vice", price: "₹175" },
      { name: "Virgin Mojito", price: "₹175" },
      { name: "Zaikadaar Nimbu", price: "₹175" },
      { name: "Chocolate Milk Shake", price: "₹175" },
      { name: "Cold Coffee With Icecream", price: "₹195" },
    ],
  },
  {
    name: "COCKTAIL",
    items: [
      { name: "Bacardi Breezer", price: "₹188" },
      { name: "Bay Breeze", price: "₹295" },
      { name: "Cocktail of the Day", price: "₹495" },
      { name: "Long Island Ice Tea", price: "₹375" },
      { name: "Cranberry Iced Tea", price: "₹350" },
      { name: "Margarita", price: "₹400" },
      { name: "Cranberry Mojito", price: "₹295" },
      { name: "Kaipiroska", price: "₹350" },
      { name: "Pina Colada", price: "₹295" },
      { name: "Vodka Mojito", price: "₹295" },
      { name: "Whiskey Sapphire", price: "₹350" },
      { name: "Vodka Martini", price: "₹375" },
      { name: "Routhless", price: "₹375" },
      { name: "Classical Whiskey Sour", price: "₹375" },
      { name: "Irish Coffee Latte", price: "₹375" },
      { name: "The Cosmopolitan", price: "₹395" },
      { name: "Sangria Cocktail", price: "₹3,100", note: "Pre-order Only – Bottle" },
    ],
  },
  {
    name: "WINE",
    items: [
      { name: "Jacobs Creek Shiraz Red", price: "₹2,727" },
      { name: "Jacobs Creek Chardonnay White", price: "₹2,727" },
      { name: "Sula Red Cabernet Shiraz", price: "₹1,818" },
      { name: "Sula Chenin Blanc", price: "₹1,818" },
      { name: "Martini Champagne", price: "₹3,363" },
      { name: "Fratelli Shiraz Wine Red", price: "₹1,515" },
    ],
  },
  {
    name: "BRANDY",
    items: [
      { name: "Cognac Henessy", price30ml: "₹555", priceBottle: "₹12,365" },
      { name: "Napoleon Brandy", price30ml: "₹75", priceBottle: "₹1,650" },
      { name: "St Remy Martin", price30ml: "₹220", priceBottle: "₹4,830" },
    ],
  },
  {
    name: "GIN",
    items: [
      { name: "Beefeater", price30ml: "₹125", priceBottle: "₹2,727" },
      { name: "Bombay Sapphire", price30ml: "₹145", priceBottle: "₹3,272" },
      { name: "Gordon's Dry Gin", price30ml: "₹145", priceBottle: "₹3,464" },
      { name: "Jaisalmer Gin", price30ml: "₹235", priceBottle: "₹5,454" },
      { name: "Monkey 47", price30ml: "₹450", priceBottle: "₹7,474", note: "Made in Germany" },
      { name: "Roku Gin", price30ml: "₹460", priceBottle: "₹9,955", note: "Japanese" },
      { name: "Tanqueray 10 Gin", price30ml: "₹255", priceBottle: "₹7,878" },
      { name: "Tanqueray London Dry", price30ml: "₹135", priceBottle: "₹3,232" },
    ],
  },
  {
    name: "IRISH & AMERICAN",
    items: [
      { name: "Jamesons", price30ml: "₹150", priceBottle: "₹3,600" },
      { name: "Jim Beam", price30ml: "₹150", priceBottle: "₹3,600" },
      { name: "Baileys Liquer", priceBottle: "₹5,757" },
    ],
  },
  {
    name: "LIQUEUR",
    items: [
      { name: "Jagermeister", priceBottle: "₹6,375" },
    ],
  },
  {
    name: "SODA & WATER",
    items: [
      { name: "Diet Coke", price: "₹50" },
      { name: "Fresh Lime Soda", price: "₹50" },
      { name: "Ginger Ale", price: "₹100" },
      { name: "Packaged Water", price: "MRP" },
      { name: "Red Bull", price: "₹150" },
      { name: "Tonic Water", price: "₹100" },
    ],
  },
  {
    name: "RUM",
    items: [
      { name: "Bacardi White", price30ml: "₹72", priceBottle: "₹1,720" },
      { name: "Old Monk", price30ml: "₹76", priceBottle: "₹1,330" },
      { name: "Old Monk Legend", price30ml: "₹76", priceBottle: "₹1,818" },
    ],
  },
  {
    name: "SCOTCH & MALT",
    items: [
      { name: "Black Dog", price30ml: "₹175", priceBottle: "₹3,919" },
      { name: "Chivas 15 Years", price30ml: "₹365", priceBottle: "₹8,818" },
      { name: "Chivas Regal 18 Y", price30ml: "₹495", priceBottle: "₹11,777" },
      { name: "JW Blonde", price30ml: "₹222", priceBottle: "₹4,848" },
      { name: "JW Black Label", price30ml: "₹250", priceBottle: "₹5,959" },
      { name: "JW Double Black", price30ml: "₹250", priceBottle: "₹5,959" },
    ],
  },
  {
    name: "SINGLE MALT",
    items: [
      { name: "Aberfeldy", price30ml: "₹370", priceBottle: "₹8,898" },
      { name: "Ardmore", price30ml: "₹315", priceBottle: "₹7,070" },
      { name: "Bowmore", price30ml: "₹333", priceBottle: "₹7,970" },
      { name: "Singleton 12 Y", price30ml: "₹444", priceBottle: "₹10,040" },
      { name: "Singleton 15 Y", price30ml: "₹565", priceBottle: "₹12,635" },
      { name: "Caol Ila", price30ml: "₹444", priceBottle: "₹10,620" },
      { name: "Glenfiddich 15 Y", price30ml: "₹555", priceBottle: "₹9,030" },
      { name: "Glenlivet 12 Y", price30ml: "₹424", priceBottle: "₹9,292" },
      { name: "Glenlivet 15 Y", price30ml: "₹466", priceBottle: "₹10,222" },
      { name: "Glenmorangie", price30ml: "₹455", priceBottle: "₹10,940" },
      { name: "Godawan Whiskey 1", price30ml: "₹333", priceBottle: "₹7,575" },
      { name: "Godawan Whiskey 2", price30ml: "₹333", priceBottle: "₹7,575" },
      { name: "Laphroaig", price30ml: "₹365", priceBottle: "₹8,696" },
      { name: "Talisker", price30ml: "₹375", priceBottle: "₹8,696" },
    ],
  },
  {
    name: "VODKA",
    items: [
      { name: "Absolut", price30ml: "₹135", priceBottle: "₹3,232" },
      { name: "Belvedere Vodka", price30ml: "₹365", priceBottle: "₹8,080" },
      { name: "Finlandia Vodka", price30ml: "₹140", priceBottle: "₹3,252" },
      { name: "Grey Goose", price30ml: "₹240", priceBottle: "₹5,656" },
      { name: "Ketel One Vodka", price30ml: "₹155", priceBottle: "₹3,535" },
      { name: "Smirnoff", price30ml: "₹75", priceBottle: "₹1,616" },
    ],
  },
  {
    name: "WHISKY",
    items: [
      { name: "100 Pipers 12Y", price30ml: "₹165", priceBottle: "₹3,888" },
      { name: "J&B Whisky", price30ml: "₹150", priceBottle: "₹3,399" },
      { name: "Suntory Toki Japanese Blended", price30ml: "₹350", priceBottle: "₹7,474" },
      { name: "Teachers 12Y", price30ml: "₹195", priceBottle: "₹4,252" },
      { name: "Teachers 50", price30ml: "₹174", priceBottle: "₹4,181" },
      { name: "Macroys Extra Peat", price30ml: "₹165", priceBottle: "₹3,920" },
      { name: "Macroys Blended", price30ml: "₹135", priceBottle: "₹2,979" },
    ],
  },
];

const foodDescription = "Welcome to Chukker Lounge, where culinary artistry meets exquisite flavors to tantalize your taste buds. From the sizzle of perfectly roasted chicken to the delicate balance of spices in our vegetarian dishes, each plate tells a story of culinary mastery. An adventure of gastronomic proportions awaits, encouraging you to explore our carefully curated menu, designed to satisfy every palate and craving. Whether you're seeking a romantic dinner for two, a celebratory feast with friends, or a casual lunch with colleagues, Chukker Lounge promises an unforgettable dining experience filled with flavor, flair, and unparalleled hospitality. So, Go Ahead, Indulge!";

const foodCategories: MenuCategory[] = [
  {
    name: "SALAD",
    items: [
      { name: "Garden Green Salad", price: "₹75" },
      { name: "Papdi Chaat", price: "₹95" },
      { name: "Ceasar Salad", price: "₹150" },
      { name: "Grilled Vegetable Salad with Lettuce", price: "₹150" },
    ],
  },
  {
    name: "SOUPS",
    items: [
      { name: "Sweet Corn Soup", price: "₹90 / ₹125", note: "Veg / Non Veg" },
      { name: "Manchow Soup", price: "₹90 / ₹125", note: "Veg / Non Veg" },
      { name: "Hot & Sour Soup", price: "₹90 / ₹125", note: "Veg / Non Veg" },
      { name: "Lemon Coriander Soup", price: "₹90 / ₹125", note: "Veg / Non Veg" },
      { name: "Clear Noodles Soup", price: "₹90 / ₹125", note: "Veg / Non Veg" },
      { name: "Cream of Tomato Soup", price: "₹90 / ₹125", note: "Veg / Non Veg" },
      { name: "BBQ Tomato Shorba", price: "₹90 / ₹125", note: "Veg / Non Veg" },
    ],
  },
  {
    name: "APPETIZERS",
    items: [
      { name: "Masala Papad", price: "₹90" },
      { name: "Fried Peanut", price: "₹90" },
      { name: "Masala Peanut", price: "₹90" },
      { name: "Boiled Masala Peanut", price: "₹90" },
      { name: "French Fries", price: "₹95" },
      { name: "Chilli Garlic Fries", price: "₹95" },
      { name: "Jalapeno Cheese Balls", price: "₹150" },
      { name: "Chicken Nuggets", price: "₹175" },
      { name: "Fried Cashew Nuts", price: "₹195" },
    ],
  },
  {
    name: "STARTERS (VEG)",
    items: [
      { name: "Gobi Manchurian", price: "₹175" },
      { name: "Chilli Gobi", price: "₹175" },
      { name: "Hara Bhara Kebab", price: "₹180" },
      { name: "Tandoori Achari Aloo", price: "₹180" },
      { name: "Veg Manchurian", price: "₹195" },
      { name: "Crispy Corn Kernels", price: "₹195" },
      { name: "Mushroom Salt & Pepper", price: "₹195" },
      { name: "Chilli Paneer", price: "₹195" },
      { name: "Paneer Majestic", price: "₹195" },
      { name: "Paneer 65", price: "₹195" },
      { name: "Hariyali Paneer Tikka", price: "₹195" },
      { name: "Achari Paneer Tikka", price: "₹195" },
      { name: "Stuffed Mushroom in Basil Schezwan Chilli", price: "₹225" },
      { name: "Tandoori Malai Broccoli", price: "₹295" },
    ],
  },
  {
    name: "STARTERS (CHICKEN)",
    items: [
      { name: "Chilli Egg", price: "₹175" },
      { name: "Chilli Chicken", price: "₹255" },
      { name: "Pepper Chicken", price: "₹225" },
      { name: "Schezwan Chicken", price: "₹275" },
      { name: "Hunan Chicken", price: "₹275" },
      { name: "Chicken 65", price: "₹225" },
      { name: "Chicken Lollipop (Deep Fried)", price: "₹295" },
      { name: "Chicken Drumstick (Semi-dry)", price: "₹295" },
      { name: "Chicken Majestic", price: "₹295" },
      { name: "Dragon Chicken", price: "₹295" },
      { name: "Murgh Kalimirch Tikka", price: "₹255" },
      { name: "Murgh Malai Kebab", price: "₹255" },
      { name: "Chicken Tikka", price: "₹255" },
      { name: "Murgh Aangara Kebab", price: "₹255" },
      { name: "Pahadi Murgh Tikka", price: "₹255" },
      { name: "Murgh Mirchi Kebab", price: "₹255" },
      { name: "Chicken Seekh Kebab", price: "₹275" },
    ],
  },
  {
    name: "LAMB",
    items: [
      { name: "Mutton Kali Mirch", price: "₹395" },
      { name: "Talahua Ghosht", price: "₹395" },
      { name: "Mutton Ghee Roast", price: "₹395" },
      { name: "Gilafi Ghosht Seekh Kebab", price: "₹395" },
      { name: "Dohri Seekh Kebab (Chicken & Mutton Mince)", price: "₹395" },
    ],
  },
  {
    name: "PRAWNS",
    items: [
      { name: "Loose Prawns", price: "₹325" },
      { name: "Singapore Chilli Prawns", price: "₹325" },
      { name: "Tandoori Jheenga", price: "₹350" },
      { name: "Butter Garlic Prawns", price: "₹350" },
      { name: "Prawns of Choice (Chilli, Ginger, Schezwan, Manchurian)", price: "₹350" },
    ],
  },
  {
    name: "FISH",
    items: [
      { name: "Apollo Fish", price: "₹325" },
      { name: "Salt & Pepper Fish", price: "₹325" },
      { name: "Achari Fish Tikka", price: "₹325" },
      { name: "Shimla Mirch Fish Tikka", price: "₹325" },
      { name: "Kasundi Fish Tikka", price: "₹325" },
      { name: "Fish Fingers", price: "₹325" },
      { name: "Choice of Fish (Chilli, Ginger, Schezwan, Manchurian)", price: "₹325" },
      { name: "Grilled Fish (Served with Flavoured Rice & Saute Veg)", price: "₹425" },
    ],
  },
  {
    name: "THAI CURRY",
    items: [
      { name: "Thai Red/Green Curry (Vegetables)", price: "₹250" },
      { name: "Thai Red/Green Curry (Chicken)", price: "₹295" },
      { name: "Thai Red/Green Curry (Fish)", price: "₹350" },
      { name: "Thai Red/Green Curry (Prawns)", price: "₹395" },
    ],
  },
  {
    name: "MAIN COURSE (VEG)",
    items: [
      { name: "Mix Vegetable Curry", price: "₹150" },
      { name: "Subz Nizami Handi", price: "₹150" },
      { name: "Vegetable Chatpata", price: "₹150" },
      { name: "Yellow Dal Tadka", price: "₹150" },
      { name: "Tomato Dal", price: "₹150" },
      { name: "Methi Dal", price: "₹150" },
      { name: "Kashmiri Dum Aloo", price: "₹175" },
      { name: "Sarson Ka Saag", price: "₹195" },
      { name: "Malai Kofta", price: "₹225" },
      { name: "Palak Paneer", price: "₹210" },
      { name: "Kadai Paneer", price: "₹210" },
      { name: "Methi Chaman", price: "₹195" },
      { name: "Paneer Kasturi Kheema", price: "₹195" },
      { name: "Paneer Tikka Masala", price: "₹225" },
      { name: "Paneer Butter Masala", price: "₹195" },
    ],
  },
  {
    name: "MAIN COURSE (NON VEG)",
    items: [
      { name: "Masala Omelette", price: "₹90" },
      { name: "Egg Bhurji", price: "₹125" },
      { name: "Egg Masala", price: "₹160" },
      { name: "Butter Chicken", price: "₹225" },
      { name: "Murgh Makhani", price: "₹225" },
      { name: "Kadai Chicken", price: "₹225" },
      { name: "Kodi Koora", price: "₹225" },
      { name: "Chicken Tikka Masala", price: "₹225" },
      { name: "Machi Musallam", price: "₹295" },
      { name: "Kadai Jheenga", price: "₹350" },
      { name: "Ghosht Roganjosh", price: "₹395" },
      { name: "Gongura Mamsam", price: "₹395" },
      { name: "Chettinad Mutton", price: "₹395" },
    ],
  },
  {
    name: "BIRYANI & PULAO",
    items: [
      { name: "Vegetable Tawa Biryani", price: "₹195" },
      { name: "Egg Biryani (2 Eggs)", price: "₹160" },
      { name: "Chicken Dum Biryani", price: "₹200" },
      { name: "Chicken Tikka Biryani", price: "₹250" },
      { name: "Chicken 65 Tawa Pulao", price: "₹250" },
      { name: "Paneer 65 Tawa Pulao", price: "₹250" },
      { name: "Lamb Dum Biryani", price: "₹275", note: "Pre-order Only" },
      { name: "Lamb Tawa Biryani", price: "₹275" },
      { name: "Fish Biryani", price: "₹350" },
      { name: "Prawns Biryani", price: "₹350" },
    ],
  },
  {
    name: "PAN ASIAN",
    items: [
      { name: "Veg Manchurian", price: "₹175" },
      { name: "Wok Tossed Vegetables", price: "₹195" },
      { name: "Chilli Paneer Wet", price: "₹210" },
      { name: "Chilli Chicken Wet", price: "₹225" },
      { name: "Chicken Manchurian", price: "₹225" },
      { name: "Schezwan Chicken Wet", price: "₹225" },
      { name: "Schezwan Prawns Wet", price: "₹295" },
      { name: "Chilli Fish Wet", price: "₹295" },
    ],
  },
  {
    name: "RICE & NOODLES",
    items: [
      { name: "Cantonese Fried Rice", price: "₹150 / ₹195 / ₹225", note: "Veg / Egg / Chicken" },
      { name: "Cantonese Fried Noodles", price: "₹150 / ₹195 / ₹225", note: "Veg / Egg / Chicken" },
      { name: "Burnt Garlic Fried Rice", price: "₹175 / ₹195 / ₹225", note: "Veg / Egg / Chicken" },
      { name: "Pad Thai Noodles", price: "₹175 / ₹225 / ₹295", note: "Veg / Chicken / Prawns" },
      { name: "Mixed Non-veg Fried Rice", price: "₹295" },
      { name: "Mixed Non-veg Noodles", price: "₹295" },
      { name: "Prawn Garlic Fried Rice / Noodles", price: "₹295" },
    ],
  },
  {
    name: "INDIAN BREADS",
    items: [
      { name: "Tandoori Roti", price: "₹35" },
      { name: "Butter Roti", price: "₹45" },
      { name: "Plain Naan", price: "₹40" },
      { name: "Butter Naan", price: "₹40" },
      { name: "Mixi Roti / Makki Ki Roti", price: "₹55" },
      { name: "Pudina Paratha", price: "₹55" },
      { name: "Lacha Paratha", price: "₹55" },
      { name: "Aloo Paratha", price: "₹60" },
      { name: "Gobi Paratha", price: "₹60" },
      { name: "Mix Veg Paratha", price: "₹60" },
      { name: "Garlic Naan", price: "₹75" },
      { name: "Cheese Naan", price: "₹75" },
      { name: "Stuffed Kulcha", price: "₹75" },
      { name: "Onion Kulcha", price: "₹75" },
    ],
  },
  {
    name: "RICE",
    items: [
      { name: "Steamed Rice", price: "₹90" },
      { name: "Curd Rice", price: "₹110" },
      { name: "Dal Khichdi", price: "₹150", note: "Served with Pickle and Papad" },
      { name: "Jeera Rice", price: "₹150" },
      { name: "Sambar Rice", price: "₹150", note: "Weekends Only" },
      { name: "Veg Pulao", price: "₹160" },
      { name: "Pachi Mirchi Veg Pulao", price: "₹195" },
    ],
  },
  {
    name: "DESSERTS",
    items: [
      { name: "Gulab Jamoon (2 Pieces)", price: "₹75" },
      { name: "Kala Jamoon", price: "₹75" },
      { name: "Qubani Ka Meetha", price: "₹85" },
      { name: "Gajar Ka Halwa", price: "₹85" },
      { name: "Mousse (Strawberry/Chocolate/Egg)", price: "₹175" },
      { name: "Tress Leches (Egg)", price: "₹175" },
      { name: "Chocolate Brownie (Egg)", price: "₹175" },
      { name: "Classic Tiramisu (Egg)", price: "₹175" },
      { name: "Classic Opera (Egg)", price: "₹195" },
      { name: "Cheese Cake (Egg)", price: "₹195" },
      { name: "Apricot Pudding (Egg)", price: "₹195" },
    ],
  },
  {
    name: "ICE CREAM",
    items: [
      { name: "Vanilla (2 Scoops)", price: "₹95" },
      { name: "Strawberry (2 Scoops)", price: "₹95" },
      { name: "Chocolate (2 Scoops)", price: "₹95" },
      { name: "Butter Scotch (2 Scoops)", price: "₹95" },
    ],
  },
  {
    name: "CAKES",
    items: [
      { name: "Exotic Fruit Cake", price: "₹750" },
      { name: "Black Forest Gateaux", price: "₹750" },
      { name: "Red Velvet", price: "₹750" },
      { name: "Chocolate Cookie Crumble", price: "₹850" },
      { name: "Tiramisu Cake", price: "₹850" },
      { name: "Classic Opera", price: "₹900" },
      { name: "Italian Mud Cake", price: "₹900" },
      { name: "HPRC Cheese Cake (Blueberry / Strawberry)", price: "₹1,356" },
    ],
  },
  {
    name: "WOOD FIRED PIZZAS",
    items: [
      { name: "Classic Margherita 1889 (9\")", price: "₹250" },
      { name: "Classic Margherita 1889 (12\")", price: "₹350" },
      { name: "Onion, Garlic, Mushroom & Cheese (9\")", price: "₹350" },
      { name: "Onion, Garlic, Mushroom & Cheese (12\")", price: "₹450" },
      { name: "Paneer Tikka, Olives & Jalapenos (9\")", price: "₹350" },
      { name: "Paneer Tikka, Olives & Jalapenos (12\")", price: "₹450" },
      { name: "Farm Fresh Exotica (9\")", price: "₹350" },
      { name: "Farm Fresh Exotica (12\")", price: "₹450" },
      { name: "Garlic Lovers (9\")", price: "₹350" },
      { name: "Garlic Lovers (12\")", price: "₹450" },
      { name: "Make Your Own Pizza - Any 4 Veggies (9\")", price: "₹450" },
      { name: "Make Your Own Pizza - Any 4 Veggies (12\")", price: "₹550" },
      { name: "BBQ Chicken Tikka Pizza (9\")", price: "₹350" },
      { name: "BBQ Chicken Tikka Pizza (12\")", price: "₹450" },
      { name: "Tandoori Chicken Pizza (9\")", price: "₹375" },
      { name: "Tandoori Chicken Pizza (12\")", price: "₹495" },
      { name: "Mana Andhra, Mana Telangana Pizza (APTG) (9\")", price: "₹375" },
      { name: "Mana Andhra, Mana Telangana Pizza (APTG) (12\")", price: "₹495" },
      { name: "Make Your Own Pizza - Any 2 Non-veg (9\")", price: "₹495" },
      { name: "Make Your Own Pizza - Any 2 Non-veg (12\")", price: "₹595" },
    ],
  },
];

export function MenuSection() {
  const [activeMenuType, setActiveMenuType] = useState<"Lounge Bar" | "Food Menu">("Food Menu");
  const [activeCategory, setActiveCategory] = useState<string>("BEER");

  const isLoungeBar = activeMenuType === "Lounge Bar";
  const currentCategories = isLoungeBar ? loungeBarCategories : foodCategories;
  const currentDescription = isLoungeBar ? loungeBarDescription : foodDescription;

  const handleMenuTypeChange = (type: "Lounge Bar" | "Food Menu") => {
    setActiveMenuType(type);
    setActiveCategory(isLoungeBar ? "BEER" : "SALAD");
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <section className="bg-gradient-to-br from-brand-50 to-brand-100/50 py-12 sm:py-16 border-t border-brand-200">
      <div className="container">
        <SectionHeading
          eyebrow="Our Menu"
          title={activeMenuType}
          description={isLoungeBar 
            ? "Explore our carefully curated selection of beverages, from classic favorites to innovative concoctions."
            : "Discover our exquisite culinary offerings, featuring traditional recipes and contemporary fusion dishes."
          }
        />

        {/* Menu Type Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 border-b border-brand-200 pb-2">
            {["Food Menu", "Lounge Bar"].map((menuType) => (
              <button
                key={menuType}
                onClick={() => handleMenuTypeChange(menuType as "Food Menu" | "Lounge Bar")}
                className={`flex-shrink-0 px-6 py-3 text-base sm:text-lg font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${
                  activeMenuType === menuType
                    ? "text-brand-600 border-brand-600"
                    : "text-gray-500 border-transparent hover:text-brand-600"
                }`}
              >
                {menuType}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Introduction */}
        <div className="mb-8 p-6 sm:p-8 bg-white rounded-2xl border border-brand-200 shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-brand-900 mb-4 font-display">
            {isLoungeBar ? "About Chukker Lounge" : "Welcome to Chukker Lounge"}
          </h3>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {currentDescription}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 border-b border-brand-200 pb-2">
            {currentCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryChange(category.name)}
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
          {currentCategories.map(
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
                            {(item.price30ml || item.priceBottle) && (
                              <div className="space-y-1">
                                {item.price30ml && (
                                  <div className="text-lg sm:text-xl font-bold text-brand-600">
                                    {item.price30ml} <span className="text-sm font-normal text-gray-500">(30ml)</span>
                                  </div>
                                )}
                                {item.priceBottle && (
                                  <div className="text-base sm:text-lg font-semibold text-gray-700">
                                    {item.priceBottle} <span className="text-xs font-normal text-gray-500">(Bottle)</span>
                                  </div>
                                )}
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

        {/* Food Menu Info */}
        {!isLoungeBar && (
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
                      <span>Eggless desserts available on pre-order</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span>Custom cakes available on pre-order (minimum 1kg)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span>Wood fired pizzas available from 6 PM onwards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      <span>Sambar Rice available on weekends only</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lounge Bar Info */}
        {isLoungeBar && (
          <div className="mt-8 p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-bold text-amber-900">Timings</h4>
                  <div className="mt-2 space-y-1 text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Closing Time:</span>
                      <span>11:00 pm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Last Order:</span>
                      <span>10:30 pm</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-amber-200 pt-4">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-bold text-red-900 mb-1">Warning</h4>
                  <p className="text-base text-red-800 font-semibold">Never mix drinks with driving</p>
                  <p className="text-sm text-red-700">It is a deadly cocktail</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
