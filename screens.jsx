// screens.jsx — Login + Home conectados ao backend
const { COLORS, FONT_DISPLAY, FONT_MONO, FONT_SANS, MicroSlide, Logo, CellIcon, LabGrid, Coords } = window.Hema;

// ══════════════════════════════════════════════════
// SCREEN 1 — LOGIN (conectado ao backend)
// ══════════════════════════════════════════════════
// ──────────────────────────────────────────────────
// Modal Termos / LGPD
// ──────────────────────────────────────────────────
function ModalDocumento({ tipo, onClose }) {
  const scrollRef = React.useRef();
  const [lido, setLido] = React.useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) setLido(true);
  };

  const isTermos = tipo === 'termos';
  const titulo = isTermos ? 'Termos de Uso' : 'Política de Privacidade (LGPD)';

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: 'rgba(6,13,26,0.96)', backdropFilter: 'blur(16px)',
      display: 'flex', flexDirection: 'column',
      animation: 'fadeIn 200ms ease-out',
    }}>
      {/* Header */}
      <div style={{
        padding: '52px 20px 14px', display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: `0.5px solid ${COLORS.line2}`, flexShrink: 0,
      }}>
        <button onClick={onClose} style={{
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
            {isTermos ? 'Documento legal' : 'LGPD · Lei 13.709/2018'}
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: COLORS.white, fontWeight: 600 }}>{titulo}</div>
        </div>
      </div>

      {/* Conteúdo */}
      <div ref={scrollRef} onScroll={handleScroll} style={{
        flex: 1, overflowY: 'auto', padding: '20px 22px',
        fontFamily: FONT_SANS, fontSize: 13, color: COLORS.muted, lineHeight: 1.75,
      }}>
        {isTermos ? <ConteudoTermos /> : <ConteudoLGPD />}
        <div style={{ height: 40 }} />
      </div>

      {/* Rodapé */}
      <div style={{
        padding: '14px 20px 32px', borderTop: `0.5px solid ${COLORS.line2}`,
        flexShrink: 0, background: COLORS.bg2,
      }}>
        {!lido && (
          <div style={{
            fontFamily: FONT_MONO, fontSize: 9, color: COLORS.amber,
            letterSpacing: 0.4, marginBottom: 10, textAlign: 'center',
          }}>
            ↓ Role até o final para confirmar a leitura
          </div>
        )}
        <button onClick={onClose} disabled={!lido} style={{
          width: '100%', background: lido ? COLORS.red : 'rgba(192,57,43,0.3)',
          color: COLORS.white, border: 'none', borderRadius: 12, padding: '14px',
          fontFamily: FONT_MONO, fontSize: 11, letterSpacing: 1.6, fontWeight: 700,
          textTransform: 'uppercase', cursor: lido ? 'pointer' : 'not-allowed',
          transition: 'background 300ms',
        }}>
          {lido ? 'Entendi e concordo ✓' : 'Leia o documento completo'}
        </button>
      </div>
    </div>
  );
}

function SecaoDoc({ titulo, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{
        fontFamily: FONT_MONO, fontSize: 9, color: COLORS.red,
        letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 8,
      }}>{titulo}</div>
      <div style={{ color: COLORS.muted }}>{children}</div>
    </div>
  );
}

