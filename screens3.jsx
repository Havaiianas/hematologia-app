// screens3.jsx — Cadastro, Escolha de Plano, Recuperação de Senha
const { COLORS, FONT_DISPLAY, FONT_MONO, FONT_SANS, MicroSlide, Logo, CellIcon, LabGrid, Coords } = window.Hema;

// ══════════════════════════════════════════════════
// PLANOS — definição central
// ══════════════════════════════════════════════════
const PLANOS = {
  free: {
    id: 'free',
    nome: 'Free',
    preco: 'R$ 0',
    periodo: 'para sempre',
    cor: COLORS.muted,
    corBg: 'rgba(240,244,248,0.04)',
    corBorder: COLORS.line2,
    features: [
      { label: 'Acesso à Comunidade',      ok: true },
      { label: 'Visualizar casos públicos', ok: true },
      { label: 'Perfil profissional',       ok: true },
      { label: 'Análise de imagem com IA',  ok: false },
      { label: 'Chat com Hema',             ok: false },
      { label: 'Exportar laudos PDF',       ok: false },
      { label: 'Histórico de análises',     ok: false },
    ],
  },
  pro: {
    id: 'pro',
    nome: 'Pro',
    preco: 'R$ 89',
    periodo: '/mês',
    anual: 'R$ 790/ano (economize 26%)',
    cor: COLORS.red,
    corBg: 'rgba(192,57,43,0.08)',
    corBorder: COLORS.redBorder,
    badge: 'MAIS POPULAR',
    features: [
      { label: 'Acesso à Comunidade',       ok: true },
      { label: 'Visualizar casos públicos',  ok: true },
      { label: 'Perfil profissional',        ok: true },
      { label: 'Análise de imagem com IA',   ok: true },
      { label: 'Chat com Hema (ilimitado)',   ok: true },
      { label: 'Exportar laudos PDF',        ok: true },
      { label: 'Histórico de análises',      ok: true },
    ],
  },
};

window.HemaPlanos = PLANOS;

// ──────────────────────────────────────────────────
// Componente reutilizável: campo de input
// ──────────────────────────────────────────────────
function Campo({ label, value, onChange, type = 'text', placeholder = '', error = false }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div>
      <div style={{
        fontFamily: FONT_MONO, fontSize: 9, letterSpacing: 1.4,
        color: focus ? COLORS.red : error ? 'rgba(192,57,43,0.7)' : COLORS.dim,
        textTransform: 'uppercase', marginBottom: 6, transition: 'color 180ms',
      }}>{label}</div>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: '100%', boxSizing: 'border-box',
          background: 'rgba(240,244,248,0.04)',
          border: `1px solid ${focus ? COLORS.redBorder : error ? 'rgba(192,57,43,0.4)' : COLORS.line2}`,
          borderRadius: 10, padding: '13px 14px',
          fontFamily: FONT_MONO, fontSize: 13, color: COLORS.white,
          outline: 'none', transition: 'all 180ms',
          boxShadow: focus ? `0 0 0 3px ${COLORS.redDim}` : 'none',
        }}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════
