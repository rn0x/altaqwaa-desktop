import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Clock, MapPin, Moon, Sun, SunDim, Sunset, Sunrise, Save, LocateFixed, Search, X, ArrowRight } from 'lucide-react';
import * as bridge from '../lib/bridge';
import { useNow, useSettings } from '../lib/hooks';

const PRAYER_ICONS = { Fajr: Sunrise, Dhuhr: Sun, Asr: SunDim, Maghrib: Sunset, Isha: Moon, Sunrise: Sun };
const PRAYER_NAMES = { Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء', Sunrise: 'الشروق' };
const capKey = (k) => (k ? k.charAt(0).toUpperCase() + k.slice(1) : '');
const METHODS = ['UmmAlQura', 'MuslimWorldLeague', 'Egyptian', 'Karachi', 'Dubai', 'Qatar', 'Kuwait', 'Singapore', 'Turkey', 'Tehran', 'France'];

function parseRemaining(str) {
    if (!str) return null;
    const m = String(str).match(/(\d+):(\d+):(\d+)/);
    if (!m) return null;
    return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]);
}

/* Arabic-aware normalization for city search: strip diacritics, unify alef/taa/yaa */
function normalize(s) {
    return String(s || '').toLowerCase()
        .replace(/[\u064B-\u0652\u0640\u200E\u200F\u061C]/g, '')
        .replace(/[أإآٱ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/[ىئ]/g, 'ي')
        .trim();
}

/* Searchable city picker backed by the local geo dataset (offline). */
function CityPicker({ cities, placeholder, onSelect }) {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [sel, setSel] = useState(null);
    const root = useRef(null);

    useEffect(() => {
        const onDoc = (e) => { if (root.current && !root.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, []);

    /* reset when the country changes (new cities array) */
    useEffect(() => { setSel(null); setQuery(''); }, [cities]);

    const list = useMemo(() => {
        const q = normalize(query);
        const base = q
            ? cities.filter((c) => normalize(c[0]).includes(q) || normalize(c[1]).includes(q))
            : cities;
        return base.slice(0, 60);
    }, [cities, query]);

    const pick = (c) => {
        setSel(c[0]);
        setQuery('');
        setOpen(false);
        if (onSelect) onSelect(c);
    };

    return (
        <div className="combobox" ref={root}>
            <div className="search-shell">
                <Search size={15} className="search-icon" />
                <input
                    className="input"
                    dir="auto"
                    placeholder={placeholder}
                    value={sel || query}
                    onFocus={() => setOpen(true)}
                    onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') setOpen(false);
                        if (e.key === 'Enter' && list.length) pick(list[0]);
                    }}
                />
                {sel ? (
                    <button className="combobox-clear" onClick={() => { setSel(null); setQuery(''); if (onSelect) onSelect(null); }} title="مسح">
                        <X size={14} />
                    </button>
                ) : null}
            </div>
            {open ? (
                <ul className="combobox-list">
                    {list.map((c) => (
                        <li key={`${c[1]}${c[2]}`} className="combobox-item" onMouseDown={(e) => { e.preventDefault(); pick(c); }}>
                            <span>{c[0]}</span>
                            {c[1] !== c[0] ? <span className="combobox-en" dir="ltr">{c[1]}</span> : null}
                        </li>
                    ))}
                    {!list.length ? <li className="combobox-empty">لا توجد مدن مطابقة</li> : null}
                </ul>
            ) : null}
        </div>
    );
}

export default function PrayerPage() {
    const { settings, setSetting } = useSettings();
    const [data, setData] = useState(null);
    const [remaining, setRemaining] = useState(null);
    const [geo, setGeo] = useState(null);
    const [countryIso, setCountryIso] = useState('');
    const [gpsState, setGpsState] = useState('idle'); /* idle | locating | ok | error */
    const [manualOpen, setManualOpen] = useState(false);
    const [lat, setLat] = useState(settings?.prayer_lat || '');
    const [lon, setLon] = useState(settings?.prayer_lon || '');
    const [saving, setSaving] = useState(false);
    const refPicked = useRef(false); /* user explicitly chose a location — GPS must not overwrite it */
    const now = useNow(1000);

    const hasLoc = Boolean(settings?.prayer_lat);

    const fetchTimes = useCallback(() => {
        bridge.prayer().then((d) => {
            setData(d && d.error ? null : d);
            setRemaining(d && d.remainingNext ? parseRemaining(d.remainingNext) : null);
        }).catch(() => setData(null));
    }, []);

    const loadGeo = useCallback(() => {
        if (!geo) bridge.data('geo').then(setGeo).catch(() => {});
    }, [geo]);

    useEffect(() => { if (!data) loadGeo(); }, [data, loadGeo]);

    const detectGps = useCallback(() => {
        if (!navigator.geolocation) { setGpsState('unsupported'); return; }
        refPicked.current = false;
        setGpsState('locating');
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                if (refPicked.current) { setGpsState('idle'); return; }
                const v = (x) => x.toFixed(6);
                const la = v(pos.coords.latitude), lo = v(pos.coords.longitude);
                setLat(la);
                setLon(lo);
                await setSetting('prayer_lat', la);
                await setSetting('prayer_lon', lo);
                await setSetting('prayer_location_name', '');
                setGpsState('ok');
                fetchTimes();
            },
            () => setGpsState('error'),
            { timeout: 12000, maximumAge: 600000 },
        );
    }, [setSetting, fetchTimes]);

    /* first visit without a saved location: show the setup card (GPS is tried
     * only on demand) — times appear only after the user picks a location */
    useEffect(() => {
        if (hasLoc) fetchTimes();
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    /* When an adhan fires (exact prayer time), refresh the schedule so the
     * elapsed-since-adhan counter starts right away. */
    useEffect(() => {
        if (!data) return;
        return bridge.notify.on((ev) => { if (ev && ev.kind === 'adhan') fetchTimes(); });
    }, [data, fetchTimes]);

    const goBack = () => {
        if (window.history.length > 1) window.history.back();
        else window.location.hash = '#/';
    };

    useEffect(() => {
        if (remaining === null) return;
        const t = setInterval(() => {
            setRemaining((r) => {
                if (r === null || r <= 1) { clearInterval(t); fetchTimes(); return 0; }
                return r - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [remaining === null, remaining === 0]);

    const chooseCity = async (entry) => {
        if (!entry) return;
        refPicked.current = true;
        const cc = (geo?.countries || []).find((x) => x.c === countryIso);
        setSaving(true);
        await setSetting('prayer_lat', String(entry[2]));
        await setSetting('prayer_lon', String(entry[3]));
        await setSetting('prayer_location_name', entry[0]);
        await setSetting('prayer_timezone', cc?.tz || '');
        setSaving(false);
        setCountryIso('');
        setGpsState('idle');
        fetchTimes();
    };

    const saveManual = async () => {
        const l1 = Number(lat), l2 = Number(lon);
        if (!Number.isFinite(l1) || !Number.isFinite(l2) || l1 < -90 || l1 > 90 || l2 < -180 || l2 > 180) {
            alert('أدخل إحداثيات صحيحة: خط العرض بين -90 و 90، وخط الطول بين -180 و 180');
            return;
        }
        refPicked.current = true;
        setSaving(true);
        await setSetting('prayer_lat', lat);
        await setSetting('prayer_lon', lon);
        await setSetting('prayer_location_name', '');
        setSaving(false);
        setGpsState('idle');
        fetchTimes();
    };

    const changeMethod = (method) => {
        setSetting('Calculation', method).then(fetchTimes);
    };

    const fmtCount = (s) => {
        const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
        return {
            h: String(h).padStart(2, '0'), m: String(m).padStart(2, '0'), s: String(r).padStart(2, '0'),
        };
    };

    const nextPrayerKey = String(data?.nextPrayer || 'fajr').toLowerCase();
    const nextPrayerName = PRAYER_NAMES[capKey(nextPrayerKey)] || PRAYER_NAMES.Fajr;

    /* Elapsed-since-adhan counter: shows how long it's been since the most
     * recent prayer adhan, counting up to 30 minutes then disappearing. */
    const ELAPSED_WINDOW_SEC = 30 * 60;
    const currentAt = data?.currentPrayerAt;
    const currentName = PRAYER_NAMES[capKey(data?.currentPrayer)] || PRAYER_NAMES.Fajr;
    const elapsedSec = (data && currentAt != null) ? Math.max(0, Math.floor((now - currentAt) / 1000)) : null;
    const showElapsed = elapsedSec != null && elapsedSec <= ELAPSED_WINDOW_SEC;

    const rows = data
        ? [
            { key: 'Fajr', name: 'الفجر' },
            { key: 'Sunrise', name: 'الشروق' },
            { key: 'Dhuhr', name: 'الظهر' },
            { key: 'Asr', name: 'العصر' },
            { key: 'Maghrib', name: 'المغرب' },
            { key: 'Isha', name: 'العشاء' },
        ].map((p) => ({ ...p, time: data[p.key.toLowerCase()] || '--:--', isNext: p.key.toLowerCase() === nextPrayerKey }))
        : [];

    const countries = useMemo(
        () => (geo?.countries || []).filter((c) => (c.cities || []).length > 0),
        [geo],
    );
    const currentCountry = countries.find((c) => c.c === countryIso);

    const locationLabel = settings?.prayer_location_name
        || (settings?.prayer_lat ? `${settings.prayer_lat}, ${settings.prayer_lon}` : '');

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title"><Clock size={24} color="var(--accent)" /> أوقات الصلاة</h1>
                <p className="page-sub">محسوبة محلياً على جهازك · طريقة {settings?.Calculation || 'UmmAlQura'}</p>
            </div>

            {!data ? (
                <div className="card fade-in" style={{ position: 'relative', padding: 24, maxWidth: 460, margin: '0 auto', textAlign: 'center' }}>
                    <button className="setup-back" onClick={goBack} title="رجوع"><ArrowRight size={18} /></button>
                    <div className="empty-icon" style={{ margin: '0 auto 14px' }}><MapPin size={26} /></div>
                    <h3 style={{ fontWeight: 800, textAlign: 'center' }}>حدِّد موقعك أولاً</h3>
                    <p className="text-2 mt-8" style={{ fontSize: 13, lineHeight: 1.9, textAlign: 'center' }}>
                        لمعرفة أوقات الصلاة اختر إحدى الطرق الثلاث أدناه — كل ذلك محلياً على جهازك ولا يُرسل أي شيء خارجياً.
                    </p>

                    <button className="btn primary w-100 mt-16" onClick={detectGps} disabled={gpsState === 'locating' || gpsState === 'unsupported'}>
                        <LocateFixed size={16} />
                        {gpsState === 'locating' ? 'جارٍ تحديد الموقع…' : '١. تحديد الموقع تلقائياً (GPS)'}
                    </button>
                    {gpsState === 'unsupported' ? (
                        <p className="gps-note" role="alert">جهازك لا يدعم GPS — اختر دولتك ومدينتك من القائمة، أو أدخل الإحداثيات يدوياً.</p>
                    ) : null}
                    {gpsState === 'error' ? (
                        <p className="gps-note" role="alert">تعذّر تحديد الموقع تلقائياً — اختر دولتك ومدينتك من القائمة، أو أدخل الإحداثيات يدوياً.</p>
                    ) : null}

                    <div className="divider" style={{ textAlign: 'center' }}>٢. اختر من القائمة</div>

                    {geo ? (
                        <div className="grid-1" style={{ display: 'grid', gap: 12 }}>
                            <label className="field">
                                <span className="label">الدولة</span> 
                                <select className="select w-100" value={countryIso} onChange={(e) => setCountryIso(e.target.value)}>
                                    <option value="">— اختر الدولة —</option>
                                    {countries.map((c) => (
                                        <option key={c.c} value={c.c}>{c.n}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="field">
                                <span className="label">المدينة</span>
                                <CityPicker
                                    key={countryIso || 'none'}
                                    cities={currentCountry ? currentCountry.cities : []}
                                    placeholder={currentCountry ? 'اكتب اسم المدينة للبحث…' : 'اختر الدولة أولاً'}
                                    onSelect={saving ? null : chooseCity}
                                />
                            </label>
                            {saving ? (
                                <p className="text-muted" style={{ fontSize: 12, fontWeight: 700, textAlign: 'center' }}>جارٍ الحفظ…</p>
                            ) : null}
                        </div>
                    ) : (
                        <p className="text-muted" style={{ fontSize: 12, textAlign: 'center' }}>جارٍ تحميل قائمة المدن…</p>
                    )}

                    <div className="divider" style={{ textAlign: 'center' }}>
                        <button className="btn ghost btn-sm" onClick={() => setManualOpen((o) => !o)}>
                            {manualOpen ? 'إخفاء الإدخال اليدوي' : '٣. أو أدخل الإحداثيات يدوياً'}
                        </button>
                    </div>

                    {manualOpen ? (
                        <>
                            <div className="grid-2">
                                <label className="field">
                                    <span className="label">خط العرض (Latitude)</span>
                                    <input className="input" dir="ltr" placeholder="مثال: 21.5169" value={lat} onChange={(e) => setLat(e.target.value)} />
                                </label>
                                <label className="field">
                                    <span className="label">خط الطول (Longitude)</span>
                                    <input className="input" dir="ltr" placeholder="مثال: 39.2192" value={lon} onChange={(e) => setLon(e.target.value)} />
                                </label>
                            </div>
                            <button className="btn primary w-100 mt-16" onClick={saveManual} disabled={saving}>
                                <Save size={16} /> {saving ? 'جارٍ الحفظ...' : 'حفظ الموقع'}
                            </button>
                        </>
                    ) : null}
                </div>
            ) : (
                <>
                    <div className="countdown mb-24 fade-in">
                        <Clock size={26} />
                        <div className="cd-body">
                            <div className="cd-label">متبقي على صلاة {nextPrayerName}</div>
                            <div className="cd-digits">
                                <span className="cd-cell"><b>{fmtCount(remaining || 0).h}</b><i>ساعة</i></span>
                                <span className="cd-sep">:</span>
                                <span className="cd-cell"><b>{fmtCount(remaining || 0).m}</b><i>دقيقة</i></span>
                                <span className="cd-sep">:</span>
                                <span className="cd-cell"><b>{fmtCount(remaining || 0).s}</b><i>ثانية</i></span>
                            </div>
                        </div>
                    <div className="cd-loc">{locationLabel || '--'}</div>
                </div>

                {showElapsed ? (
                    <div className="countdown countdown--elapsed mb-24 fade-in">
                        <Clock size={26} />
                        <div className="cd-body">
                            <div className="cd-label">عدا على أذان صلاة {currentName}</div>
                            <div className="cd-digits">
                                <span className="cd-cell"><b>{fmtCount(elapsedSec).h}</b><i>ساعة</i></span>
                                <span className="cd-sep">:</span>
                                <span className="cd-cell"><b>{fmtCount(elapsedSec).m}</b><i>دقيقة</i></span>
                                <span className="cd-sep">:</span>
                                <span className="cd-cell"><b>{fmtCount(elapsedSec).s}</b><i>ثانية</i></span>
                            </div>
                        </div>
                        <div className="cd-loc">ينقفل تلقائياً بعد ٣٠ دقيقة</div>
                    </div>
                ) : null}

                    <div className="prayer-grid mb-24">
                        {rows.map((p) => {
                            const Icon = PRAYER_ICONS[p.key] || Clock;
                            return (
                                <div key={p.key} className={`prayer-tile ${p.isNext ? 'next' : ''}`}>
                                    <Icon size={22} />
                                    <div className="p-name">{p.name}</div>
                                    <div className="p-time">{p.time}</div>
                                    {p.isNext ? (
                                    <>
                                        <div className="p-count">الصلاة التالية</div>
                                        <div className="p-remaining">{fmtCount(remaining || 0).h}:{fmtCount(remaining || 0).m}:{fmtCount(remaining || 0).s}</div>
                                    </>
                                ) : null}
                                </div>
                            );
                        })}
                    </div>

                    <div className="card" style={{ padding: '16px 20px', marginBottom: 16 }}>
                        <div className="row-between">
                            <div>
                                <div style={{ fontWeight: 800, fontSize: 14 }}>طريقة حساب المواقيت</div>
                                <div className="text-muted" style={{ fontSize: 12, fontWeight: 600 }}>تؤثر على دقة المواقيت حسب المنطقة</div>
                            </div>
                            <select className="select" value={settings?.Calculation || 'UmmAlQura'} onChange={(e) => changeMethod(e.target.value)}>
                                {METHODS.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '16px 20px' }}>
                        <div className="row-between">
                            <div>
                                <div style={{ fontWeight: 800, fontSize: 14 }}>تغيير الموقع</div>
                                <div className="text-muted" style={{ fontSize: 12, fontWeight: 600 }}>يُحفظ محلياً فقط</div>
                            </div>
                            <button className="btn ghost" onClick={() => setData(null)}>تعديل الموقع</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