function ConteudoTermos() {
  return (
    <div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 0.4, marginBottom: 20 }}>
        Última atualização: Abril de 2026 · Versão 1.0
      </div>

      <SecaoDoc titulo="1. Aceitação dos Termos">
        Ao acessar ou utilizar o Hematolog.IA, você concorda com estes Termos de Uso.
        Se não concordar com qualquer parte, não utilize o serviço. O uso continuado
        após alterações constitui aceitação das novas condições.
      </SecaoDoc>

      <SecaoDoc titulo="2. Descrição do Serviço">
        O Hematolog.IA é uma plataforma de apoio diagnóstico hematológico baseada em
        inteligência artificial, destinada exclusivamente a profissionais de saúde
        habilitados (biomédicos, hematologistas, analistas clínicos). <br/><br/>
        <span style={{ color: COLORS.amber }}>
          ⚠ O serviço é uma ferramenta de apoio e segunda opinião. Não substitui
          o julgamento clínico profissional nem laudos oficiais.
        </span>
      </SecaoDoc>

      <SecaoDoc titulo="3. Elegibilidade">
        O acesso é restrito a profissionais de saúde com registro válido no CRBM, CRM
        ou conselho equivalente. Ao se cadastrar, você declara possuir habilitação
        profissional e ser responsável pelo uso das informações geradas pela plataforma.
      </SecaoDoc>

      <SecaoDoc titulo="4. Uso Permitido">
        Você pode utilizar o Hematolog.IA para: (i) análise de esfregaços sanguíneos;
        (ii) consulta à assistente Hema; (iii) participação na comunidade profissional;
        (iv) exportação de laudos para fins clínicos. É vedado qualquer uso para fins
        não clínicos, comercialização de dados ou acesso automatizado sem autorização.
      </SecaoDoc>

      <SecaoDoc titulo="5. Responsabilidade pelo Conteúdo">
        Imagens, casos clínicos e informações publicadas na comunidade são de
        responsabilidade exclusiva do usuário que as publicou. O Hematolog.IA não
        se responsabiliza por diagnósticos baseados exclusivamente nas sugestões da IA.
        Toda decisão clínica deve ser validada pelo profissional responsável.
      </SecaoDoc>

      <SecaoDoc titulo="6. Propriedade Intelectual">
        Todo o conteúdo da plataforma (interface, algoritmos, marca, textos) é de
        propriedade do Hematolog.IA. O conteúdo gerado pelo usuário (posts, comentários,
        imagens) permanece de sua propriedade, sendo concedida licença de uso à plataforma
        para exibição na comunidade.
      </SecaoDoc>

      <SecaoDoc titulo="7. Planos e Pagamentos">
        O plano Pro é cobrado mensalmente ou anualmente conforme contratado. O cancelamento
        pode ser realizado a qualquer momento sem multa, com acesso mantido até o fim
        do período pago. Não há reembolso de períodos parciais, exceto conforme o
        Código de Defesa do Consumidor (Lei 8.078/90).
      </SecaoDoc>

      <SecaoDoc titulo="8. Limitação de Responsabilidade">
        O Hematolog.IA não garante que os resultados da IA sejam livres de erros.
        A plataforma não se responsabiliza por danos decorrentes do uso indevido das
        análises geradas. O usuário assume integral responsabilidade pelas decisões
        clínicas tomadas com base nas sugestões da plataforma.
      </SecaoDoc>

      <SecaoDoc titulo="9. Modificações e Encerramento">
        Reservamo-nos o direito de modificar, suspender ou encerrar o serviço a qualquer
        momento, com aviso prévio de 30 dias para usuários ativos. Alterações materiais
        nos termos serão comunicadas por e-mail.
      </SecaoDoc>

      <SecaoDoc titulo="10. Foro e Legislação">
        Estes termos são regidos pelas leis brasileiras. Fica eleito o foro da Comarca
        de São Paulo/SP para dirimir quaisquer controvérsias, com renúncia expressa
        a qualquer outro, por mais privilegiado que seja.
      </SecaoDoc>

      <div style={{
        padding: '16px', borderRadius: 10, marginTop: 8,
        background: 'rgba(76,175,124,0.08)', border: `0.5px solid rgba(76,175,124,0.3)`,
        fontFamily: FONT_MONO, fontSize: 9, color: COLORS.green, letterSpacing: 0.4,
      }}>
        Dúvidas? Contato: juridico@hematologia.app
      </div>
    </div>
  );
}