// TELA — ESCOLHA DE PLANO
// ══════════════════════════════════════════════════
function EscolhaPlanoScreen({ onSelect, onBack }) {
  const [selecionado, setSelecionado] = React.useState('pro');
  const [anual, setAnual] = React.useState(false);

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.bg, overflowY: 'auto' }}>
      <LabGrid opacity={0.03} />

      {/* Header */}
      <div style={{ padding: '54px 20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
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
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase' }}>
            Criar conta · 1/2
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: COLORS.white, fontWeight: 600 }}>
            Escolha seu plano
          </div>
        </div>
      </div>

      {/* Toggle mensal/anual */}
      <div style={{ margin: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: anual ? COLORS.dim : COLORS.white }}>Mensal</span>
        <div onClick={() => setAnual(!anual)} style={{
          width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
          background: anual ? COLORS.red : COLORS.line2,
          position: 'relative', transition: 'background 200ms',
        }}>
          <div style={{
            position: 'absolute', top: 3, left: anual ? 23 : 3,
            width: 18, height: 18, borderRadius: '50%', background: COLORS.white,
            transition: 'left 200ms',
          }} />
        </div>
        <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: anual ? COLORS.white : COLORS.dim }}>
          Anual <span style={{ color: COLORS.green }}>-26%</span>
        </span>
      </div>

      {/* Cards de plano */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Object.values(PLANOS).map(p => (
          <div key={p.id} onClick={() => setSelecionado(p.id)} style={{
            borderRadius: 16, padding: 16, cursor: 'pointer',
            background: selecionado === p.id ? p.corBg : 'rgba(240,244,248,0.02)',
            border: `1.5px solid ${selecionado === p.id ? p.cor : COLORS.line2}`,
            boxShadow: selecionado === p.id && p.id === 'pro' ? `0 0 24px ${COLORS.red}20` : 'none',
            transition: 'all 200ms', position: 'relative',
          }}>
            {p.badge && (
              <div style={{
                position: 'absolute', top: -10, right: 14,
                background: COLORS.red, color: COLORS.white,
                fontFamily: FONT_MONO, fontSize: 8, fontWeight: 700, letterSpacing: 1,
                padding: '3px 8px', borderRadius: 6,
              }}>{p.badge}</div>
            )}

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: COLORS.white, fontWeight: 700 }}>
                  {p.nome}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: p.cor, fontWeight: 700 }}>
                    {p.id === 'pro' && anual ? 'R$ 66' : p.preco}
                  </span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted }}>
                    {p.id === 'pro' && anual ? '/mês (cobrado anual)' : p.periodo}
                  </span>
                </div>
                {p.id === 'pro' && anual && (
                  <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.green, marginTop: 2 }}>
                    R$ 790/ano — economize R$ 278
                  </div>
                )}
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', marginTop: 4,
                border: `2px solid ${selecionado === p.id ? p.cor : COLORS.line2}`,
                background: selecionado === p.id ? p.cor : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 200ms',
              }}>
                {selecionado === p.id && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke={COLORS.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>

            {p.features.map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0',
                borderTop: i === 0 ? `0.5px solid ${COLORS.line}` : 'none',
              }}>
                <span style={{ fontSize: 12, color: f.ok ? COLORS.green : COLORS.dim }}>
                  {f.ok ? '✓' : '✕'}
                </span>
                <span style={{
                  fontFamily: FONT_SANS, fontSize: 12,
                  color: f.ok ? COLORS.white : COLORS.dim,
                }}>{f.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Botão continuar */}
      <div style={{ padding: '4px 20px 40px' }}>
        <button onClick={() => onSelect(selecionado, anual)} style={{
          width: '100%', background: COLORS.red, color: COLORS.white,
          border: 'none', borderRadius: 12, padding: '15px',
          fontFamily: FONT_MONO, fontSize: 12, letterSpacing: 1.8, fontWeight: 700,
          textTransform: 'uppercase', cursor: 'pointer',
          boxShadow: `0 6px 20px ${COLORS.red}40`,
        }}>
          Continuar com plano {selecionado === 'pro' ? 'Pro' : 'Free'} →
        </button>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim,
          textAlign: 'center', marginTop: 10, letterSpacing: 0.3,
        }}>
          {selecionado === 'pro'
            ? 'Cancele quando quiser · Sem taxa de cancelamento'
            : 'Sem necessidade de cartão de crédito'}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// TELA — CADASTRO
