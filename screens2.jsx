// screens2.jsx — Analysis, Community, Chat, Profile conectados ao backend
const { COLORS, FONT_DISPLAY, FONT_MONO, FONT_SANS, MicroSlide, Logo, CellIcon, LabGrid, Coords } = window.Hema;
const { StatusBadge } = window.HemaScreens;

// ══════════════════════════════════════════════════
// SCREEN 3 — ANÁLISE (upload real + API)
// ══════════════════════════════════════════════════
const LOADING_STEPS = [
  'Detectando morfologia celular',
  'Classificando leucócitos',
  'Identificando células imaturas',
  'Calculando índice de blastos',
];

// Mapeia resposta da API para cores/labels do diff count
function buildDiffCount(cd) {
  if (!cd) return [];
  return [
    { label: 'Neutrófilos Seg.',  pct: cd.neutrofilos_segmentados || 0, color: COLORS.green },
    { label: 'Bastonetes',        pct: cd.neutrofilos_bastonetes   || 0, color: '#6BBF8A' },
    { label: 'Linfócitos',        pct: cd.linfocitos               || 0, color: '#5B9ED1' },
    { label: 'Monócitos',         pct: cd.monocitos                || 0, color: '#7C6BAE' },
    { label: 'Eosinófilos',       pct: cd.eosinofilos              || 0, color: COLORS.amber },
    { label: 'Basófilos',         pct: cd.basofilos                || 0, color: '#888' },
    { label: 'Blastos',           pct: cd.blastos                  || 0, color: COLORS.red },
  ].filter(d => d.pct > 0);
}

function relevanciaStatus(r) {
  if (r === 'critico') return 'alert';
  if (r === 'atencao') return 'review';
  return 'normal';
}

