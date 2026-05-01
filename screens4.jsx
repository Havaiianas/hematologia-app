// screens4.jsx — Comunidade completa: feed, reações, comentários, novo post
const { COLORS, FONT_DISPLAY, FONT_MONO, FONT_SANS, MicroSlide, Logo, CellIcon, LabGrid, Coords } = window.Hema;

// ══════════════════════════════════════════════════
// CELL THUMBNAIL — Ilustrações SVG de células
// ══════════════════════════════════════════════════
const CELL_TYPES_COM = ['neutrofilo', 'linfocito', 'blasto', 'monocito', 'eritrocito'];

function CellThumbnail({ type, index = 0, style = {} }) {
  const resolved = type || CELL_TYPES_COM[index % CELL_TYPES_COM.length];
  const svgStyle = { width: '100%', height: '100%', display: 'block', ...style };

  if (resolved === 'neutrofilo') return (
    <svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
      <defs>
        <radialGradient id={`nt_bg_${index}`} cx="50%" cy="50%"><stop offset="0%" stopColor="#0d1f3c"/><stop offset="100%" stopColor="#060c18"/></radialGradient>
        <radialGradient id={`nt_body_${index}`} cx="45%" cy="40%"><stop offset="0%" stopColor="#c8ddf5" stopOpacity="0.9"/><stop offset="100%" stopColor="#7aadde" stopOpacity="0.6"/></radialGradient>
        <radialGradient id={`nt_nuc_${index}`} cx="40%" cy="35%"><stop offset="0%" stopColor="#9b72d4"/><stop offset="100%" stopColor="#5a3a9e"/></radialGradient>
      </defs>
      <rect width="200" height="110" fill={`url(#nt_bg_${index})`}/>
      <line x1="0" y1="55" x2="200" y2="55" stroke="#1a2a45" strokeWidth="0.5"/>
      <line x1="100" y1="0" x2="100" y2="110" stroke="#1a2a45" strokeWidth="0.5"/>
      <ellipse cx="30" cy="25" rx="16" ry="13" fill="#8c3a3a" fillOpacity="0.35"/>
      <ellipse cx="30" cy="25" rx="8" ry="6" fill="#050c18" fillOpacity="0.5"/>
      <ellipse cx="170" cy="88" rx="15" ry="12" fill="#8c3a3a" fillOpacity="0.3"/>
      <ellipse cx="170" cy="88" rx="7" ry="5" fill="#050c18" fillOpacity="0.5"/>
      <ellipse cx="15" cy="90" rx="12" ry="10" fill="#8c3a3a" fillOpacity="0.25"/>
      <ellipse cx="100" cy="55" rx="38" ry="34" fill={`url(#nt_body_${index})`}/>
      <circle cx="88" cy="48" r="2.5" fill="#a8c9ea" fillOpacity="0.5"/>
      <circle cx="95" cy="60" r="2" fill="#a8c9ea" fillOpacity="0.4"/>
      <circle cx="112" cy="52" r="2.5" fill="#a8c9ea" fillOpacity="0.5"/>
      <circle cx="106" cy="65" r="2" fill="#a8c9ea" fillOpacity="0.4"/>
      <circle cx="83" cy="62" r="2" fill="#a8c9ea" fillOpacity="0.35"/>
      <ellipse cx="88" cy="50" rx="13" ry="10" fill={`url(#nt_nuc_${index})`} fillOpacity="0.9"/>
      <ellipse cx="103" cy="47" rx="12" ry="10" fill={`url(#nt_nuc_${index})`} fillOpacity="0.9"/>
      <ellipse cx="114" cy="56" rx="11" ry="9" fill={`url(#nt_nuc_${index})`} fillOpacity="0.9"/>
      <ellipse cx="106" cy="66" rx="10" ry="8" fill={`url(#nt_nuc_${index})`} fillOpacity="0.8"/>
      <ellipse cx="96" cy="48" rx="5" ry="4" fill="#7258c0" fillOpacity="0.8"/>
      <ellipse cx="109" cy="51" rx="4" ry="4" fill="#7258c0" fillOpacity="0.8"/>
      <ellipse cx="111" cy="61" rx="4" ry="3.5" fill="#7258c0" fillOpacity="0.7"/>
      <ellipse cx="91" cy="43" rx="5" ry="3" fill="#c5b0ef" fillOpacity="0.35"/>
      <ellipse cx="100" cy="55" rx="38" ry="34" fill="none" stroke="#5a8fc4" strokeWidth="0.8" strokeOpacity="0.4"/>
    </svg>
  );

  if (resolved === 'linfocito') return (
    <svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
      <defs>
        <radialGradient id={`lf_bg_${index}`} cx="50%" cy="50%"><stop offset="0%" stopColor="#0d1f3c"/><stop offset="100%" stopColor="#060c18"/></radialGradient>
        <radialGradient id={`lf_body_${index}`} cx="40%" cy="35%"><stop offset="0%" stopColor="#b5cde8" stopOpacity="0.85"/><stop offset="100%" stopColor="#5a8fc4" stopOpacity="0.5"/></radialGradient>
        <radialGradient id={`lf_nuc_${index}`} cx="38%" cy="32%"><stop offset="0%" stopColor="#7b5cc4"/><stop offset="100%" stopColor="#3d2580"/></radialGradient>
      </defs>
      <rect width="200" height="110" fill={`url(#lf_bg_${index})`}/>
      <line x1="0" y1="55" x2="200" y2="55" stroke="#1a2a45" strokeWidth="0.5"/>
      <line x1="100" y1="0" x2="100" y2="110" stroke="#1a2a45" strokeWidth="0.5"/>
      <ellipse cx="28" cy="88" rx="16" ry="12" fill="#8c3a3a" fillOpacity="0.3"/>
      <ellipse cx="28" cy="88" rx="7" ry="5" fill="#050c18" fillOpacity="0.5"/>
      <ellipse cx="172" cy="22" rx="14" ry="11" fill="#8c3a3a" fillOpacity="0.25"/>
      <ellipse cx="172" cy="22" rx="6" ry="5" fill="#050c18" fillOpacity="0.4"/>
      <ellipse cx="100" cy="55" rx="36" ry="33" fill={`url(#lf_body_${index})`}/>
      <ellipse cx="100" cy="54" rx="28" ry="26" fill={`url(#lf_nuc_${index})`}/>
      <ellipse cx="93" cy="47" rx="8" ry="7" fill="#5a44a8" fillOpacity="0.5"/>
      <ellipse cx="108" cy="58" rx="7" ry="6" fill="#4a3498" fillOpacity="0.4"/>
      <ellipse cx="98" cy="62" rx="6" ry="5" fill="#4a3498" fillOpacity="0.35"/>
      <circle cx="103" cy="50" r="5" fill="#c4aaee" fillOpacity="0.55"/>
      <circle cx="103" cy="50" r="2.5" fill="#ddd0f8" fillOpacity="0.6"/>
      <ellipse cx="88" cy="44" rx="7" ry="4" fill="#c5d8f2" fillOpacity="0.25"/>
      <ellipse cx="100" cy="55" rx="36" ry="33" fill="none" stroke="#4a7ab8" strokeWidth="0.8" strokeOpacity="0.4"/>
    </svg>
  );

  if (resolved === 'blasto') return (
    <svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
      <defs>
        <radialGradient id={`bl_bg_${index}`} cx="50%" cy="50%"><stop offset="0%" stopColor="#1a0d2e"/><stop offset="100%" stopColor="#060c18"/></radialGradient>
        <radialGradient id={`bl_body_${index}`} cx="38%" cy="32%"><stop offset="0%" stopColor="#d4c0f5" stopOpacity="0.8"/><stop offset="100%" stopColor="#8060cc" stopOpacity="0.45"/></radialGradient>
        <radialGradient id={`bl_nuc_${index}`} cx="35%" cy="30%"><stop offset="0%" stopColor="#a070e8"/><stop offset="100%" stopColor="#4a1890"/></radialGradient>
      </defs>
      <rect width="200" height="110" fill={`url(#bl_bg_${index})`}/>
      <line x1="0" y1="55" x2="200" y2="55" stroke="#1a1530" strokeWidth="0.5"/>
      <line x1="100" y1="0" x2="100" y2="110" stroke="#1a1530" strokeWidth="0.5"/>
      <ellipse cx="165" cy="85" rx="15" ry="12" fill="#8c3a3a" fillOpacity="0.3"/>
      <ellipse cx="165" cy="85" rx="7" ry="5" fill="#050c18" fillOpacity="0.5"/>
      <ellipse cx="22" cy="30" rx="14" ry="11" fill="#8c3a3a" fillOpacity="0.25"/>
      <ellipse cx="100" cy="55" rx="42" ry="38" fill={`url(#bl_body_${index})`}/>
      <ellipse cx="100" cy="54" rx="35" ry="31" fill={`url(#bl_nuc_${index})`} fillOpacity="0.88"/>
      <path d="M75 46 Q85 38 100 40 Q118 39 125 50 Q133 62 128 72 Q118 82 100 82 Q80 82 72 70 Q65 58 75 46" fill="none" stroke="#b090e8" strokeWidth="0.8" strokeOpacity="0.4"/>
      <circle cx="93" cy="48" r="6" fill="#e0d0ff" fillOpacity="0.5"/>
      <circle cx="93" cy="48" r="3" fill="#f0e8ff" fillOpacity="0.7"/>
      <circle cx="110" cy="58" r="5" fill="#e0d0ff" fillOpacity="0.45"/>
      <circle cx="110" cy="58" r="2.5" fill="#f0e8ff" fillOpacity="0.65"/>
      <circle cx="98" cy="65" r="4" fill="#e0d0ff" fillOpacity="0.4"/>
      <ellipse cx="85" cy="55" rx="6" ry="5" fill="#6040b0" fillOpacity="0.4"/>
      <ellipse cx="113" cy="48" rx="5" ry="4" fill="#6040b0" fillOpacity="0.35"/>
      <ellipse cx="88" cy="44" rx="8" ry="4" fill="#d0b8f8" fillOpacity="0.2"/>
      <ellipse cx="100" cy="55" rx="42" ry="38" fill="none" stroke="#9060dd" strokeWidth="1" strokeOpacity="0.35"/>
      <ellipse cx="100" cy="55" rx="44" ry="40" fill="none" stroke="#8040cc" strokeWidth="2" strokeOpacity="0.1"/>
    </svg>
  );

  if (resolved === 'monocito') return (
    <svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
      <defs>
        <radialGradient id={`mn_bg_${index}`} cx="50%" cy="50%"><stop offset="0%" stopColor="#1a1208"/><stop offset="100%" stopColor="#060c18"/></radialGradient>
        <radialGradient id={`mn_body_${index}`} cx="40%" cy="35%"><stop offset="0%" stopColor="#d8c8a0" stopOpacity="0.75"/><stop offset="100%" stopColor="#a08840" stopOpacity="0.45"/></radialGradient>
        <radialGradient id={`mn_nuc_${index}`} cx="38%" cy="35%"><stop offset="0%" stopColor="#c09040"/><stop offset="100%" stopColor="#703808"/></radialGradient>
      </defs>
      <rect width="200" height="110" fill={`url(#mn_bg_${index})`}/>
      <line x1="0" y1="55" x2="200" y2="55" stroke="#1a1808" strokeWidth="0.5"/>
      <line x1="100" y1="0" x2="100" y2="110" stroke="#1a1808" strokeWidth="0.5"/>
      <ellipse cx="25" cy="82" rx="15" ry="12" fill="#8c3a3a" fillOpacity="0.3"/>
      <ellipse cx="25" cy="82" rx="7" ry="5" fill="#050c18" fillOpacity="0.5"/>
      <ellipse cx="175" cy="28" rx="13" ry="11" fill="#8c3a3a" fillOpacity="0.25"/>
      <ellipse cx="100" cy="57" rx="44" ry="38" fill={`url(#mn_body_${index})`}/>
      <circle cx="80" cy="65" r="4" fill="#050c18" fillOpacity="0.3"/>
      <circle cx="118" cy="68" r="3" fill="#050c18" fillOpacity="0.25"/>
      <circle cx="88" cy="72" r="3" fill="#050c18" fillOpacity="0.2"/>
      <path d="M76 48 Q80 38 100 38 Q120 38 124 48 Q130 58 124 66 Q118 72 110 68 Q100 64 90 68 Q82 72 76 66 Q70 58 76 48Z" fill={`url(#mn_nuc_${index})`} fillOpacity="0.9"/>
      <path d="M90 53 Q100 58 110 53" fill="none" stroke="#e0b060" strokeWidth="1.5" strokeOpacity="0.4"/>
      <ellipse cx="85" cy="46" rx="6" ry="3.5" fill="#e0b860" fillOpacity="0.3"/>
      <ellipse cx="100" cy="57" rx="44" ry="38" fill="none" stroke="#a08040" strokeWidth="0.8" strokeOpacity="0.35"/>
    </svg>
  );

  return (
    <svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
      <defs>
        <radialGradient id={`er_bg_${index}`} cx="50%" cy="50%"><stop offset="0%" stopColor="#1a0808"/><stop offset="100%" stopColor="#060c18"/></radialGradient>
        <radialGradient id={`er_cell_${index}`} cx="40%" cy="35%"><stop offset="0%" stopColor="#e87878" stopOpacity="0.85"/><stop offset="100%" stopColor="#8c2020" stopOpacity="0.6"/></radialGradient>
      </defs>
      <rect width="200" height="110" fill={`url(#er_bg_${index})`}/>
      <line x1="0" y1="55" x2="200" y2="55" stroke="#2a1010" strokeWidth="0.5"/>
      <line x1="100" y1="0" x2="100" y2="110" stroke="#2a1010" strokeWidth="0.5"/>
      {[[40,30,20,16],[90,22,19,15],[148,35,21,17],[22,62,18,14],[70,58,22,17],[118,55,20,16],[166,60,19,15],[45,88,20,16],[100,84,21,17],[158,85,18,14]].map(([cx,cy,rx,ry],k) => (
        <g key={k}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#er_cell_${index})`} fillOpacity={0.6+(k%3)*0.1}/>
          <ellipse cx={cx} cy={cy} rx={rx*0.45} ry={ry*0.45} fill="#060c18" fillOpacity="0.55"/>
          <ellipse cx={cx-rx*0.3} cy={cy-ry*0.3} rx={rx*0.3} ry={ry*0.2} fill="#f0a0a0" fillOpacity="0.2"/>
        </g>
      ))}
    </svg>
  );
}