// ══════════════════════════════════════════════════
function CadastroScreen({ plano, anual, onSuccess, onBack }) {
  const [nome,     setNome]     = React.useState('');
  const [crbio,    setCrbio]    = React.useState('');
  const [email,    setEmail]    = React.useState('');
  const [senha,    setSenha]    = React.useState('');
  const [confirma, setConfirma] = React.useState('');
  const [loading,  setLoading]  = React.useState(false);
  const [erro,     setErro]     = React.useState(null);
  const [termos,   setTermos]   = React.useState(false);

  const p = PLANOS[plano] || PLANOS.free;

  const validar = () => {
    if (!nome.trim())           return 'Informe seu nome completo.';
    if (!crbio.trim())          return 'Informe seu registro profissional.';
    if (!email.includes('@'))   return 'E-mail inválido.';
    if (senha.length < 8)       return 'A senha deve ter no mínimo 8 caracteres.';
    if (senha !== confirma)     return 'As senhas não coincidem.';
    if (!termos)                return 'Aceite os termos de uso para continuar.';
    return null;
  };

  const handleCadastro = async () => {
    const err = validar();
    if (err) { setErro(err); return; }

    // Plano Pro: não cria conta agora — passa dados para a tela de pagamento.
    // A conta só é criada depois que o pagamento for confirmado.
    if (plano === 'pro') {
      onSuccess({ dadosCadastro: { nome, crbio, email, senha, plano } }, null);
      return;
    }

    // Plano Free: cria conta imediatamente
    setLoading(true);
    setErro(null);
    try {
      const data = await window.HemaAPI.cadastrar({ nome, crbio, email, senha, plano });
      onSuccess(data.user, data.access_token);
    } catch (e) {
      setErro(e.message || 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.bg, overflowY: 'auto' }}>
      <LabGrid opacity={0.03} />

      {/* Header */}
      <div style={{ padding: '54px 20px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
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
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase' }}>
            Criar conta · 2/2
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: COLORS.white, fontWeight: 600 }}>
            Seus dados
          </div>
        </div>
      </div>

      {/* Badge do plano selecionado */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: p.corBg, border: `0.5px solid ${p.cor}`,
          borderRadius: 10, padding: '8px 12px',
        }}>
          <CellIcon size={12} color={p.cor} />
          <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: p.cor, letterSpacing: 0.4 }}>
            Plano {p.nome} · {p.id === 'pro' ? (anual ? 'R$ 790/ano' : 'R$ 89/mês') : 'Gratuito'}
          </span>
        </div>
      </div>

      {/* Formulário */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Campo label="Nome completo"          value={nome}     onChange={setNome}     placeholder="Dr. João Silva" />
        <Campo label="Registro profissional"  value={crbio}    onChange={setCrbio}    placeholder="CRBM 12345 ou CRM 67890" />
        <Campo label="E-mail profissional"    value={email}    onChange={setEmail}    type="email" placeholder="dr@clinica.com.br" />
        <Campo label="Senha"                  value={senha}    onChange={setSenha}    type="password" placeholder="Mínimo 8 caracteres" />
        <Campo label="Confirmar senha"        value={confirma} onChange={setConfirma} type="password" placeholder="Repita a senha" />

        {/* Força da senha */}
        {senha.length > 0 && (
          <div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
              {[1,2,3,4].map(i => {
                const forca = senha.length >= 12 ? 4 : senha.length >= 10 ? 3 : senha.length >= 8 ? 2 : 1;
                const cor = forca >= 3 ? COLORS.green : forca === 2 ? COLORS.amber : COLORS.red;
                return (
                  <div key={i} style={{
                    flex: 1, height: 3, borderRadius: 2,
                    background: i <= forca ? cor : COLORS.line2,
                    transition: 'background 200ms',
                  }} />
                );
              })}
            </div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim }}>
              {senha.length >= 12 ? 'Senha forte' : senha.length >= 8 ? 'Senha razoável · adicione números e símbolos' : 'Senha fraca'}
            </div>
          </div>
        )}

        {/* Termos */}
        <div onClick={() => setTermos(!termos)} style={{
          display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer',
          padding: '10px 12px', borderRadius: 10,
          background: 'rgba(240,244,248,0.03)', border: `0.5px solid ${COLORS.line2}`,
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
            border: `1.5px solid ${termos ? COLORS.red : COLORS.line2}`,
            background: termos ? COLORS.red : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 180ms',
          }}>
            {termos && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke={COLORS.white} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, letterSpacing: 0.3, lineHeight: 1.5 }}>
            Concordo com os <span style={{ color: COLORS.white }}>Termos de Uso</span> e a{' '}
            <span style={{ color: COLORS.white }}>Política de Privacidade</span> · Dados protegidos por LGPD
          </div>
        </div>

        {/* Erro */}
        {erro && (
          <div style={{
            padding: '10px 12px', borderRadius: 8,
            background: 'rgba(192,57,43,0.1)', border: `0.5px solid ${COLORS.redBorder}`,
            fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red, letterSpacing: 0.4,
          }}>
            ⚠ {erro}
          </div>
        )}

        <button onClick={handleCadastro} disabled={loading} style={{
          width: '100%', background: loading ? 'rgba(192,57,43,0.5)' : COLORS.red,
          color: COLORS.white, border: 'none', borderRadius: 12, padding: '15px',
          fontFamily: FONT_MONO, fontSize: 12, letterSpacing: 1.8, fontWeight: 700,
          textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          marginBottom: 30,
        }}>
          {loading ? (
            <>
              <div style={{
                width: 14, height: 14, borderRadius: '50%',
                border: `2px solid rgba(255,255,255,0.3)`, borderTopColor: COLORS.white,
                animation: 'spin 0.8s linear infinite',
              }} />
              Criando conta...
            </>
          ) : plano === 'pro' ? 'Continuar para pagamento →' : 'Criar conta gratuita →'}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// TELA — RECUPERAÇÃO DE SENHA
