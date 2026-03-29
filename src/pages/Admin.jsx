import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const KEYS = {
  orders: 'sharppost_orders',
  b2b: 'sharppost_b2b',
  giftcards: 'sharppost_giftcards',
  emails: ['sharppost_emails', 'sharppost_reminders'],
};

function exportCSV(data, filename) {
  if (!data.length) return;
  const keys = Object.keys(data[0]);
  const rows = [keys.join(','), ...data.map((row) =>
    keys.map((k) => {
      const val = row[k] ?? '';
      const str = Array.isArray(val) ? val.join('; ') : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    }).join(',')
  )];
  const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function formatDate(ts) {
  if (!ts) return '—';
  return new Date(ts).toLocaleString('en-AU', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function Table({ columns, data, emptyMsg }) {
  if (!data.length) return (
    <div className="text-center py-16 text-gray-400 text-sm">{emptyMsg}</div>
  );
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((col) => (
              <th key={col.key} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-700 max-w-xs">
                  {col.render ? col.render(row[col.key], row) : (
                    <span className="block truncate">{
                      Array.isArray(row[col.key])
                        ? row[col.key].join(', ')
                        : row[col.key] || '—'
                    }</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ORDER_COLS = [
  { key: 'timestamp', label: 'Date', render: (v) => <span className="whitespace-nowrap">{formatDate(v)}</span> },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'suburb', label: 'Suburb' },
  { key: 'state', label: 'State' },
  { key: 'knives', label: 'Knives', render: (v) => <span className="font-bold text-[#1a1a1a]">{v}</span> },
  { key: 'knifeTypes', label: 'Knife Types' },
  { key: 'addons', label: 'Add-Ons' },
  { key: 'estimatedTotal', label: 'Total', render: (v) => <span className="font-bold text-[#4a7fa5]">${v}</span> },
  { key: 'notes', label: 'Notes', render: (v) => <span className="block max-w-[200px] truncate text-gray-500 text-xs">{v || '—'}</span> },
  { key: 'hearAbout', label: 'Source' },
];

const B2B_COLS = [
  { key: 'timestamp', label: 'Date', render: (v) => <span className="whitespace-nowrap">{formatDate(v)}</span> },
  { key: 'businessName', label: 'Business' },
  { key: 'contactName', label: 'Contact' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'knifeCount', label: 'Knives/Service' },
  { key: 'frequency', label: 'Frequency' },
];

const GIFT_COLS = [
  { key: 'timestamp', label: 'Date', render: (v) => <span className="whitespace-nowrap">{formatDate(v)}</span> },
  { key: 'buyerName', label: 'Buyer' },
  { key: 'buyerEmail', label: 'Buyer Email' },
  { key: 'recipientName', label: 'Recipient' },
  { key: 'finalAmount', label: 'Amount', render: (v) => <span className="font-bold text-[#4a7fa5]">{v}</span> },
  { key: 'message', label: 'Message', render: (v) => <span className="block max-w-[200px] truncate text-gray-500 text-xs">{v || '—'}</span> },
];

const EMAIL_COLS = [
  { key: 'timestamp', label: 'Date', render: (v) => <span className="whitespace-nowrap">{formatDate(v)}</span> },
  { key: 'email', label: 'Email' },
  { key: 'source', label: 'Source' },
  { key: 'knifeType', label: 'Knife Type' },
  { key: 'nextServiceDate', label: 'Reminder Date' },
];

const TABS = [
  { id: 'orders', label: 'Orders', icon: '🔪' },
  { id: 'b2b', label: 'B2B Enquiries', icon: '🏢' },
  { id: 'giftcards', label: 'Gift Cards', icon: '🎁' },
  { id: 'emails', label: 'Email List', icon: '📧' },
];

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [tab, setTab] = useState('orders');
  const [confirmClear, setConfirmClear] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const getData = (tabId) => {
    if (tabId === 'emails') {
      const emails = storage.get('sharppost_emails');
      const reminders = storage.get('sharppost_reminders');
      return [
        ...emails.map((e) => ({ ...e, source: e.source || 'hero_signup' })),
        ...reminders.map((r) => ({ ...r, source: 'reminder' })),
      ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    return storage.get(KEYS[tabId] || tabId).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const orders = getData('orders');
  const b2b = getData('b2b');
  const giftcards = getData('giftcards');
  const emails = getData('emails');

  const totalRevenue = orders.reduce((s, o) => s + (o.estimatedTotal || 0), 0);
  const totalKnives = orders.reduce((s, o) => s + (parseInt(o.knives) || 0), 0);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pw === 'sharp2026') {
      setAuthed(true);
      setPwError('');
    } else {
      setPwError('Incorrect password. Try again.');
    }
  };

  const handleClear = (tabId) => {
    if (tabId === 'emails') {
      storage.clear('sharppost_emails');
      storage.clear('sharppost_reminders');
    } else {
      storage.clear(KEYS[tabId]);
    }
    setConfirmClear(null);
    setRefresh((r) => r + 1);
  };

  const handleExport = (tabId) => {
    const data = getData(tabId);
    const labels = {
      orders: 'sharpenit_orders',
      b2b: 'sharpenit_b2b',
      giftcards: 'sharpenit_giftcards',
      emails: 'sharpenit_emails',
    };
    exportCSV(data, `${labels[tabId]}_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const tabData = { orders, b2b, giftcards, emails };
  const tabCols = { orders: ORDER_COLS, b2b: B2B_COLS, giftcards: GIFT_COLS, emails: EMAIL_COLS };
  const tabEmpty = {
    orders: 'No orders yet.',
    b2b: 'No B2B enquiries yet.',
    giftcards: 'No gift card requests yet.',
    emails: 'No email signups yet.',
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-2xl font-black text-[#1a1a1a] mb-1">
              Sharpen<span className="text-[#4a7fa5]">/</span>It
            </div>
            <p className="text-gray-500 text-sm">Admin Panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Password</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => { setPw(e.target.value); setPwError(''); }}
                placeholder="Enter admin password"
                autoFocus
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7fa5] ${pwError ? 'border-red-400' : 'border-gray-200'}`}
              />
              {pwError && <p className="text-red-500 text-xs mt-1.5">{pwError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#4a7fa5] hover:bg-[#3d6e91] text-white font-bold py-3.5 rounded-xl transition-colors"
            >
              Log In →
            </button>
          </form>
          <p className="text-center mt-6">
            <a href="/" className="text-gray-400 text-xs hover:text-gray-600 transition-colors">← Back to site</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a1a1a] text-white px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-black text-lg">Sharpen<span className="text-[#4a7fa5]">/</span>It</span>
            <span className="text-gray-400 text-sm ml-3">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">View site</a>
            <button
              onClick={() => setAuthed(false)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: orders.length, icon: '🔪' },
            { label: 'Est. Revenue', value: `$${totalRevenue}`, icon: '💰' },
            { label: 'Total Knives', value: totalKnives, icon: '📦' },
            { label: 'Email List', value: emails.length, icon: '📧' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-black text-[#1a1a1a]">{stat.value}</div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  tab === t.id
                    ? 'border-[#4a7fa5] text-[#4a7fa5]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {t.icon} {t.label}
                <span className="bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-0.5 ml-1">
                  {tabData[t.id].length}
                </span>
              </button>
            ))}
          </div>

          {/* Tab actions */}
          <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs text-gray-500">
              {tabData[tab].length} record{tabData[tab].length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleExport(tab)}
                disabled={!tabData[tab].length}
                className="bg-white border border-gray-200 hover:border-[#4a7fa5] hover:text-[#4a7fa5] text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Export CSV
              </button>
              <button
                onClick={() => setConfirmClear(tab)}
                disabled={!tabData[tab].length}
                className="bg-white border border-gray-200 hover:border-red-400 hover:text-red-500 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Clear Data
              </button>
            </div>
          </div>

          {/* Table */}
          <Table
            columns={tabCols[tab]}
            data={tabData[tab]}
            emptyMsg={tabEmpty[tab]}
          />
        </div>
      </div>

      {/* Confirm clear modal */}
      {confirmClear && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-[#1a1a1a] text-lg mb-2">Clear all data?</h3>
            <p className="text-gray-500 text-sm mb-5">
              This will permanently delete all records in the <strong>{TABS.find((t) => t.id === confirmClear)?.label}</strong> tab. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmClear(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleClear(confirmClear)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