function detectarTipoCelulaCom(post, idx) {
  const txt = ((post.ia || '') + (post.q || '') + (post.titulo || '')).toLowerCase();
  if (txt.includes('blasto') || txt.includes('leucemia') || txt.includes('lma') || txt.includes('lla')) return 'blasto';
  if (txt.includes('linfocit')) return 'linfocito';
  if (txt.includes('neutrofil') || txt.includes('segmentad')) return 'neutrofilo';
  if (txt.includes('monocit')) return 'monocito';
  return CELL_TYPES_COM[idx % CELL_TYPES_COM.length];
}

// ══════════════════════════════════════════════════
// DADOS INICIAIS
// ══════════════════════════════════════════════════
const TAGS_COMM = ['#blastos', '#leucemia', '#LMA', '#LLA', '#anemia', '#trombocito', '#linfoma', '#morfologia', '#urgente'];

const POSTS_INICIAIS = [
  {
    id: 1, seed: 13,
    author: 'Dra. Marina Lopes', spec: 'Biomédica · CRBM 8421 · SP', initials: 'ML',
    caption: 'Paciente 26a, leucocitose 42.000. Células grandes, cromatina frouxa, nucléolos evidentes. Suspeita de blasto linfoide — colegas concordam?',
    tags: ['#blastos', '#LLA', '#diagnostico'],
    ia: 'Possíveis blastos linfoides (5 células marcadas). Relação N/C elevada compatível com LLA-B. Confiança 87%.',
    reactions: { scope: { n: 24, ativo: false }, alert: { n: 8, ativo: false }, agree: { n: 19, ativo: false } },
    trending: true,
    comentarios: [
      { id: 101, author: 'Dr. Paulo Rezende', spec: 'Hematologista · SP', initials: 'PR', texto: 'Concordo com a suspeita. Morfologia muito sugestiva de LLA-B. Já pediu imunofenotipagem?', time: '14:35', respostas: [
        { id: 1011, author: 'Dra. Marina Lopes', spec: 'Biomédica · SP', initials: 'ML', texto: 'Sim! Resultado chega amanhã. Vou postar aqui.', time: '14:42' },
      ]},
      { id: 102, author: 'Carlos Mendes', spec: 'Analista · MG', initials: 'CM', texto: 'Atenção para a contagem de plaquetas também — costuma vir baixa nesses casos.', time: '15:01', respostas: [] },
      { id: 103, author: 'Dra. Ana Souza', spec: 'Biomédica · RJ', initials: 'AS', texto: 'Muito similar a um caso que vi na semana passada. LLA-B confirmada por FISH.', time: '15:18', respostas: [] },
    ],
  },
  {
    id: 2, seed: 17,
    author: 'Carlos Mendes', spec: 'Analista Clínico · CRBM 12089 · MG', initials: 'CM',
    caption: 'Bastonetes de Auer visíveis em múltiplos blastos. LMA-M3 (promielocítica)? Paciente com febre e sangramento gengival.',
    tags: ['#LMA', '#M3', '#urgente'],
    ia: 'Bastonetes de Auer detectados em 4 células. Padrão compatível com LPA. Confiança 91%.',
    reactions: { scope: { n: 41, ativo: false }, alert: { n: 22, ativo: false }, agree: { n: 37, ativo: false } },
    trending: true,
    comentarios: [
      { id: 201, author: 'Dra. Fernanda Lima', spec: 'Hematologista · SP', initials: 'FL', texto: 'URGENTE! Esse quadro + bastonetes de Auer = LPA até prova em contrário. Iniciar ATRA imediatamente e checar coagulograma — risco alto de CID.', time: '09:22', respostas: [
        { id: 2011, author: 'Carlos Mendes', spec: 'Analista · MG', initials: 'CM', texto: 'Já alertei o médico assistente. Coagulograma em andamento.', time: '09:31' },
        { id: 2012, author: 'Dr. Ricardo Alves', spec: 'Hematologista · MG', initials: 'RA', texto: 'Correto. FISH para PML-RARA é confirmatório. Não espere resultado para iniciar ATRA.', time: '09:45' },
      ]},
      { id: 202, author: 'Dra. Ana Souza', spec: 'Biomédica · RJ', initials: 'AS', texto: 'Fibrinogênio abaixo de 100? Pode precisar de crioprecipitado.', time: '10:05', respostas: [] },
    ],
  },
  {
    id: 3, seed: 7,
    author: 'Dr. Ricardo Alves', spec: 'Hematologista · CRM 34521 · MG', initials: 'RA',
    caption: 'Anemia hemolítica autoimune — esquizócitos ++, haptoglobina indetectável. Paciente em uso de metildopa. Alguém já viu resposta boa com corticoide IV?',
    tags: ['#anemia', '#hemolise', '#autoimune'],
    ia: 'Eritrócitos com morfologia alterada: esquizócitos (8%), esferócitos (12%). Sugestivo de processo hemolítico ativo.',
    reactions: { scope: { n: 18, ativo: false }, alert: { n: 5, ativo: false }, agree: { n: 14, ativo: false } },
    trending: false,
    comentarios: [
      { id: 301, author: 'Dra. Marina Lopes', spec: 'Biomédica · SP', initials: 'ML', texto: 'Suspender a metildopa é obrigatório como 1ª medida. O corticoide ajuda mas a droga precisa sair.', time: '11:30', respostas: [] },
    ],
  },
];

