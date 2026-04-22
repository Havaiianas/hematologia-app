// screens4.jsx — Comunidade completa: feed, reações, comentários, novo post
const { COLORS, FONT_DISPLAY, FONT_MONO, FONT_SANS, MicroSlide, Logo, CellIcon, LabGrid, Coords } = window.Hema;

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

function Avatar({ initials, size = 34, gradient = `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.red})` }) {
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
function Comentario({ c, onResponder }) {
  const [expandido, setExpandido] = React.useState(false);
  return (
    <div style={{ animation: 'fadeUp 250ms ease-out' }}>
      <div style={{ display: 'flex', gap: 8, padding: '10px 14px' }}>
        <Avatar initials={c.initials} size={28} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.white, fontWeight: 600 }}>{c.author}</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim }}>{c.spec}</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, marginLeft: 'auto' }}>{c.time}</span>
          </div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.muted, marginTop: 4, lineHeight: 1.5 }}>
            {c.texto}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
            <span onClick={() => onResponder(c)} style={{
              fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim,
              letterSpacing: 0.4, cursor: 'pointer',
              transition: 'color 150ms',
            }}>↩ Responder</span>
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
          <Avatar initials={r.initials} size={24} />
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
function PostCard({ post, onUpdate, onAbrir }) {
  const [comentariosAbertos, setComentariosAbertos] = React.useState(false);
  const [novoComentario, setNovoComentario]         = React.useState('');
  const [respondendoA, setRespondendoA]             = React.useState(null); // comentário que está respondendo
  const inputRef = React.useRef();

  const toggleReaction = (tipo) => {
    const r = { ...post.reactions };
    const era = r[tipo].ativo;
    r[tipo] = { n: era ? r[tipo].n - 1 : r[tipo].n + 1, ativo: !era };
    onUpdate({ ...post, reactions: r });
  };

  const enviarComentario = () => {
    const txt = novoComentario.trim();
    if (!txt) return;
    const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    if (respondendoA) {
      const novosComentarios = post.comentarios.map(c => {
        if (c.id === respondendoA.id) {
          return { ...c, respostas: [...(c.respostas || []), {
            id: Date.now(), author: 'Você', spec: 'Usuário', initials: 'VC', texto: txt, time: agora,
          }]};
        }
        return c;
      });
      onUpdate({ ...post, comentarios: novosComentarios });
      setRespondendoA(null);
    } else {
      const novoC = {
        id: Date.now(), author: 'Você', spec: 'Usuário', initials: 'VC',
        texto: txt, time: agora, respostas: [],
      };
      onUpdate({ ...post, comentarios: [...post.comentarios, novoC] });

      // Notifica o autor do post via backend (sem bloquear a UI)
      try {
        fetch(`${window.HemaAPI.base}/community/posts/${post.id}/comentarios?usuario_id=local`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ texto: txt }),
        }).catch(() => {});
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
        <Avatar initials={post.initials} />
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
        <button style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: COLORS.dim, fontSize: 18, padding: '0 4px', lineHeight: 1,
        }}>···</button>
      </div>

      {/* Imagem do esfregaço */}
      <div onClick={() => onAbrir(post)} style={{ position: 'relative', height: 200, cursor: 'pointer' }}>
        {post.imageURL
          ? <img src={post.imageURL} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <MicroSlide seed={post.seed} boxes={[
              { x: 20, y: 28, w: 11, h: 12, color: COLORS.red,   label: 'B' },
              { x: 56, y: 38, w: 11, h: 12, color: COLORS.red,   label: 'B' },
              { x: 68, y: 62, w: 10, h: 11, color: COLORS.amber, label: '?' },
            ]} style={{ width: '100%', height: '100%' }} />
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
              <Comentario c={c} onResponder={(c) => {
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
    // Simula delay de upload
    await new Promise(r => setTimeout(r, 800));
    const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    onPublicar({
      id: Date.now(), seed: Math.floor(Math.random() * 50) + 1,
      author: 'Você', spec: 'Usuário · Hematolog.IA', initials: 'VC',
      caption: texto, tags: tagsSel, imageURL,
      ia: tagsSel.length > 0 ? 'Análise IA pendente — envie uma imagem para análise automática.' : null,
      reactions: { scope: { n: 0, ativo: false }, alert: { n: 0, ativo: false }, agree: { n: 0, ativo: false } },
      trending: false, comentarios: [],
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
        {post.imageURL
          ? <img src={post.imageURL} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <MicroSlide seed={post.seed} style={{ width: '100%', height: '100%' }} />
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
  const [posts,       setPosts]       = React.useState(POSTS_INICIAIS);
  const [activeTag,   setActiveTag]   = React.useState(null);
  const [busca,       setBusca]       = React.useState('');
  const [novoPost,    setNovoPost]    = React.useState(false);
  const [postAberto,  setPostAberto]  = React.useState(null);
  const [secao,       setSecao]       = React.useState('trending');

  const atualizar = (postAtualizado) => {
    setPosts(prev => prev.map(p => p.id === postAtualizado.id ? postAtualizado : p));
  };

  const publicar = (novoP) => {
    setPosts(prev => [novoP, ...prev]);
    setNovoPost(false);
  };

  const postsFiltrados = posts.filter(p => {
    const matchTag   = !activeTag || p.tags.includes(activeTag);
    const matchBusca = !busca || p.caption.toLowerCase().includes(busca.toLowerCase()) || p.author.toLowerCase().includes(busca.toLowerCase());
    return matchTag && matchBusca;
  });

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
          <PostCard key={p.id} post={p} onUpdate={atualizar} onAbrir={setPostAberto} />
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