// ──────────────────────────────────────────────────
// Gerador de laudo HTML (base para o PDF)
// ──────────────────────────────────────────────────
function gerarHTMLLaudo(result, user) {
  const agora    = new Date();
  const dataStr  = agora.toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' });
  const horaStr  = agora.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
  const profNome = user?.name || user?.nome || 'Profissional';
  const profReg  = user?.crbio || '—';
  const cd       = result.contagem_diferencial || {};

  const corRelevancia = (r) => r === 'critico' ? '#C0392B' : r === 'atencao' ? '#D9922E' : '#4CAF7C';
  const labelRelevancia = (r) => r === 'critico' ? '⚠ Crítico' : r === 'atencao' ? '! Atenção' : '✓ Normal';

  const linhasDiff = [
    ['Neutrófilos Segmentados', cd.neutrofilos_segmentados],
    ['Neutrófilos Bastonetes',  cd.neutrofilos_bastonetes],
    ['Linfócitos',              cd.linfocitos],
    ['Monócitos',               cd.monocitos],
    ['Eosinófilos',             cd.eosinofilos],
    ['Basófilos',               cd.basofilos],
    ['Blastos',                 cd.blastos],
  ].filter(([, v]) => v !== undefined && v !== null);

  const achadosHTML = (result.achados_morfologicos || []).map(a => `
    <tr>
      <td style="padding:7px 10px;border-bottom:1px solid #e8e8e8;font-weight:600;color:#1a1a2e">${a.categoria}</td>
      <td style="padding:7px 10px;border-bottom:1px solid #e8e8e8;color:#444">${a.achado}</td>
      <td style="padding:7px 10px;border-bottom:1px solid #e8e8e8;text-align:center">
        <span style="background:${corRelevancia(a.relevancia)}20;color:${corRelevancia(a.relevancia)};
          padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700">
          ${labelRelevancia(a.relevancia)}
        </span>
      </td>
    </tr>`).join('');

  const diffHTML = linhasDiff.map(([label, valor], i) => `
    <tr style="background:${i % 2 === 0 ? '#f8f9fa' : '#fff'}">
      <td style="padding:7px 10px;border-bottom:1px solid #e8e8e8;color:#444">${label}</td>
      <td style="padding:7px 10px;border-bottom:1px solid #e8e8e8;text-align:center;font-weight:700;
        color:${label === 'Blastos' && valor > 5 ? '#C0392B' : '#1a1a2e'}">${valor ?? '—'}%</td>
    </tr>`).join('');

  const alertaHTML = result.celulas_atipicas_detectadas ? `
    <div style="background:#fdf2f2;border:1.5px solid #C0392B;border-radius:8px;padding:14px 16px;margin:16px 0">
      <div style="font-weight:700;color:#C0392B;font-size:13px;margin-bottom:4px">⚠ ATENÇÃO CLÍNICA</div>
      <div style="color:#333;font-size:13px">${result.suspeita_diagnostica}</div>
    </div>` : `
    <div style="background:#f0faf4;border:1.5px solid #4CAF7C;border-radius:8px;padding:14px 16px;margin:16px 0">
      <div style="font-weight:700;color:#4CAF7C;font-size:13px;margin-bottom:4px">✓ DENTRO DOS PARÂMETROS</div>
      <div style="color:#333;font-size:13px">${result.suspeita_diagnostica}</div>
    </div>`;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Arial', sans-serif; color: #1a1a2e; background: #fff; font-size: 13px; }
  .page { padding: 32px 36px; max-width: 794px; margin: 0 auto; }

  /* Header */
  .header { display: flex; align-items: center; justify-content: space-between;
    border-bottom: 3px solid #C0392B; padding-bottom: 16px; margin-bottom: 20px; }
  .logo { display: flex; align-items: center; gap: 12px; }
  .logo-wordmark { font-size: 22px; font-weight: 900; letter-spacing: 1px; color: #1a1a2e; }
  .logo-wordmark span { color: #C0392B; }
  .logo-sub { font-size: 9px; letter-spacing: 2px; color: #888; text-transform: uppercase; margin-top: 2px; }
  .header-right { text-align: right; font-size: 11px; color: #666; line-height: 1.6; }

  /* Info box */
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
  .info-box { background: #f8f9fa; border-radius: 8px; padding: 10px 14px; }
  .info-label { font-size: 9px; color: #888; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 3px; }
  .info-value { font-weight: 700; font-size: 13px; color: #1a1a2e; }

  /* Section */
  .section-title { font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    color: #C0392B; font-weight: 700; margin: 18px 0 8px; padding-bottom: 4px;
    border-bottom: 1px solid #f0f0f0; }

  /* Table */
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th { background: #1a1a2e; color: #fff; padding: 8px 10px; text-align: left;
    font-size: 10px; letter-spacing: 0.8px; text-transform: uppercase; }

  /* Laudo */
  .laudo-box { background: #f8f9fa; border-radius: 8px; padding: 14px 16px;
    font-size: 12px; color: #444; line-height: 1.7; margin: 10px 0; }

  /* Footer */
  .footer { margin-top: 28px; padding-top: 14px; border-top: 1px solid #e0e0e0;
    display: flex; justify-content: space-between; align-items: flex-end; }
  .footer-sign { text-align: center; }
  .sign-line { border-top: 1px solid #333; width: 200px; margin: 30px auto 4px; }
  .disclaimer { font-size: 9px; color: #aaa; max-width: 300px; line-height: 1.5; text-align: right; }

  /* Confidence badge */
  .badge-conf { display:inline-block; background:#1a1a2e; color:#fff;
    padding:3px 10px; border-radius:20px; font-size:10px; font-weight:700; }
  .badge-cells { display:inline-block; background:#f0f0f0; color:#444;
    padding:3px 10px; border-radius:20px; font-size:10px; margin-left:8px; }
</style>
</head>
<body>
<div class="page">

  <!-- Cabeçalho -->
  <div class="header">
    <div class="logo">
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
        <rect x="10" y="6" width="10" height="52" fill="#1a1a2e"/>
        <rect x="44" y="6" width="10" height="52" fill="#1a1a2e"/>
        <path d="M4 42 L60 22 L60 31 L4 51 Z" fill="#C0392B"/>
      </svg>
      <div>
        <div class="logo-wordmark">HEMATOLOG<span>.IA</span></div>
        <div class="logo-sub">Diagnóstico Assistido · Hematologia</div>
      </div>
    </div>
    <div class="header-right">
      <strong>LAUDO HEMATOLÓGICO</strong><br>
      Emitido em: ${dataStr}<br>
      Horário: ${horaStr}<br>
      <span style="background:#C0392B;color:#fff;padding:2px 8px;border-radius:4px;font-size:10px">IA · v2.8.3</span>
    </div>
  </div>

  <!-- Dados do profissional -->
  <div class="info-grid">
    <div class="info-box">
      <div class="info-label">Profissional responsável</div>
      <div class="info-value">${profNome}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Registro profissional</div>
      <div class="info-value">${profReg}</div>
    </div>
    <div class="info-box">
      <div class="info-label">Total de células analisadas</div>
      <div class="info-value">${result.total_celulas_analisadas || '—'} células</div>
    </div>
    <div class="info-box">
      <div class="info-label">Confiança da análise</div>
      <div class="info-value">${result.confianca_pct || '—'}%</div>
    </div>
  </div>

  <!-- Alerta / resultado principal -->
  ${alertaHTML}

  <!-- Contagem diferencial -->
  ${linhasDiff.length > 0 ? `
  <div class="section-title">Contagem Diferencial</div>
  <table>
    <thead><tr><th>Tipo Celular</th><th style="text-align:center">%</th></tr></thead>
    <tbody>${diffHTML}</tbody>
  </table>` : ''}

  <!-- Achados morfológicos -->
  ${(result.achados_morfologicos || []).length > 0 ? `
  <div class="section-title">Achados Morfológicos</div>
  <table>
    <thead><tr><th>Categoria</th><th>Achado</th><th style="text-align:center">Relevância</th></tr></thead>
    <tbody>${achadosHTML}</tbody>
  </table>` : ''}

  <!-- Recomendação -->
  ${result.recomendacao ? `
  <div class="section-title">Recomendação Clínica</div>
  <div class="laudo-box" style="border-left:3px solid #C0392B">${result.recomendacao}</div>` : ''}

  <!-- Laudo completo -->
  ${result.laudo_resumido ? `
  <div class="section-title">Laudo Completo</div>
  <div class="laudo-box">${result.laudo_resumido}</div>` : ''}

  <!-- Rodapé -->
  <div class="footer">
    <div class="footer-sign">
      <div class="sign-line"></div>
      <div style="font-weight:700;font-size:12px">${profNome}</div>
      <div style="font-size:10px;color:#666">${profReg}</div>
    </div>
    <div class="disclaimer">
      Este laudo foi gerado com auxílio de inteligência artificial e deve ser interpretado
      por profissional habilitado. Não substitui avaliação clínica especializada.
      Hematolog.IA · ${new Date().getFullYear()}
    </div>
  </div>

</div>
</body>
</html>`;
}

// Salva laudo no localStorage
function salvarLaudo(result) {
  try {
    const laudos = JSON.parse(localStorage.getItem('hema_laudos') || '[]');
    const novo = { id: Date.now(), data: new Date().toISOString(), result };
    laudos.unshift(novo);
    if (laudos.length > 20) laudos.pop(); // mantém os últimos 20
    localStorage.setItem('hema_laudos', JSON.stringify(laudos));
    alert('Laudo salvo com sucesso! Acesse em Perfil → Histórico de análises.');
  } catch {
    alert('Erro ao salvar laudo.');
  }
}

// Exporta PDF usando html2pdf.js
function exportarPDF(result) {
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('hema_user') || '{}'); } catch { return {}; }
  })();

  const html = gerarHTMLLaudo(result, user);
  const container = document.createElement('div');
  container.innerHTML = html;
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  document.body.appendChild(container);

  const opt = {
    margin:      [8, 8, 8, 8],
    filename:    `laudo-hematologico-${new Date().toISOString().slice(0,10)}.pdf`,
    image:       { type: 'jpeg', quality: 0.97 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  window.html2pdf()
    .set(opt)
    .from(container.querySelector('.page'))
    .save()
    .then(() => { document.body.removeChild(container); })
    .catch(() => { document.body.removeChild(container); alert('Erro ao gerar PDF. Tente novamente.'); });
}

function AnalysisScreen({ onNavigate, token }) {
  const [step,      setStep]      = React.useState(1);
  const [loadIdx,   setLoadIdx]   = React.useState(0);
  const [progress,  setProgress]  = React.useState(0);
  const [imageFile, setImageFile] = React.useState(null);
  const [imageURL,  setImageURL]  = React.useState(null);
  const [result,    setResult]    = React.useState(null);
  const [apiError,  setApiError]  = React.useState(null);
  const fileInputRef = React.useRef();

  // Limpa URL do objeto ao desmontar
  React.useEffect(() => () => { if (imageURL) URL.revokeObjectURL(imageURL); }, [imageURL]);

  // Animações do passo 2 + chamada real à API
  React.useEffect(() => {
    if (step !== 2) return;
    setLoadIdx(0); setProgress(0); setApiError(null);

    // Animação de progresso (simulada enquanto a API responde)
    const t1 = setInterval(() => setLoadIdx(i => (i + 1) % LOADING_STEPS.length), 900);
    const t2 = setInterval(() => setProgress(p => Math.min(92, p + 1.8)), 80);

    // Chamada real
    const run = async () => {
      try {
        let data;
        if (imageFile) {
          data = await window.HemaAPI.analyzeImage(imageFile, token);
        } else {
          // Sem imagem selecionada: usa endpoint demo
          data = await window.HemaAPI.analyzeDemo();
        }
        clearInterval(t1);
        clearInterval(t2);
        setProgress(100);
        setResult(data);
        setTimeout(() => setStep(3), 400);
      } catch (e) {
        clearInterval(t1);
        clearInterval(t2);
        setApiError(e.message || 'Erro ao analisar imagem.');
        setStep(1);
      }
    };

    run();
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [step]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (imageURL) URL.revokeObjectURL(imageURL);
    setImageFile(f);
    setImageURL(URL.createObjectURL(f));
    setApiError(null);
  };

  const resetAnalysis = () => {
    setStep(1);
    setImageFile(null);
    if (imageURL) URL.revokeObjectURL(imageURL);
    setImageURL(null);
    setResult(null);
    setApiError(null);
  };

  const diffCount = result ? buildDiffCount(result.contagem_diferencial) : [];
  const totalCells = result?.total_celulas_analisadas || 0;
  const blastosPct = result?.contagem_diferencial?.blastos || 0;
  const hasCritical = result?.celulas_atipicas_detectadas;

  return (
    <div style={{ paddingBottom: 120, minHeight: '100%', position: 'relative' }}>
      <LabGrid opacity={0.035} />

      {/* Header */}
      <div style={{ padding: '54px 20px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => onNavigate('home')} style={{
          background: 'rgba(240,244,248,0.06)', border: `0.5px solid ${COLORS.line2}`,
          width: 36, height: 36, borderRadius: 10, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M14 6l-6 6 6 6" stroke={COLORS.white} strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase' }}>
            Análise · {step}/3
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: COLORS.white, fontWeight: 600, letterSpacing: -0.2 }}>
            {step === 1 ? 'Upload de amostra' : step === 2 ? 'Processando' : 'Resultado'}
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 4, padding: '0 20px', marginBottom: 16 }}>
        {[1, 2, 3].map(n => (
          <div key={n} style={{
            flex: 1, height: 2, borderRadius: 2,
            background: n <= step ? COLORS.red : COLORS.line2,
            boxShadow: n <= step ? `0 0 6px ${COLORS.red}80` : 'none',
            transition: 'all 300ms',
          }} />
        ))}
      </div>

      {/* ── STEP 1: Upload ── */}
      {step === 1 && (
        <div style={{ padding: '0 20px', animation: 'fadeUp 400ms ease-out' }}>

          {/* Área de preview / clique */}
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              position: 'relative', overflow: 'hidden', cursor: 'pointer',
              border: `1.5px dashed ${apiError ? COLORS.red : COLORS.redBorder}`,
              borderRadius: 16, height: 260,
              transition: 'border-color 200ms',
            }}
          >
            {imageURL ? (
              <img src={imageURL} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <MicroSlide seed={41} style={{ width: '100%', height: '100%' }} />
            )}
            <div style={{
              position: 'absolute', inset: 0,
              background: imageURL ? 'rgba(6,13,26,0.3)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {!imageURL && (
                <div style={{
                  background: 'rgba(6,13,26,0.75)', border: `0.5px solid ${COLORS.line2}`,
                  borderRadius: 12, padding: '12px 18px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>📷</div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.white, letterSpacing: 0.4 }}>
                    Toque para selecionar imagem
                  </div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.muted, marginTop: 4 }}>
                    JPEG · PNG · BMP
                  </div>
                </div>
              )}
              {imageURL && (
                <div style={{
                  background: 'rgba(6,13,26,0.8)', border: `0.5px solid ${COLORS.line2}`,
                  borderRadius: 8, padding: '6px 12px',
                }}>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.green, letterSpacing: 0.4 }}>
                    ✓ {imageFile?.name}
                  </div>
                </div>
              )}
            </div>
            <Coords label="XY · 042.18 / 017.54" style={{ position: 'absolute', top: 10, left: 12 }} />
            <Coords label="MAG · 1000×" style={{ position: 'absolute', top: 10, right: 12 }} />
            {!imageURL && <Coords label="CLIQUE PARA CARREGAR" style={{ position: 'absolute', bottom: 10, left: 12, color: COLORS.red }} />}
          </div>

          {/* Input file oculto */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/bmp,image/tiff,image/webp"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {/* Erro de API */}
          {apiError && (
            <div style={{
              marginTop: 10, padding: '10px 12px', borderRadius: 10,
              background: 'rgba(192,57,43,0.1)', border: `0.5px solid ${COLORS.redBorder}`,
              fontFamily: FONT_MONO, fontSize: 10, color: COLORS.red, letterSpacing: 0.3,
            }}>
              ⚠ {apiError}
            </div>
          )}

          {/* Quality indicator */}
          <div style={{
            marginTop: 12, padding: '10px 12px',
            background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`,
            borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.2, textTransform: 'uppercase' }}>
                Qualidade da imagem
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: imageURL ? COLORS.green : COLORS.muted, fontWeight: 600, marginTop: 2 }}>
                {imageURL ? 'Imagem carregada · pronta para análise' : 'Aguardando imagem...'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} style={{
                  width: 4, height: 14, borderRadius: 2,
                  background: imageURL && i <= 4 ? COLORS.green : COLORS.line2,
                }} />
              ))}
            </div>
          </div>

          {/* Tip */}
          <div style={{
            marginTop: 10, padding: 10, borderRadius: 10,
            background: 'rgba(59,126,168,0.08)', border: `0.5px solid rgba(59,126,168,0.25)`,
            fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, letterSpacing: 0.3, lineHeight: 1.5,
          }}>
            <span style={{ color: '#5B9ED1' }}>ⓘ</span>{' '}
            {imageURL
              ? 'Imagem selecionada. Clique em "Enviar" para iniciar a análise real com IA.'
              : 'Selecione uma foto do esfregaço ou clique em "Demo" para testar com dados simulados.'}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            <button onClick={() => { setImageFile(null); if(imageURL) URL.revokeObjectURL(imageURL); setImageURL(null); setStep(2); }}
              style={{
                flex: 1, background: 'rgba(240,244,248,0.06)', color: COLORS.muted,
                border: `0.5px solid ${COLORS.line2}`, borderRadius: 12, padding: '14px',
                fontFamily: FONT_MONO, fontSize: 11, letterSpacing: 1.4, fontWeight: 600,
                textTransform: 'uppercase', cursor: 'pointer',
              }}>
              Demo
            </button>
            <button onClick={() => setStep(2)} style={{
              flex: 3, background: COLORS.red, color: COLORS.white,
              border: 'none', borderRadius: 12, padding: '14px',
              fontFamily: FONT_MONO, fontSize: 12, letterSpacing: 1.8, fontWeight: 700,
              textTransform: 'uppercase', cursor: 'pointer',
            }}>
              {imageFile ? 'Enviar para análise IA →' : 'Usar demo →'}
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Processing ── */}
      {step === 2 && (
        <div style={{ padding: '0 20px', animation: 'fadeUp 400ms ease-out' }}>
          <div style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: 16, height: 260,
            border: `1px solid ${COLORS.redBorder}`,
            boxShadow: `0 0 30px ${COLORS.red}30`,
          }}>
            {imageURL
              ? <img src={imageURL} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <MicroSlide seed={41} scan style={{ width: '100%', height: '100%' }} />
            }
            {/* scan line overlay */}
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 0, height: 2,
              background: `linear-gradient(90deg, transparent, ${COLORS.red}, transparent)`,
              boxShadow: `0 0 12px ${COLORS.red}, 0 0 24px ${COLORS.red}80`,
              animation: 'scan 2.2s ease-in-out infinite',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(180deg, transparent 40%, rgba(6,13,26,0.7) 100%)`,
            }} />
            <Coords label={`PROGRESS · ${Math.round(progress)}%`} style={{ position: 'absolute', top: 10, left: 12, color: COLORS.red }} />
            <Coords label="IA · Claude Vision" style={{ position: 'absolute', top: 10, right: 12 }} />
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ height: 4, background: COLORS.line2, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                width: `${progress}%`, height: '100%',
                background: `linear-gradient(90deg, ${COLORS.red}, #E85A4A)`,
                boxShadow: `0 0 10px ${COLORS.red}`,
                transition: 'width 80ms linear',
              }} />
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', marginTop: 10,
              fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 0.6,
            }}>
              <span style={{ color: COLORS.red }}>{String(Math.round(progress)).padStart(2,'0')}%</span>
              <span style={{ color: COLORS.dim }}>aguardando resposta da IA...</span>
            </div>
          </div>

          <div style={{
            marginTop: 20, padding: 16, borderRadius: 12,
            background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`, minHeight: 120,
          }}>
            {LOADING_STEPS.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0',
                opacity: i <= loadIdx ? 1 : 0.3, transition: 'opacity 300ms',
              }}>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%',
                  border: `1.5px solid ${i < loadIdx ? COLORS.green : i === loadIdx ? COLORS.red : COLORS.dim}`,
                  background: i < loadIdx ? COLORS.green : 'transparent', position: 'relative',
                }}>
                  {i === loadIdx && (
                    <div style={{
                      position: 'absolute', inset: -3, borderRadius: '50%',
                      border: `1px solid ${COLORS.red}`, animation: 'pulse 1.4s ease-in-out infinite',
                    }} />
                  )}
                </div>
                <div style={{
                  fontFamily: FONT_MONO, fontSize: 11,
                  color: i === loadIdx ? COLORS.white : COLORS.muted, letterSpacing: 0.3,
                }}>
                  {s}{i === loadIdx && '...'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 3: Result (dados reais da API) ── */}
      {step === 3 && result && (
        <div style={{ padding: '0 20px', animation: 'fadeUp 400ms ease-out' }}>

          {/* Preview com overlay */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: 16, height: 240, border: `0.5px solid ${COLORS.line2}`,
          }}>
            {imageURL
              ? <img src={imageURL} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <MicroSlide seed={41} style={{ width: '100%', height: '100%' }} />
            }
            <div style={{
              position: 'absolute', bottom: 10, left: 12, right: 12,
              display: 'flex', gap: 6, flexWrap: 'wrap',
            }}>
              {result.celulas_atipicas_detectadas && (
                <div style={{
                  fontFamily: FONT_MONO, fontSize: 8, padding: '2px 6px',
                  background: 'rgba(6,13,26,0.8)', border: `0.5px solid ${COLORS.redBorder}`,
                  color: COLORS.red, borderRadius: 3, letterSpacing: 0.5,
                }}>● CÉLULAS ATÍPICAS</div>
              )}
              <div style={{
                fontFamily: FONT_MONO, fontSize: 8, padding: '2px 6px',
                background: 'rgba(6,13,26,0.8)', border: `0.5px solid rgba(76,175,124,0.4)`,
                color: COLORS.green, borderRadius: 3, letterSpacing: 0.5,
              }}>● {totalCells} céls. analisadas</div>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 8, padding: '2px 6px',
                background: 'rgba(6,13,26,0.8)', border: `0.5px solid ${COLORS.line2}`,
                color: COLORS.muted, borderRadius: 3, letterSpacing: 0.5,
              }}>Confiança {result.confianca_percent}%</div>
            </div>
          </div>

          {/* Alert ou normal */}
          <div style={{
            marginTop: 14, padding: 14, borderRadius: 12,
            background: hasCritical
              ? 'linear-gradient(135deg, rgba(192,57,43,0.15), rgba(192,57,43,0.06))'
              : 'linear-gradient(135deg, rgba(76,175,124,0.12), rgba(76,175,124,0.04))',
            border: `1px solid ${hasCritical ? COLORS.redBorder : 'rgba(76,175,124,0.35)'}`,
            boxShadow: hasCritical ? `0 0 20px ${COLORS.red}20` : 'none',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: FONT_MONO, fontSize: 9,
              color: hasCritical ? COLORS.red : COLORS.green,
              letterSpacing: 1.6, textTransform: 'uppercase', fontWeight: 700,
            }}>
              {hasCritical ? '⚠ Atenção clínica' : '✓ Dentro do esperado'}
            </div>
            <div style={{
              fontFamily: FONT_DISPLAY, fontSize: 15, color: COLORS.white,
              marginTop: 6, lineHeight: 1.3, letterSpacing: -0.2,
            }}>
              {result.suspeita_diagnostica}
            </div>
            {result.recomendacao && (
              <div style={{
                fontFamily: FONT_SANS, fontSize: 11, color: COLORS.muted,
                marginTop: 6, lineHeight: 1.4,
              }}>
                {result.recomendacao}
              </div>
            )}
          </div>

          {/* Achados morfológicos */}
          {result.achados_morfologicos?.length > 0 && (
            <div style={{
              marginTop: 12, padding: 14, borderRadius: 12,
              background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`,
            }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 10 }}>
                Achados morfológicos
              </div>
              {result.achados_morfologicos.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                  padding: '7px 0', borderBottom: i < result.achados_morfologicos.length - 1 ? `0.5px solid ${COLORS.line}` : 'none',
                }}>
                  <StatusBadge status={relevanciaStatus(a.relevancia)} label={a.categoria} />
                  <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: COLORS.muted, lineHeight: 1.4, flex: 1 }}>
                    {a.achado}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contagem diferencial */}
          {diffCount.length > 0 && (
            <div style={{
              marginTop: 12, padding: 14, borderRadius: 12,
              background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`,
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10,
              }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase' }}>
                  Contagem diferencial · {totalCells} células
                </div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.green, letterSpacing: 0.6 }}>
                  {result.confianca_percent}%
                </div>
              </div>
              {/* Stacked bar */}
              <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 12 }}>
                {diffCount.map(d => (
                  <div key={d.label} style={{ flex: d.pct, background: d.color }} />
                ))}
              </div>
              {diffCount.map(d => (
                <div key={d.label} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0',
                  borderBottom: `0.5px solid ${COLORS.line}`,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                  <div style={{ flex: 1, fontFamily: FONT_SANS, fontSize: 12, color: COLORS.white }}>{d.label}</div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.muted, letterSpacing: 0.3 }}>
                    {d.pct}%
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Laudo resumido */}
          {result.laudo_resumido && (
            <div style={{
              marginTop: 12, padding: 14, borderRadius: 12,
              background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`,
            }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 8 }}>
                Laudo resumido
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.muted, lineHeight: 1.6 }}>
                {result.laudo_resumido}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <button onClick={() => salvarLaudo(result)} style={{
              background: COLORS.red, color: COLORS.white, border: 'none',
              padding: '12px 10px', borderRadius: 10, cursor: 'pointer',
              fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 0.8, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}><span>💾</span>Salvar laudo</button>
            <button onClick={() => exportarPDF(result)} style={{
              background: 'rgba(240,244,248,0.04)', color: COLORS.white,
              border: `0.5px solid ${COLORS.line2}`,
              padding: '12px 10px', borderRadius: 10, cursor: 'pointer',
              fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 0.8, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}><span>📤</span>Exportar PDF</button>
            <button onClick={() => onNavigate('chat')} style={{
              background: 'rgba(240,244,248,0.04)', color: COLORS.white,
              border: `0.5px solid ${COLORS.line2}`,
              padding: '12px 10px', borderRadius: 10, cursor: 'pointer',
              fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 0.8, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}><span>❓</span>Perguntar à IA</button>
            <button onClick={() => onNavigate('community')} style={{
              background: 'rgba(240,244,248,0.04)', color: COLORS.white,
              border: `0.5px solid ${COLORS.line2}`,
              padding: '12px 10px', borderRadius: 10, cursor: 'pointer',
              fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 0.8, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}><span>🌐</span>Comunidade</button>
          </div>

          <button onClick={resetAnalysis} style={{
            marginTop: 12, width: '100%', background: 'transparent', color: COLORS.muted,
            border: `0.5px solid ${COLORS.line2}`, borderRadius: 10, padding: '10px',
            fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', cursor: 'pointer',
          }}>
            ↺ Nova análise
          </button>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════
// SCREEN 4 — COMMUNITY (estática, sem alteração)
// ══════════════════════════════════════════════════
const TAGS = ['#blastos', '#leucemia', '#LMA', '#LLA', '#anemia', '#trombocito', '#linfoma'];
const POSTS = [
  {
    id: 1, seed: 13, author: 'Dra. Marina Lopes', spec: 'Biomédica · CRBM 8421 · SP',
    caption: 'Paciente 26a, leucocitose 42.000. Células grandes, cromatina frouxa, nucléolos evidentes. Suspeita de blasto linfoide — colegas concordam?',
    tags: ['#blastos', '#LLA', '#diagnostico'],
    ia: 'Possíveis blastos linfoides (5 células marcadas). Relação N/C elevada compatível com LLA-B. Confiança 87%.',
    confidence: 87, reactions: { scope: 24, alert: 8, agree: 19 }, comments: 12, trending: true,
  },
  {
    id: 2, seed: 17, author: 'Carlos Mendes', spec: 'Analista Clínico · CRBM 12089 · MG',
    caption: 'Bastonetes de Auer visíveis em múltiplos blastos. LMA-M3 (promielocítica)?',
    tags: ['#LMA', '#M3', '#urgente'],
    ia: 'Bastonetes de Auer detectados em 4 células. Padrão compatível com LPA. Confiança 91%.',
    confidence: 91, reactions: { scope: 41, alert: 22, agree: 37 }, comments: 28, trending: true,
  },
];

function CommunityScreen() {
  const [activeTag, setActiveTag] = React.useState(null);
  return (
    <div style={{ paddingBottom: 120, minHeight: '100%', position: 'relative' }}>
      <div style={{ padding: '54px 20px 8px' }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase' }}>· Rede de especialistas</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: COLORS.white, fontWeight: 600, letterSpacing: -0.4, marginTop: 2 }}>Comunidade</div>
      </div>
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
          <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: COLORS.muted, letterSpacing: 0.3 }}>Buscar casos, células, doenças...</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '10px 20px', scrollbarWidth: 'none' }}>
        {TAGS.map(t => (
          <div key={t} onClick={() => setActiveTag(activeTag === t ? null : t)} style={{
            flexShrink: 0, padding: '6px 12px', borderRadius: 999,
            border: `0.5px solid ${activeTag === t ? COLORS.red : COLORS.line2}`,
            background: activeTag === t ? COLORS.redDim : 'transparent',
            fontFamily: FONT_MONO, fontSize: 10, color: activeTag === t ? COLORS.red : COLORS.muted,
            letterSpacing: 0.3, cursor: 'pointer', transition: 'all 180ms',
          }}>{t}</div>
        ))}
      </div>
      <div style={{ padding: '8px 20px 4px', fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase' }}>🔥 Casos em destaque</div>
      <div style={{ padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {POSTS.map(p => (
          <div key={p.id} style={{ background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '12px 14px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.red})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONT_DISPLAY, fontSize: 13, color: COLORS.white,
              }}>{p.author.charAt(p.author.indexOf(' ') + 1)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.white, fontWeight: 600 }}>{p.author}</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, marginTop: 1, letterSpacing: 0.3 }}>{p.spec}</div>
              </div>
              {p.trending && (
                <div style={{
                  fontFamily: FONT_MONO, fontSize: 8, color: COLORS.red,
                  background: COLORS.redDim, border: `0.5px solid ${COLORS.redBorder}`,
                  padding: '2px 6px', borderRadius: 4, letterSpacing: 0.6,
                }}>TRENDING</div>
              )}
            </div>
            <div style={{ position: 'relative', height: 200 }}>
              <MicroSlide seed={p.seed} boxes={[
                { x: 20, y: 28, w: 11, h: 12, color: COLORS.red,   label: 'B' },
                { x: 56, y: 38, w: 11, h: 12, color: COLORS.red,   label: 'B' },
                { x: 68, y: 62, w: 10, h: 11, color: COLORS.amber, label: '?' },
              ]} style={{ width: '100%', height: '100%' }} />
            </div>
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
              <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: COLORS.white, lineHeight: 1.45 }}>{p.ia}</div>
            </div>
            <div style={{ padding: '10px 14px', fontFamily: FONT_SANS, fontSize: 12, color: COLORS.muted, lineHeight: 1.45 }}>
              <span style={{ color: COLORS.white }}>{p.author.split(' ')[0]}</span> {p.caption}
            </div>
            <div style={{ padding: '0 14px 10px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {p.tags.map(t => <span key={t} style={{ fontFamily: FONT_MONO, fontSize: 9, color: '#5B9ED1', letterSpacing: 0.3 }}>{t}</span>)}
            </div>
            <div style={{
              padding: '10px 14px', borderTop: `0.5px solid ${COLORS.line}`,
              display: 'flex', gap: 14, alignItems: 'center',
              fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, letterSpacing: 0.3,
            }}>
              <span>🔬 {p.reactions.scope}</span>
              <span>⚠ {p.reactions.alert}</span>
              <span>✓ {p.reactions.agree}</span>
              <span style={{ flex: 1, textAlign: 'right' }}>{p.comments} comentários</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute', right: 22, bottom: 110, zIndex: 45,
        width: 56, height: 56, borderRadius: '50%',
        background: COLORS.red, display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 6px 20px ${COLORS.red}80`, animation: 'pulse 2.4s ease-in-out infinite', cursor: 'pointer',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke={COLORS.white} strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// SCREEN 5 — CHAT (conectado ao backend)
// ══════════════════════════════════════════════════
const INITIAL_MESSAGES = [
  { role: 'assistant', text: 'Olá! Sou a **Hema** — sua assistente de hematologia. Posso analisar imagens, esclarecer morfologia celular ou explicar critérios diagnósticos.', time: '' },
];

const CHAT_SUGGESTIONS = [
  'O que são bastões de Auer?',
  'Critérios OMS para LMA',
  'Índice de maturação neutrofílica',
  'LPA: marcadores visuais',
];

function ChatScreen({ token }) {
  const [messages, setMessages] = React.useState(INITIAL_MESSAGES);
  const [input,    setInput]    = React.useState('');
  const [typing,   setTyping]   = React.useState(false);
  const [apiError, setApiError] = React.useState(null);
  const scrollRef  = React.useRef();

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const send = async (txt) => {
    if (!txt.trim() || typing) return;
    const userMsg = { role: 'user', text: txt, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setTyping(true);
    setApiError(null);

    // Converte para formato que a API espera
    const apiMessages = newMessages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role, content: m.text.replace(/\*\*(.*?)\*\*/g, '$1') }));

    try {
      const data = await window.HemaAPI.chat(apiMessages);
      const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply, time }]);
    } catch (e) {
      setApiError(e.message);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `⚠ Não foi possível conectar ao servidor: ${e.message}`,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        padding: '54px 20px 14px', borderBottom: `0.5px solid ${COLORS.line2}`,
        display: 'flex', alignItems: 'center', gap: 12, background: COLORS.bg,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${COLORS.red}, #6A1A12)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 16px ${COLORS.red}60`, position: 'relative',
        }}>
          <CellIcon size={20} color={COLORS.white} />
          <div style={{
            position: 'absolute', bottom: -1, right: -1,
            width: 11, height: 11, borderRadius: '50%',
            background: COLORS.green, border: `2px solid ${COLORS.bg}`,
          }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: COLORS.white, fontWeight: 600, letterSpacing: -0.2 }}>
            Hema · Assistente IA
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.green, letterSpacing: 0.5, marginTop: 1 }}>
            ● Online · Especialista em hematologia
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: 'auto', padding: '14px 16px 180px',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
            animation: 'fadeUp 300ms ease-out',
          }}>
            <div style={{
              maxWidth: '82%',
              background: m.role === 'user' ? COLORS.red : COLORS.bg2,
              border: m.role === 'user' ? 'none' : `0.5px solid ${COLORS.line2}`,
              borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              padding: '10px 12px',
            }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12.5, color: COLORS.white, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                {m.text.split('**').map((p, j) => j % 2 ? <b key={j}>{p}</b> : p)}
              </div>
              {m.time && (
                <div style={{
                  fontFamily: FONT_MONO, fontSize: 8,
                  color: m.role === 'user' ? 'rgba(255,255,255,0.7)' : COLORS.dim,
                  marginTop: 6, letterSpacing: 0.5, textAlign: 'right',
                }}>{m.time}</div>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex' }}>
            <div style={{
              background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`,
              padding: '12px 14px', borderRadius: '14px 14px 14px 4px',
              display: 'flex', gap: 4,
            }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: COLORS.red,
                  animation: `typing 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input + suggestions */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 92,
        padding: '0 16px 10px',
        background: 'linear-gradient(180deg, transparent, rgba(6,13,26,0.95) 30%)',
      }}>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
          {CHAT_SUGGESTIONS.map(s => (
            <div key={s} onClick={() => send(s)} style={{
              flexShrink: 0, padding: '7px 12px', borderRadius: 999,
              background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`,
              fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, letterSpacing: 0.3, cursor: 'pointer',
            }}>{s}</div>
          ))}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`,
          borderRadius: 14, padding: '8px 10px',
        }}>
          <input
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send(input)}
            placeholder="Pergunte sobre hematologia..."
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontFamily: FONT_SANS, fontSize: 13, color: COLORS.white,
            }}
          />
          <button onClick={() => send(input)} disabled={typing} style={{
            width: 34, height: 34, borderRadius: 8,
            background: typing ? 'rgba(192,57,43,0.4)' : COLORS.red,
            border: 'none', cursor: typing ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: typing ? 'none' : `0 0 10px ${COLORS.red}60`,
            transition: 'all 200ms',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M3 12l18-9-5 18-4-8-9-1z" fill={COLORS.white}/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// SCREEN 6 — PROFILE
// ══════════════════════════════════════════════════
function ProfileScreen({ user, onLogout, onUpgrade }) {
  const initials    = user?.name ? user.name.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('') : (user?.nome || 'U').split(' ').map(w => w[0]).slice(0,2).join('');
  const displayName = user?.name || user?.nome || 'Dr. Rafael Silva';
  const crbio       = user?.crbio || 'CRBM 12345';
  const specialty   = user?.specialty || 'Hematologia Clínica';
  const plano       = user?.plano || 'free';

  const [assinatura,   setAssinatura]   = React.useState(null);
  const [loadingPlano, setLoadingPlano] = React.useState(true);

  const formatarData = (d) => {
    if (!d) return '—';
    try {
      return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch { return d; }
  };

  const iconeMeio = (m) => {
    if (!m) return '💳';
    if (m.includes('pix'))    return '⚡';
    if (m.includes('boleto')) return '🏦';
    return '💳';
  };

  const statusBadge = (s) => {
    if (!s || s === 'ACTIVE')   return { label: 'Ativa',       cor: COLORS.green };
    if (s === 'OVERDUE')        return { label: 'Inadimplente', cor: COLORS.amber };
    if (s === 'CANCELLED')      return { label: 'Cancelada',    cor: COLORS.red };
    if (s === 'PENDING')        return { label: 'Pendente',     cor: COLORS.amber };
    return { label: s, cor: COLORS.muted };
  };

  const [foto,         setFoto]         = React.useState(localStorage.getItem('hema_foto') || null);
  const [stats,        setStats]        = React.useState({ analises: 0, posts: 0, precisao: null });
  const [historico,    setHistorico]    = React.useState([]);
  const [loadStats,    setLoadStats]    = React.useState(true);
  const [editandoPerfil, setEditandoPerfil] = React.useState(false);
  const [editNome,      setEditNome]      = React.useState('');
  const [editEspecial,  setEditEspecial]  = React.useState('');
  const [editEstado,    setEditEstado]    = React.useState('');
  const [salvandoPerfil, setSalvandoPerfil] = React.useState(false);
  const fotoRef = React.useRef();

  React.useEffect(() => {
    const token = localStorage.getItem('hema_token');

    const buscarAssinatura = async () => {
      if (!token) { setLoadingPlano(false); return; }
      try {
        const r = await fetch(`${window.HemaAPI.base}/billing/status`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (r.ok) setAssinatura(await r.json());
      } catch {}
      setLoadingPlano(false);
    };

    const buscarStats = async () => {
      if (!token) { setLoadStats(false); return; }
      try {
        // Análises do banco
        const r1 = await fetch(`${window.HemaAPI.base}/analysis/historico?limit=50`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (r1.ok) {
          const d = await r1.json();
          const lista = d.analises || [];
          const precisao = lista.length > 0
            ? Math.round(lista.reduce((acc, a) => acc + (a.confianca_pct || 0), 0) / lista.length)
            : null;
          setHistorico(lista);
          setStats(prev => ({ ...prev, analises: d.total || lista.length, precisao }));
        }
        // Posts: conta local (sem requisição extra)
        const user2 = (() => { try { return JSON.parse(localStorage.getItem('hema_user') || '{}'); } catch { return {}; } })();
        setStats(prev => ({ ...prev, posts: prev.posts }));
      } catch {}
      setLoadStats(false);
    };

    // Carrega tudo em paralelo
    Promise.all([buscarAssinatura(), buscarStats()]);
  }, []);

  const salvarFoto = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const b64 = reader.result;
      setFoto(b64);
      localStorage.setItem('hema_foto', b64);
    };
    reader.readAsDataURL(f);
  };

  const exportarDados = async () => {
    const token = localStorage.getItem('hema_token');
    const user  = (() => { try { return JSON.parse(localStorage.getItem('hema_user') || '{}'); } catch { return {}; } })();
    const linhas = [
      ['ID', 'Data', 'Total Células', 'Blastos %', 'Confiança %', 'Suspeita', 'Células Atípicas'],
      ...historico.map(a => [
        a.id,
        a.criado_em ? new Date(a.criado_em).toLocaleString('pt-BR') : '',
        a.total_celulas,
        a.blastos_pct,
        a.confianca_pct,
        a.suspeita_diag,
        a.celulas_atipicas ? 'Sim' : 'Não',
      ])
    ];
    const csv = linhas.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `hematologia_${user.crbio?.replace(' ', '_') || 'dados'}_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ paddingBottom: 140, minHeight: '100%', position: 'relative' }}>
      <LabGrid opacity={0.035} />
      <div style={{ position: 'relative', height: 140 }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <MicroSlide seed={29} style={{ width: '100%', height: '100%', filter: 'blur(6px)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(6,13,26,0.4), ${COLORS.bg})` }} />
        </div>
      </div>
      <div style={{ padding: '0 20px', marginTop: -50, position: 'relative' }}>

        {/* Avatar com foto + botão editar */}
        <div style={{ position: 'relative', width: 90, height: 90 }}>
          <input type="file" accept="image/*" ref={fotoRef} style={{ display: 'none' }} onChange={salvarFoto} />
          <div onClick={() => fotoRef.current?.click()} style={{
            width: 90, height: 90, borderRadius: '50%', cursor: 'pointer',
            background: foto ? 'transparent' : `linear-gradient(135deg, ${COLORS.red}, #6A1A12)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: FONT_DISPLAY, fontSize: 32, color: COLORS.white,
            border: `3px solid ${COLORS.bg}`, boxShadow: `0 0 20px ${COLORS.red}40`,
            overflow: 'hidden',
          }}>
            {foto
              ? <img src={foto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : initials
            }
          </div>
          <div onClick={() => fotoRef.current?.click()} style={{
            position: 'absolute', bottom: 2, right: 2,
            width: 26, height: 26, borderRadius: '50%',
            background: COLORS.red, border: `2px solid ${COLORS.bg}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="13" r="4" stroke="white" strokeWidth="1.8"/>
            </svg>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: COLORS.white, fontWeight: 600, letterSpacing: -0.3 }}>{displayName}</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.muted, letterSpacing: 0.8, marginTop: 3 }}>{specialty.toUpperCase()} · {crbio}</div>
        </div>

        {/* Stats do banco */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`, borderRadius: 14, overflow: 'hidden' }}>
          {[
            { n: loadStats ? '...' : String(stats.analises), l: 'Análises' },
            { n: loadStats ? '...' : String(stats.posts),    l: 'Publicados' },
            { n: loadStats ? '...' : stats.precisao ? `${stats.precisao}%` : '—', l: 'Precisão' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '14px 10px', textAlign: 'center', borderRight: i < 2 ? `0.5px solid ${COLORS.line}` : 'none' }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: COLORS.white, fontWeight: 700 }}>{s.n}</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Histórico de análises */}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 10 }}>· Histórico de análises</div>
          {historico.length === 0 && !loadStats ? (
            <div style={{ background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`, borderRadius: 14, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim }}>Nenhuma análise realizada ainda</div>
            </div>
          ) : (
            <div style={{ background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`, borderRadius: 14, overflow: 'hidden' }}>
              {historico.slice(0, 8).map((a, i) => {
                const status = a.celulas_atipicas ? 'alert' : a.blastos_pct > 0 ? 'review' : 'normal';
                const cores  = { alert: COLORS.red, review: COLORS.amber, normal: COLORS.green };
                const labels = { alert: 'Atípico', review: `Blastos ${a.blastos_pct}%`, normal: 'Normal' };
                const data   = a.criado_em ? new Date(a.criado_em).toLocaleDateString('pt-BR', { day:'2-digit', month:'short' }) : '—';
                return (
                  <div key={a.id} style={{ padding: '12px 14px', borderBottom: i < historico.slice(0,8).length - 1 ? `0.5px solid ${COLORS.line}` : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: cores[status], flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.white, fontWeight: 500 }}>{labels[status]}</div>
                      <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, marginTop: 2 }}>{a.total_celulas} células · Confiança {a.confianca_pct}%</div>
                    </div>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim }}>{data}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Card de Assinatura ── */}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 10 }}>· Assinatura</div>
          <div style={{
            borderRadius: 14, overflow: 'hidden',
            background: plano === 'pro'
              ? `linear-gradient(135deg, rgba(192,57,43,0.15), ${COLORS.bg2})`
              : COLORS.bg2,
            border: `0.5px solid ${plano === 'pro' ? COLORS.redBorder : COLORS.line2}`,
          }}>
            {/* Header do card */}
            <div style={{ padding: '14px 16px', borderBottom: `0.5px solid ${COLORS.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 700,
                  color: plano === 'pro' ? COLORS.red : COLORS.muted,
                }}>
                  {plano === 'pro' ? '⭐ Plano Pro' : '🔓 Plano Free'}
                </div>
                {!loadingPlano && assinatura?.subscription_status && (() => {
                  const { label, cor } = statusBadge(assinatura.subscription_status);
                  return (
                    <div style={{ fontFamily: FONT_MONO, fontSize: 8, color: cor, background: `${cor}20`, border: `0.5px solid ${cor}50`, borderRadius: 4, padding: '2px 6px', letterSpacing: 0.8 }}>
                      {label}
                    </div>
                  );
                })()}
              </div>
              {loadingPlano && (
                <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${COLORS.line2}`, borderTopColor: COLORS.red, animation: 'spin 0.8s linear infinite' }} />
              )}
            </div>

            {/* Detalhes Pro */}
            {plano === 'pro' && !loadingPlano && (
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 0.4 }}>PERÍODO</div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.white }}>
                    {assinatura?.periodo === 'anual' ? 'Anual · R$ 790/ano' : 'Mensal · R$ 89/mês'}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 0.4 }}>PRÓXIMA COBRANÇA</div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.white }}>
                    {formatarData(assinatura?.proxima_cobranca)}
                  </div>
                </div>
                {assinatura?.meio_pagamento && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 0.4 }}>MEIO DE PAGAMENTO</div>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.white }}>
                      {iconeMeio(assinatura.meio_pagamento)} {assinatura.meio_pagamento}
                    </div>
                  </div>
                )}
                <div style={{ marginTop: 4, display: 'flex', gap: 8 }}>
                  <button onClick={() => window.open('https://sandbox.asaas.com', '_blank')} style={{
                    flex: 1, background: 'transparent', border: `0.5px solid ${COLORS.line2}`,
                    color: COLORS.muted, borderRadius: 8, padding: '8px',
                    fontFamily: FONT_MONO, fontSize: 9, letterSpacing: 0.6, cursor: 'pointer',
                  }}>
                    Gerenciar pagamento →
                  </button>
                  <button onClick={() => {
                    if (confirm('Cancelar assinatura? Você voltará para o plano Free.')) {
                      const token = localStorage.getItem('hema_token');
                      fetch(`${window.HemaAPI.base}/billing/cancelar`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify({ motivo: 'Cancelado pelo usuário' }),
                      }).then(() => window.location.reload());
                    }
                  }} style={{
                    background: 'transparent', border: `0.5px solid rgba(192,57,43,0.4)`,
                    color: COLORS.red, borderRadius: 8, padding: '8px 12px',
                    fontFamily: FONT_MONO, fontSize: 9, cursor: 'pointer',
                  }}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Free — botão upgrade */}
            {plano === 'free' && (
              <div style={{ padding: '14px 16px' }}>
                <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: COLORS.muted, marginBottom: 12, lineHeight: 1.5 }}>
                  Faça upgrade para analisar esfregaços com IA, exportar laudos e acessar o chat com a Hema.
                </div>
                <button onClick={onUpgrade} style={{
                  width: '100%', background: COLORS.red, color: COLORS.white,
                  border: 'none', borderRadius: 10, padding: '12px',
                  fontFamily: FONT_MONO, fontSize: 11, letterSpacing: 1.6, fontWeight: 700,
                  textTransform: 'uppercase', cursor: 'pointer',
                  boxShadow: `0 4px 14px ${COLORS.red}40`,
                }}>
                  Assinar Pro — R$ 89/mês →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Configurações */}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 10 }}>· Configurações</div>
          <div style={{ background: COLORS.bg2, border: `0.5px solid ${COLORS.line2}`, borderRadius: 14, overflow: 'hidden' }}>
            {[
              { t: 'Editar perfil',      d: 'Nome, especialidade, estado', action: () => { setEditNome(displayName); setEditEspecial(specialty); setEditEstado(user?.estado || ''); setEditandoPerfil(true); } },
              { t: 'Privacidade LGPD',   d: 'Anonimização ativa', action: null },
              { t: 'Integração LIS',     d: 'Conectar laboratório', action: null },
              { t: 'Alterar senha',      d: 'Segurança da conta', action: null },
              { t: 'Sair da conta',      d: '', danger: true, action: onLogout },
            ].map((r, i, a) => (
              <div key={i} onClick={r.action || undefined} style={{
                padding: '14px 14px', display: 'flex', alignItems: 'center',
                borderBottom: i < a.length - 1 ? `0.5px solid ${COLORS.line}` : 'none',
                cursor: r.action ? 'pointer' : 'default',
                opacity: !r.action && !r.danger ? 0.5 : 1,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: r.danger ? COLORS.red : COLORS.white, fontWeight: 500 }}>{r.t}</div>
                  {r.d && <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: COLORS.dim, marginTop: 2, letterSpacing: 0.3 }}>{r.d}</div>}
                </div>
                {!r.danger && r.action && (
                  <svg width="7" height="12" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke={COLORS.dim} strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Editar Perfil */}
        {editandoPerfil && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'flex-end' }}>
            <div style={{ width: '100%', background: '#0F1E35', borderRadius: '20px 20px 0 0', padding: '0 0 40px', border: `0.5px solid ${COLORS.line2}` }}>
              {/* Header */}
              <div style={{ padding: '16px 18px 12px', display: 'flex', alignItems: 'center', borderBottom: `0.5px solid ${COLORS.line2}`, position: 'sticky', top: 0, background: '#0F1E35', zIndex: 10 }}>
                <button onClick={() => setEditandoPerfil(false)} style={{ background: 'none', border: 'none', color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 11, cursor: 'pointer' }}>Cancelar</button>
                <div style={{ flex: 1, textAlign: 'center', fontFamily: FONT_DISPLAY, fontSize: 16, color: COLORS.white, fontWeight: 600 }}>Editar perfil</div>
                <button onClick={async () => {
                  setSalvandoPerfil(true);
                  const token = localStorage.getItem('hema_token');
                  try {
                    const r = await fetch(`${window.HemaAPI.base}/auth/perfil`, {
                      method: 'PATCH',
                      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                      body: JSON.stringify({ nome: editNome, specialty: editEspecial, estado: editEstado }),
                    });
                    if (r.ok) {
                      const savedUser = JSON.parse(localStorage.getItem('hema_user') || '{}');
                      savedUser.nome = editNome; savedUser.name = editNome;
                      savedUser.specialty = editEspecial; savedUser.estado = editEstado;
                      localStorage.setItem('hema_user', JSON.stringify(savedUser));
                      setEditandoPerfil(false);
                      window.location.reload();
                    }
                  } catch {}
                  setSalvandoPerfil(false);
                }} style={{ background: COLORS.red, border: 'none', color: COLORS.white, borderRadius: 8, padding: '7px 14px', fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, cursor: 'pointer', opacity: salvandoPerfil ? 0.6 : 1 }}>
                  {salvandoPerfil ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
              {/* Campos */}
              <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Nome completo', val: editNome, set: setEditNome, placeholder: 'Seu nome' },
                  { label: 'Especialidade', val: editEspecial, set: setEditEspecial, placeholder: 'Ex: Hematologia Clínica' },
                  { label: 'Estado (UF)',   val: editEstado, set: setEditEstado, placeholder: 'Ex: SP' },
                ].map((f, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>{f.label}</div>
                    <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                      style={{ width: '100%', background: 'rgba(240,244,248,0.04)', border: `1px solid ${COLORS.line2}`, borderRadius: 10, padding: '12px 14px', color: COLORS.white, fontFamily: FONT_SANS, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                ))}
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: COLORS.dim, letterSpacing: 0.4, marginTop: 4 }}>
                  * Registro profissional e e-mail não podem ser alterados aqui. Entre em contato com o suporte.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
window.HemaScreens2 = { AnalysisScreen, CommunityScreen, ChatScreen, ProfileScreen };
