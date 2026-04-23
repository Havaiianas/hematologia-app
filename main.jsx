// main.jsx — roteamento com pagamento desacoplado do cadastro
const { COLORS, FONT_MONO, BottomNav } = window.Hema;
const { LoginScreen, HomeScreen } = window.HemaScreens;
const { AnalysisScreen, ChatScreen, ProfileScreen } = window.HemaScreens2;
const { EscolhaPlanoScreen, CadastroScreen, RecuperacaoSenhaScreen, UpgradeModal, PagamentoScreen } = window.HemaScreens3;
const { CommunityScreenV2 } = window.HemaScreens4;

function App() {

  // ── Autenticação
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('hema_loggedin') === '1');
  const [token,    setToken]    = React.useState(localStorage.getItem('hema_token') || null);
  const [user,     setUser]     = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('hema_user') || 'null'); } catch { return null; }
  });

  // ── Telas de auth: 'login' | 'planos' | 'cadastro' | 'pagamento-novo' | 'recuperacao'
  const [tela,           setTela]           = React.useState('login');
  const [planoEscolhido, setPlanoEscolhido] = React.useState('pro');
  const [anualEscolhido, setAnualEscolhido] = React.useState(false);

  // Dados do formulário de cadastro (para Pro — a conta é criada APÓS o pagamento)
  const [cadastroPendente, setCadastroPendente] = React.useState(null);
  // Dados do usuário já criado aguardando confirmação de pagamento
  const [userPendente,  setUserPendente]  = React.useState(null);
  const [tokenPendente, setTokenPendente] = React.useState(null);

  // ── Pagamento para usuário JÁ LOGADO (upgrade Free → Pro)
  const [showPagamento,  setShowPagamento]  = React.useState(false);

  // ── Tab do app
  const [tab, setTab] = React.useState(localStorage.getItem('hema_tab') || 'home');

  // ── Modal upgrade
  const [upgradeModal, setUpgradeModal] = React.useState(null);

  // ── Persistência
  React.useEffect(() => { localStorage.setItem('hema_tab', tab); }, [tab]);
  React.useEffect(() => { localStorage.setItem('hema_loggedin', loggedIn ? '1' : '0'); }, [loggedIn]);
  React.useEffect(() => {
    if (token) localStorage.setItem('hema_token', token);
    else localStorage.removeItem('hema_token');
  }, [token]);
  React.useEffect(() => {
    if (user) localStorage.setItem('hema_user', JSON.stringify(user));
    else localStorage.removeItem('hema_user');
  }, [user]);

  // ── Handlers de autenticação
  const handleLogin = (userData, accessToken) => {
    setUser(userData); setToken(accessToken); setLoggedIn(true); setShowPagamento(false);
  };

  const handleLogout = () => {
    setLoggedIn(false); setToken(null); setUser(null);
    setShowPagamento(false); localStorage.clear(); setTela('login');
  };

  // Seleção de plano → vai para cadastro
  const handlePlanoSelect = (plano, anual) => {
    setPlanoEscolhido(plano);
    setAnualEscolhido(anual);
    setTela('cadastro');
  };

  // Retorno do CadastroScreen:
  //   • Free: userData + accessToken reais (conta já criada)
  //   • Pro:  { dadosCadastro: {...} } + token null (conta ainda NÃO criada)
  const handleCadastroSucesso = (dadosOuUser, accessToken) => {
    if (planoEscolhido === 'pro') {
      // Conta ainda não foi criada — guarda dados e vai para pagamento
      setCadastroPendente(dadosOuUser.dadosCadastro);
      setTela('pagamento-novo');
    } else {
      // Free: conta criada, entra direto
      handleLogin(dadosOuUser, accessToken);
    }
  };

  // Após pagamento confirmado (novo usuário Pro):
  // Cria a conta agora e loga o usuário
  const handlePagamentoNovoConcluido = async () => {
    if (!cadastroPendente) { setTela('login'); return; }
    try {
      const data = await window.HemaAPI.cadastrar(cadastroPendente);
      handleLogin(data.user, data.access_token);
    } catch (e) {
      // Se der erro ao criar conta (ex.: e-mail já existe), leva para login
      setTela('login');
    }
  };

  // Upgrade de usuário JÁ LOGADO
  const iniciarUpgrade = (anual = false) => {
    setUpgradeModal(null);
    setAnualEscolhido(anual);
    setShowPagamento(true);
  };

  // Upgrade confirmado para usuário já logado
  const handleUpgradeConcluido = () => {
    const atualizado = { ...user, plano: 'pro' };
    setUser(atualizado);
    localStorage.setItem('hema_user', JSON.stringify(atualizado));
    setShowPagamento(false);
  };

  // Navegação com controle de plano
  const navegar = (novaTab) => {
    const requerPro = ['analyze', 'chat'];
    const nomes = { analyze: 'Análise com IA', chat: 'Chat com Hema' };
    if (requerPro.includes(novaTab) && user?.plano !== 'pro') {
      setUpgradeModal(nomes[novaTab]); return;
    }
    setTab(novaTab);
  };

  // ── RENDER ─────────────────────────────────────────────────

  // Tela de pagamento para NOVO usuário (antes de criar conta)
  if (!loggedIn && tela === 'pagamento-novo') {
    return (
      <div style={{ position: 'fixed', inset: 0, background: COLORS.bg, overflow: 'hidden' }}>
          <PagamentoScreen
            plano="pro"
            anual={anualEscolhido}
            user={cadastroPendente ? { nome: cadastroPendente.nome } : null}
            token={null}
            onSucesso={handlePagamentoNovoConcluido}
            onBack={() => setTela('cadastro')}
          />
      </div>
    );
  }

  // Fluxo de auth normal
  if (!loggedIn) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: COLORS.bg, overflow: 'hidden' }}>
          {tela === 'login' && (
            <LoginScreen
              onLogin={handleLogin}
              onCriarConta={() => setTela('planos')}
              onRecuperarSenha={() => setTela('recuperacao')}
            />
          )}
          {tela === 'planos' && (
            <EscolhaPlanoScreen
              onSelect={handlePlanoSelect}
              onBack={() => setTela('login')}
            />
          )}
          {tela === 'cadastro' && (
            <CadastroScreen
              plano={planoEscolhido}
              anual={anualEscolhido}
              onSuccess={handleCadastroSucesso}
              onBack={() => setTela('planos')}
            />
          )}
          {tela === 'recuperacao' && (
            <RecuperacaoSenhaScreen onBack={() => setTela('login')} />
          )}
      </div>
    );
  }

  // App logado
  const planoAtual = user?.plano || 'free';

  return (
    <div style={{ position: 'fixed', inset: 0, background: COLORS.bg, overflow: 'hidden' }}>

        <div key={tab} style={{ position: 'absolute', inset: 0, overflowY: 'auto', animation: 'fadeIn 260ms ease-out' }}>
          {tab === 'home'      && <HomeScreen onNavigate={navegar} onStartAnalysis={() => navegar('analyze')} user={user} />}
          {tab === 'analyze'   && <AnalysisScreen onNavigate={navegar} token={token} />}
          {tab === 'community' && <CommunityScreenV2 />}
          {tab === 'chat'      && <ChatScreen token={token} />}
          {tab === 'profile'   && <ProfileScreen user={user} onLogout={handleLogout} onUpgrade={() => iniciarUpgrade(false)} />}
        </div>

        {/* Banner Free */}
        {tab === 'home' && planoAtual === 'free' && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
            background: `linear-gradient(90deg, ${COLORS.red}, #8B1E15)`,
            padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: 'rgba(255,255,255,0.9)', letterSpacing: 0.4 }}>
              🔒 Plano Free · IA bloqueada
            </div>
            <div onClick={() => iniciarUpgrade(false)} style={{
              fontFamily: FONT_MONO, fontSize: 9, color: COLORS.white,
              background: 'rgba(255,255,255,0.2)', borderRadius: 6,
              padding: '4px 10px', cursor: 'pointer', letterSpacing: 0.6,
            }}>UPGRADE →</div>
          </div>
        )}

        <BottomNav current={tab} onNavigate={navegar} plano={planoAtual} />

        {/* Modal upgrade */}
        {upgradeModal && (
          <UpgradeModal
            feature={upgradeModal}
            onClose={() => setUpgradeModal(null)}
            onUpgrade={() => iniciarUpgrade(false)}
          />
        )}

        {/* Tela de pagamento para upgrade (sobrepõe o app) */}
        {showPagamento && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 200, animation: 'fadeIn 200ms ease-out' }}>
            <PagamentoScreen
              plano="pro"
              anual={anualEscolhido}
              user={user}
              token={token}
              onSucesso={handleUpgradeConcluido}
              onBack={() => setShowPagamento(false)}
            />
          </div>
        )}

    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
