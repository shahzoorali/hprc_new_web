import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

export default function AllAboutOlympicEquestrianSportsPage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="relative overflow-hidden">
        <div className="container pt-12">
          <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-200/50 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
            <div className="absolute inset-0">
              <Image
                src="/documents/news/all-about-olympic-equestrian-sports.jpg"
                alt="All about Olympic Equestrian Sports"
                fill
                className="object-cover"
                quality={90}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-900/85 via-brand-800/80 to-brand-900/85"></div>
            </div>
            <div className="relative z-10 p-8 md:p-16 lg:p-20">
              <div className="space-y-6 text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
                  All about Olympic Equestrian Sports
                </h1>
                <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                  An informative guide to Olympic equestrian disciplines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 md:p-12 lg:p-16 border-2 border-brand-100/70 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <SectionHeading
                eyebrow="Education"
                title="All about Olympic Equestrian Sports"
                description="An informative article covering Olympic equestrian sports, disciplines, and the journey of equestrian athletes in competitive sports."
                align="left"
              />
              <div className="prose prose-lg max-w-none mt-6">
                <p className="text-gray-700 leading-relaxed">
                  Horses are trained and ridden for practical working purposes such as in police
                  work or for controlling herd animals on a ranch. Horse riders everywhere have been
                  enjoying a slew of equestrian sports and events for hundreds of years. Three day
                  events that include the riding disciplines of dressage, endurance and show jumping
                  have actually been a part of the summer Olympics history since 1912. Horses, and
                  specific equine breeds, learn from specialized training to successfully compete in
                  events such as jumping, vaulting, dressage and more.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4 font-semibold">
                  Read the information below to learn more about equestrian competition sports in
                  detail. So Giddy Up!
                </p>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/documents/gallery/news/olympic-equestrian-sports/all-about-olympic-equestrian-sports.jpg"
                alt="Olympic Equestrian Sports"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dressage Section */}
      <section className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 md:p-12 lg:p-16 border-2 border-brand-100/70 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden order-2 md:order-1">
              <Image
                src="/documents/gallery/news/olympic-equestrian-sports/News0001.jpg"
                alt="Dressage by Sandra Auffarth"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm italic bg-black/50 px-3 py-2 rounded">
                  Dressage by Sandra Auffarth.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-6">Dressage</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Starting the list, we have Dressage.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Dressage is a type of competition that is focused on the core of all riding
                  activities. To compete, the horse's mind and body are taught to react to different
                  commands to perform maneuvers, such as turns, walking straight lines, stopping,
                  and galloping.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Dressage was primary developed during the Renaissance Period, but it can be traced
                  all the way back to the time of a famous Greek solider, Xenophon. It was then that
                  he wrote the book On the Art of Horsemanship in which he mentions the details of
                  Dressage. Its format, difficultly, and training have all evolved through time as
                  the sport continues to grow today. It was first introduced in the Olympic Games in
                  1912 although the format in which it is competed in has changed dramatically over
                  the past 95 years.
                </p>
              </div>
            </div>
          </div>

          {/* Dressage Equipment and Arena */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-brand-800 mb-4">Equipment for Dressage</h3>
            <p className="text-gray-700 leading-relaxed">
              A rider competing in Dressage wears decorative clothing, including a top hat,
              tailcoat, and spurs. Although a whip is used in training, it is disallowed in the
              arena, and is used to aid humane communication rather than physical dominance over the
              horse.
            </p>

            <h3 className="text-2xl font-bold text-brand-800 mb-4 mt-6">Dressage Arena</h3>
            <p className="text-gray-700 leading-relaxed">
              The arena is set up with alphabetical markers to help guide you through your routine.
              The size of the arena is either 65 x 22 yards for higher level participants, or 44 x
              22 yards for the lower end. The arena surface is different from that of the other
              areas of the stadium to create an barrier between the arena and the viewing area. If
              the horse leaves the arena surface, the rider is disqualified. The key to the surface
              is that it acts like turf, with the best surface said to be a combination of rubber
              and sand pieces.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4 font-semibold">
              The keys to competing in Dressage according to The Complete Horse Riding Manual are
              purity, acceptance, calmness and forwardness.
            </p>
          </div>
        </div>
      </section>

      {/* Show Jumping Section */}
      <section className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 md:p-12 lg:p-16 border-2 border-brand-100/70 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-6">
                Show Jumping
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Second in the list we have Show Jumping.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Another division of equestrian sport is show-jumping, in which competitors ride
                  horses over courses to show their skill in jumping over obstacles. It is an
                  artistic sport that also requires science to understand angles of the course and
                  the ability to judge the horses stride lengths and takeoff points. The top
                  show-jumpers are said to be able to get within one foot of the takeoff target.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  This sport was primarily a man's sport until the 1950s, when women began to
                  compete. The first female winner of a show-jumping event medal was Marion Coakes
                  who took home the silver medal at the 1968 Olympic games. The history of
                  show-jumping shows an evolution of the type of horses demanded in the event from
                  big European horses due to their power, to the current demand of quick horses of
                  some Thoroughbred decent.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Show-jumping is a type of horse event that requires dressage in practice. A short
                  amount of time is spent in the air, with the other needed great control over the
                  horse's actions to maintain high awareness.
                </p>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/documents/gallery/news/olympic-equestrian-sports/Jump02.jpg"
                alt="Show Jumping by Nick Skelton"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm italic bg-black/50 px-3 py-2 rounded">
                  Show Jumping by Nick Skelton
                </p>
              </div>
            </div>
          </div>

          {/* Show Jumping Equipment and Training */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-brand-800 mb-4">Equipment for Show-jumping</h3>
            <p className="text-gray-700 leading-relaxed">
              The equipment for this type of event is comfortable because must be able to move
              freely without constriction or difficulty. According to Micklem a rider must wear a
              jacket, shirt, tie, breeches, boots, gloves, and a hat. And the horse must have a
              specialized saddle, bridle, and protective boots. The special saddle is flat so the
              rider can stay close to the horse over the fence and on the decent as well.
            </p>

            <h3 className="text-2xl font-bold text-brand-800 mb-4 mt-6">Training</h3>
            <p className="text-gray-700 leading-relaxed">
              To train for show-jumping, a rider must move through different levels of exercises and
              fences to progress. It is also important to learn how to judge the stride length of
              the horse so you can move through the course smoothly without mistakes. To begin in
              the sport, practice involves learning the basics of dressage, and simple jumping.
            </p>

            <h3 className="text-2xl font-bold text-brand-800 mb-4 mt-6">Courses</h3>
            <p className="text-gray-700 leading-relaxed">
              Courses in show-jumping start at the novice level with fences set at 3 feet 6 inches
              in height and only a few variations in the jumping variables. The next level is
              elementary courses with fences at the height of 3 feet 9 inches, and a max jumping
              length of 4 feet 6 inches. There is a triple jump usually involved; the course must be
              completed in a time of 90 seconds. The third level is the medium course with 4 feet 3
              inch heights and 4 feet 9 inch spreads in jumps and a 90 second finishing time. The
              last level for the event is the advanced course, with 4 feet 6 inch heights and 5 feet
              2 inch spreads. It has to be completed in 72 seconds and involves a water jump and
              awkward distances between obstacles that can be tough to judge.
            </p>
          </div>
        </div>
      </section>

      {/* Cross Country Jumping Section */}
      <section className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 md:p-12 lg:p-16 border-2 border-brand-100/70 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden order-2 md:order-1">
              <Image
                src="/documents/gallery/news/olympic-equestrian-sports/Cross-Country-Ride.jpg"
                alt="Cross country jumping by Zara Phillips"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm italic bg-black/50 px-3 py-2 rounded">
                  Cross country jumping by Zara Phillips
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-6">
                Cross Country Jumping
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">Next we have Cross Country Jumping.</p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Cross country jumping is an event that involves the most crucial connection
                  between the horse and rider. It also requires a high level of physical fitness and
                  great efficiency training. Irish horses are the leaders in this type of
                  competition, as the sport continues to focus more on skill than endurance.
                </p>
              </div>
            </div>
          </div>

          {/* Cross Country Equipment */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-brand-800 mb-4">
              Equipment for Cross-Country Jumping
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Equipment in Cross-Country is much more focused on protection than anything else as
              the rider wears a skull cap, harness, and body protector. Riders sometimes are also
              required to have their medical records in a holder on their sleeve during competitions
              and also wear a stopwatch. Horses wear light weight bandaging for protection.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              The real difference between cross-country jumping to others is the different types of
              landscapes the horse and ride must navigate. Banks, ditches, and water all must be
              navigated, with many different angles and approaches to make it harder to complete the
              course.
            </p>
          </div>
        </div>
      </section>

      {/* Back to News */}
      <section className="container">
        <div className="text-center">
          <Link
            href="/events/news"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to News</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
