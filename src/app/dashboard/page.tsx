'use client';

import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store';

type DashboardData = {
  user: { name: string };
  stats: { savedVenues: number; bookings: number; messages: number };
  savedVenues: { id: string; title: string }[];
};

async function getDashboard() {
  const response = await axios.get<DashboardData>('/api/dashboard');
  return response.data;
}

export default function Dashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);
  const [notice, setNotice] = useState('');
  const dashboard = useQuery({ queryKey: ['dashboard'], queryFn: getDashboard });
  const signOut = useMutation({
    mutationFn: () => axios.post('/api/auth/logout'),
    onSuccess: async () => {
      logout();
      await queryClient.clear();
      router.replace('/');
    },
    onError: () => setNotice('Could not log out. Please try again.'),
  });

  const data = dashboard.data;
  return (
    <div className="dashboard">
      <header className="header">
        <Link href="/" className="brand">
          <img src="/venuze-logo.png" alt="Venuze" />
        </Link>
        <div className="head-actions">
          <span className="welcome">
            {data ? `Welcome back, ${data.user.name}` : 'Your Venuze account'}
          </span>
          <button
            className="outline-btn"
            type="button"
            onClick={() => signOut.mutate()}
            disabled={signOut.isPending}
          >
            {signOut.isPending ? 'Logging out…' : 'Log out'}
          </button>
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-greeting">
          <div>
            <span className="eyebrow">YOUR VENUZE</span>
            <h1>Your next great event starts here.</h1>
            <p>Keep your plans moving with your saved spaces and conversations.</p>
          </div>
          <Link className="primary" href="/search">
            Explore venues →
          </Link>
        </div>

        {dashboard.isPending ? (
          <div className="dash-stats" aria-label="Loading dashboard" aria-busy="true">
            {[1, 2, 3].map((item) => (
              <div className="dash-stat-skeleton" key={item}>
                <i />
                <i />
                <i />
              </div>
            ))}
          </div>
        ) : dashboard.isError ? (
          <section className="dash-message dash-error" role="alert">
            <h2>We couldn’t load your dashboard</h2>
            <p>
              {axios.isAxiosError(dashboard.error) && dashboard.error.response?.status === 401
                ? 'Your session has expired. Please sign in again.'
                : 'Check your connection and try loading your account again.'}
            </p>
            {axios.isAxiosError(dashboard.error) && dashboard.error.response?.status === 401 ? (
              <Link className="primary" href="/login">
                Sign in
              </Link>
            ) : (
              <button className="primary" type="button" onClick={() => void dashboard.refetch()}>
                Try again
              </button>
            )}
          </section>
        ) : data ? (
          <>
            <div className="dash-stats">
              <div>
                <span>Saved venues</span>
                <b>{data.stats.savedVenues}</b>
                <small>Your shortlist is ready for inspiration.</small>
              </div>
              <div>
                <span>Upcoming bookings</span>
                <b>{data.stats.bookings}</b>
                <small>Your confirmed events will appear here.</small>
              </div>
              <div>
                <span>Messages</span>
                <b>{data.stats.messages}</b>
                <small>Talk directly with venue hosts.</small>
              </div>
            </div>
            {data.savedVenues.length === 0 ? (
              <section className="dash-empty">
                <div className="empty-icon" aria-hidden="true">
                  ⌕
                </div>
                <h2>Start planning something memorable</h2>
                <p>Browse distinctive spaces and save the ones you love to build your shortlist.</p>
                <Link className="primary" href="/search">
                  Discover venues
                </Link>
              </section>
            ) : (
              <section className="dash-saved">
                <h2>Your saved venues</h2>
                <ul>
                  {data.savedVenues.map((venue) => (
                    <li key={venue.id}>{venue.title}</li>
                  ))}
                </ul>
              </section>
            )}
          </>
        ) : null}
        {notice && (
          <div className="toast" role="alert">
            {notice}
          </div>
        )}
      </main>
    </div>
  );
}
