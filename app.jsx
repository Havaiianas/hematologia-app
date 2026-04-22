// Hematolog.IA — Scientific-premium hematology app
// Colors: deep navy #060D1A base, #0A1628 panels, blood-red #C0392B accent, clinical white #F0F4F8

const COLORS = {
  bg: '#060D1A',
  bg2: '#0A1628',
  bg3: '#0F1E35',
  red: '#C0392B',
  redDim: 'rgba(192,57,43,0.15)',
  redBorder: 'rgba(192,57,43,0.35)',
  blue: '#3B7EA8',
  white: '#F0F4F8',
  muted: 'rgba(240,244,248,0.55)',
  dim: 'rgba(240,244,248,0.35)',
  line: 'rgba(240,244,248,0.08)',
  line2: 'rgba(240,244,248,0.14)',
  green: '#4CAF7C',
  amber: '#D9922E',
};

const FONT_DISPLAY = "'Syne', 'DM Serif Display', Georgia, serif";
const FONT_MONO = "'IBM Plex Mono', 'Space Mono', ui-monospace, monospace";
const FONT_SANS = "'Inter', -apple-system, system-ui, sans-serif";

// ──────────────────────────────────────────────────
// Shared: cell-imagery placeholder (microscope view)
// ──────────────────────────────────────────────────
function MicroSlide({ seed = 1, boxes = null, scan = false, zoom = 1, style = {} }) {
  // deterministic pseudo-random cells
  const rand = (n) => {
    let h = (seed * 9301 + n * 49297) % 233280;
    return h / 233280;
  };
  const cells = [];
  for (let i = 0; i < 22; i++) {
    const r = 14 + rand(i) * 22;
    const x = rand(i + 100) * 100;
    const y = rand(i + 200) * 100;
    const hue = 340 + rand(i + 300) * 30; // reddish-purple microscopy
    const lightness = 55 + rand(i + 400) * 20;
    cells.push({ r, x, y, hue, lightness, k: i });
  }
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 40% 40%, #3a1820 0%, #1a0a12 55%, #0a0408 100%)',
      ...style,
    }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: 'center' }}>
        {cells.map(c => (
          <div key={c.k} style={{
            position: 'absolute',
            left: `${c.x}%`, top: `${c.y}%`,
            width: c.r * 2, height: c.r * 2,
            marginLeft: -c.r, marginTop: -c.r,
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 30%, hsla(${c.hue}, 60%, ${c.lightness + 15}%, 0.85), hsla(${c.hue}, 70%, ${c.lightness - 15}%, 0.7) 65%, hsla(${c.hue}, 80%, ${c.lightness - 25}%, 0.5))`,
            boxShadow: `inset 0 0 ${c.r * 0.4}px hsla(${c.hue - 20}, 60%, 25%, 0.6), 0 0 ${c.r * 0.3}px hsla(${c.hue}, 50%, 30%, 0.4)`,
            filter: rand(c.k + 500) > 0.7 ? 'blur(1.5px)' : 'none',
          }} />
        ))}
      </div>
      {/* grain / texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)',
        pointerEvents: 'none',
      }} />
      {/* bounding boxes */}
      {boxes && boxes.map((b, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${b.x}%`, top: `${b.y}%`,
          width: `${b.w}%`, height: `${b.h}%`,
          border: `1.5px solid ${b.color}`,
          borderRadius: 3,
          boxShadow: `0 0 8px ${b.color}60, inset 0 0 8px ${b.color}20`,
        }}>
          <div style={{
            position: 'absolute', top: -14, left: -1,
            background: b.color, color: '#000',
            fontFamily: FONT_MONO, fontSize: 8, fontWeight: 700,
            padding: '1px 4px', borderRadius: '2px 2px 2px 0',
            letterSpacing: 0.5,
          }}>{b.label}</div>
        </div>
      ))}
      {/* scan line */}
      {scan && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${COLORS.red}, transparent)`,
          boxShadow: `0 0 12px ${COLORS.red}, 0 0 24px ${COLORS.red}80`,
          animation: 'scan 2.2s ease-in-out infinite',
        }} />
      )}
      {/* reticle / coordinates */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${COLORS.white}08 1px, transparent 1px), linear-gradient(90deg, ${COLORS.white}08 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        opacity: 0.6,
      }} />
    </div>
  );
}

// ──────────────────────────────────────────────────
// Logo
// ──────────────────────────────────────────────────
// ── Logo — símbolo H + corte diagonal + wordmark ─────────────
function HMark({ size = 40, fg = COLORS.white, accent = COLORS.red }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ flexShrink: 0 }}>
      {/* Barra esquerda do H */}
      <rect x="10" y="6"  width="10" height="52" fill={fg}/>
      {/* Barra direita do H */}
      <rect x="44" y="6"  width="10" height="52" fill={fg}/>
      {/* Corte diagonal vermelho */}
      <path d="M4 42 L60 22 L60 31 L4 51 Z" fill={accent}/>
    </svg>
  );
}

function Logo({ size = 28, horizontal = true }) {
  const iconSize = size * 1.4;
  const fontSize = size;
  const subSize  = size * 0.36;
  if (!horizontal) {
    // Lockup vertical
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.3 }}>
        <HMark size={iconSize} />
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Archivo', sans-serif", fontWeight: 900,
            fontSize: fontSize, color: COLORS.white,
            letterSpacing: size * 0.04, lineHeight: 1, textTransform: 'uppercase',
          }}>
            HEMATOLOG<span style={{ color: COLORS.red }}>.IA</span>
          </div>
        </div>
      </div>
    );
  }
  // Lockup horizontal (padrão)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.4 }}>
      <HMark size={iconSize} />
      <div>
        <div style={{
          fontFamily: "'Archivo', sans-serif", fontWeight: 900,
          fontSize: fontSize, color: COLORS.white,
          letterSpacing: size * 0.03, lineHeight: 1, textTransform: 'uppercase',
        }}>
          HEMATOLOG<span style={{ color: COLORS.red }}>.IA</span>
        </div>
        {size >= 24 && (
          <div style={{
            fontFamily: FONT_MONO, fontSize: subSize,
            color: COLORS.dim, letterSpacing: subSize * 0.3,
            marginTop: size * 0.12, textTransform: 'uppercase',
          }}>
            Diagnóstico Assistido
          </div>
        )}
      </div>
    </div>
  );
}

// Pulse blood-drop / cell icon
function CellIcon({ size = 18, color = COLORS.red }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" fill={color} fillOpacity="0.4" />
      <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
  );
}

// ──────────────────────────────────────────────────
// Bottom Nav
// ──────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'analyze', label: 'Analisar', icon: 'scope' },
  { id: 'community', label: 'Comunidade', icon: 'globe' },
  { id: 'chat', label: 'Dúvidas', icon: 'chat' },
  { id: 'profile', label: 'Perfil', icon: 'user' },
];

function NavIcon({ name, active }) {
  const c = active ? COLORS.red : COLORS.muted;
  const s = 22;
  if (name === 'home') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
  if (name === 'scope') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="10" r="6" stroke={c} strokeWidth="1.6"/>
      <circle cx="12" cy="10" r="2.5" fill={active ? c : 'none'} stroke={c} strokeWidth="1.4"/>
      <path d="M12 16v5M8 21h8" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
  if (name === 'globe') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.6"/>
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke={c} strokeWidth="1.4"/>
    </svg>
  );
  if (name === 'chat') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-7l-4 3v-3H6a2 2 0 01-2-2V6z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="9" cy="10.5" r="1" fill={c}/>
      <circle cx="12" cy="10.5" r="1" fill={c}/>
      <circle cx="15" cy="10.5" r="1" fill={c}/>
    </svg>
  );
  if (name === 'user') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={c} strokeWidth="1.6"/>
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
  return null;
}

function BottomNav({ current, onNavigate }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      paddingBottom: 28, paddingTop: 8,
      background: 'linear-gradient(180deg, rgba(6,13,26,0) 0%, rgba(6,13,26,0.95) 35%, #060D1A 100%)',
      zIndex: 40,
    }}>
      <div style={{
        margin: '0 14px', padding: '10px 6px',
        background: 'rgba(10,22,40,0.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: `0.5px solid ${COLORS.line2}`,
        borderRadius: 22,
        display: 'flex', justifyContent: 'space-around',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      }}>
        {NAV_ITEMS.map(item => {
          const active = current === item.id;
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, padding: '4px 6px', position: 'relative',
              transition: 'transform 180ms ease',
              transform: active ? 'scale(1.08)' : 'scale(1)',
            }}>
              <div style={{
                filter: active ? `drop-shadow(0 0 6px ${COLORS.red}99)` : 'none',
                transition: 'filter 180ms ease',
              }}>
                <NavIcon name={item.icon} active={active} />
              </div>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 9, letterSpacing: 0.4,
                color: active ? COLORS.red : COLORS.muted,
                textTransform: 'uppercase', fontWeight: 600,
              }}>{item.label}</div>
              {active && (
                <div style={{
                  position: 'absolute', top: -11, left: '50%',
                  transform: 'translateX(-50%)', width: 20, height: 2,
                  background: COLORS.red, borderRadius: 2,
                  boxShadow: `0 0 8px ${COLORS.red}`,
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────
// Decorative grid / micro-details
// ──────────────────────────────────────────────────
function LabGrid({ opacity = 0.04 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `linear-gradient(${COLORS.white} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.white} 1px, transparent 1px)`,
      backgroundSize: '32px 32px',
      opacity,
      maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
    }} />
  );
}

function Coords({ label, style }) {
  return (
    <div style={{
      fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim,
      letterSpacing: 1.2, textTransform: 'uppercase', ...style,
    }}>{label}</div>
  );
}

window.Hema = {
  COLORS, FONT_DISPLAY, FONT_MONO, FONT_SANS,
  MicroSlide, Logo, CellIcon, BottomNav, LabGrid, Coords,
};
