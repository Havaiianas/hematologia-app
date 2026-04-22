const API_BASE = 'https://api.hematologia.app';
window.HemaAPI = {
  base: API_BASE,
  async login(crbio, email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({crbio,email,password}) });
    if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.detail||'Erro ao autenticar'); }
    return res.json();
  },
  async cadastrar({nome,crbio,email,senha,plano}) {
    const res = await fetch(`${API_BASE}/auth/cadastro`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({nome,crbio,email,senha,plano}) });
    if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.detail||'Erro ao criar conta'); }
    return res.json();
  },
  async recuperarSenha(email) {
    const res = await fetch(`${API_BASE}/auth/recuperar-senha`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email}) });
    if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.detail||'Erro ao enviar e-mail'); }
    return res.json();
  },
  async verificarCodigo(email, codigo) {
    const res = await fetch(`${API_BASE}/auth/verificar-codigo`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,codigo}) });
    if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.detail||'Código inválido'); }
    return res.json();
  },
  async redefinirSenha(email, codigo, nova_senha) {
    const res = await fetch(`${API_BASE}/auth/redefinir-senha`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,codigo,nova_senha}) });
    if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.detail||'Erro ao redefinir senha'); }
    return res.json();
  },
  async analyzeImage(file, token) {
    const form = new FormData(); form.append('file', file);
    const res = await fetch(`${API_BASE}/analysis/image`, { method:'POST', headers: token?{Authorization:`Bearer ${token}`}:{}, body:form });
    if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.detail||'Erro na análise'); }
    return res.json();
  },
  async analyzeDemo() {
    const res = await fetch(`${API_BASE}/analysis/demo`);
    if (!res.ok) throw new Error('Backend indisponível');
    return res.json();
  },
  async chat(messages, imageBase64=null, imageMediaType='image/jpeg') {
    const body = {messages};
    if (imageBase64) { body.image_base64=imageBase64; body.image_media_type=imageMediaType; }
    const res = await fetch(`${API_BASE}/chat/message`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) });
    if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.detail||'Erro no chat'); }
    return res.json();
  },
};
