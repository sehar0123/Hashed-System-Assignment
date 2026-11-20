'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';

type Venue = {
  id: string;
  title: string;
  location: string;
  image: string;
  category: string;
  area: number;
  minGuests: number;
  maxGuests: number;
  price: number;
  verified: boolean;
  parking: boolean;
  kitchen: boolean;
};

type Filters = {
  categories: string[];
  minArea: number;
  maxPrice: number;
  guestRange: string;
  verified: boolean;
  parking: boolean;
  kitchen: boolean;
  sort: string;
};

const categories = ['All Spaces', 'Photo Studio', 'Film Studio', 'Warehouse', 'Gallery', 'Restaurant', 'Apartment', 'Office Space', 'Venue', 'Private Party', 'Meeting'];
const categoryIcons = ['▦', '♙', '▣', '⌂', '▧', '♧', '▥', '▣', '▤', '✦', '♙'];
const guestOptions = [
  { label: 'Any capacity', min: 0, max: Number.POSITIVE_INFINITY },
  { label: '10–20 guests', min: 10, max: 20 },
  { label: '20–50 guests', min: 20, max: 50 },
  { label: '50–100 guests', min: 50, max: 100 },
  { label: '100+ guests', min: 100, max: Number.POSITIVE_INFINITY },
];

const initialFilters: Filters = {
  categories: ['Photo Studio'],
  minArea: 2000,
  maxPrice: 250,
  guestRange: 'Any capacity',
  verified: true,
  parking: true,
  kitchen: true,
  sort: 'recommended',
};

const venues: Venue[] = [
  { id: 'photo-a', title: 'High-Spec Room in Trendy Home Clapham/ Stockwell', location: 'London, SW1', image: 'photo-1524758631624-e2822e304c36', category: 'Photo Studio', area: 2400, minGuests: 10, maxGuests: 20, price: 50, verified: true, parking: true, kitchen: true },
  { id: 'photo-b', title: 'Bright Creative Studio in Central London', location: 'London, W1', image: 'photo-1497366754035-f200968a6e72', category: 'Photo Studio', area: 2100, minGuests: 10, maxGuests: 20, price: 65, verified: true, parking: true, kitchen: true },
  { id: 'loft', title: 'Downtown Loft', location: 'New York, USA', image: 'photo-1542038784456-1ea8e935640e', category: 'Gallery', area: 3200, minGuests: 50, maxGuests: 100, price: 125, verified: true, parking: true, kitchen: true },
  { id: 'party', title: 'Warm Event Space with City Views', location: 'London, SW1', image: 'photo-1519167758481-83f550bb49b3', category: 'Private Party', area: 2800, minGuests: 20, maxGuests: 50, price: 95, verified: true, parking: true, kitchen: true },
  { id: 'studio', title: 'Natural Light Production Studio', location: 'London, EC1', image: 'photo-1497366811353-6870744d04b2', category: 'Photo Studio', area: 2200, minGuests: 10, maxGuests: 20, price: 75, verified: true, parking: true, kitchen: true },
  { id: 'banquet', title: 'Modern Dining and Celebration Hall', location: 'Dubai, UAE', image: 'photo-1511795409834-ef04bbd61622', category: 'Restaurant', area: 4000, minGuests: 100, maxGuests: 300, price: 180, verified: true, parking: true, kitchen: true },
];

