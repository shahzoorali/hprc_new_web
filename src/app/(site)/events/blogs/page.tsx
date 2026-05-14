import Image from "next/image";
import Link from "next/link";

// Blog posts from HPRC - https://hprc.in/blogs.html
const blogPosts = [
  {
    id: "health-benefits-horse-riding",
    title: "Health Benefits of Horse Riding That You Did Not Know",
    excerpt:
      "Discover the surprising physical and mental health benefits of horse riding. From improved core strength to stress relief, equestrian activities offer a unique full-body workout that benefits riders of all ages.",
    image: "/hero-horse.png",
    category: "Health & Wellness",
    readTime: "5 min read",
    date: "December 15, 2024",
    featured: true,
  },
  {
    id: "exercises-correct-horse-riding",
    title: "Exercises for Correct Horse Riding",
    excerpt:
      "Master the art of horse riding with these essential exercises designed to improve your posture, balance, and riding technique. Perfect for beginners and intermediate riders looking to enhance their skills.",
    image: "/hero-horse.png",
    category: "Training Tips",
    readTime: "7 min read",
    date: "November 28, 2024",
    featured: false,
  },
  {
    id: "5-tips-mentally-prepared-equestrian-competition",
    title: "5 Tips on Being Mentally Prepared For Any Equestrian Competition",
    excerpt:
      "Competition day can be nerve-wracking. Learn proven mental preparation techniques used by professional equestrians to stay calm, focused, and perform at your best when it matters most.",
    image: "/hero-horse.png",
    category: "Competition",
    readTime: "6 min read",
    date: "October 10, 2024",
    featured: false,
  },
];

// Categories for filtering
const categories = [
  { id: "all", name: "All Posts", count: blogPosts.length },
  { id: "health", name: "Health & Wellness", count: 1 },
  { id: "training", name: "Training Tips", count: 1 },
  { id: "competition", name: "Competition", count: 1 },
];

export default function BlogsPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container px-4 relative">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium rounded-full mb-6">
              HPRC Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
              Insights & Stories from the <span className="text-brand-300">Equestrian World</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
              Expert advice, training tips, and inspiring stories from HPRC coaches, riders, and the
              equestrian community.
            </p>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-20 hidden lg:block">
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="currentColor">
            <path
              d="M100,10 L190,100 L100,190 L10,100 Z"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
            <path
              d="M100,30 L170,100 L100,170 L30,100 Z"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
            <path
              d="M100,50 L150,100 L100,150 L50,100 Z"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 sm:py-20">
          <div className="container px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-brand-600 rounded-full" />
              <h2 className="text-sm font-semibold text-brand-600 uppercase tracking-wider">
                Featured Article
              </h2>
            </div>

            <Link href={`/events/blogs/${featuredPost.id}`} className="group block">
              <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px]">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-brand-600 text-white text-xs font-semibold rounded-full">
                    {featuredPost.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{featuredPost.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-900 mb-4 group-hover:text-brand-600 transition-colors leading-tight">
                    {featuredPost.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-brand-600 font-semibold">
                    Read Article
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Categories & Posts */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container px-4">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-serif text-gray-900 mb-2">Latest Articles</h2>
              <p className="text-gray-600">
                Explore our collection of equestrian insights and tips
              </p>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category.id === "all"
                      ? "bg-brand-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                  <span className="ml-1.5 text-xs opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/events/blogs/${post.id}`} className="group">
                <article className="bg-[#faf9f7] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 bg-brand-100 text-brand-700 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-serif text-gray-900 mb-3 group-hover:text-brand-600 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-400">{post.date}</span>
                      <span className="text-brand-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-brand-50 to-white">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-full mb-6">
              <svg
                className="w-8 h-8 text-brand-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-4">Stay Updated</h2>

            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter for the latest articles, riding tips, and exclusive
              content from HPRC.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-full transition-colors"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-4">
              By subscribing, you agree to receive email communications from HPRC.
            </p>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-gray-900">
        <div className="container px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <span className="text-gray-400">Explore more:</span>
            <Link href="/events/news" className="text-white hover:text-brand-400 transition-colors">
              Latest News
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/events/photo-gallery"
              className="text-white hover:text-brand-400 transition-colors"
            >
              Photo Gallery
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/events/video-gallery"
              className="text-white hover:text-brand-400 transition-colors"
            >
              Video Gallery
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/programmes/riding"
              className="text-white hover:text-brand-400 transition-colors"
            >
              Start Riding
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
