'use client';
import { useState } from 'react';
import Link from 'next/link';
const photos = {
  party:
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85',
  banquet:
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85',
  meeting:
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
  studio:
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=85',
  food: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=85',
  decor:
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85',
  photo:
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=900&q=85',
  city: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=85',
};
const categories = [
  ['Celebration Venues', photos.party],
  ['Private Party Venues', photos.banquet],
  ['Corporate Meetings', photos.meeting],
  ['Creative Studios', photos.studio],
];
const vendors = [
  ['Caterers', photos.food],
  ['Decorators', photos.decor],
  ['Photographers', photos.photo],
  ['Entertainment', photos.party],
];
const listings = [photos.meeting, photos.studio, photos.party, photos.banquet];
function Header() {
  return (
    <header className="header home-header">
      <Link href="/" className="brand">
        <img src="/venuze-logo.png" alt="Venuze" />
      </Link>
      <nav className="nav">
        <a href="#categories">Explore</a>
        <a href="#vendors">Services</a>
        <a href="#footer">About</a>
      </nav>
      <div className="head-actions">
        <Link className="outline-btn" href="/login">
          Add your listing⌄
        </Link>
        <button className="outline-btn lang">EN⌄</button>
        <Link className="user-btn" href="/login">
          ♙
        </Link>
      </div>
      <button className="mobile-menu" aria-label="Open menu">
        ☰
      </button>
    </header>
  );
}
function Card({ title, img, index = 0 }: { title: string; img: string; index?: number }) {
  return (
    <article className="venue-card">
      <div
        className="card-photo"
        style={{
          backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.56),transparent 53%),url('${img}')`,
        }}
      >
        <span className="badge">{index === 0 ? '37' : '24'} Venues</span>
        <h3>{title}</h3>
      </div>
    </article>
  );
}
function Listing({ img }: { img: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <article className="listing">
      <div className="listing-image" style={{ backgroundImage: `url('${img}')` }}>
        <span className="verified">Verified</span>
        <button className="save" onClick={() => setSaved(!saved)} aria-label="Save listing">
          {saved ? '♥' : '♡'}
        </button>
      </div>
      <div className="listing-copy">
        <h3>High-Spec Room in Trendy Home Clapham/ Stockwell</h3>
        <p className="location">⌖ London, SW1</p>
        <div className="amenities">
          <span>♧ 300+</span>
          <span>↗ 2,000 sq ft</span>
          <span>▱ Free parking</span>
        </div>
        <small>+25 more</small>
        <div className="price-row">
          <strong>From $50/hour</strong>
          <Link href="/search">View details</Link>
        </div>
      </div>
    </article>
  );
}
export default function Marketplace() {
  const [type, setType] = useState('Venue');
  const [where, setWhere] = useState('Dubai, UAE');
  const [when, setWhen] = useState('Anytime');
  const [guests, setGuests] = useState('10–20');
  const [toast, setToast] = useState('');
  const [tab, setTab] = useState('GALLERY');
  function search() {
    location.href = `/search?where=${encodeURIComponent(where)}&when=${encodeURIComponent(when)}&guests=${encodeURIComponent(guests)}`;
  }
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-shade"></div>
          <div className="hero-content">
            <h1>
              Celebrate in venues
              <br />
              big and small
            </h1>
            <div className="search-box">
              <div className="search-tabs">
                <button
                  className={type === 'Venue' ? 'active' : ''}
                  onClick={() => setType('Venue')}
                >
                  ▣ &nbsp;Venue
                </button>
                <button
                  className={type === 'Vendors' ? 'active' : ''}
                  onClick={() => setType('Vendors')}
                >
                  ✧ &nbsp;Vendors
                </button>
              </div>
              <div className="search-fields">
                <label>
                  Where
                  <input value={where} onChange={(e) => setWhere(e.target.value)} />
                </label>
                <label>
                  When
                  <select value={when} onChange={(e) => setWhen(e.target.value)}>
                    <option>Anytime</option>
                    <option>This weekend</option>
                    <option>Next month</option>
                  </select>
                </label>
                <label>
                  Guests
                  <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                    <option>10–20</option>
                    <option>20–50</option>
                    <option>50–100</option>
                    <option>100+</option>
                  </select>
                </label>
                <button className="search-button" onClick={search}>
                  ⌕ &nbsp;Search
                </button>
              </div>
            </div>
            <div className="dots">
              <i /> <b /> <i /> <i />
            </div>
          </div>
        </section>
        <section className="section" id="categories">
          <div className="section-heading">
            <h2>Find The Best Venue For Any Occasion</h2>
            <p>
              Explore venues by category, from timeless ballrooms and rooftops with a view to modern
              studios and outdoor gardens,
              <br className="wide" /> discover spaces designed to inspire unforgettable experiences.
            </p>
          </div>
          <div className="category-grid">
            {categories.map(([title, img], i) => (
              <Card key={title} title={title} img={img} index={i} />
            ))}
          </div>
          <div className="arrows">
            <button>‹</button>
            <button>›</button>
          </div>
        </section>
        <section className="featured">
          <div className="featured-shade"></div>
          <div className="featured-inner">
            <h2>Featured Venues</h2>
            <div className="pills">
              {['ROOFTOP', 'GALLERY', 'RESTAURANT', 'OUTDOOR', 'STUDIO', 'TERRACE', 'BALLROOM'].map(
                (p) => (
                  <button className={p === tab ? 'selected' : ''} key={p} onClick={() => setTab(p)}>
                    {p}
                  </button>
                ),
              )}
            </div>
            <div className="listing-grid">
              {listings.map((img, i) => (
                <Listing key={i} img={img} />
              ))}
            </div>
          </div>
        </section>
        <section className="vendor-section" id="vendors">
          <div className="section-heading">
            <h2>Complete Your Event with our Trusted Vendors</h2>
            <p>
              Venues are just the beginning. Discover caterers, decorators, photographers,
              entertainment, and more all in one place,
              <br className="wide" /> ready to bring your event project to life.
            </p>
          </div>
          <div className="category-grid">
            {vendors.map(([title, img], i) => (
              <Card key={title} title={title} img={img} index={i} />
            ))}
          </div>
          <Banner
            title="Grow Your Business with Venuze"
            text="Showcase your services to thousands of event organizers and creators searching for talent like yours."
            button="Join as a Vendor"
          />
        </section>
        <section className="path-section">
          <div className="section-heading">
            <h2>Your Path to the Perfect Venue</h2>
            <p>
              Planning an event, production, or gathering shouldn’t feel complicated. Our
              streamlined process connects you with the
              <br className="wide" /> right venues and trusted professionals, taking the stress out
              of logistics so you can focus on what matters most.
            </p>
          </div>
          <div className="path-grid">
            <div className="photo-collage">
              <img src={photos.party} />
              <img src={photos.banquet} />
              <img src={photos.meeting} />
              <img src={photos.photo} />
            </div>
            <div className="steps">
              {[
                [
                  'Search & filter',
                  'Browse our curated collection of venues and event professionals. Use smart filters, high-quality visuals, and authentic reviews to find options that fit your needs, style, and budget.',
                ],
                [
                  'Compare & message',
                  'Communicate directly with venue hosts and service providers. Request tailored quotes, discuss requirements, and design every detail of your event or project with confidence.',
                ],
                [
                  'Book & add services',
                  'Secure your choices with ease through our protected booking system. With clear agreements, secure payments, and ongoing support, you can move forward knowing everything is handled.',
                ],
              ].map(([title, text], i) => (
                <div className="step" key={title}>
                  <b>{i + 1}</b>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="trust">
          <div className="section-heading">
            <h2>Trusted by Event Creators Who Demand Excellence</h2>
            <p>
              Join thousands of planners and hosts who love our seamless discovery and booking
              experience.
            </p>
          </div>
          <div className="stats">
            {[
              ['1,500+', 'Venues Vetted & Approved'],
              ['7,500+', 'Events Successfully Hosted'],
              ['35+', 'Cities Across the Region'],
              ['4.9★', 'Average Host Rating'],
            ].map((x, i) => (
              <div className={`stat stat-${i}`} key={x[0]}>
                <b>{x[0]}</b>
                <span>{x[1]}</span>
              </div>
            ))}
          </div>
          <div className="reviews">
            <article>
              <div className="avatar" style={{ backgroundImage: `url('${photos.photo}')` }} />
              <div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <strong>Michael Carter</strong>
                <span className="stars">★★★★★</span>
              </div>
            </article>
            <article>
              <div
                className="avatar second"
                style={{ backgroundImage: `url('${photos.meeting}')` }}
              />
              <div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <strong>by Ayesha M.</strong>
                <span className="stars">★★★★★</span>
              </div>
            </article>
          </div>
        </section>
        <section className="destinations">
          <div className="section-heading">
            <h2>Discover Exceptional Destinations Across the Region</h2>
            <p>
              From cosmopolitan cityscapes to cultural treasures, explore where celebrations come
              alive with local flavor.
            </p>
          </div>
          <div className="destination-grid">
            {[
              ['New York, USA', photos.city],
              ['London, UK', photos.city],
              ['Dubai, UAE', photos.banquet],
            ].map(([title, img], i) => (
              <div
                key={title}
                style={{
                  backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.8),transparent 65%),url('${img}')`,
                }}
              >
                <span>{[24, 108, 17][i]} Venues</span>
                <div>
                  <h3>{title}</h3>
                  <p>Coastal energy, modern Venue</p>
                  <small>
                    Popular: Rooftop <b>From $50 per hour</b>
                  </small>
                </div>
              </div>
            ))}
          </div>
          <Banner
            title="Turn Your Venue into a Destination"
            text="List your space on Venuze and unlock new revenue opportunities. Reach clients looking for venues just like yours."
            button="List Your Venue"
          />
        </section>
      </main>
      <Footer toast={toast} setToast={setToast} />
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
function Banner({ title, text, button }: { title: string; text: string; button: string }) {
  return (
    <div className="banner">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
        <Link href="/login">{button}</Link>
      </div>
      <div className="banner-art">✦　♧　✧</div>
    </div>
  );
}
function Footer({ toast, setToast }: { toast: string; setToast: (s: string) => void }) {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/venuze-logo.png" />
          <strong>
            Make it memorable—book the perfect venue
            <br /> and the pros who make it shine.
          </strong>
        </div>
        <div className="footer-columns">
          {[
            ['Venuze', 'About', 'News', 'Careers', 'Investors'],
            ['Support', 'Listings your venue', 'Help center', 'FAQ'],
            ['Explore', 'Venue types', 'Service options', 'Locations'],
            ['Legal & Privacy', 'Terms of service', 'Payment & refund policy', 'Host agreement'],
          ].map((col) => (
            <div key={col[0]}>
              <b>{col[0]}</b>
              {col.slice(1).map((s) => (
                <a key={s} href="#">
                  {s}
                </a>
              ))}
            </div>
          ))}
        </div>
        <form
          className="contact"
          onSubmit={(e) => {
            e.preventDefault();
            setToast('Thanks for getting in touch!');
            setTimeout(() => setToast(''), 3000);
          }}
        >
          <h3>Get in Touch</h3>
          <input type="email" placeholder="Email Address" required />
          <textarea placeholder="Message" required />
          <button>Send</button>
        </form>
      </div>
      <div className="footer-bottom">
        <span>𝕏　●　◎</span>
        <small>© 2026 Venuze. All rights reserved.</small>
      </div>
    </footer>
  );
}
