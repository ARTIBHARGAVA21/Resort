import React, { useMemo, useState } from "react";

function Icon({ name, className = "h-5 w-5", ...props }) {
  const icons = {
    mapPin: (
      <path d="M12 22s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Zm0-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    ),
    star: (
      <path d="M12 2l2.95 6.12 6.75.98-4.85 4.73 1.15 6.7L12 17.77 5.99 20.55l1.16-6.7L2.3 9.1l6.75-.98L12 2Z" />
    ),
    sparkles: (
      <path d="M5 2l1.2 3.6L10 7l-3.8 1.4L5 12l-1.2-3.6L0 7l3.8-1.4L5 2Zm14 4l1.1 3.2L24 10.5l-3.9 1.3L19 15l-1.1-3.2L14 10.5l3.9-1.3L19 6ZM9 13l1.6 4.7L16 19l-5.4 1.3L9 25l-1.6-4.7L2 19l5.4-1.3L9 13Z" />
    ),
    leaf: (
      <path d="M20 4s-7 0-11 4-4 11-4 11 7 0 11-4 4-11 4-11Zm-9.5 10.5c3-3 7.5-5 7.5-5s-2 4.5-5 7.5-6.5 3.5-6.5 3.5.5-3.5 3.5-6.5Z" />
    ),
    bell: (
      <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6V11a7 7 0 1 0-14 0v5l-2 2v1h18v-1l-2-2Z" />
    ),
    wifi: (
      <path d="M12 18.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-6.36-3.64a9 9 0 0 1 12.72 0l-1.41 1.41a7 7 0 0 0-9.9 0l-1.41-1.41ZM2.1 11.32a14 14 0 0 1 19.8 0l-1.41 1.41a12 12 0 0 0-16.98 0L2.1 11.32ZM12 3a19 19 0 0 1 13.44 5.56l-1.41 1.41a17 17 0 0 0-24.06 0L-1.44 8.56A19 19 0 0 1 12 3Z" />
    ),
    car: (
      <path d="M5 16l-1 2v3h2a2 2 0 0 0 4 0h4a2 2 0 0 0 4 0h2v-3l-1-2-1.5-6A2 2 0 0 0 15.56 8H8.44A2 2 0 0 0 6.5 10L5 16Zm3.44-6h7.12l1 4H7.44l1-4Z" />
    ),
    utensils: (
      <path d="M6 2h2v9a2 2 0 0 1-2 2H5V2h1Zm4 0h2v11h-2V2Zm6 0h2v6a3 3 0 0 1-3 3h-1V2h2v6a1 1 0 0 0 0 0Z" />
    ),
    dumbbell: (
      <path d="M7 6h2v12H7V6Zm8 0h2v12h-2V6ZM3 9h4v6H3V9Zm14 0h4v6h-4V9Z" />
    ),
    shield: (
      <path d="M12 2l8 4v6c0 5-3.2 9.4-8 10-4.8-.6-8-5-8-10V6l8-4Zm-1 14l6-6-1.4-1.4L11 13.2 8.4 10.6 7 12l4 4Z" />
    ),
    quote: (
      <path d="M9 7H5v6h4l-2 4h3l2-4V7Zm10 0h-4v6h4l-2 4h3l2-4V7Z" />
    ),
    chevronRight: (
      <path d="M10 6l6 6-6 6-1.4-1.4L13.2 12 8.6 7.4 10 6Z" />
    ),
    phone: (
      <path d="M6.6 10.8c1.4 2.6 3.6 4.8 6.2 6.2l2.1-2.1c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.6 22 2 13.4 2 3c0-.6.4-1 1-1h4.2c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2 2.9Z" />
    ),
    mail: (
      <path d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2 8 5 8-5" />
    ),
    clock: (
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Zm1-10V7h-2v6l5 3 1-1.7-4-2.3Z" />
    ),
    mountain: (
      <path d="M3 20l6-10 4 7 2-3 6 6H3Z" />
    ),
    waves: (
      <path d="M2 14c2 2 6 2 8 0s6-2 8 0 6 2 8 0v3c-2 2-6 2-8 0s-6-2-8 0-6 2-8 0v-3Zm0-6c2 2 6 2 8 0s6-2 8 0 6 2 8 0v3c-2 2-6 2-8 0s-6-2-8 0-6 2-8 0V8Z" />
    ),
    camera: (
      <path d="M9 4l1.5 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5L9 4Zm3 14a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {icons[name]}
    </svg>
  );
}

export default function About() {
  const [active, setActive] = useState("story");

  const stats = useMemo(
    () => [
      { value: "4.8★", label: "Guest Rating" },
      { value: "25+", label: "Premium Rooms" },
      { value: "60+", label: "Experiences" },
      { value: "10k+", label: "Happy Guests" },
    ],
    []
  );

  const whyChoose = useMemo(
    () => [
      {
        title: "Luxury Experience",
        desc: "Elegant rooms, premium facilities, and curated comfort.",
      },
      {
        title: "Scenic Surroundings",
        desc: "Wake up to breathtaking views, fresh air, and nature.",
      },
      {
        title: "Exceptional Hospitality",
        desc: "Warm service and attention to every detail.",
      },
    ],
    []
  );

  const amenities = useMemo(
    () => [
      { icon: "wifi", label: "High-speed Wi-Fi" },
      { icon: "car", label: "Ample Parking" },
      { icon: "utensils", label: "Multi-cuisine Dining" },
      { icon: "dumbbell", label: "Fitness Corner" },
      { icon: "waves", label: "Pool / Water Fun" },
      { icon: "shield", label: "24×7 Security" },
      { icon: "camera", label: "Photo Spots" },
      { icon: "clock", label: "Front Desk Support" },
    ],
    []
  );

  const tabs = useMemo(
    () => [
      { key: "story", title: "Our Story" },
      { key: "mission", title: "Mission" },
      { key: "values", title: "Values" },
    ],
    []
  );

  // ✅ UPDATED OUR JOURNEY CONTENT (as requested)
  const timeline = useMemo(
    () => [
      {
        year: "Vision",
        title: "From Our Own Dream",
        desc:
          "The journey began while working as a Sales Executive . During this time, the idea was born—to create our own business in the hospitality industry, taking it to the next level with comfort, recreation, and memorable guest experiences.",
      },
      {
        year: "Upgraded Comfort",
        title: "Luxury Rooms, Hygiene & Nature Comfort",
        desc:
          "Luxurious and spacious rooms with premium comfort, neat and hygienic washrooms, beautiful views, fresh airflow connected with nature, and activities designed especially for children—making every stay relaxing for families and couples.",
      },
      {
        year: "Upcoming Experiences",
        title: "Bonfire Nights, Festivals & Farming Fun",
        desc:
          "New experiences are coming soon—bonfire evenings, DJ nights, festival celebrations, and farming activities to give guests a unique blend of fun, culture, and nature.",
      },
    ],
    []
  );

  return (
    <div className="bg-white text-gray-900">
      {/* HERO (Premium + clean like your original) */}
      <section className="relative">
        <div className="relative h-[90vh] w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80"
            alt="Bharat Resort"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-700/60 via-sky-500/30 to-white/0" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-6 w-full">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md border border-white/20">
                <Icon name="mapPin" className="h-4 w-4" />
                <span>Discover Bharat Resort</span>
              </div>

              <h1 className="mt-6 text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-xl">
                A Luxury Retreat in the Heart of Nature
              </h1>

              <p className="mt-6 text-white/90 text-lg md:text-xl leading-relaxed">
                Bharat Resort blends the beauty of nature with comfort, luxury, and
                Indian hospitality—offering a peaceful escape for relaxation,
                rejuvenation, and unforgettable moments.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#about"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-gray-900 shadow-lg hover:shadow-xl transition"
                >
                  Explore About
                  <Icon
                    name="chevronRight"
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                  />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md border border-white/20 hover:bg-white/15 transition"
                >
                  Contact Us
                  <Icon name="phone" className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-10 flex items-center gap-3 text-white/90">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" className="h-4 w-4 fill-white text-white" />
                  ))}
                </div>
                <span className="text-sm">Loved by families, couples & groups</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="relative -mt-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-3xl bg-white/85 backdrop-blur-xl border border-gray-200 shadow-2xl p-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-extrabold">{s.value}</div>
                  <div className="mt-1 text-sm text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT INTRO */}
      <section id="about" className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          A Luxury Retreat in the Heart of Nature
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Bharat Resort blends the beauty of nature with comfort, luxury, and Indian
          hospitality—offering a peaceful escape designed for relaxation, rejuvenation,
          and unforgettable moments.
        </p>
      </section>

      {/* TWO COLUMN MISSION */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=1600&q=80"
          className="rounded-3xl shadow-2xl object-cover w-full h-96"
          alt="Resort Experience"
          loading="lazy"
        />

        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 border border-sky-100">
            <Icon name="sparkles" className="h-4 w-4" />
            Our Mission
          </div>

          <h3 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            World-class resort experience, surrounded by nature
          </h3>

          <p className="text-gray-600 leading-relaxed text-lg">
            To offer a world-class resort experience surrounded by nature.
            We provide a serene environment where guests can unwind, reconnect,
            and enjoy premium hospitality—whether it’s a weekend escape, a family trip,
            or a celebration.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-gradient-to-r from-sky-500 via-sky-400 to-sky-500 py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl md:text-5xl text-white font-extrabold mb-10">
            Why Choose Bharat Resort
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 p-8 text-center shadow-xl hover:scale-[1.01] transition"
              >
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-white/90">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE COLLAGE + AMENITIES */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 h-24 w-24 rounded-3xl bg-sky-100 blur-[1px]" />
              <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-3xl bg-emerald-100 blur-[1px]" />

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-7 overflow-hidden rounded-3xl shadow-xl border border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80"
                    alt="Resort view"
                    className="h-80 w-full object-cover hover:scale-[1.02] transition duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="col-span-12 md:col-span-5 overflow-hidden rounded-3xl shadow-xl border border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80"
                    alt="Luxury room"
                    className="h-80 w-full object-cover hover:scale-[1.02] transition duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="col-span-12 overflow-hidden rounded-3xl shadow-xl border border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80"
                    alt="Relaxing ambience"
                    className="h-64 w-full object-cover hover:scale-[1.02] transition duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 border border-emerald-100">
                <Icon name="leaf" className="h-4 w-4" />
                Facilities & Comfort
              </div>

              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                Comfort, convenience & curated experiences
              </h2>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                Everything you need—plus the little touches that make it memorable.
                From premium rooms to serene surroundings, every detail is designed for your comfort.
              </p>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-2 gap-4">
                {amenities.map((a) => (
                  <div
                    key={a.label}
                    className="rounded-2xl bg-white border border-gray-200 shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition"
                  >
                    <div className="rounded-xl bg-gray-900 text-white p-2">
                      <Icon name={a.icon} className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold text-gray-800">{a.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold">More about us</h2>
            <p className="mt-4 text-lg text-gray-600">
              A resort built with one goal—help guests feel calm, cared for, and connected to nature.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {tabs.map((t) => {
              const isActive = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={[
                    "rounded-2xl px-5 py-3 text-sm font-semibold transition border",
                    isActive
                      ? "bg-gray-900 text-white border-gray-900 shadow"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300",
                  ].join(" ")}
                >
                  {t.title}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2 rounded-3xl bg-white border border-gray-200 shadow-sm p-8 md:p-10">
              {active === "story" && (
                <>
                  <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 border border-sky-100">
                    <Icon name="quote" className="h-4 w-4" />
                    Our Story
                  </div>
                  <h3 className="mt-5 text-3xl font-extrabold">
                    A destination where every moment feels like a getaway
                  </h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    Bharat Resort began with a vision to create the perfect retreat for travelers
                    seeking peace, comfort, and natural beauty. Over the years, it has grown into a
                    destination known for elegance, luxury, and heart-warming hospitality.
                  </p>
                </>
              )}

              {active === "mission" && (
                <>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 border border-emerald-100">
                    <Icon name="leaf" className="h-4 w-4" />
                    Mission
                  </div>
                  <h3 className="mt-5 text-3xl font-extrabold">
                    World-class stays, rooted in nature
                  </h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    Deliver a premium resort experience surrounded by nature—where every guest feels
                    welcomed, refreshed, and cared for.
                  </p>
                  <ul className="mt-6 space-y-3 text-gray-700">
                    {[
                      "Calm, clean, comfortable stays",
                      "Warm service with attention to detail",
                      "Family-friendly, safe environment",
                      "Memorable experiences to share",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {active === "values" && (
                <>
                  <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 border border-gray-200">
                    <Icon name="shield" className="h-4 w-4" />
                    Values
                  </div>
                  <h3 className="mt-5 text-3xl font-extrabold">What we stand for</h3>

                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    {[
                      { title: "Guest-first", desc: "We listen, care, and respond quickly." },
                      { title: "Clean & Safe", desc: "Hygiene and security are non-negotiable." },
                      { title: "Authentic Hospitality", desc: "A warm welcome—always." },
                      { title: "Respect for Nature", desc: "We keep the resort serene and eco-conscious." },
                    ].map((v) => (
                      <div
                        key={v.title}
                        className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
                      >
                        <div className="text-lg font-bold">{v.title}</div>
                        <div className="mt-2 text-gray-600">{v.desc}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Side card */}
            <div className="rounded-3xl bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 md:p-10 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-3 border border-white/10">
                  <Icon name="sparkles" className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-white/70">Bharat Resort</div>
                  <div className="text-xl font-extrabold">Signature Experiences</div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  { icon: "waves", title: "Relax & Recharge", desc: "Perfect for weekends, staycations, quiet breaks." },
                  { icon: "utensils", title: "Taste & Celebrate", desc: "Dining and event-ready spaces for special moments." },
                  { icon: "mountain", title: "Explore Nature", desc: "Fresh air, scenic walks, and golden-hour views." },
                ].map((x) => (
                  <div key={x.title} className="rounded-3xl bg-white/5 border border-white/10 p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-white/10 p-2">
                        <Icon name={x.icon} className="h-5 w-5" />
                      </div>
                      <div className="font-bold">{x.title}</div>
                    </div>
                    <div className="mt-2 text-white/80">{x.desc}</div>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-gray-900 hover:shadow-lg transition"
              >
                Get in touch
                <Icon name="chevronRight" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* UNIQUE TIMELINE (UPDATED CONTENT) */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold">Our Journey</h2>
            <p className="mt-4 text-lg text-gray-600">
              A growing resort story—built with comfort, nature, and guest experience at the center.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {timeline.map((t) => (
              <div key={t.year} className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6">
                <div className="inline-flex items-center rounded-2xl bg-gray-900 text-white px-4 py-2 font-bold">
                  {t.year}
                </div>
                <div className="mt-4 text-xl font-extrabold">{t.title}</div>
                <div className="mt-2 text-gray-600 leading-relaxed">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-12">
                <h2 className="text-3xl md:text-4xl font-extrabold">Plan your next stay</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Replace placeholders with your real phone/email/location. Add a “Book Now” link to WhatsApp or your booking page.
                </p>

                <div className="mt-8 space-y-4 text-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-gray-900 text-white p-2">
                      <Icon name="phone" className="h-4 w-4" />
                    </div>
                    <span className="font-medium">+91 XXXXX XXXXX</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-gray-900 text-white p-2">
                      <Icon name="mail" className="h-4 w-4" />
                    </div>
                    <span className="font-medium">reservations@bharatresort.com</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-gray-900 text-white p-2">
                      <Icon name="mapPin" className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Your City, State • Landmark / Highway</span>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[340px]">
                <img
                  src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=80"
                  alt="Resort"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md border border-white/20">
                    <Icon name="sparkles" className="h-4 w-4" />
                    Upcoming • New Experiences Coming Soon
                  </div>
                  <h3 className="mt-4 text-2xl md:text-3xl font-extrabold">
                    Seasonal packages & events
                  </h3>
                  <p className="mt-2 text-white/85">
                    Weekend specials, celebrations, and nature experiences—crafted for families and couples.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Bharat Resort. All rights reserved.
          </div>
        </div>
      </section>
    </div>
  );
}
