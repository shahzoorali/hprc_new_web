export const hospitalityContent = {
  hero: {
    eyebrow: "Hospitality & Dining",
    title: "Exceptional dining experiences and elegant celebrations",
    description:
      "Discover HPRC's premier dining venues and banquet facilities, where refined cuisine, attentive service, and sophisticated ambiance come together to create unforgettable moments.",
  },
  venues: [
    {
      name: "Chukkers Restaurant",
      description:
        "Indulge in an elegant dining experience at Chukkers, HPRC's premier restaurant known for its refined ambiance and exquisite cuisine. Our carefully curated menu showcases gourmet dishes, prepared with the finest ingredients to delight the most discerning palates.",
      fullDescription:
        "Whether you're celebrating a special occasion with family or enjoying a romantic dinner, Chukkers provides the perfect setting for a memorable meal. Our attentive service and sophisticated decor create an atmosphere of luxury and comfort. Join us at Chukkers for an unparalleled dining experience.",
      highlights: [
        "Refined ambiance and sophisticated decor",
        "Carefully curated gourmet menu with finest ingredients",
        "Perfect for special occasions and romantic dinners",
        "Attentive service and luxury atmosphere",
      ],
      menuLinks: [
        { label: "Food Menu", href: "/documents/chukkers-food-menu.pdf" },
        { label: "Drink Menu", href: "/documents/chukkers-drink-menu.pdf" },
      ],
      image: "/documents/chukkers.jpg",
      logo: "/documents/chukkers-logo.png",
    },
    {
      name: "Snaffles Bistro",
      description:
        "Experience a delightful culinary journey at Snaffles Bistro, where a casual and relaxed atmosphere meets delicious cuisine. Our menu features a diverse selection of dishes, crafted with fresh, high-quality ingredients to satisfy all taste preferences.",
      fullDescription:
        "Whether you're in the mood for a hearty breakfast, a light lunch, or a sumptuous dinner, Snaffles Bistro offers something for everyone. Enjoy our cozy indoor seating or dine al fresco on our charming patio. Snaffles Bistro is the perfect spot for a casual meal with family and friends.",
      highlights: [
        "Casual and relaxed atmosphere",
        "Diverse menu with fresh, high-quality ingredients",
        "Cozy indoor seating and charming outdoor patio",
        "Perfect for family gatherings and friendly meet-ups",
      ],
      menuLinks: [{ label: "Menu", href: "/documents/snaffles-bistro-menu.pdf" }],
      image: "/documents/snaffles.jpg",
      logo: "/documents/snaffles-logo.png",
    },
    {
      name: "Banquets & Events",
      description:
        "At the Hyderabad Polo & Riding Club, we offer banquet facility with Outdoor & Indoor (opening soon) options for our guests to choose from. Our versatile and elegant space is perfect for any occasion.",
      fullDescription:
        "Whether it's an intimate soiree, a gala dinner, a corporate gathering, or a family get-together, our venues can be tailored to meet your needs. With state-of-the-art amenities and a dedicated team to ensure seamless execution, we guarantee a memorable event for you and your guests. Host your next celebration at HPRC, where sophistication and impeccable service come together.",
      highlights: [
        "Outdoor & Indoor venue options (Indoor opening soon)",
        "Versatile spaces for intimate soirees to grand galas",
        "State-of-the-art amenities and dedicated event team",
        "Tailored solutions for corporate and family gatherings",
      ],
      menuPackages: [
        {
          name: "Silver Menu",
          price: "Rs. 900",
          gst: "+ GST",
          features: [
            "One Welcome Drink",
            "Starter - 1 Veg & 1 Non-veg (Chicken Only)",
            "Two Salads, One Soup (Veg/Non-veg)",
            "One Main Course Non-veg, Two Main Courses Veg",
            "One Dal/One Noodles, One Flavoured Rice Veg",
            "Two Indian Breads, One Dessert, One Ice Cream",
          ],
        },
        {
          name: "Gold Menu",
          price: "Rs. 1,200",
          gst: "+ GST",
          features: [
            "Two Welcome Drinks",
            "Starters - 2 Veg & 2 Non-veg (Fish/Chicken Only)",
            "Three Salads, Two Soups (Veg/Non-veg)",
            "Two Main Courses Non-veg, Two Main Courses Veg",
            "One Dal & One Paneer, One Flavoured Noodles",
            "One Flavoured Rice Veg, Two Indian Breads",
            "Two Desserts, One Ice Cream",
          ],
        },
        {
          name: "Platinum Menu",
          price: "Rs. 1,800",
          gst: "+ GST",
          features: [
            "Two Welcome Drinks",
            "Starters - 2 Veg & 3 Non-veg (Fish/Prawns/Chicken/Mutton)",
            "Five Salads, Two Soups (Veg/Non-veg)",
            "Two Main Courses Non-veg, Three Main Courses Veg",
            "One Dal & One Paneer, One Flavoured Noodles",
            "One Flavoured Rice Veg, Three Indian Breads",
            "Two Desserts, Three Ice Creams",
          ],
        },
      ],
      image: "/documents/history2.jpg",
      logo: "/documents/banquets-logo.png",
    },
  ],
  experiences: [
    {
      title: "Curated Menus",
      description:
        "Our culinary team crafts bespoke menus for member occasions—from gourmet dining experiences to lavish banquet spreads—paired with artisanal desserts and premium beverages.",
    },
    {
      title: "Celebrations & Events",
      description:
        "Plan intimate soirees, milestone anniversaries, corporate gatherings, or grand celebrations with our versatile venues and dedicated event management team.",
    },
    {
      title: "Memorable Experiences",
      description:
        "From elegant fine dining at Chukkers to casual meals at Snaffles, every experience at HPRC is designed to create lasting memories with impeccable service and attention to detail.",
    },
  ],
};