function FilterDialog({
  draft,
  setDraft,
  onApply,
  onReset,
  onClose,
  resultCount,
}: {
  draft: Filters;
  setDraft: (next: Filters) => void;
  onApply: () => void;
  onReset: () => void;
  onClose: () => void;
  resultCount: number;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      onClose();
      return;
    }
    if (event.key !== 'Tab' || !dialogRef.current) return;

    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  function toggleCategory(category: string) {
    const selected = draft.categories.includes(category);
    setDraft({ ...draft, categories: selected ? draft.categories.filter((item) => item !== category) : [...draft.categories, category] });
  }

  return (
    <div className="filter-overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        className="filter-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        onKeyDown={handleKeyDown}
      >
        <header className="filter-dialog-header">
          <div>
            <span className="filter-kicker">REFINE YOUR SEARCH</span>
            <h2 id="filter-title">Filters</h2>
          </div>
          <button className="filter-close" type="button" ref={closeRef} onClick={onClose} aria-label="Close filters">×</button>
        </header>

        <div className="filter-dialog-body">
          <fieldset className="filter-group">
            <legend>Space type</legend>
            <div className="filter-category-grid">
              {categories.slice(1).map((category) => (
                <label className={`filter-choice ${draft.categories.includes(category) ? 'is-selected' : ''}`} key={category}>
                  <input type="checkbox" checked={draft.categories.includes(category)} onChange={() => toggleCategory(category)} />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="filter-two-column">
            <label className="filter-control">
              Minimum area
              <span className="filter-input-wrap"><input type="number" min="0" step="100" value={draft.minArea || ''} onChange={(event) => setDraft({ ...draft, minArea: Number(event.target.value) || 0 })} /><span>m²</span></span>
            </label>
            <label className="filter-control">
              Guest capacity
              <select value={draft.guestRange} onChange={(event) => setDraft({ ...draft, guestRange: event.target.value })}>
                {guestOptions.map((option) => <option key={option.label}>{option.label}</option>)}
              </select>
            </label>
          </div>

          <label className="filter-control">
            Maximum price per hour
            <span className="filter-input-wrap"><span>$</span><input type="number" min="0" step="25" value={draft.maxPrice || ''} onChange={(event) => setDraft({ ...draft, maxPrice: Number(event.target.value) || 0 })} /><span>/ hour</span></span>
          </label>

          <fieldset className="filter-group filter-amenities">
            <legend>Features</legend>
            <label className="filter-toggle"><input type="checkbox" checked={draft.verified} onChange={(event) => setDraft({ ...draft, verified: event.target.checked })} /><span><b>Verified spaces</b><small>Reviewed by the Venuze team</small></span></label>
            <label className="filter-toggle"><input type="checkbox" checked={draft.parking} onChange={(event) => setDraft({ ...draft, parking: event.target.checked })} /><span><b>Free parking</b><small>On-site guest parking available</small></span></label>
            <label className="filter-toggle"><input type="checkbox" checked={draft.kitchen} onChange={(event) => setDraft({ ...draft, kitchen: event.target.checked })} /><span><b>Kitchen</b><small>Kitchen or food preparation area</small></span></label>
          </fieldset>

          <label className="filter-control filter-sort">
            Sort results
            <select value={draft.sort} onChange={(event) => setDraft({ ...draft, sort: event.target.value })}>
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="area">Largest spaces</option>
            </select>
          </label>
        </div>

        <footer className="filter-dialog-footer">
          <button className="filter-reset" type="button" onClick={onReset}>Clear all</button>
          <button className="filter-apply" type="button" onClick={onApply}>Show {resultCount} spaces</button>
        </footer>
      </div>
    </div>
  );
}

function Results() {
  const params = useSearchParams();
  const where = params.get('where') || 'London, UK';
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [draft, setDraft] = useState<Filters>(initialFilters);
  const [keyword, setKeyword] = useState('');
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  function getFilteredVenues(criteria: Filters) {
    const guestOption = guestOptions.find((option) => option.label === criteria.guestRange) ?? guestOptions[0];
    const matching = venues.filter((venue) => {
      const matchesCategory = criteria.categories.length === 0 || criteria.categories.includes(venue.category);
      const matchesArea = venue.area >= criteria.minArea;
      const matchesPrice = venue.price <= criteria.maxPrice;
      const matchesGuests = venue.maxGuests >= guestOption.min && venue.minGuests <= guestOption.max;
      const matchesFeatures = (!criteria.verified || venue.verified) && (!criteria.parking || venue.parking) && (!criteria.kitchen || venue.kitchen);
      const matchesKeyword = !keyword || `${venue.title} ${venue.location} ${venue.category}`.toLowerCase().includes(keyword.toLowerCase());
      return matchesCategory && matchesArea && matchesPrice && matchesGuests && matchesFeatures && matchesKeyword;
    });

    return matching.sort((a, b) => {
      if (criteria.sort === 'price-low') return a.price - b.price;
      if (criteria.sort === 'price-high') return b.price - a.price;
      if (criteria.sort === 'area') return b.area - a.area;
      return 0;
    });
  }

  const filteredVenues = useMemo(() => getFilteredVenues(filters), [filters, keyword]);
  const draftResultCount = getFilteredVenues(draft).length;

  function openFilters() {
    setDraft(filters);
    setFiltersOpen(true);
  }

  function closeFilters() {
    setFiltersOpen(false);
    requestAnimationFrame(() => filterButtonRef.current?.focus());
  }

  function applyFilters() {
    setFilters(draft);
    setFiltersOpen(false);
    requestAnimationFrame(() => filterButtonRef.current?.focus());
  }

  function resetFilters() {
    const cleared: Filters = { categories: [], minArea: 0, maxPrice: 1000, guestRange: 'Any capacity', verified: false, parking: false, kitchen: false, sort: 'recommended' };
    setDraft(cleared);
  }

  function clearAppliedFilters() {
    const cleared: Filters = { categories: [], minArea: 0, maxPrice: 1000, guestRange: 'Any capacity', verified: false, parking: false, kitchen: false, sort: 'recommended' };
    setFilters(cleared);
    setDraft(cleared);
    setKeyword('');
  }

  function removeFilter(key: keyof Filters) {
    if (key === 'categories') setFilters({ ...filters, categories: [] });
    if (key === 'verified' || key === 'parking' || key === 'kitchen') setFilters({ ...filters, [key]: false });
    if (key === 'minArea') setFilters({ ...filters, minArea: 0 });
    if (key === 'guestRange') setFilters({ ...filters, guestRange: 'Any capacity' });
  }

  const activeChips: { label: string; key: keyof Filters }[] = [
    ...filters.categories.map((category) => ({ label: category, key: 'categories' as const })),
    ...(filters.verified ? [{ label: 'Verified', key: 'verified' as const }] : []),
    ...(filters.minArea ? [{ label: `${filters.minArea.toLocaleString()}+ m²`, key: 'minArea' as const }] : []),
    ...(filters.guestRange !== 'Any capacity' ? [{ label: filters.guestRange, key: 'guestRange' as const }] : []),
    ...(filters.parking ? [{ label: 'Parking', key: 'parking' as const }] : []),
    ...(filters.kitchen ? [{ label: 'Kitchen', key: 'kitchen' as const }] : []),
  ];

  return (
    <main className="results-page">
      <header className="results-header">
        <Link href="/" className="brand"><img src="/venuze-logo.png" alt="Venuze" /></Link>
        <div className="mini-search">
          <span>{where}</span><span>{params.get('when') || 'Anytime'}</span><span>{params.get('guests') || '10–20'} Guests</span>
          <button type="button" aria-label="Search spaces" onClick={() => setKeyword('')}>⌕</button>
        </div>
        <div className="head-actions"><Link className="outline-btn" href="/login">Add your listing⌄</Link><Link className="user-btn" href="/login" aria-label="Sign in">♙</Link></div>
      </header>

      <div className="keyword-bar">
        <span aria-hidden="true">⌕</span>
        <input aria-label="Search by keyword" placeholder="Add keywords…" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
        <button type="button" ref={filterButtonRef} onClick={openFilters} aria-haspopup="dialog" aria-expanded={filtersOpen}>☷ Filters{activeChips.length > 0 && <span className="filter-count">{activeChips.length}</span>}</button>
      </div>

      <nav className="category-nav" aria-label="Venue categories">
        <button type="button" aria-label="Previous categories">‹</button>
        {categories.map((category, index) => (
          <button type="button" className={(category === 'All Spaces' ? filters.categories.length === 0 : filters.categories.includes(category)) ? 'chosen' : ''} key={category} aria-pressed={category === 'All Spaces' ? filters.categories.length === 0 : filters.categories.includes(category)} onClick={() => setFilters({ ...filters, categories: category === 'All Spaces' ? [] : [category] })}>
            <b aria-hidden="true">{categoryIcons[index]}</b>{category}
          </button>
        ))}
        <button type="button" aria-label="More categories">›</button>
      </nav>

      <section className="result-body">
        <div className="result-list">
          <div className="result-toolbar">
            <span>{filteredVenues.length} <b>spaces</b> near {where}</span>
            <div className="result-chips">
              {activeChips.map((chip, index) => <button type="button" key={`${chip.key}-${index}`} onClick={() => removeFilter(chip.key)} aria-label={`Remove ${chip.label} filter`}>{chip.label} ×</button>)}
              <label className="sort-chip">↕ Sort by:
                <select value={filters.sort} onChange={(event) => setFilters({ ...filters, sort: event.target.value })} aria-label="Sort results">
                  <option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="area">Largest spaces</option>
                </select>
              </label>
            </div>
          </div>

          {filteredVenues.length === 0 ? (
            <div className="no-results">
              <img src="/no-data-illustration.jpg" alt="No search results" />
              <h2>No data found for your search.</h2>
              <p>Explore other options or clear filters to<br /> see more results.</p>
              <button type="button" onClick={clearAppliedFilters}>Clear filters</button>
            </div>
          ) : (
            <div className="results-grid">
              {filteredVenues.map((venue) => (
                <article className="listing" key={venue.id}>
                  <div className="listing-image" style={{ backgroundImage: `url(https://images.unsplash.com/${venue.image}?auto=format&fit=crop&w=700&q=80)` }}>
                    {venue.verified && <span className="verified">Verified</span>}
                    <button className="save" type="button" aria-label={`Save ${venue.title}`}>♡</button>
                  </div>
                  <div className="listing-copy">
                    <h3>{venue.title}</h3>
                    <p className="location">⌖ {venue.location}</p>
                    <div className="amenities"><span>♧ {venue.maxGuests} guests</span><span>↗ {venue.area.toLocaleString()} sq ft</span>{venue.parking && <span>▱ Free parking</span>}</div>
                    {venue.kitchen && <small>Kitchen available</small>}
                    <div className="price-row"><strong>From ${venue.price}/hour</strong><Link href="/login">View details</Link></div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
        <aside className="map-pane" aria-label="Map preview">
          <div className="map-overlay"><span>V</span><span>V</span><span>V</span><span>V</span></div>
          <div className="map-popup"><div /><b>Downtown Loft</b><small>⌖ New York, USA</small></div>
        </aside>
      </section>

      {filtersOpen && <FilterDialog draft={draft} setDraft={setDraft} onApply={applyFilters} onReset={resetFilters} onClose={closeFilters} resultCount={draftResultCount} />}
    </main>
  );
}

export default function Search() {
  return <Suspense fallback={<div className="loading-screen">Finding spaces…</div>}><Results /></Suspense>;
}
