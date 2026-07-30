import React, { useEffect, useState } from "react";
import childhoodPhoto from "./childhoodphoto.jpeg";

const names = {
  groom: "Jasir Hussain",
  bride: "Dr. Fathima Shesmin PT",
};

const venueMapUrl =
  "https://www.google.com/maps?q=11.4240655,75.8938564&entry=gps&lucs=,94297699,94275415,94284457,94231188,94280568,47071704,94218641,94282134,94298698,94286869&g_ep=CAISEjI1LjQ5LjkuODM4ODk5MTgzMBgAINeCAypaLDk0Mjk3Njk5LDk0Mjc1NDE1LDk0Mjg0NDU3LDk0MjMxMTg4LDk0MjgwNTY4LDQ3MDcxNzA0LDk0MjE4NjQxLDk0MjgyMTM0LDk0Mjk4Njk4LDk0Mjg2ODY5QgJJTg%3D%3D&skid=2316d284-2a2f-403b-b448-a79dd1f78e14&g_st=iw";

const weddingDate = new Date("2026-08-16T16:00:00+05:30");

function getTimeRemaining() {
  const difference = weddingDate.getTime() - Date.now();

  if (difference <= 0) return null;

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function Flower({ className = "" }) {
  return (
    <svg
      className={`flower ${className}`}
      viewBox="0 0 150 220"
      aria-hidden="true"
    >
      <path d="M74 218c2-70 3-133 1-200" />
      <path d="M75 101C55 84 39 85 26 94c18 5 34 3 49-2" />
      <path d="M75 141c19-18 37-18 52-9-17 8-35 8-52 0" />
      <path d="M75 63c17-13 31-13 42-6-13 7-27 7-42 0" />
      <circle cx="75" cy="19" r="7" />
      <path d="M74 20C48 11 48 45 73 27C54 52 88 57 77 28C92 48 113 25 82 21C106 9 83-10 77 13C68-10 48 5 70 20" />
    </svg>
  );
}

function GeometricRosette({ className = "" }) {
  return (
    <svg
      className={`geometric-rosette ${className}`}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="77" />
      <rect x="46" y="46" width="108" height="108" rx="3" />
      <rect
        x="46"
        y="46"
        width="108"
        height="108"
        rx="3"
        transform="rotate(45 100 100)"
      />
      <circle cx="100" cy="100" r="39" />
      <circle cx="100" cy="100" r="8" />
    </svg>
  );
}

function App() {
  const [introOpen, setIntroOpen] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining);

  useEffect(() => {
    document.body.style.overflow = introOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introOpen]);

  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    sections.forEach((section) => section.classList.add("reveal-section"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className={introOpen ? "" : "invitation-open"}>
      <div className={`envelope ${introOpen ? "is-open" : "is-gone"}`}>
        <div className="envelope__paper">
          <GeometricRosette className="envelope__rosette envelope__rosette--one" />
          <GeometricRosette className="envelope__rosette envelope__rosette--two" />
          <p className="arabic envelope__bismillah" lang="ar" dir="rtl">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
          <p className="eyebrow">Together with their families</p>
          <div className="seal"><span>J</span><i>&</i><span>S</span></div>
          <h1>You’re invited</h1>
          <p>to the blessed Nikah celebration</p>
          <button type="button" onClick={() => setIntroOpen(false)}>
            Open invitation <span>→</span>
          </button>
        </div>
      </div>

      <section className="hero">
        <div className="hero__geometry" aria-hidden="true">
          <GeometricRosette className="hero__rosette hero__rosette--one" />
          <GeometricRosette className="hero__rosette hero__rosette--two" />
        </div>
        <Flower className="flower--left" />
        <Flower className="flower--right" />
        <nav aria-label="Wedding navigation">
          <a href="#story">Our story</a>
          <a href="#details">The day</a>
          <div className="nav-monogram">J <i>&</i> S</div>
          <a href="#venue">Venue</a>
          <a href="#rsvp">Celebrate</a>
        </nav>

        <div className="hero__content">
          <p className="arabic hero__bismillah" lang="ar" dir="rtl">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
          {/* <div className="nikah-mark"><span /> Nikah <span /></div> */}
          <p className="eyebrow">With joyful hearts, we invite you to celebrate our nikah</p>
          <h1>
            <span>Jasir</span>
            <i>&</i>
            <span>Shesmin</span>
          </h1>
          <div className="date-lockup" aria-label="August 16 at 4 PM">
            <span>August</span>
            <strong>16</strong>
            <span>4:00 PM</span>
          </div>
          <p className="hero__note">
            Two souls, united by His beautiful decree.
          </p>
          <a className="scroll-cue" href="#story" aria-label="Scroll to our story">
            <span>Discover our day</span>
            <b>↓</b>
          </a>
        </div>
      </section>

      <section className="story section" id="story">
        <div className="story__photo">
          <img
            className="childhood-photo"
            src={childhoodPhoto}
            alt="Jasir and Shesmin together as children"
          />
          <span className="tape tape--top" />
          <span className="tape tape--bottom" />
          <p className="handwritten">from little moments<br />to a lifetime together</p>
        </div>
        <div className="story__copy">
          <p className="eyebrow">A story written in the stars</p>
          <h2>Once upon a time,<br />before we even knew…</h2>
          <div className="small-flourish">✦</div>
          <p>
            Two childhoods, two stories, and a path that would one day become
            one. Now, surrounded by the people who made us who we are, we’re
            stepping into our favourite chapter yet.
          </p>
          <p className="signature">Jasir & Shesmin</p>
        </div>
      </section>

      <section className="dua section" aria-labelledby="dua-title">
        <GeometricRosette className="dua__rosette dua__rosette--left" />
        <GeometricRosette className="dua__rosette dua__rosette--right" />
        <div className="dua__inner">
          <p className="eyebrow">A prayer for the couple</p>
          <p className="arabic dua__arabic" id="dua-title" lang="ar" dir="rtl">
            بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ
            <br />
            وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <span className="dua__ornament" aria-hidden="true">◆</span>
          <p className="dua__translation">
            May Allah bless you, shower His blessings upon you,
            <br />and unite you both in goodness.
          </p>
        </div>
      </section>

      <section className="details section" id="details">
        <div className="details__heading">
          <p className="eyebrow">The Nikah · Save the date</p>
          <h2>Our blessed beginning</h2>
        </div>
        <div className="date-card">
          <span className="date-card__month">August</span>
          <strong>16</strong>
          <div className="date-card__time" aria-label="At 4:00 PM">
            <span>at</span>
            <strong>04:00</strong>
            <em>PM</em>
          </div>
          <div className="date-card__line" />
          <p>We can’t wait to celebrate with you</p>
        </div>
        <div className="countdown" aria-label="Countdown to the wedding">
          {timeRemaining ? (
            <>
              <p>Counting every moment</p>
              <div className="countdown__grid">
                {Object.entries(timeRemaining).map(([label, value]) => (
                  <div className="countdown__item" key={label}>
                    <strong>{String(value).padStart(2, "0")}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="countdown__arrived">Our celebration has begun</p>
          )}
        </div>
      </section>

      <section className="venue section" id="venue">
        <div className="venue__map">
          <iframe
            title="Map showing Alora, our home"
            src="https://www.google.com/maps?q=11.4240655,75.8938564&z=18&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="venue__copy">
          <p className="eyebrow">Where we’ll gather</p>
          <h2>At our Alora,<br />with all of you</h2>
          <p>
            We look forward to welcoming you to our home for this special
            celebration.
          </p>
          <p className="venue__landmark">
            <span>Nearby landmark</span>
            Salamath Nagar Juma Masjid
          </p>
          <div className="coming-soon">
            <span>Directions</span>
            <a href={venueMapUrl} target="_blank" rel="noreferrer">
              Open in Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="celebrate section" id="rsvp">
        <p className="eyebrow">Mark your calendar</p>
        <h2>Eat, dance, laugh<br />& celebrate with us</h2>
        <p>Your presence will make our day even more meaningful.</p>
        <div className="couple-names">
          <span>{names.groom}</span>
          <i>&</i>
          <span>{names.bride}</span>
        </div>
        <div className="final-date">16 · 08 · 2026  <span>at 4:00 PM</span></div>
      </section>

      <footer>
        <span>Made with du’a & love</span>
        <div>J <i>&</i> S</div>
        <span>See you there</span>
      </footer>
    </main>
  );
}

export default App;