// ══════════════════════════════════════════════════
function RecuperacaoSenhaScreen({ onBack }) {
  const [etapa,   setEtapa]   = React.useState(1); // 1 email, 2 codigo, 3 nova senha
  const [email,   setEmail]   = React.useState('');
  const [codigo,  setCodigo]  = React.useState('');
  const [senha,   setSenha]   = React.useState('');
  const [confirma,setConfirma]= React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [erro,    setErro]    = React.useState(null);

  const enviarEmail = async () => {
    if (!email.includes('@')) { setErro('E-mail inválido.'); return; }
    setLoading(true); setErro(null);
    try {
      await window.HemaAPI.recuperarSenha(email);
      setEtapa(2);
    } catch (e) {
      setErro(e.message || 'Erro ao enviar e-mail.');
    } finally {
      setLoading(false);
    }
  };

  const verificarCodigo = async () => {
    if (codigo.length < 6) { setErro('Código inválido.'); return; }
    setLoading(true); setErro(null);
    try {
      await window.HemaAPI.verificarCodigo(email, codigo);
      setEtapa(3);
    } catch (e) {
      setErro(e.message || 'Código incorreto.');
    } finally {
      setLoading(false);
    }
  };

  const redefinirSenha = async () => {
    if (senha.length < 8)     { setErro('Senha deve ter no mínimo 8 caracteres.'); return; }
    if (senha !== confirma)   { setErro('As senhas não coincidem.'); return; }
    setLoading(true); setErro(null);
    try {
      await window.HemaAPI.redefinirSenha(email, codigo, senha);
      setEtapa(4);
    } catch (e) {
      setErro(e.message || 'Erro ao redefinir senha.');
    } finally {
      setLoading(false);
    }
  };

  const titulos = ['', 'Recuperar acesso', 'Verifique seu e-mail', 'Nova senha', ''];

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.bg, overflow: 'hidden' }}>
      {/* Fundo microscópio */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '35%' }}>
        <MicroSlide seed={12} zoom={1.3} style={{ width: '100%', height: '100%', filter: 'blur(2px)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, rgba(6,13,26,0.5) 0%, ${COLORS.bg} 100%)`,
        }} />
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: '28%', padding: '20px 28px 30px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <button onClick={etapa < 4 ? (etapa === 1 ? onBack : () => { setEtapa(e => e-1); setErro(null); }) : onBack} style={{
            background: 'rgba(240,244,248,0.06)', border: `0.5px solid ${COLORS.line2}`,
            width: 36, height: 36, borderRadius: 10, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M14 6l-6 6 6 6" stroke={COLORS.white} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          <div>
            <Logo size={22} />
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: COLORS.white, fontWeight: 600, marginTop: 4 }}>
              {titulos[etapa]}
            </div>
          </div>
        </div>

        {/* Etapa 1 — E-mail */}
        {etapa === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, animation: 'fadeUp 300ms ease-out' }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.muted, lineHeight: 1.5 }}>
              Informe o e-mail da sua conta. Enviaremos um código de verificação.
            </div>
            <Campo label="E-mail" value={email} onChange={v => { setEmail(v); setErro(null); }} type="email" placeholder="dr@clinica.com.br" error={!!erro} />
            {erro && <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red }}>⚠ {erro}</div>}
            <button onClick={enviarEmail} disabled={loading} style={{
              background: COLORS.red, color: COLORS.white, border: 'none',
              borderRadius: 12, padding: '15px', fontFamily: FONT_MONO,
              fontSize: 12, letterSpacing: 1.8, fontWeight: 700, textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {loading ? <><div style={{ width:14, height:14, borderRadius:'50%', border:`2px solid rgba(255,255,255,0.3)`, borderTopColor: COLORS.white, animation:'spin 0.8s linear infinite' }} />Enviando...</> : 'Enviar código →'}
            </button>
          </div>
        )}

        {/* Etapa 2 — Código */}
        {etapa === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, animation: 'fadeUp 300ms ease-out' }}>
            <div style={{
              padding: 14, borderRadius: 12,
              background: 'rgba(76,175,124,0.08)', border: `0.5px solid rgba(76,175,124,0.3)`,
              fontFamily: FONT_SANS, fontSize: 13, color: COLORS.white, lineHeight: 1.5,
            }}>
              ✓ Código enviado para <b>{email}</b>. Verifique sua caixa de entrada.
            </div>
            <Campo label="Código de 6 dígitos" value={codigo} onChange={v => { setCodigo(v.replace(/\D/g,'').slice(0,6)); setErro(null); }} placeholder="000000" error={!!erro} />
            {erro && <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red }}>⚠ {erro}</div>}
            <button onClick={verificarCodigo} disabled={loading} style={{
              background: COLORS.red, color: COLORS.white, border: 'none',
              borderRadius: 12, padding: '15px', fontFamily: FONT_MONO,
              fontSize: 12, letterSpacing: 1.8, fontWeight: 700, textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {loading ? <><div style={{ width:14, height:14, borderRadius:'50%', border:`2px solid rgba(255,255,255,0.3)`, borderTopColor: COLORS.white, animation:'spin 0.8s linear infinite' }} />Verificando...</> : 'Verificar código →'}
            </button>
            <div onClick={() => enviarEmail()} style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, textAlign: 'center', cursor: 'pointer', letterSpacing: 0.3 }}>
              Não recebeu? <span style={{ color: COLORS.white }}>Reenviar código</span>
            </div>
          </div>
        )}

        {/* Etapa 3 — Nova senha */}
        {etapa === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, animation: 'fadeUp 300ms ease-out' }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.muted, lineHeight: 1.5 }}>
              Crie uma nova senha para sua conta.
            </div>
            <Campo label="Nova senha"        value={senha}    onChange={v => { setSenha(v);    setErro(null); }} type="password" placeholder="Mínimo 8 caracteres" error={!!erro} />
            <Campo label="Confirmar senha"   value={confirma} onChange={v => { setConfirma(v); setErro(null); }} type="password" placeholder="Repita a nova senha"  error={!!erro} />
            {erro && <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red }}>⚠ {erro}</div>}
            <button onClick={redefinirSenha} disabled={loading} style={{
              background: COLORS.red, color: COLORS.white, border: 'none',
              borderRadius: 12, padding: '15px', fontFamily: FONT_MONO,
              fontSize: 12, letterSpacing: 1.8, fontWeight: 700, textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {loading ? <><div style={{ width:14, height:14, borderRadius:'50%', border:`2px solid rgba(255,255,255,0.3)`, borderTopColor: COLORS.white, animation:'spin 0.8s linear infinite' }} />Salvando...</> : 'Salvar nova senha →'}
            </button>
          </div>
        )}

        {/* Etapa 4 — Sucesso */}
        {etapa === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', textAlign: 'center', animation: 'fadeUp 300ms ease-out' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(76,175,124,0.15)', border: `2px solid ${COLORS.green}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
            }}>✓</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: COLORS.white, fontWeight: 600 }}>
              Senha redefinida!
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.muted, lineHeight: 1.5 }}>
              Sua senha foi alterada com sucesso. Faça login com a nova senha.
            </div>
            <button onClick={onBack} style={{
              width: '100%', background: COLORS.red, color: COLORS.white, border: 'none',
              borderRadius: 12, padding: '15px', fontFamily: FONT_MONO,
              fontSize: 12, letterSpacing: 1.8, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer',
            }}>
              Fazer login →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// MODAL — Upgrade (aparece para usuários Free)
// ══════════════════════════════════════════════════
function UpgradeModal({ feature, onClose, onUpgrade }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(6,13,26,0.92)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'flex-end',
      animation: 'fadeIn 200ms ease-out',
    }}>
      <div style={{
        width: '100%', background: COLORS.bg2,
        border: `0.5px solid ${COLORS.line2}`,
        borderRadius: '20px 20px 0 0', padding: '24px 20px 40px',
        animation: 'fadeUp 300ms ease-out',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.red, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 4 }}>
              🔒 Recurso Pro
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: COLORS.white, fontWeight: 600 }}>
              {feature}
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(240,244,248,0.06)', border: `0.5px solid ${COLORS.line2}`,
            width: 32, height: 32, borderRadius: 8, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: COLORS.muted, fontSize: 16,
          }}>✕</button>
        </div>

        <div style={{
          padding: 14, borderRadius: 12, marginBottom: 16,
          background: 'rgba(192,57,43,0.08)', border: `0.5px solid ${COLORS.redBorder}`,
          fontFamily: FONT_SANS, fontSize: 13, color: COLORS.muted, lineHeight: 1.5,
        }}>
          Seu plano <b style={{ color: COLORS.white }}>Free</b> não inclui este recurso. Faça upgrade para o plano{' '}
          <b style={{ color: COLORS.red }}>Pro</b> por apenas <b style={{ color: COLORS.white }}>R$ 89/mês</b>.
        </div>

        {PLANOS.pro.features.filter(f => f.ok).map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
            <span style={{ color: COLORS.green, fontSize: 12 }}>✓</span>
            <span style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.white }}>{f.label}</span>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          <button onClick={onClose} style={{
            flex: 1, background: 'transparent', color: COLORS.muted,
            border: `0.5px solid ${COLORS.line2}`, borderRadius: 12, padding: '14px',
            fontFamily: FONT_MONO, fontSize: 11, cursor: 'pointer',
          }}>
            Agora não
          </button>
          <button onClick={onUpgrade} style={{
            flex: 2, background: COLORS.red, color: COLORS.white,
            border: 'none', borderRadius: 12, padding: '14px',
            fontFamily: FONT_MONO, fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
            textTransform: 'uppercase', cursor: 'pointer',
            boxShadow: `0 0 20px ${COLORS.red}40`,
          }}>
            Fazer upgrade Pro →
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// TELA — PAGAMENTO (coleta CPF + chama Asaas)
// ══════════════════════════════════════════════════
function PagamentoScreen({ plano, anual, user, token, onSucesso, onBack }) {
  const [cpf,      setCpf]      = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  const [loading,  setLoading]  = React.useState(false);
  const [erro,     setErro]     = React.useState(null);
  const [etapa,    setEtapa]    = React.useState(1); // 1 = form | 2 = link gerado

  // Resultado do Asaas
  const [linkPagamento,    setLinkPagamento]    = React.useState(null);
  const [subscriptionId,   setSubscriptionId]   = React.useState(null);
  const [verificando,      setVerificando]      = React.useState(false);

  const valor  = anual ? 'R$ 790,00/ano' : 'R$ 89,00/mês';
  const p      = PLANOS.pro;

  // Formata CPF enquanto digita
  const formatarCpf = (v) => {
    const n = v.replace(/\D/g, '').slice(0, 14);
    if (n.length <= 11) {
      return n.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
               .replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
               .replace(/(\d{3})(\d{0,3})/, '$1.$2');
    }
    return n.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const formatarTel = (v) => {
    const n = v.replace(/\D/g, '').slice(0, 11);
    return n.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
             .replace(/(\d{2})(\d{4,5})/, '($1) $2');
  };

  const handleAssinar = async () => {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length < 11) { setErro('Informe um CPF ou CNPJ válido.'); return; }
    setLoading(true); setErro(null);

    // Se não tiver token (novo usuário), pula chamada à API do Asaas
    // e vai direto para a etapa de link simulado — a conta é criada após confirmar
    if (!token) {
      await new Promise(r => setTimeout(r, 800)); // simula loading
      setLinkPagamento('https://sandbox.asaas.com/c/sandbox_demo');
      setSubscriptionId('sub_demo_' + Date.now());
      setEtapa(2);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${window.HemaAPI.base}/billing/assinar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          periodo: anual ? 'anual' : 'mensal',
          cpf_cnpj: cpfLimpo,
          telefone: telefone.replace(/\D/g, '') || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Erro ao criar assinatura.');
      setLinkPagamento(data.link_pagamento);
      setSubscriptionId(data.subscription_id);
      setEtapa(2);
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Verifica se o pagamento foi confirmado
  const verificarPagamento = async () => {
    setVerificando(true);
    try {
      const res = await fetch(`${window.HemaAPI.base}/billing/status`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.plano === 'pro') {
        onSucesso();
      } else {
        setErro('Pagamento ainda não confirmado. Aguarde alguns segundos e tente novamente.');
      }
    } catch {
      setErro('Não foi possível verificar. Tente novamente.');
    } finally {
      setVerificando(false);
    }
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.bg, overflowY: 'auto' }}>
      <LabGrid opacity={0.03} />

      {/* Header */}
      <div style={{ padding: '54px 20px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onBack} disabled={etapa === 2} style={{
          background: 'rgba(240,244,248,0.06)', border: `0.5px solid ${COLORS.line2}`,
          width: 36, height: 36, borderRadius: 10, cursor: etapa === 2 ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: etapa === 2 ? 0.4 : 1,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M14 6l-6 6 6 6" stroke={COLORS.white} strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase' }}>
            {etapa === 1 ? 'Pagamento · 1/2' : 'Pagamento · 2/2'}
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: COLORS.white, fontWeight: 600 }}>
            {etapa === 1 ? 'Confirmar assinatura' : 'Finalizar pagamento'}
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 4, padding: '0 20px', marginBottom: 20 }}>
        {[1, 2].map(n => (
          <div key={n} style={{
            flex: 1, height: 2, borderRadius: 2,
            background: n <= etapa ? COLORS.red : COLORS.line2,
            boxShadow: n <= etapa ? `0 0 6px ${COLORS.red}80` : 'none',
            transition: 'all 300ms',
          }} />
        ))}
      </div>

      {/* ── ETAPA 1: Formulário ── */}
      {etapa === 1 && (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16, animation: 'fadeUp 300ms ease-out' }}>

          {/* Resumo do plano */}
          <div style={{
            padding: 16, borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(192,57,43,0.1), rgba(192,57,43,0.04))',
            border: `1px solid ${COLORS.redBorder}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: COLORS.white, fontWeight: 700 }}>
                  Plano Pro
                </div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, marginTop: 2 }}>
                  {anual ? 'Cobrança anual — economize 26%' : 'Cobrança mensal'}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: COLORS.red, fontWeight: 700 }}>
                  {anual ? 'R$ 790' : 'R$ 89'}
                </div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.muted, textAlign: 'right' }}>
                  {anual ? '/ano' : '/mês'}
                </div>
              </div>
            </div>
            <div style={{ borderTop: `0.5px solid ${COLORS.line2}`, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {p.features.filter(f => f.ok).map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT_SANS, fontSize: 12, color: COLORS.muted }}>
                  <span style={{ color: COLORS.green }}>✓</span> {f.label}
                </div>
              ))}
            </div>
          </div>

          {/* Campo CPF/CNPJ */}
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 6 }}>
              CPF ou CNPJ *
            </div>
            <input
              value={cpf}
              onChange={e => { setCpf(formatarCpf(e.target.value)); setErro(null); }}
              placeholder="000.000.000-00"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(240,244,248,0.04)',
                border: `1px solid ${COLORS.line2}`,
                borderRadius: 10, padding: '13px 14px',
                fontFamily: FONT_MONO, fontSize: 14, color: COLORS.white,
                outline: 'none', letterSpacing: 1,
              }}
            />
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, marginTop: 5, letterSpacing: 0.3 }}>
              Necessário para emissão de nota fiscal
            </div>
          </div>

          {/* Campo Telefone */}
          <div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 6 }}>
              WhatsApp (opcional)
            </div>
            <input
              value={telefone}
              onChange={e => { setTelefone(formatarTel(e.target.value)); }}
              placeholder="(11) 99999-9999"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(240,244,248,0.04)',
                border: `1px solid ${COLORS.line2}`,
                borderRadius: 10, padding: '13px 14px',
                fontFamily: FONT_MONO, fontSize: 14, color: COLORS.white,
                outline: 'none', letterSpacing: 1,
              }}
            />
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, marginTop: 5, letterSpacing: 0.3 }}>
              Para receber lembretes de cobrança via WhatsApp
            </div>
          </div>

          {/* Métodos aceitos */}
          <div style={{
            padding: '10px 14px', borderRadius: 10,
            background: 'rgba(240,244,248,0.03)', border: `0.5px solid ${COLORS.line2}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 0.4 }}>Aceitos:</div>
            {['💳 Cartão', '🏦 Boleto', '⚡ Pix'].map((m, i) => (
              <div key={i} style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted }}>{m}</div>
            ))}
          </div>

          {erro && (
            <div style={{
              padding: '10px 12px', borderRadius: 8,
              background: 'rgba(192,57,43,0.1)', border: `0.5px solid ${COLORS.redBorder}`,
              fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red,
            }}>⚠ {erro}</div>
          )}

          <button onClick={handleAssinar} disabled={loading} style={{
            width: '100%', background: loading ? 'rgba(192,57,43,0.4)' : COLORS.red,
            color: COLORS.white, border: 'none', borderRadius: 12, padding: '15px',
            fontFamily: FONT_MONO, fontSize: 12, letterSpacing: 1.8, fontWeight: 700,
            textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginBottom: 8,
          }}>
            {loading ? (
              <>
                <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: COLORS.white, animation: 'spin 0.8s linear infinite' }} />
                Gerando link de pagamento...
              </>
            ) : `Ir para pagamento — ${valor} →`}
          </button>

          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, textAlign: 'center', letterSpacing: 0.3 }}>
            🔒 Pagamento seguro via Asaas · Cancele quando quiser
          </div>
        </div>
      )}

      {/* ── ETAPA 2: Link gerado ── */}
      {etapa === 2 && (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16, animation: 'fadeUp 300ms ease-out' }}>

          {/* Success icon */}
          <div style={{ textAlign: 'center', padding: '20px 0 10px' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(76,175,124,0.15)', border: `2px solid ${COLORS.green}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, margin: '0 auto 16px',
            }}>🔗</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: COLORS.white, fontWeight: 600 }}>
              Link gerado com sucesso!
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.muted, marginTop: 8, lineHeight: 1.5 }}>
              Clique no botão abaixo para acessar a página de pagamento segura do Asaas.
            </div>
          </div>

          {/* Resumo */}
          <div style={{
            padding: '14px 16px', borderRadius: 12,
            background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim }}>PLANO</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.white }}>Pro {anual ? 'Anual' : 'Mensal'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim }}>VALOR</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red, fontWeight: 700 }}>{valor}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim }}>STATUS</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.amber }}>Aguardando pagamento</span>
            </div>
          </div>

          {/* Botão principal — abre link do Asaas */}
          {linkPagamento && (
            <a href={linkPagamento} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: COLORS.red, color: COLORS.white,
              textDecoration: 'none', borderRadius: 12, padding: '16px',
              fontFamily: FONT_MONO, fontSize: 12, letterSpacing: 1.8, fontWeight: 700,
              textTransform: 'uppercase',
              boxShadow: `0 4px 20px ${COLORS.red}50`,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke={COLORS.white} strokeWidth="2" strokeLinecap="round"/>
                <path d="M15 3h6v6M10 14L21 3" stroke={COLORS.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Pagar agora — Asaas
            </a>
          )}

          {/* Verificar pagamento */}
          <button onClick={verificarPagamento} disabled={verificando} style={{
            width: '100%', background: 'transparent', color: COLORS.white,
            border: `0.5px solid ${COLORS.line2}`, borderRadius: 12, padding: '14px',
            fontFamily: FONT_MONO, fontSize: 11, letterSpacing: 1.2, fontWeight: 600,
            textTransform: 'uppercase', cursor: verificando ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {verificando ? (
              <>
                <div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: COLORS.white, animation: 'spin 0.8s linear infinite' }} />
                Verificando...
              </>
            ) : '✓ Já paguei — verificar'}
          </button>

          {erro && (
            <div style={{
              padding: '10px 12px', borderRadius: 8,
              background: 'rgba(192,57,43,0.1)', border: `0.5px solid ${COLORS.redBorder}`,
              fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red,
            }}>⚠ {erro}</div>
          )}

          {/* Info */}
          <div style={{
            padding: '12px 14px', borderRadius: 10,
            background: 'rgba(59,126,168,0.08)', border: `0.5px solid rgba(59,126,168,0.25)`,
            fontFamily: FONT_MONO, fontSize: 9, color: COLORS.muted, letterSpacing: 0.3, lineHeight: 1.6,
          }}>
            <span style={{ color: '#5B9ED1' }}>ⓘ</span>{' '}
            Após o pagamento, clique em <b style={{ color: COLORS.white }}>"Já paguei — verificar"</b>.
            A confirmação por cartão é imediata. Boleto pode levar até 1 dia útil.
          </div>

          {/* Pular para Free */}
          <div
            onClick={onSucesso}
            style={{
              fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim,
              textAlign: 'center', cursor: 'pointer', letterSpacing: 0.3,
              paddingBottom: 20,
            }}
          >
            Continuar com plano Free por enquanto
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

window.HemaScreens3 = { EscolhaPlanoScreen, CadastroScreen, RecuperacaoSenhaScreen, UpgradeModal, PagamentoScreen };