// ══════════════════════════════════════════════════
// COMPONENTES AUXILIARES
// ══════════════════════════════════════════════════

function Avatar({ initials, size = 34, gradient = `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.red})`, src = null }) {
  if (src) {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%', flexShrink: 0,
        overflow: 'hidden', border: `1px solid rgba(255,255,255,0.1)`,
      }}>
        <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: gradient,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FONT_DISPLAY, fontSize: size * 0.38, color: COLORS.white,
    }}>{initials}</div>
  );
}

function ReactionBtn({ icon, count, ativo, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 5,
      background: ativo ? `${color}18` : 'transparent',
      border: `0.5px solid ${ativo ? color : 'transparent'}`,
      borderRadius: 20, padding: '6px 10px', cursor: 'pointer',
      transition: 'all 180ms',
    }}>
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: ativo ? color : COLORS.muted, letterSpacing: 0.3, transition: 'color 180ms' }}>
        {count}
      </span>
    </button>
  );
}

// ── Comentário individual ──
function Comentario({ c, onResponder, postId, onComentarioAtualizado, onComentarioDeletado }) {
  const [expandido,    setExpandido]    = React.useState(false);
  const [editando,     setEditando]     = React.useState(false);
  const [editTexto,    setEditTexto]    = React.useState(c.texto);
  const [salvando,     setSalvando]     = React.useState(false);

  const currentUser = (() => { try { return JSON.parse(localStorage.getItem('hema_user') || '{}'); } catch { return {}; } })();
  const getToken = () => localStorage.getItem('hema_token') || null;
  const authH = () => { const t = getToken(); return t ? { 'Authorization': `Bearer ${t}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' }; };

  const isUUID = (id) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(id));
  const isOwner = (c.author === currentUser.nome || c.author === currentUser.name || c.author === 'Você' || c.spec?.includes(currentUser.crbio)) && isUUID(c.id);

  const salvarEdicao = async () => {
    if (!editTexto.trim()) return;
    setSalvando(true);
    try {
      await fetch(`${window.HemaAPI.base}/community/comentarios/${c.id}`, {
        method: 'PATCH',
        headers: authH(),
        body: JSON.stringify({ texto: editTexto }),
      });
      if (onComentarioAtualizado) onComentarioAtualizado(c.id, editTexto);
      setEditando(false);
    } catch {}
    setSalvando(false);
  };

  const deletarComentario = async () => {
    if (!confirm('Excluir este comentário?')) return;
    try {
      await fetch(`${window.HemaAPI.base}/community/comentarios/${c.id}`, {
        method: 'DELETE',
        headers: authH(),
      });
    } catch {}
    if (onComentarioDeletado) onComentarioDeletado(c.id);
  };

  return (
    <div style={{ animation: 'fadeUp 250ms ease-out' }}>
      <div style={{ display: 'flex', gap: 8, padding: '10px 14px' }}>
        <Avatar initials={c.initials} size={28} src={c.avatar} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.white, fontWeight: 600 }}>{c.author}</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim }}>{c.spec}</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, marginLeft: 'auto' }}>{c.time}</span>
          </div>
          {editando ? (
            <div style={{ marginTop: 6 }}>
              <textarea
                value={editTexto}
                onChange={e => setEditTexto(e.target.value)}
                style={{
                  width: '100%', background: 'rgba(240,244,248,0.04)',
                  border: `1px solid ${COLORS.line2}`, borderRadius: 8,
                  padding: '7px 10px', color: COLORS.white,
                  fontFamily: FONT_SANS, fontSize: 12, lineHeight: 1.5,
                  resize: 'none', outline: 'none', boxSizing: 'border-box', minHeight: 60,
                }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <span onClick={() => setEditando(false)} style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, cursor: 'pointer' }}>Cancelar</span>
                <span onClick={salvarEdicao} style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.red, cursor: 'pointer' }}>{salvando ? 'Salvando...' : 'Salvar'}</span>
              </div>
            </div>
          ) : (
            <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.muted, marginTop: 4, lineHeight: 1.5 }}>
              {c.texto}
            </div>
          )}
          <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
            <span onClick={() => onResponder(c)} style={{
              fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim,
              letterSpacing: 0.4, cursor: 'pointer',
            }}>↩ Responder</span>
            {isOwner && !editando && (
              <span onClick={() => setEditando(true)} style={{
                fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim,
                letterSpacing: 0.4, cursor: 'pointer',
              }}>✏️ Editar</span>
            )}
            {isOwner && !editando && (
              <span onClick={deletarComentario} style={{
                fontFamily: FONT_MONO, fontSize: 9, color: COLORS.red,
                letterSpacing: 0.4, cursor: 'pointer',
              }}>🗑 Excluir</span>
            )}
            {c.respostas?.length > 0 && (
              <span onClick={() => setExpandido(!expandido)} style={{
                fontFamily: FONT_MONO, fontSize: 9, color: '#5B9ED1', letterSpacing: 0.4, cursor: 'pointer',
              }}>
                {expandido ? '▲ Ocultar' : `▼ ${c.respostas.length} resposta${c.respostas.length > 1 ? 's' : ''}`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Respostas */}
      {expandido && c.respostas?.map(r => (
        <div key={r.id} style={{
          display: 'flex', gap: 8, padding: '8px 14px 8px 50px',
          background: 'rgba(240,244,248,0.02)',
          borderLeft: `2px solid ${COLORS.line2}`, marginLeft: 36,
        }}>
          <Avatar initials={r.initials} size={24} src={r.avatar} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: FONT_SANS, fontSize: 11, color: COLORS.white, fontWeight: 600 }}>{r.author}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim }}>{r.time}</span>
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: COLORS.muted, marginTop: 3, lineHeight: 1.5 }}>
              {r.texto}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════
// CARD DE POST
// ══════════════════════════════════════════════════
function PostCard({ post, onUpdate, onAbrir, onDelete }) {
  const [comentariosAbertos, setComentariosAbertos] = React.useState(false);
  const [novoComentario, setNovoComentario]         = React.useState('');
  const [respondendoA, setRespondendoA]             = React.useState(null);
  const [menuAberto, setMenuAberto]                 = React.useState(false);
  const [editando, setEditando]                     = React.useState(false);
  const [editCaption, setEditCaption]               = React.useState(post.caption);
  const [salvandoEdit, setSalvandoEdit]             = React.useState(false);
  const inputRef = React.useRef();

  const getToken = () => localStorage.getItem('hema_token') || null;
  const authHeaders = () => {
    const t = getToken();
    return t ? { 'Authorization': `Bearer ${t}`, 'Content-Type': 'application/json' }
             : { 'Content-Type': 'application/json' };
  };

  const currentUser = (() => { try { return JSON.parse(localStorage.getItem('hema_user') || '{}'); } catch { return {}; } })();
  const isOwner = (
    post.author === 'Você' ||
    post.author === currentUser.nome ||
    post.author === currentUser.name ||
    post.spec?.includes(currentUser.crbio)
  );

  const excluirPost = async () => {
    if (!confirm('Excluir este post permanentemente?')) return;
    setMenuAberto(false);
    try {
      const r = await fetch(`${window.HemaAPI.base}/community/posts/${post.id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (r.ok) {
        if (onDelete) onDelete(post.id);
      } else {
        alert('Erro ao excluir. Tente novamente.');
      }
    } catch {
      // Remove local mesmo se API falhar
      if (onDelete) onDelete(post.id);
    }
  };

  const salvarEdicao = async () => {
    if (!editCaption.trim()) return;
    setSalvandoEdit(true);
    try {
      const r = await fetch(`${window.HemaAPI.base}/community/posts/${post.id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ caption: editCaption }),
      });
      if (r.ok) {
        onUpdate({ ...post, caption: editCaption });
        setEditando(false);
      }
    } catch {}
    setSalvandoEdit(false);
  };

  const toggleReaction = async (tipo) => {
    // Atualiza UI imediatamente — desativa outros tipos (só 1 reação por vez)
    const r = {
      scope: { ...post.reactions.scope },
      alert: { ...post.reactions.alert },
      agree: { ...post.reactions.agree },
    };
    const eraAtivo = r[tipo]?.ativo;
    // Remove reação ativa de outros tipos
    Object.keys(r).forEach(k => {
      if (k !== tipo && r[k].ativo) {
        r[k] = { n: Math.max(0, (r[k].n || 1) - 1), ativo: false };
      }
    });
    // Toggle o tipo clicado
    r[tipo] = { n: (r[tipo]?.n || 0) + (eraAtivo ? -1 : 1), ativo: !eraAtivo };
    onUpdate({ ...post, reactions: r });

    // Salva no backend
    try {
      await fetch(`${window.HemaAPI.base}/community/posts/${post.id}/reacao`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ tipo }),
      });
    } catch {}
  };

  const enviarComentario = async () => {
    const txt = novoComentario.trim();
    if (!txt) return;
    const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    if (respondendoA) {
      // Salva resposta no banco como comentário com parent_id
      const novaResposta = {
        id: Date.now(), author: 'Você', spec: 'Usuário', initials: 'VC', texto: txt, time: agora,
      };
      const novosComentarios = post.comentarios.map(cm => {
        if (cm.id === respondendoA.id) {
          return { ...cm, respostas: [...(cm.respostas || []), novaResposta] };
        }
        return cm;
      });
      onUpdate({ ...post, comentarios: novosComentarios });
      setRespondendoA(null);
      // Salva no backend
      try {
        await fetch(`${window.HemaAPI.base}/community/posts/${post.id}/comentarios`, {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ texto: txt, parent_id: String(respondendoA.id) }),
        });
      } catch {}
    } else {
      // Atualiza UI imediatamente
      const novoC = {
        id: Date.now(), author: 'Você', spec: 'Usuário', initials: 'VC',
        texto: txt, time: agora, respostas: [],
      };
      onUpdate({ ...post, comentarios: [...post.comentarios, novoC] });

      // Salva no backend com token
      try {
        await fetch(`${window.HemaAPI.base}/community/posts/${post.id}/comentarios`, {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ texto: txt }),
        });
      } catch {}
    }
    setNovoComentario('');
  };

  const abrirComentarios = () => {
    setComentariosAbertos(!comentariosAbertos);
    if (!comentariosAbertos) setTimeout(() => inputRef.current?.focus(), 300);
  };

  return (
    <div style={{
      background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`,
      borderRadius: 16, overflow: 'hidden',
    }}>
      {/* Cabeçalho do autor */}
      <div style={{ padding: '12px 14px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar initials={post.initials} src={post.avatar} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.white, fontWeight: 600 }}>{post.author}</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, marginTop: 1, letterSpacing: 0.3 }}>{post.spec}</div>
        </div>
        {post.trending && (
          <div style={{
            fontFamily: FONT_MONO, fontSize: 8, color: COLORS.red,
            background: COLORS.redDim, border: `0.5px solid ${COLORS.redBorder}`,
            padding: '2px 6px', borderRadius: 4, letterSpacing: 0.6,
          }}>TRENDING</div>
        )}
        {/* Menu ··· */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setMenuAberto(v => !v)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: COLORS.dim, fontSize: 18, padding: '0 4px', lineHeight: 1,
          }}>···</button>
          {menuAberto && (
            <>
              {/* Overlay para fechar */}
              <div onClick={() => setMenuAberto(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
              <div style={{
                position: 'absolute', top: 24, right: 0, zIndex: 100,
                background: '#0F1E35', border: `0.5px solid ${COLORS.line2}`,
                borderRadius: 10, overflow: 'hidden', minWidth: 160,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}>
                {isOwner ? (
                  <>
                    <div onClick={() => { setMenuAberto(false); setEditCaption(post.caption); setEditando(true); }} style={{
                      padding: '11px 14px', fontFamily: FONT_SANS, fontSize: 13,
                      color: COLORS.white, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                      borderBottom: `0.5px solid ${COLORS.line}`,
                    }}>
                      ✏️ Editar post
                    </div>
                    <div onClick={excluirPost} style={{
                      padding: '11px 14px', fontFamily: FONT_SANS, fontSize: 13,
                      color: COLORS.red, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      🗑️ Excluir post
                    </div>
                  </>
                ) : (
                  <>
                    <div onClick={() => { setMenuAberto(false); alert('Denúncia enviada. Obrigado!'); }} style={{
                      padding: '11px 14px', fontFamily: FONT_SANS, fontSize: 13,
                      color: COLORS.muted, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                      borderBottom: `0.5px solid ${COLORS.line}`,
                    }}>
                      🚩 Denunciar
                    </div>
                    <div onClick={() => { setMenuAberto(false); }} style={{
                      padding: '11px 14px', fontFamily: FONT_SANS, fontSize: 13,
                      color: COLORS.muted, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      🔕 Não tenho interesse
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Imagem do esfregaço */}
      <div onClick={() => onAbrir(post)} style={{ position: 'relative', height: 200, cursor: 'pointer' }}>
        {(post.imagem_url || post.imageURL)
          ? <img src={post.imagem_url || post.imageURL} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <CellThumbnail type={detectarTipoCelulaCom(post, post.seed || 0)} index={post.seed || 0} />
        }
        <div style={{
          position: 'absolute', bottom: 8, right: 8,
          background: 'rgba(6,13,26,0.8)', border: `0.5px solid ${COLORS.line2}`,
          borderRadius: 6, padding: '3px 8px',
          fontFamily: FONT_MONO, fontSize: 8, color: COLORS.muted,
        }}>Toque para ampliar</div>
      </div>

      {/* Box IA */}
      <div style={{
        margin: '12px 14px 0', padding: 10, borderRadius: 10,
        background: `linear-gradient(135deg, rgba(192,57,43,0.1), rgba(59,126,168,0.05))`,
        border: `0.5px solid ${COLORS.redBorder}`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: FONT_MONO, fontSize: 9, color: COLORS.red,
          letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4,
        }}>
          <CellIcon size={11} /> IA · Hema
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: COLORS.white, lineHeight: 1.45 }}>{post.ia}</div>
      </div>

      {/* Legenda */}
      <div style={{ padding: '10px 14px', fontFamily: FONT_SANS, fontSize: 12, color: COLORS.muted, lineHeight: 1.5 }}>
        <span style={{ color: COLORS.white }}>{post.author.split(' ')[0]}</span> {post.caption}
      </div>

      {/* Tags */}
      <div style={{ padding: '0 14px 10px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {post.tags.map(t => (
          <span key={t} style={{ fontFamily: FONT_MONO, fontSize: 9, color: '#5B9ED1', letterSpacing: 0.3 }}>{t}</span>
        ))}
      </div>

      {/* Reações */}
      <div style={{
        padding: '8px 10px', borderTop: `0.5px solid ${COLORS.line}`,
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        <ReactionBtn icon="🔬" count={post.reactions.scope.n} ativo={post.reactions.scope.ativo} color={COLORS.blue}  onClick={() => toggleReaction('scope')} />
        <ReactionBtn icon="⚠"  count={post.reactions.alert.n} ativo={post.reactions.alert.ativo} color={COLORS.amber} onClick={() => toggleReaction('alert')} />
        <ReactionBtn icon="✓"  count={post.reactions.agree.n} ativo={post.reactions.agree.ativo} color={COLORS.green} onClick={() => toggleReaction('agree')} />

        <div style={{ flex: 1 }} />

        {/* Compartilhar */}
        <button style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5, padding: '6px 8px',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M4 12v8a1 1 0 001 1h14a1 1 0 001-1v-8M16 6l-4-4-4 4M12 2v13" stroke={COLORS.dim} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim }}>Compartilhar</span>
        </button>

        {/* Comentários */}
        <button onClick={abrirComentarios} style={{
          background: comentariosAbertos ? 'rgba(59,126,168,0.1)' : 'none',
          border: `0.5px solid ${comentariosAbertos ? 'rgba(59,126,168,0.4)' : 'transparent'}`,
          borderRadius: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5, padding: '6px 10px',
          transition: 'all 180ms',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-7l-4 3v-3H6a2 2 0 01-2-2V6z" stroke={comentariosAbertos ? '#5B9ED1' : COLORS.dim} strokeWidth="1.6" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: comentariosAbertos ? '#5B9ED1' : COLORS.dim }}>
            {post.comentarios.length}
          </span>
        </button>
      </div>

      {/* Seção de comentários */}
      {comentariosAbertos && (
        <div style={{ borderTop: `0.5px solid ${COLORS.line}`, animation: 'fadeUp 250ms ease-out' }}>
          {post.comentarios.length === 0 && (
            <div style={{
              padding: '16px 14px', fontFamily: FONT_MONO, fontSize: 10,
              color: COLORS.dim, textAlign: 'center', letterSpacing: 0.3,
            }}>
              Seja o primeiro a comentar
            </div>
          )}
          {post.comentarios.map(c => (
            <div key={c.id}>
              <Comentario c={c} postId={post.id}
                onComentarioAtualizado={(cId, novoTexto) => {
                  const novos = post.comentarios.map(cm => cm.id === cId ? {...cm, texto: novoTexto} : cm);
                  onUpdate({...post, comentarios: novos});
                }}
                onComentarioDeletado={(cId) => {
                  const novos = post.comentarios.filter(cm => cm.id !== cId);
                  onUpdate({...post, comentarios: novos, comments: Math.max(0, (post.comments || 1) - 1)});
                }}
                onResponder={(c) => {
                setRespondendoA(c);
                setNovoComentario(`@${c.author.split(' ')[0]} `);
                setTimeout(() => inputRef.current?.focus(), 100);
              }} />
              {c.id !== post.comentarios[post.comentarios.length - 1]?.id && (
                <div style={{ margin: '0 14px', height: '0.5px', background: COLORS.line }} />
              )}
            </div>
          ))}

          {/* Campo de novo comentário */}
          {respondendoA && (
            <div style={{
              margin: '0 14px 4px',
              padding: '6px 10px', borderRadius: 8,
              background: 'rgba(59,126,168,0.08)', border: `0.5px solid rgba(59,126,168,0.3)`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 9, color: '#5B9ED1' }}>
                ↩ Respondendo a {respondendoA.author.split(' ')[0]}
              </span>
              <button onClick={() => { setRespondendoA(null); setNovoComentario(''); }} style={{
                background: 'none', border: 'none', color: COLORS.dim, cursor: 'pointer', fontSize: 14,
              }}>✕</button>
            </div>
          )}

          <div style={{
            display: 'flex', gap: 8, padding: '10px 14px 14px', alignItems: 'flex-end',
          }}>
            <Avatar initials="VC" size={28} gradient={`linear-gradient(135deg, ${COLORS.red}, #6A1A12)`} />
            <div style={{
              flex: 1, background: 'rgba(240,244,248,0.04)',
              border: `0.5px solid ${COLORS.line2}`, borderRadius: 12,
              padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <input
                ref={inputRef}
                value={novoComentario}
                onChange={e => setNovoComentario(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && enviarComentario()}
                placeholder={respondendoA ? `Responder ${respondendoA.author.split(' ')[0]}...` : 'Adicionar comentário...'}
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  fontFamily: FONT_SANS, fontSize: 12, color: COLORS.white,
                }}
              />
              <button onClick={enviarComentario} style={{
                background: novoComentario.trim() ? COLORS.red : 'transparent',
                border: 'none', borderRadius: 8, width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: novoComentario.trim() ? 'pointer' : 'default',
                transition: 'background 180ms', flexShrink: 0,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12l18-9-5 18-4-8-9-1z" fill={novoComentario.trim() ? COLORS.white : COLORS.dim}/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edição completo */}
      {editando && (() => {
        const fileEditRef = React.createRef();
        return (
          <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'flex-end' }}>
            <div style={{ width: '100%', background: '#0F1E35', borderRadius: '20px 20px 0 0', padding: '0 0 40px', border: `0.5px solid ${COLORS.line2}`, maxHeight: '90vh', overflowY: 'auto' }}>
              {/* Header */}
              <div style={{ padding: '16px 18px 12px', display: 'flex', alignItems: 'center', borderBottom: `0.5px solid ${COLORS.line2}`, position: 'sticky', top: 0, background: '#0F1E35', zIndex: 10 }}>
                <button onClick={() => setEditando(false)} style={{ background: 'none', border: 'none', color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 11, cursor: 'pointer' }}>Cancelar</button>
                <div style={{ flex: 1, textAlign: 'center', fontFamily: FONT_DISPLAY, fontSize: 16, color: COLORS.white, fontWeight: 600 }}>Editar post</div>
                <button onClick={salvarEdicao} disabled={salvandoEdit} style={{
                  background: COLORS.red, border: 'none', color: COLORS.white,
                  borderRadius: 8, padding: '7px 14px', fontFamily: FONT_MONO,
                  fontSize: 11, fontWeight: 700, cursor: 'pointer', opacity: salvandoEdit ? 0.6 : 1,
                }}>{salvandoEdit ? 'Salvando...' : 'Salvar'}</button>
              </div>
              {/* Imagem atual */}
              <div style={{ padding: '14px 18px 0' }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>· Imagem</div>
                {(editCaption || post.imagem_url) && post.imagem_url ? (
                  <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', height: 150 }}>
                    <img src={post.imagem_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 8 }}>
                      <button onClick={() => {
                        onUpdate({ ...post, imagem_url: null, imageURL: null });
                        fetch(`${window.HemaAPI.base}/community/posts/${post.id}`, {
                          method: 'PATCH', headers: authHeaders(),
                          body: JSON.stringify({ imagem_url: null }),
                        }).catch(() => {});
                      }} style={{
                        background: 'rgba(192,57,43,0.9)', border: 'none', borderRadius: 6,
                        color: 'white', fontFamily: FONT_MONO, fontSize: 9, padding: '5px 10px', cursor: 'pointer',
                      }}>🗑 Remover foto</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input type="file" accept="image/*" ref={fileEditRef} style={{ display: 'none' }}
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        const reader = new FileReader();
                        reader.onload = async () => {
                          const b64 = reader.result;
                          onUpdate({ ...post, imagem_url: b64, imageURL: b64 });
                          try {
                            await fetch(`${window.HemaAPI.base}/community/posts/${post.id}`, {
                              method: 'PATCH', headers: authHeaders(),
                              body: JSON.stringify({ imagem_url: b64 }),
                            });
                          } catch {}
                        };
                        reader.readAsDataURL(f);
                      }}
                    />
                    <div onClick={() => fileEditRef.current?.click()} style={{
                      height: 80, background: 'rgba(240,244,248,0.03)',
                      border: `1px dashed ${COLORS.line2}`, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', gap: 8,
                    }}>
                      <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim }}>📷 Adicionar foto</span>
                    </div>
                  </div>
                )}
              </div>
              {/* Texto */}
              <div style={{ padding: '14px 18px 0' }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>· Texto do post</div>
                <textarea
                  value={editCaption}
                  onChange={e => setEditCaption(e.target.value)}
                  style={{
                    width: '100%', minHeight: 100, background: 'rgba(240,244,248,0.04)',
                    border: `1px solid ${COLORS.line2}`, borderRadius: 10, padding: '10px 12px',
                    color: COLORS.white, fontFamily: FONT_SANS, fontSize: 13, lineHeight: 1.5,
                    resize: 'none', outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ══════════════════════════════════════════════════
// MODAL — NOVO POST
// ══════════════════════════════════════════════════
function NovoPostModal({ onClose, onPublicar }) {
  const [texto,     setTexto]     = React.useState('');
  const [tagsSel,   setTagsSel]   = React.useState([]);
  const [imageFile, setImageFile] = React.useState(null);
  const [imageURL,  setImageURL]  = React.useState(null);
  const [loading,   setLoading]   = React.useState(false);
  const fileRef = React.useRef();

  const toggleTag = (t) => setTagsSel(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const handleImagem = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (imageURL) URL.revokeObjectURL(imageURL);
    setImageFile(f); setImageURL(URL.createObjectURL(f));
  };

  const publicar = async () => {
    if (!texto.trim()) return;
    setLoading(true);

    const token = localStorage.getItem('hema_token');
    const user  = (() => { try { return JSON.parse(localStorage.getItem('hema_user') || '{}'); } catch { return {}; } })();
    const authH = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };

    // Converte imagem para base64 se houver
    let imagem_url = null;
    if (imageFile) {
      try {
        imagem_url = await new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload  = () => res(reader.result); // data:image/jpeg;base64,...
          reader.onerror = rej;
          reader.readAsDataURL(imageFile);
        });
      } catch { imagem_url = null; }
    }

    // Salva no backend
    let postId = String(Date.now());
    try {
      const r = await fetch(`${window.HemaAPI.base}/community/posts`, {
        method: 'POST',
        headers: authH,
        body: JSON.stringify({
          caption:    texto,
          tags:       tagsSel,
          imagem_url: imagem_url,
        }),
      });
      if (r.ok) {
        const d = await r.json();
        postId = d.id || postId;
      }
    } catch {}

    const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    onPublicar({
      id:       postId,
      seed:     Math.floor(Math.random() * 50) + 1,
      author:   user.nome || user.name || 'Você',
      spec:     user.crbio || 'Usuário · Hematolog.IA',
      initials: (user.nome || 'VC').split(' ').map(w => w[0]).slice(0,2).join(''),
      caption:  texto,
      tags:     tagsSel,
      imagem_url,
      imageURL: imagem_url,
      ia:       tagsSel.length > 0 ? 'Análise IA pendente.' : null,
      reactions: { scope: { n: 0, ativo: false }, alert: { n: 0, ativo: false }, agree: { n: 0, ativo: false } },
      trending:  false,
      comentarios: [],
    });
    setLoading(false);
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(6,13,26,0.94)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'flex-end',
      animation: 'fadeIn 200ms ease-out',
    }}>
      <div style={{
        width: '100%', background: COLORS.bg2,
        border: `0.5px solid ${COLORS.line2}`,
        borderRadius: '20px 20px 0 0',
        maxHeight: '90%', overflowY: 'auto',
        animation: 'fadeUp 300ms ease-out',
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 16px 12px', display: 'flex', alignItems: 'center',
          borderBottom: `0.5px solid ${COLORS.line2}`,
          position: 'sticky', top: 0, background: COLORS.bg2, zIndex: 10,
        }}>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: FONT_MONO, fontSize: 11, color: COLORS.muted, letterSpacing: 0.4,
          }}>Cancelar</button>
          <div style={{ flex: 1, textAlign: 'center', fontFamily: FONT_DISPLAY, fontSize: 16, color: COLORS.white, fontWeight: 600 }}>
            Novo caso
          </div>
          <button onClick={publicar} disabled={!texto.trim() || loading} style={{
            background: texto.trim() && !loading ? COLORS.red : 'rgba(192,57,43,0.3)',
            color: COLORS.white, border: 'none', borderRadius: 8,
            padding: '7px 14px', fontFamily: FONT_MONO, fontSize: 11,
            letterSpacing: 1, fontWeight: 700, cursor: texto.trim() && !loading ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', gap: 6, transition: 'all 200ms',
          }}>
            {loading ? <div style={{ width: 12, height: 12, borderRadius: '50%', border: `2px solid rgba(255,255,255,0.3)`, borderTopColor: COLORS.white, animation: 'spin 0.8s linear infinite' }} /> : null}
            Publicar
          </button>
        </div>

        <div style={{ padding: '14px 16px', display: 'flex', gap: 10 }}>
          <Avatar initials="VC" size={36} gradient={`linear-gradient(135deg, ${COLORS.red}, #6A1A12)`} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.white, fontWeight: 600 }}>Você</div>
            <textarea
              value={texto} onChange={e => setTexto(e.target.value)}
              placeholder="Descreva o caso clínico, achados morfológicos, dúvida ou discussão..."
              style={{
                width: '100%', minHeight: 120, marginTop: 8, boxSizing: 'border-box',
                background: 'transparent', border: 'none', outline: 'none', resize: 'none',
                fontFamily: FONT_SANS, fontSize: 13, color: COLORS.white, lineHeight: 1.6,
              }}
            />
          </div>
        </div>

        {/* Preview da imagem */}
        {imageURL && (
          <div style={{ margin: '0 16px 12px', position: 'relative', borderRadius: 12, overflow: 'hidden', height: 180 }}>
            <img src={imageURL} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button onClick={() => { URL.revokeObjectURL(imageURL); setImageURL(null); setImageFile(null); }} style={{
              position: 'absolute', top: 8, right: 8,
              background: 'rgba(6,13,26,0.8)', border: `0.5px solid ${COLORS.line2}`,
              borderRadius: '50%', width: 28, height: 28, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: COLORS.white, fontSize: 14,
            }}>✕</button>
            <div style={{
              position: 'absolute', bottom: 8, left: 8,
              background: 'rgba(6,13,26,0.8)', border: `0.5px solid ${COLORS.green}`,
              borderRadius: 6, padding: '3px 8px',
              fontFamily: FONT_MONO, fontSize: 8, color: COLORS.green,
            }}>IA irá analisar automaticamente</div>
          </div>
        )}

        {/* Tags */}
        <div style={{ padding: '0 16px 12px' }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
            Tags do caso
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {TAGS_COMM.map(t => (
              <div key={t} onClick={() => toggleTag(t)} style={{
                padding: '5px 10px', borderRadius: 999, cursor: 'pointer',
                border: `0.5px solid ${tagsSel.includes(t) ? COLORS.red : COLORS.line2}`,
                background: tagsSel.includes(t) ? COLORS.redDim : 'transparent',
                fontFamily: FONT_MONO, fontSize: 9,
                color: tagsSel.includes(t) ? COLORS.red : COLORS.muted,
                transition: 'all 150ms',
              }}>{t}</div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div style={{
          padding: '12px 16px 28px', borderTop: `0.5px solid ${COLORS.line}`,
          display: 'flex', gap: 8,
        }}>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImagem} style={{ display: 'none' }} />
          <button onClick={() => fileRef.current?.click()} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px',
            background: 'rgba(240,244,248,0.04)', border: `0.5px solid ${COLORS.line2}`,
            borderRadius: 10, cursor: 'pointer',
            fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, letterSpacing: 0.4,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="7" width="18" height="13" rx="2" stroke={COLORS.muted} strokeWidth="1.6"/>
              <circle cx="12" cy="13.5" r="3.5" stroke={COLORS.muted} strokeWidth="1.6"/>
            </svg>
            {imageFile ? 'Trocar imagem' : 'Adicionar imagem'}
          </button>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px',
            background: 'rgba(192,57,43,0.06)', border: `0.5px solid ${COLORS.redBorder}`,
            borderRadius: 10,
            fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red, letterSpacing: 0.4,
          }}>
            <CellIcon size={12} />
            IA inclusa
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// TELA — DETALHE DO POST (imagem ampliada + todos comentários)
// ══════════════════════════════════════════════════
function PostDetalheScreen({ post, onBack, onUpdate }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.bg, zIndex: 50, overflowY: 'auto', animation: 'fadeIn 200ms ease-out' }}>
      {/* Header */}
      <div style={{
        padding: '54px 16px 12px', display: 'flex', alignItems: 'center', gap: 10,
        position: 'sticky', top: 0, background: COLORS.bg, zIndex: 10,
        borderBottom: `0.5px solid ${COLORS.line2}`,
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(240,244,248,0.06)', border: `0.5px solid ${COLORS.line2}`,
          width: 36, height: 36, borderRadius: 10, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M14 6l-6 6 6 6" stroke={COLORS.white} strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase' }}>Caso clínico</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: COLORS.white, fontWeight: 600 }}>{post.author}</div>
        </div>
      </div>

      {/* Imagem ampliada */}
      <div style={{ width: '100%', height: 280, position: 'relative' }}>
        {(post.imagem_url || post.imageURL)
          ? <img src={post.imagem_url || post.imageURL} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <CellThumbnail type={detectarTipoCelulaCom(post, post.seed || 0)} index={post.seed || 0} />
        }
      </div>

      {/* Box IA */}
      <div style={{ margin: '12px 16px 0', padding: 12, borderRadius: 12, background: `linear-gradient(135deg, rgba(192,57,43,0.12), rgba(59,126,168,0.06))`, border: `0.5px solid ${COLORS.redBorder}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT_MONO, fontSize: 9, color: COLORS.red, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
          <CellIcon size={11} /> IA · Hema · Análise completa
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.white, lineHeight: 1.55 }}>{post.ia}</div>
      </div>

      {/* Legenda completa */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <Avatar initials={post.initials} size={36} />
          <div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.white, fontWeight: 600 }}>{post.author}</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim }}>{post.spec}</div>
          </div>
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.muted, lineHeight: 1.6 }}>{post.caption}</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          {post.tags.map(t => <span key={t} style={{ fontFamily: FONT_MONO, fontSize: 9, color: '#5B9ED1' }}>{t}</span>)}
        </div>
      </div>

      {/* Comentários completos */}
      <div style={{ borderTop: `0.5px solid ${COLORS.line2}`, paddingBottom: 40 }}>
        <div style={{ padding: '12px 16px 6px', fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase' }}>
          {post.comentarios.length} comentário{post.comentarios.length !== 1 ? 's' : ''}
        </div>
        {post.comentarios.map(c => (
          <div key={c.id}>
            <Comentario c={c} onResponder={() => {}} />
            <div style={{ margin: '0 14px', height: '0.5px', background: COLORS.line }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// TELA — COMUNIDADE (principal)
// ══════════════════════════════════════════════════
function CommunityScreenV2() {
  const [posts,       setPosts]       = React.useState([]);
  const [carregando,  setCarregando]  = React.useState(true);
  const [activeTag,   setActiveTag]   = React.useState(null);
  const [busca,       setBusca]       = React.useState('');
  const [novoPost,    setNovoPost]    = React.useState(false);
  const [postAberto,  setPostAberto]  = React.useState(null);
  const [secao,       setSecao]       = React.useState('trending');

  // Carrega posts do backend ao montar
  const normalizar = (p) => ({
    id:         p.id,
    seed:       Math.abs((p.id || '').charCodeAt(0) * 7) % 50 + 1,
    author:     p.autor_nome || 'Usuário',
    spec:       p.autor_crbio || 'Biomédico',
    initials:   (p.autor_nome || 'U').split(' ').map(w => w[0]).slice(0,2).join(''),
    avatar:     p.autor_avatar || null,
    caption:    p.caption,
    tags:       p.tags || [],
    ia:         p.ia_resumo || null,
    imagem_url: p.imagem_url || null,
    imageURL:   p.imagem_url || null,
    reactions: {
      scope: { n: p.total_reacoes || 0, ativo: p.minha_reacao === 'scope' },
      alert: { n: 0, ativo: p.minha_reacao === 'alert' },
      agree: { n: 0, ativo: p.minha_reacao === 'agree' },
    },
    comments:    p.total_comentarios || 0,
    trending:    p.trending || false,
    comentarios: (p.comentarios || []).map(cm => ({
      id: cm.id, author: cm.author, initials: cm.initials,
      spec: cm.spec, texto: cm.texto, time: cm.time, respostas: [],
    })),
  });

  const carregarPosts = React.useCallback(async () => {
    setCarregando(true);
    try {
      const user = (() => { try { return JSON.parse(localStorage.getItem('hema_user') || '{}'); } catch { return {}; } })();
      const uid = user?.id || user?.email || '';
      const r = await fetch(`${window.HemaAPI.base}/community/posts?limit=30&secao=recente&usuario_id=${encodeURIComponent(uid)}`);
      if (r.ok) {
        const d = await r.json();
        setPosts((d.posts || d).map(normalizar));
      }
    } catch { setPosts([]); }
    setCarregando(false);
  }, []);

  React.useEffect(() => { carregarPosts(); }, []);

  const atualizar = (postAtualizado) => {
    setPosts(prev => prev.map(p => p.id === postAtualizado.id ? postAtualizado : p));
  };

  const deletarPost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const publicar = async (_novoP) => {
    setNovoPost(false);
    await carregarPosts();
  };

  const postsFiltrados = posts.filter(p => {
    const matchTag   = !activeTag || p.tags.includes(activeTag);
    const matchBusca = !busca || p.caption.toLowerCase().includes(busca.toLowerCase()) || (p.author || '').toLowerCase().includes(busca.toLowerCase());
    return matchTag && matchBusca;
  });

  if (carregando) {
    return (
      <div style={{ position: 'absolute', inset: 0, background: COLORS.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: `2px solid ${COLORS.line2}`, borderTopColor: COLORS.red, animation: 'spin 0.8s linear infinite' }} />
        <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim, letterSpacing: 1 }}>Carregando comunidade...</div>
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0 }}>

    {/* ── Conteúdo scrollável ── */}
    <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 120 }}>
      <div style={{ minHeight: '100%', position: 'relative' }}>
      <LabGrid opacity={0.03} />

      {/* Header */}
      <div style={{ padding: '54px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase' }}>· Rede de especialistas</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: COLORS.white, fontWeight: 600, letterSpacing: -0.4, marginTop: 2 }}>Comunidade</div>
        </div>
        <button onClick={() => setNovoPost(true)} style={{
          background: COLORS.red, border: 'none', borderRadius: 12,
          padding: '10px 14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: FONT_MONO, fontSize: 10, color: COLORS.white,
          letterSpacing: 0.6, fontWeight: 700,
          boxShadow: `0 4px 14px ${COLORS.red}50`,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke={COLORS.white} strokeWidth="2.4" strokeLinecap="round"/>
          </svg>
          Postar
        </button>
      </div>

      {/* Busca */}
      <div style={{ padding: '8px 20px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`,
          borderRadius: 12, padding: '10px 12px',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke={COLORS.muted} strokeWidth="1.6"/>
            <path d="M20 20l-4-4" stroke={COLORS.muted} strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <input
            value={busca} onChange={e => setBusca(e.target.value)}
            placeholder="Buscar casos, células, autores..."
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: FONT_MONO, fontSize: 11, color: COLORS.white }}
          />
          {busca && <button onClick={() => setBusca('')} style={{ background: 'none', border: 'none', color: COLORS.dim, cursor: 'pointer', fontSize: 14 }}>✕</button>}
        </div>
      </div>

      {/* Seções */}
      <div style={{ display: 'flex', gap: 0, padding: '4px 20px 8px' }}>
        {[['trending','🔥 Destaques'],['recentes','🕐 Recentes'],['meus','👤 Meus']].map(([id,label]) => (
          <button key={id} onClick={() => setSecao(id)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px 4px', borderBottom: `2px solid ${secao === id ? COLORS.red : 'transparent'}`,
            fontFamily: FONT_MONO, fontSize: 10,
            color: secao === id ? COLORS.white : COLORS.dim,
            transition: 'all 180ms', letterSpacing: 0.3,
          }}>{label}</button>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '4px 20px 8px', scrollbarWidth: 'none' }}>
        {TAGS_COMM.map(t => (
          <div key={t} onClick={() => setActiveTag(activeTag === t ? null : t)} style={{
            flexShrink: 0, padding: '5px 10px', borderRadius: 999,
            border: `0.5px solid ${activeTag === t ? COLORS.red : COLORS.line2}`,
            background: activeTag === t ? COLORS.redDim : 'transparent',
            fontFamily: FONT_MONO, fontSize: 9,
            color: activeTag === t ? COLORS.red : COLORS.muted,
            cursor: 'pointer', transition: 'all 150ms',
          }}>{t}</div>
        ))}
      </div>

      {/* Posts */}
      <div style={{ padding: '4px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {postsFiltrados.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🔬</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: COLORS.white }}>Nenhum caso encontrado</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim, marginTop: 6 }}>Tente outras tags ou seja o primeiro a postar!</div>
          </div>
        ) : postsFiltrados.map(p => (
          <PostCard key={p.id} post={p} onUpdate={atualizar} onAbrir={setPostAberto} onDelete={deletarPost} />
        ))}
      </div>

      </div>
      </div>

      {/* Modais fora do scroll */}
      {novoPost && <NovoPostModal onClose={() => setNovoPost(false)} onPublicar={publicar} />}
      {postAberto && (
        <PostDetalheScreen
          post={postAberto}
          onBack={() => setPostAberto(null)}
          onUpdate={(p) => { atualizar(p); setPostAberto(p); }}
        />
      )}
    </div>
  );
}

window.HemaScreens4 = { CommunityScreenV2 };