function ConteudoLGPD() {
  return (
    <div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 0.4, marginBottom: 20 }}>
        Última atualização: Abril de 2026 · Lei 13.709/2018
      </div>

      <SecaoDoc titulo="1. Controlador dos Dados">
        O Hematolog.IA, CNPJ XX.XXX.XXX/0001-XX, é o controlador dos dados pessoais
        coletados nesta plataforma, conforme a Lei Geral de Proteção de Dados (LGPD —
        Lei 13.709/2018). Encarregado (DPO): dpo@hematologia.app
      </SecaoDoc>

      <SecaoDoc titulo="2. Dados Coletados">
        <span style={{ color: COLORS.white, fontWeight: 600 }}>Dados de identificação:</span> nome completo,
        e-mail, registro profissional (CRBM/CRM), estado, especialidade.<br/><br/>
        <span style={{ color: COLORS.white, fontWeight: 600 }}>Dados de uso:</span> imagens enviadas para análise,
        histórico de análises, conversas com a Hema, posts e comentários na comunidade.<br/><br/>
        <span style={{ color: COLORS.white, fontWeight: 600 }}>Dados técnicos:</span> endereço IP, tipo de
        dispositivo, logs de acesso.<br/><br/>
        <span style={{ color: COLORS.amber }}>
          ⚠ Imagens de esfregaços devem ser anonimizadas antes do upload.
          Não envie imagens que identifiquem diretamente o paciente.
        </span>
      </SecaoDoc>

      <SecaoDoc titulo="3. Finalidade e Base Legal">
        Seus dados são tratados para: (i) prestação do serviço contratado — base legal:
        execução de contrato (Art. 7º, V); (ii) melhoria dos algoritmos de IA —
        base legal: legítimo interesse, com dados anonimizados (Art. 7º, IX);
        (iii) comunicações sobre o serviço — base legal: legítimo interesse (Art. 7º, IX);
        (iv) cumprimento de obrigações legais (Art. 7º, II).
      </SecaoDoc>

      <SecaoDoc titulo="4. Compartilhamento de Dados">
        Seus dados <span style={{ color: COLORS.white }}>não são vendidos</span> a terceiros.
        Podemos compartilhá-los com: (i) Anthropic (processamento das análises de IA,
        conforme Privacy Policy da Anthropic); (ii) provedores de infraestrutura
        (AWS/Cloudflare, com contrato de proteção de dados); (iii) autoridades quando
        exigido por lei.
      </SecaoDoc>

      <SecaoDoc titulo="5. Retenção dos Dados">
        Dados de conta: mantidos enquanto a conta estiver ativa + 5 anos após encerramento
        (obrigação legal). Imagens de análise: 2 anos ou até solicitação de exclusão.
        Logs de acesso: 6 meses (Marco Civil da Internet).
      </SecaoDoc>

      <SecaoDoc titulo="6. Seus Direitos (Art. 18 LGPD)">
        Você tem direito a: confirmar a existência de tratamento · acessar seus dados ·
        corrigir dados incompletos · anonimizar ou bloquear dados desnecessários ·
        portabilidade · excluir dados tratados com consentimento · revogar consentimento ·
        ser informado sobre compartilhamentos.<br/><br/>
        Para exercer seus direitos: privacidade@hematologia.app ou pelo menu
        Perfil → Privacidade LGPD no app.
      </SecaoDoc>

      <SecaoDoc titulo="7. Segurança">
        Adotamos medidas técnicas e organizacionais para proteger seus dados:
        criptografia em trânsito (TLS 1.3) e em repouso (AES-256), controle de acesso
        por função, backups criptografados, logs de auditoria e política de senhas fortes.
        Em caso de incidente, notificaremos a ANPD e os titulares afetados no prazo legal.
      </SecaoDoc>

      <SecaoDoc titulo="8. Cookies e Rastreamento">
        Utilizamos apenas cookies estritamente necessários para autenticação e segurança.
        Não utilizamos cookies de rastreamento, publicidade ou analytics de terceiros.
      </SecaoDoc>

      <SecaoDoc titulo="9. Transferência Internacional">
        O processamento de imagens pelo modelo de IA (Anthropic) pode envolver
        transferência internacional de dados anonimizados para os EUA. A Anthropic
        adota cláusulas contratuais padrão compatíveis com a LGPD.
      </SecaoDoc>

      <SecaoDoc titulo="10. Contato e Reclamações">
        DPO/Encarregado: dpo@hematologia.app<br/>
        Você pode também registrar reclamações na ANPD (anpd.gov.br).
      </SecaoDoc>

      <div style={{
        padding: '16px', borderRadius: 10, marginTop: 8,
        background: 'rgba(59,126,168,0.1)', border: `0.5px solid rgba(59,126,168,0.3)`,
        fontFamily: FONT_MONO, fontSize: 9, color: '#5B9ED1', letterSpacing: 0.4, lineHeight: 1.6,
      }}>
        Este documento foi elaborado em conformidade com a Lei 13.709/2018 (LGPD),
        o Marco Civil da Internet (Lei 12.965/2014) e as diretrizes da ANPD.
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────
// LOGIN SCREEN
// ──────────────────────────────────────────────────
function LoginScreen({ onLogin, onCriarConta, onRecuperarSenha }) {
  const [crbio,    setCrbio]    = React.useState('');
  const [email,    setEmail]    = React.useState('');
  const [password, setPassword] = React.useState('');
  const [focus,    setFocus]    = React.useState(null);
  const [loading,  setLoading]  = React.useState(false);
  const [error,    setError]    = React.useState(null);
  const [termos,   setTermos]   = React.useState(false);
  const [modalDoc, setModalDoc] = React.useState(null); // null | 'termos' | 'lgpd'

  const field = (label, val, setter, key, type = 'text', placeholder = '') => (
    <div>
      <div style={{
        fontFamily: FONT_MONO, fontSize: 9, letterSpacing: 1.4,
        color: focus === key ? COLORS.red : error ? 'rgba(192,57,43,0.7)' : COLORS.dim,
        textTransform: 'uppercase', marginBottom: 6, transition: 'color 180ms',
      }}>{label}</div>
      <input
        type={type} value={val} placeholder={placeholder}
        onChange={e => { setter(e.target.value); setError(null); }}
        onFocus={() => setFocus(key)} onBlur={() => setFocus(null)}
        style={{
          width: '100%', boxSizing: 'border-box',
          background: 'rgba(240,244,248,0.04)',
          border: `1px solid ${focus === key ? COLORS.redBorder : error ? 'rgba(192,57,43,0.4)' : COLORS.line2}`,
          borderRadius: 10, padding: '13px 14px',
          fontFamily: FONT_MONO, fontSize: 13, color: COLORS.white,
          outline: 'none', transition: 'all 180ms',
          boxShadow: focus === key ? `0 0 0 3px ${COLORS.redDim}` : 'none',
        }}
      />
    </div>
  );

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Preencha todos os campos.');
      return;
    }
    if (!termos) {
      setError('Aceite os Termos de Uso e a Política de Privacidade para continuar.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await window.HemaAPI.login(crbio, email, password);
      onLogin(data.user, data.access_token);
    } catch (e) {
      setError(e.message || 'Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.bg, overflow: 'hidden' }}>
      {/* Top half: microscope imagery + app icon */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '45%' }}>
        <MicroSlide seed={7} zoom={1.4} style={{ width: '100%', height: '100%', filter: 'blur(1.5px)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, rgba(6,13,26,0.3) 0%, rgba(6,13,26,0.7) 60%, ${COLORS.bg} 100%)`,
        }} />
        <Coords label="XY · 042.18 / 017.54" style={{ position: 'absolute', top: 58, left: 20 }} />
        <Coords label="MAG · 1000×"            style={{ position: 'absolute', top: 58, right: 20 }} />
        <div style={{
          position: 'absolute', left: 0, right: 0, top: '50%',
          height: 1, background: `linear-gradient(90deg, transparent, ${COLORS.red}80, transparent)`,
          animation: 'scan 3.5s ease-in-out infinite',
        }} />
        {/* App icon centralizado no topo */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -68%)',
          animation: 'fadeUp 600ms ease-out',
        }}>
          <div style={{
            width: 90, height: 90, borderRadius: 22,
            background: 'linear-gradient(145deg, #0F1E35, #060D1A)',
            border: `1px solid rgba(240,244,248,0.12)`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(192,57,43,0.3), 0 0 40px rgba(192,57,43,0.15)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
              <rect x="10" y="6"  width="10" height="52" fill="#F0F4F8"/>
              <rect x="44" y="6"  width="10" height="52" fill="#F0F4F8"/>
              <path d="M4 42 L60 22 L60 31 L4 51 Z" fill="#C0392B"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Login form */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, top: '38%',
        padding: '20px 28px 30px',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div style={{ animation: 'fadeUp 700ms ease-out' }}>
          {/* Só o wordmark — sem o ícone H na frente */}
          <div style={{
            fontFamily: "'Archivo', sans-serif", fontWeight: 900,
            fontSize: 30, color: COLORS.white,
            letterSpacing: 1, textTransform: 'uppercase', lineHeight: 1,
          }}>
            HEMATOLOG<span style={{ color: COLORS.red }}>.IA</span>
          </div>
          <div style={{
            fontFamily: FONT_MONO, fontSize: 11, color: COLORS.muted,
            marginTop: 10, letterSpacing: 0.4, lineHeight: 1.5, maxWidth: 280,
          }}>
            A IA que enxerga o que o olho treina para ver.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
          {field('Registro profissional', crbio, setCrbio, 'crbio', 'text', 'Ex: CRBM6 1698 · CRM6 12345 · CF-RS 1234')}
          {field('E-mail', email, setEmail, 'email', 'email', 'seu@email.com')}
          {field('Senha', password, setPassword, 'pass', 'password', '••••••••')}
        </div>

        {/* Checkbox LGPD */}
        <div onClick={() => setTermos(!termos)} style={{
          display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer',
          padding: '10px 12px', borderRadius: 10,
          background: termos ? 'rgba(76,175,124,0.06)' : 'rgba(240,244,248,0.03)',
          border: `0.5px solid ${termos ? 'rgba(76,175,124,0.3)' : COLORS.line2}`,
          transition: 'all 200ms',
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
            border: `1.5px solid ${termos ? COLORS.green : COLORS.line2}`,
            background: termos ? COLORS.green : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 180ms',
          }}>
            {termos && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke={COLORS.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, letterSpacing: 0.3, lineHeight: 1.55 }}>
            Li e aceito os{' '}
            <span
              onClick={e => { e.stopPropagation(); setModalDoc('termos'); }}
              style={{ color: COLORS.white, textDecoration: 'underline', cursor: 'pointer' }}
            >Termos de Uso</span>
            {' '}e a{' '}
            <span
              onClick={e => { e.stopPropagation(); setModalDoc('lgpd'); }}
              style={{ color: COLORS.white, textDecoration: 'underline', cursor: 'pointer' }}
            >Política de Privacidade (LGPD)</span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            padding: '10px 12px', borderRadius: 8,
            background: 'rgba(192,57,43,0.1)', border: `0.5px solid ${COLORS.redBorder}`,
            fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red, letterSpacing: 0.4,
            animation: 'fadeUp 200ms ease-out',
          }}>
            ⚠ {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            marginTop: 4, background: loading ? 'rgba(192,57,43,0.5)' : COLORS.red,
            color: COLORS.white, border: 'none', padding: '15px', borderRadius: 12,
            fontFamily: FONT_MONO, fontSize: 12, letterSpacing: 2,
            fontWeight: 600, textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
            animation: loading ? 'none' : 'pulse 2.4s ease-in-out infinite',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'background 200ms',
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: 14, height: 14, borderRadius: '50%',
                border: `2px solid rgba(255,255,255,0.3)`,
                borderTopColor: COLORS.white,
                animation: 'spin 0.8s linear infinite',
              }} />
              Autenticando...
            </>
          ) : 'Entrar no sistema'}
        </button>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, letterSpacing: 0.4,
        }}>
          <span onClick={onCriarConta} style={{ cursor: 'pointer', color: COLORS.white }}>Criar conta</span>
          <span onClick={onRecuperarSenha} style={{ cursor: 'pointer' }}>Esqueci minha senha</span>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 12px', border: `0.5px solid ${COLORS.line2}`,
          borderRadius: 10, marginTop: 4,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" stroke={COLORS.green} strokeWidth="1.6"/>
            <path d="M8 12l3 3 5-6" stroke={COLORS.green} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{
            fontFamily: FONT_MONO, fontSize: 9, color: COLORS.muted,
            letterSpacing: 0.3, lineHeight: 1.4,
          }}>
            Dados clínicos protegidos · <span style={{ color: COLORS.white }}>criptografia end-to-end</span> · LGPD
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Modal Termos / LGPD */}
      {modalDoc && (
        <ModalDocumento tipo={modalDoc} onClose={() => setModalDoc(null)} />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════
// SCREEN 2 — HOME / DASHBOARD
// ══════════════════════════════════════════════════
const COMMUNITY_PREVIEW = [
  { id: 1, seed: 13, author: 'Dra. Marina L.', spec: 'Biomédica · SP',         q: 'Possível blasto linfoide? 26a, leucocitose de 42.000...' },
  { id: 2, seed: 17, author: 'Carlos M.',      spec: 'Analista Clínico · MG',  q: 'Corpúsculos de Auer visíveis. Concordam com LMA M3?' },
];

// ══════════════════════════════════════════════════
// PAINEL DE NOTIFICAÇÕES
// ══════════════════════════════════════════════════
function NotificationPanel({ onClose, userId, token }) {
  const [notifs,   setNotifs]   = React.useState([]);
  const [avisos,   setAvisos]   = React.useState([]);
  const [loading,  setLoading]  = React.useState(true);
  const [aba,      setAba]      = React.useState('notifs'); // 'notifs' | 'avisos'

  React.useEffect(() => {
    const carregar = async () => {
      setLoading(true);
      try {
        // Notificações pessoais
        if (userId) {
          const r = await fetch(
            `${window.HemaAPI.base}/community/notificacoes?usuario_id=${userId}`,
            token ? { headers: { Authorization: `Bearer ${token}` } } : {}
          );
          if (r.ok) { const d = await r.json(); setNotifs(d.notificacoes || []); }
        }
        // Avisos globais
        const r2 = await fetch(`${window.HemaAPI.base}/community/avisos`);
        if (r2.ok) { const d2 = await r2.json(); setAvisos(d2); }
      } catch {}
      setLoading(false);
    };
    carregar();
  }, [userId]);

  const marcarLidas = async () => {
    if (!userId) return;
    try {
      await fetch(
        `${window.HemaAPI.base}/community/notificacoes/lidas?usuario_id=${userId}`,
        { method: 'PATCH', headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setNotifs(prev => prev.map(n => ({ ...n, lida: true })));
    } catch {}
  };

  const iconeTipo = (tipo) => {
    if (tipo === 'comentario_no_post')    return '💬';
    if (tipo === 'resposta_comentario')   return '↩️';
    if (tipo === 'reacao_post')           return '🔬';
    if (tipo === 'analise_pronta')        return '✅';
    return '🔔';
  };

  const corAviso = (tipo) => {
    if (tipo === 'alerta')   return { bg: 'rgba(217,146,46,0.1)', border: 'rgba(217,146,46,0.35)', cor: COLORS.amber };
    if (tipo === 'novidade') return { bg: 'rgba(76,175,124,0.1)', border: 'rgba(76,175,124,0.35)', cor: COLORS.green };
    return { bg: 'rgba(59,126,168,0.1)', border: 'rgba(59,126,168,0.35)', cor: '#5B9ED1' };
  };

  const tempoRelativo = (iso) => {
    if (!iso) return '';
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1)  return 'agora';
    if (m < 60) return `${m}min`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h`;
    return `${Math.floor(h / 24)}d`;
  };

  const naoLidas = notifs.filter(n => !n.lida).length;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(6,13,26,0.92)', backdropFilter: 'blur(12px)',
      animation: 'fadeIn 180ms ease-out',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        padding: '52px 16px 0',
        borderBottom: `0.5px solid ${COLORS.line2}`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: COLORS.white, fontWeight: 600 }}>
            Notificações
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {naoLidas > 0 && (
              <div onClick={marcarLidas} style={{
                fontFamily: FONT_MONO, fontSize: 9, color: COLORS.muted,
                letterSpacing: 0.4, cursor: 'pointer', padding: '4px 8px',
                borderRadius: 6, border: `0.5px solid ${COLORS.line2}`,
              }}>
                Marcar todas como lidas
              </div>
            )}
            <button onClick={onClose} style={{
              background: 'rgba(240,244,248,0.06)', border: `0.5px solid ${COLORS.line2}`,
              width: 32, height: 32, borderRadius: 8, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.muted,
              fontSize: 16,
            }}>✕</button>
          </div>
        </div>

        {/* Abas */}
        <div style={{ display: 'flex', gap: 0 }}>
          {[['notifs', `Atividades${naoLidas > 0 ? ` (${naoLidas})` : ''}`], ['avisos', `Avisos${avisos.length > 0 ? ` (${avisos.length})` : ''}`]].map(([id, label]) => (
            <button key={id} onClick={() => setAba(id)} style={{
              flex: 1, background: 'none', border: 'none', cursor: 'pointer',
              padding: '10px 0', borderBottom: `2px solid ${aba === id ? COLORS.red : 'transparent'}`,
              fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 0.6,
              color: aba === id ? COLORS.white : COLORS.dim, transition: 'all 180ms',
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: `2px solid ${COLORS.line2}`, borderTopColor: COLORS.red, animation: 'spin 0.8s linear infinite' }} />
          </div>
        ) : aba === 'notifs' ? (
          notifs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🔔</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: COLORS.white }}>Tudo em dia</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim, marginTop: 6 }}>Nenhuma notificação por enquanto</div>
            </div>
          ) : notifs.map(n => (
            <div key={n.id} style={{
              display: 'flex', gap: 12, padding: '14px 16px',
              background: n.lida ? 'transparent' : 'rgba(192,57,43,0.04)',
              borderBottom: `0.5px solid ${COLORS.line}`,
              transition: 'background 200ms',
            }}>
              {/* Ícone */}
              <div style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                background: n.lida ? COLORS.bg2 : 'rgba(192,57,43,0.1)',
                border: `0.5px solid ${n.lida ? COLORS.line2 : COLORS.redBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>{iconeTipo(n.tipo)}</div>
              {/* Texto */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.white, fontWeight: n.lida ? 400 : 600, lineHeight: 1.3 }}>
                    {n.titulo || 'Nova notificação'}
                  </div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, flexShrink: 0 }}>
                    {tempoRelativo(n.criado_em)}
                  </div>
                </div>
                {n.mensagem && (
                  <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.muted, marginTop: 3, lineHeight: 1.45 }}>
                    {n.mensagem}
                  </div>
                )}
              </div>
              {/* Bolinha não lida */}
              {!n.lida && (
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.red, flexShrink: 0, marginTop: 4, boxShadow: `0 0 6px ${COLORS.red}` }} />
              )}
            </div>
          ))
        ) : (
          avisos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📢</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: COLORS.white }}>Nenhum aviso</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim, marginTop: 6 }}>A equipe ainda não publicou avisos</div>
            </div>
          ) : avisos.map(a => {
            const { bg, border, cor } = corAviso(a.tipo);
            return (
              <div key={a.id} style={{
                margin: '10px 14px', padding: 14, borderRadius: 12,
                background: bg, border: `0.5px solid ${border}`,
                animation: 'fadeUp 250ms ease-out',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      fontFamily: FONT_MONO, fontSize: 8, color: cor,
                      background: `${cor}20`, border: `0.5px solid ${cor}50`,
                      borderRadius: 4, padding: '2px 6px', letterSpacing: 1, textTransform: 'uppercase',
                    }}>{a.tipo === 'alerta' ? '⚠ Alerta' : a.tipo === 'novidade' ? '✨ Novidade' : 'ℹ Info'}</div>
                  </div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim }}>{tempoRelativo(a.criado_em)}</div>
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, color: COLORS.white, fontWeight: 600, marginBottom: 6 }}>
                  {a.titulo}
                </div>
                <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: COLORS.muted, lineHeight: 1.55 }}>
                  {a.mensagem}
                </div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, marginTop: 8, letterSpacing: 0.3 }}>
                  Equipe Hematolog.IA
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status, label }) {
  const map = {
    alert:  { bg: 'rgba(192,57,43,0.12)', border: COLORS.redBorder,             color: COLORS.red,   icon: '⚠' },
    normal: { bg: 'rgba(76,175,124,0.12)', border: 'rgba(76,175,124,0.35)',     color: COLORS.green, icon: '✓' },
    review: { bg: 'rgba(59,126,168,0.14)', border: 'rgba(59,126,168,0.4)',      color: '#5B9ED1',    icon: '◎' },
  };
  const s = map[status] || map.review;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: s.bg, border: `0.5px solid ${s.border}`,
      borderRadius: 999, padding: '2px 8px',
      fontFamily: FONT_MONO, fontSize: 9, letterSpacing: 0.4,
      color: s.color, fontWeight: 600,
    }}>
      <span style={{ fontSize: 10 }}>{s.icon}</span>
      <span style={{ textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

function HomeScreen({ onNavigate, onStartAnalysis, user }) {
  const [painelAberto, setPainelAberto] = React.useState(false);
  const [naoLidas,     setNaoLidas]     = React.useState(0);
  const [temAviso,     setTemAviso]     = React.useState(false);
  const [analises,       setAnalises]       = React.useState([]);
  const [communityPosts, setCommunityPosts] = React.useState([]);

  const userId = user?.id || user?.email || null;
  const totalBadge = naoLidas + (temAviso ? 1 : 0);

  React.useEffect(() => {
    const token = localStorage.getItem('hema_token');

    const checarNotifs = async () => {
      try {
        if (userId) {
          const r = await fetch(`${window.HemaAPI.base}/community/notificacoes?usuario_id=${userId}`);
          if (r.ok) { const d = await r.json(); setNaoLidas(d.total_nao_lidas || 0); }
        }
        const r2 = await fetch(`${window.HemaAPI.base}/community/avisos`);
        if (r2.ok) { const d2 = await r2.json(); setTemAviso(d2.length > 0); }
      } catch {}
    };

    const carregarAnalises = async () => {
      if (!token) return;
      try {
        const r = await fetch(`${window.HemaAPI.base}/analysis/historico?limit=4`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (r.ok) { const d = await r.json(); setAnalises(d.analises || []); }
      } catch {}
    };

    const carregarComunidade = async () => {
      try {
        const r = await fetch(`${window.HemaAPI.base}/community/posts?limit=2&secao=recente`);
        if (r.ok) {
          const d = await r.json();
          const posts = (d.posts || d).slice(0, 2).map((p, i) => ({
            id:     p.id,
            seed:   (i * 7 + 13) % 30 + 1,
            author: p.autor_nome || 'Usuário',
            spec:   p.autor_crbio || 'Biomédico',
            q:      p.caption,
          }));
          setCommunityPosts(posts);
        }
      } catch {}
    };

    checarNotifs();
    carregarAnalises();
    carregarComunidade();
    const interval = setInterval(checarNotifs, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  // Formata análise do banco para o card
  const formatarAnalise = (a, i) => {
    const status = a.celulas_atipicas ? 'alert' : a.blastos_pct > 0 ? 'review' : 'normal';
    const label  = a.celulas_atipicas ? 'Células atípicas' : a.blastos_pct > 0 ? `Blastos ${a.blastos_pct}%` : 'Normal';
    const data   = a.criado_em ? new Date(a.criado_em).toLocaleDateString('pt-BR', { day:'2-digit', month:'short' }) + ' · ' + new Date(a.criado_em).toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' }) : '—';
    return { id: a.id, seed: (i * 7 + 3) % 30 + 1, date: data, status, label, count: `${a.total_celulas || 0} células · ${a.blastos_pct || 0}%` };
  };

  const initials    = user?.name ? user.name.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('') : 'RS';
  const displayName = user?.name || user?.nome || 'Profissional';
  const crbio       = user?.crbio || '';
  const fotoLocal   = localStorage.getItem('hema_foto');

  return (
    <div style={{ paddingBottom: 140, minHeight: '100%', position: 'relative' }}>
      <LabGrid opacity={0.035} />

      {/* Header */}
      <div style={{ padding: '54px 20px 16px', display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: fotoLocal ? 'transparent' : `linear-gradient(135deg, ${COLORS.red}, #8B1E15)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONT_DISPLAY, fontSize: 17, color: COLORS.white,
          boxShadow: `0 0 0 1px ${COLORS.line2}`,
          overflow: 'hidden', flexShrink: 0,
        }}>
          {fotoLocal
            ? <img src={fotoLocal} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : initials
          }
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: COLORS.white, fontWeight: 600 }}>{displayName}</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, letterSpacing: 0.4, marginTop: 2 }}>
            {user?.specialty?.toUpperCase() || 'BIOMÉDICO'} · {crbio}
          </div>
        </div>
        <div onClick={() => setPainelAberto(true)} style={{ position: 'relative', cursor: 'pointer', padding: 4 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            style={{ filter: totalBadge > 0 ? `drop-shadow(0 0 4px ${COLORS.red}80)` : 'none', transition: 'filter 300ms' }}>
            <path d="M6 8a6 6 0 1112 0v5l2 2H4l2-2V8z" stroke={COLORS.white} strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M10 18a2 2 0 004 0" stroke={COLORS.white} strokeWidth="1.5"/>
          </svg>
          {totalBadge > 0 && (
            <div style={{
              position: 'absolute', top: -2, right: -2,
              background: COLORS.red, color: COLORS.white,
              borderRadius: 999, minWidth: 16, height: 16,
              fontSize: 8, fontFamily: FONT_MONO, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0 4px', boxShadow: `0 0 8px ${COLORS.red}`,
              animation: 'pulse 2s ease-in-out infinite',
            }}>{totalBadge > 9 ? '9+' : totalBadge}</div>
          )}
        </div>
      </div>

      {/* Painel de notificações (sobrepõe a home) */}
      {painelAberto && (
        <NotificationPanel
          onClose={() => { setPainelAberto(false); setNaoLidas(0); }}
          userId={userId}
          token={null}
        />
      )}

      {/* Hero analysis card */}
      <div style={{ padding: '8px 16px 0' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          background: `linear-gradient(145deg, ${COLORS.bg2} 0%, ${COLORS.bg3} 100%)`,
          border: `0.5px solid ${COLORS.line2}`,
          borderRadius: 20, padding: 20,
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
            <MicroSlide seed={23} style={{ width: '100%', height: '100%', filter: 'blur(6px)' }} />
          </div>
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(145deg, rgba(10,22,40,0.82) 0%, rgba(192,57,43,0.18) 100%)`,
          }} />
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: FONT_MONO, fontSize: 9, letterSpacing: 1.6,
              color: COLORS.red, textTransform: 'uppercase', fontWeight: 600,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: COLORS.red,
                boxShadow: `0 0 6px ${COLORS.red}`, animation: 'blink 1.4s ease-in-out infinite',
              }} />
              IA pronta · 0.8s
            </div>
            <div style={{
              fontFamily: FONT_DISPLAY, fontSize: 24, color: COLORS.white,
              marginTop: 10, lineHeight: 1.15, fontWeight: 600, letterSpacing: -0.4,
            }}>
              Analisar nova amostra
            </div>
            <div style={{
              fontFamily: FONT_SANS, fontSize: 12, color: COLORS.muted,
              marginTop: 6, lineHeight: 1.5, maxWidth: 240,
            }}>
              Envie uma foto do esfregaço e receba análise de blastos em segundos.
            </div>
            <button onClick={onStartAnalysis} style={{
              marginTop: 18, background: COLORS.red, color: COLORS.white,
              border: 'none', borderRadius: 12, padding: '14px 18px',
              fontFamily: FONT_MONO, fontSize: 11, letterSpacing: 1.4, fontWeight: 700,
              textTransform: 'uppercase', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: `0 6px 20px ${COLORS.red}55`,
              animation: 'pulse 2.4s ease-in-out infinite',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="6" width="20" height="14" rx="2" stroke={COLORS.white} strokeWidth="1.6"/>
                <circle cx="12" cy="13" r="4" stroke={COLORS.white} strokeWidth="1.6"/>
                <path d="M8 6l2-3h4l2 3" stroke={COLORS.white} strokeWidth="1.6"/>
              </svg>
              Iniciar análise
            </button>
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              {['Câmera', 'Galeria', 'DICOM'].map(opt => (
                <div key={opt} style={{
                  flex: 1, textAlign: 'center', padding: '8px 6px', borderRadius: 8,
                  border: `0.5px solid ${COLORS.line2}`, background: 'rgba(240,244,248,0.03)',
                  fontFamily: FONT_MONO, fontSize: 9, color: COLORS.muted,
                  letterSpacing: 0.6, textTransform: 'uppercase',
                }}>{opt}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent analyses */}
      <div style={{ marginTop: 24 }}>
        <div style={{ padding: '0 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim, letterSpacing: 1.6, textTransform: 'uppercase' }}>
            · Últimas análises
          </div>
          <div onClick={() => onNavigate('analyze')} style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red, letterSpacing: 0.6, cursor: 'pointer' }}>Ver histórico →</div>
        </div>
        {analises.length === 0 ? (
          <div style={{ margin: '0 20px', padding: '20px', background: COLORS.bg2, borderRadius: 14, border: `0.5px solid ${COLORS.line2}`, textAlign: 'center' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim }}>Nenhuma análise realizada ainda</div>
            <div onClick={() => onNavigate('analyze')} style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red, marginTop: 8, cursor: 'pointer' }}>Fazer primeira análise →</div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px', scrollbarWidth: 'none' }}>
            {analises.map((a, i) => {
              const fmt = formatarAnalise(a, i);
              return (
                <div key={fmt.id} style={{ flexShrink: 0, width: 168, background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`, borderRadius: 14, overflow: 'hidden' }}>
                  <MicroSlide seed={fmt.seed} style={{ width: '100%', height: 100 }} />
                  <div style={{ padding: '10px 12px' }}>
                    <StatusBadge status={fmt.status} label={fmt.label} />
                    <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: COLORS.white, marginTop: 8, fontWeight: 500 }}>{fmt.count}</div>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, marginTop: 3, letterSpacing: 0.4 }}>{fmt.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Community preview */}
      <div style={{ marginTop: 24, padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim, letterSpacing: 1.6, textTransform: 'uppercase' }}>
            · Comunidade
          </div>
          <div onClick={() => onNavigate('community')} style={{
            fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red, letterSpacing: 0.6, cursor: 'pointer',
          }}>Ver comunidade →</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(communityPosts.length > 0 ? communityPosts : []).map(p => (
            <div key={p.id} onClick={() => onNavigate('community')} style={{
              display: 'flex', gap: 12, alignItems: 'center',
              background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`,
              borderRadius: 12, padding: 10, cursor: 'pointer',
            }}>
              <MicroSlide seed={p.seed} style={{ width: 52, height: 52, borderRadius: 8, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: COLORS.white, fontWeight: 600 }}>{p.author}</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, marginTop: 1 }}>{p.spec}</div>
                <div style={{
                  fontFamily: FONT_SANS, fontSize: 11, color: COLORS.muted,
                  marginTop: 4, lineHeight: 1.35, overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{p.q}</div>
              </div>
            </div>
          ))}
          {communityPosts.length === 0 && (
            <div onClick={() => onNavigate('community')} style={{
              background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`,
              borderRadius: 12, padding: 14, textAlign: 'center', cursor: 'pointer',
            }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim }}>Seja o primeiro a postar!</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red, marginTop: 6 }}>Abrir comunidade →</div>
            </div>
          )}
        </div>
      </div>

      {/* AI tip */}
      <div style={{ marginTop: 20, padding: '0 20px' }}>
        <div style={{
          background: `linear-gradient(135deg, rgba(192,57,43,0.08), rgba(59,126,168,0.06))`,
          border: `0.5px solid ${COLORS.redBorder}`,
          borderRadius: 14, padding: 14,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: FONT_MONO, fontSize: 9, color: COLORS.red,
            letterSpacing: 1.4, textTransform: 'uppercase', fontWeight: 700,
          }}>
            <CellIcon size={12} /> Sabia que · dica da IA
          </div>
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: 15, color: COLORS.white,
            marginTop: 8, lineHeight: 1.3, letterSpacing: -0.2,
          }}>
            Blastos linfoides × mieloides: a relação núcleo/citoplasma e a presença de bastonetes de Auer são os critérios visuais decisivos.
          </div>
        </div>
      </div>
    </div>
  );
}

window.HemaScreens = { LoginScreen, HomeScreen, StatusBadge };
