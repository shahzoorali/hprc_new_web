import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Blog posts data - same as in the main blogs page
const blogPosts = [
  {
    id: "health-benefits-horse-riding",
    title: "Health Benefits of Horse Riding That You Did Not Know",
    excerpt:
      "Discover the surprising physical and mental health benefits of horse riding. From improved core strength to stress relief, equestrian activities offer a unique full-body workout that benefits riders of all ages.",
    image: "https://hprc.in/images/gallery/Blog-001.jpg",
    category: "Health & Wellness",
    readTime: "5 min read",
    date: "December 15, 2024",
    author: "HPRC Team",
    content: `
      <p>Horse riding is not just a recreational activity or a sport; it's a comprehensive workout that offers numerous health benefits. Whether you're a beginner or an experienced rider, spending time in the saddle can significantly improve your physical and mental well-being.</p>

      <h2>Physical Health Benefits</h2>
      
      <h3>1. Core Strength and Stability</h3>
      <p>Maintaining balance while riding requires constant engagement of your core muscles. The natural movement of the horse challenges your abdominal and back muscles, leading to improved core strength and stability over time.</p>
      
      <h3>2. Improved Posture</h3>
      <p>Proper riding technique demands good posture. Riders must sit tall with shoulders back and spine aligned. This constant attention to posture during riding sessions translates to better posture in daily life.</p>
      
      <h3>3. Cardiovascular Exercise</h3>
      <p>While it may not seem like traditional cardio, horse riding elevates your heart rate, especially during trotting and cantering. A 45-minute ride can burn between 200-400 calories depending on the intensity.</p>
      
      <h3>4. Muscle Toning</h3>
      <p>Riding engages multiple muscle groups including:</p>
      <ul>
        <li>Inner thighs and hip flexors</li>
        <li>Calf muscles</li>
        <li>Arm and shoulder muscles</li>
        <li>Back muscles</li>
      </ul>
      
      <h3>5. Improved Coordination and Balance</h3>
      <p>Coordinating your body movements with the horse's motion develops exceptional balance and coordination skills that benefit other areas of life.</p>

      <h2>Mental Health Benefits</h2>
      
      <h3>1. Stress Relief</h3>
      <p>The rhythmic motion of riding and the connection with the horse has a calming effect. Many riders report feeling more relaxed and less stressed after a riding session.</p>
      
      <h3>2. Increased Confidence</h3>
      <p>Learning to control and communicate with a large animal builds confidence. Each milestone achieved in riding contributes to improved self-esteem.</p>
      
      <h3>3. Mindfulness and Focus</h3>
      <p>Riding requires complete attention to the present moment. This natural mindfulness practice helps clear the mind and improve concentration.</p>
      
      <h3>4. Social Connection</h3>
      <p>Riding communities provide opportunities for social interaction and building friendships with like-minded individuals.</p>

      <h2>Getting Started</h2>
      <p>If you're interested in experiencing these benefits, consider starting with beginner riding lessons at HPRC. Our experienced instructors will guide you through the basics while ensuring your safety and comfort.</p>
      
      <p>Remember, consistency is key. Regular riding sessions will help you maximize these health benefits while developing a rewarding relationship with horses.</p>
    `,
  },
  {
    id: "exercises-correct-horse-riding",
    title: "Exercises for Correct Horse Riding",
    excerpt:
      "Master the art of horse riding with these essential exercises designed to improve your posture, balance, and riding technique. Perfect for beginners and intermediate riders looking to enhance their skills.",
    image: "https://hprc.in/images/gallery/Blog-002.jpg",
    category: "Training Tips",
    readTime: "7 min read",
    date: "November 28, 2024",
    author: "HPRC Training Team",
    content: `
      <p>Proper technique is the foundation of good horse riding. Whether you're just starting out or looking to refine your skills, these exercises will help you develop the strength, flexibility, and body awareness needed for correct riding form.</p>

      <h2>Off-Horse Exercises</h2>
      
      <h3>1. Core Strengthening</h3>
      <p>A strong core is essential for maintaining balance and stability in the saddle.</p>
      <ul>
        <li><strong>Planks:</strong> Hold for 30-60 seconds, focusing on keeping your body in a straight line</li>
        <li><strong>Dead Bugs:</strong> Lie on your back and alternate extending opposite arm and leg</li>
        <li><strong>Bird Dogs:</strong> On hands and knees, extend opposite arm and leg while maintaining balance</li>
      </ul>
      
      <h3>2. Hip Flexibility</h3>
      <p>Flexible hips allow for better leg position and communication with your horse.</p>
      <ul>
        <li><strong>Hip Circles:</strong> Stand on one leg and rotate the other hip in circles</li>
        <li><strong>Butterfly Stretch:</strong> Sit with soles of feet together, gently pressing knees toward the ground</li>
        <li><strong>Pigeon Pose:</strong> A yoga pose that deeply stretches the hip flexors</li>
      </ul>
      
      <h3>3. Leg Strength</h3>
      <p>Strong legs help maintain proper position and give clear aids to your horse.</p>
      <ul>
        <li><strong>Squats:</strong> Focus on keeping weight in your heels</li>
        <li><strong>Lunges:</strong> Step forward and lower your back knee toward the ground</li>
        <li><strong>Calf Raises:</strong> Rise up on your toes, then lower slowly</li>
      </ul>

      <h2>Mounted Exercises</h2>
      
      <h3>1. Two-Point Position</h3>
      <p>Practice rising out of the saddle while maintaining balance. This strengthens your legs and improves your seat.</p>
      
      <h3>2. No-Stirrup Work</h3>
      <p>Riding without stirrups develops a deeper seat and better balance. Start at the walk and progress to trot as you become more confident.</p>
      
      <h3>3. Arm Circles</h3>
      <p>While walking, extend your arms and make slow circles. This improves upper body independence and balance.</p>
      
      <h3>4. Eyes Closed Exercise</h3>
      <p>At a halt or walk, close your eyes briefly to focus on feeling the horse's movement. This develops body awareness and balance.</p>

      <h2>Breathing Exercises</h2>
      <p>Proper breathing helps you stay relaxed and connected with your horse:</p>
      <ul>
        <li>Practice deep belly breathing before mounting</li>
        <li>Exhale during transitions to stay soft and relaxed</li>
        <li>Maintain steady breathing during all gaits</li>
      </ul>

      <h2>Practice Tips</h2>
      <ul>
        <li>Warm up before every ride with stretching</li>
        <li>Practice off-horse exercises 3-4 times per week</li>
        <li>Focus on one skill at a time during riding sessions</li>
        <li>Ask your instructor for feedback on your position</li>
      </ul>

      <p>Consistent practice of these exercises will lead to noticeable improvements in your riding. Remember, good riding is a journey, not a destination!</p>
    `,
  },
  {
    id: "5-tips-mentally-prepared-equestrian-competition",
    title: "5 Tips on Being Mentally Prepared For Any Equestrian Competition",
    excerpt:
      "Competition day can be nerve-wracking. Learn proven mental preparation techniques used by professional equestrians to stay calm, focused, and perform at your best when it matters most.",
    image: "https://hprc.in/images/gallery/Blog-003.jpg",
    category: "Competition",
    readTime: "6 min read",
    date: "October 10, 2024",
    author: "HPRC Competition Team",
    content: `
      <p>Competition day can bring a mix of excitement and anxiety. Whether you're competing in show jumping, dressage, polo, or any other equestrian discipline, mental preparation is just as important as physical training. Here are five proven strategies to help you perform at your best.</p>

      <h2>1. Visualize Success</h2>
      <p>Visualization is a powerful tool used by elite athletes across all sports. Before the competition:</p>
      <ul>
        <li>Find a quiet space and close your eyes</li>
        <li>Imagine yourself riding the course or test perfectly</li>
        <li>Include all sensory details - the feel of the reins, the rhythm of your horse, the sounds around you</li>
        <li>Visualize handling unexpected situations calmly</li>
        <li>End with seeing yourself completing your ride successfully</li>
      </ul>
      <p>Practice this visualization daily in the weeks leading up to competition.</p>

      <h2>2. Develop a Pre-Competition Routine</h2>
      <p>A consistent routine helps signal to your mind and body that it's time to perform. Your routine might include:</p>
      <ul>
        <li>A specific warm-up sequence</li>
        <li>Listening to particular music</li>
        <li>Positive self-talk or affirmations</li>
        <li>Breathing exercises</li>
        <li>A final equipment check</li>
      </ul>
      <p>The key is consistency - do the same routine before every competition so it becomes automatic.</p>

      <h2>3. Control What You Can Control</h2>
      <p>Competition brings many variables beyond your control - weather, other competitors, judging. Focus your energy on what you CAN control:</p>
      <ul>
        <li>Your preparation and training</li>
        <li>Your horse's care and warm-up</li>
        <li>Your attitude and mindset</li>
        <li>Your breathing and relaxation</li>
        <li>Your reaction to challenges</li>
      </ul>
      <p>Let go of everything else. Worrying about uncontrollable factors only drains your mental energy.</p>

      <h2>4. Use Positive Self-Talk</h2>
      <p>The way you talk to yourself matters. Replace negative thoughts with positive ones:</p>
      <ul>
        <li>Instead of "Don't mess up" → "I am prepared and capable"</li>
        <li>Instead of "Everyone is watching" → "I'm focused on my ride"</li>
        <li>Instead of "What if I fail?" → "I trust my training"</li>
        <li>Instead of "I'm so nervous" → "I'm excited and ready"</li>
      </ul>
      <p>Create personal affirmations that resonate with you and repeat them regularly.</p>

      <h2>5. Embrace Nervous Energy</h2>
      <p>Nervousness before competition is normal and can actually enhance performance when channeled correctly:</p>
      <ul>
        <li>Recognize that butterflies mean you care about your performance</li>
        <li>Use deep breathing to manage intense anxiety (4 counts in, 4 counts hold, 4 counts out)</li>
        <li>Channel nervous energy into focus and alertness</li>
        <li>Remember that your horse can sense your emotions - staying calm helps them stay calm too</li>
      </ul>

      <h2>Bonus Tips</h2>
      <ul>
        <li><strong>Get adequate sleep</strong> in the days before competition</li>
        <li><strong>Eat properly</strong> - don't skip meals or try new foods on competition day</li>
        <li><strong>Arrive early</strong> to avoid rushing and added stress</li>
        <li><strong>Have a support system</strong> - bring someone who helps you stay calm</li>
        <li><strong>Learn from every competition</strong> - win or lose, there's always something to improve</li>
      </ul>

      <p>Remember, mental preparation is a skill that improves with practice. Start implementing these strategies in your training sessions so they become second nature by competition day. Good luck!</p>
    `,
  },
];

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  // Find related posts (other posts in different categories)
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm text-white/60 mb-6">
              <Link href="/events/blogs" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-white/80">{post.category}</span>
            </nav>

            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium rounded-full mb-6">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-white/70">
              <span>{post.author}</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>{post.date}</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative -mt-8 sm:-mt-12 mb-12">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg prose-gray max-w-none
                prose-headings:font-serif prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-li:text-gray-600
                prose-strong:text-gray-900
                prose-ul:my-4 prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Share this article</h3>
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://hprc.co.in/events/blogs/${post.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://hprc.co.in/events/blogs/${post.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - https://hprc.co.in/events/blogs/${post.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <Link
                  href="/events/blogs"
                  className="inline-flex items-center gap-2 text-brand-600 font-medium hover:text-brand-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to all articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-serif text-gray-900 mb-8">Related Articles</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/events/blogs/${relatedPost.id}`}
                    className="group"
                  >
                    <article className="bg-[#faf9f7] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <span className="inline-block px-2.5 py-0.5 bg-brand-100 text-brand-700 text-xs font-medium rounded-full mb-3">
                          {relatedPost.category}
                        </span>
                        <h3 className="text-lg font-serif text-gray-900 group-hover:text-brand-600 transition-colors leading-snug">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-brand-50 to-white">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-4">
              Ready to Start Your Riding Journey?
            </h2>
            <p className="text-gray-600 mb-8">
              Join HPRC and experience world-class equestrian facilities and expert instruction.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/programmes/riding"
                className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-full transition-colors"
              >
                Start Riding
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border border-brand-600 text-brand-600 hover:bg-brand-50 font-semibold rounded-full transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
