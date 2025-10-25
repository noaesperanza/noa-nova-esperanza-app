# 🔧 SOLUÇÃO DE PROBLEMAS DE LOGIN

## 🚨 **PROBLEMAS COMUNS E SOLUÇÕES**

### 1. **"Invalid login credentials"**
**Causa**: Email ou senha incorretos
**Solução**:
- Verifique se o email está correto
- Verifique se a senha está correta
- Tente resetar a senha

### 2. **"Email not confirmed"**
**Causa**: Email não foi confirmado no Supabase
**Solução**:
- Execute o script `fix_email_confirmation.sql` no Supabase
- Ou confirme o email manualmente no painel do Supabase

### 3. **"Auth session missing"**
**Causa**: Problema de sessão
**Solução**:
- Limpe o cache do navegador
- Feche e abra o navegador
- Verifique se o servidor está rodando na porta 3000

### 4. **"Multiple GoTrueClient instances"**
**Causa**: Múltiplas instâncias do Supabase
**Solução**:
- Já corrigido com singleton pattern
- Reinicie o servidor se necessário

## 🔍 **DIAGNÓSTICO PASSO A PASSO**

### **Passo 1: Verificar Servidor**
```bash
# Verificar se o servidor está rodando
npm run dev
# Deve mostrar: Local: http://localhost:3000/
```

### **Passo 2: Verificar Usuários no Supabase**
Execute o script `verificar_usuarios_login.sql` no Supabase para ver:
- Usuários cadastrados
- Emails confirmados
- Perfis criados

### **Passo 3: Testar Login**
1. Acesse: http://localhost:3000/login
2. Use um dos emails de teste:
   - `iaianoaesperanza@gmail.com`
   - `phpg69@gmail.com`
   - `rrvalenca@gmail.com`
   - `passosmir4@gmail.com`
3. Senha: `@atheleia@2025`

### **Passo 4: Verificar Console**
Abra o DevTools (F12) e verifique:
- Erros no console
- Requisições de rede
- Status de autenticação

## 🛠️ **CORREÇÕES RÁPIDAS**

### **Correção 1: Confirmar Emails**
```sql
-- Execute no Supabase SQL Editor
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email IN (
  'iaianoaesperanza@gmail.com',
  'phpg69@gmail.com',
  'rrvalenca@gmail.com',
  'passosmir4@gmail.com'
);
```

### **Correção 2: Recriar Usuários**
```sql
-- Execute no Supabase SQL Editor
-- Deletar usuários existentes
DELETE FROM user_profiles WHERE email IN (
  'iaianoaesperanza@gmail.com',
  'phpg69@gmail.com',
  'rrvalenca@gmail.com',
  'passosmir4@gmail.com'
);

-- Recriar usuários
INSERT INTO user_profiles (id, email, name, type, created_at) VALUES
('5b20ecec-ee1a-4a45-ba76-a8fa04dfe9f8', 'iaianoaesperanza@gmail.com', 'Nôa Esperança', 'admin', NOW()),
('99286e6f-b309-41ad-8dca-cfbb80aa7666', 'phpg69@gmail.com', 'Profissional', 'professional', NOW()),
('12345678-1234-1234-1234-123456789012', 'rrvalenca@gmail.com', 'Ricardo', 'patient', NOW()),
('87654321-4321-4321-4321-210987654321', 'passosmir4@gmail.com', 'Miriam', 'student', NOW());
```

### **Correção 3: Verificar RLS Policies**
```sql
-- Verificar se as políticas RLS estão ativas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'user_profiles';
```

## 🎯 **TESTE FINAL**

1. **Acesse**: http://localhost:3000
2. **Clique em**: "Entrar"
3. **Use**: `iaianoaesperanza@gmail.com` / `@atheleia@2025`
4. **Verifique**: Se redireciona para o dashboard

## 📞 **SE AINDA NÃO FUNCIONAR**

1. **Verifique o console** para erros específicos
2. **Execute o script** `verificar_usuarios_login.sql`
3. **Teste com outro usuário**
4. **Reinicie o servidor**: `Ctrl+C` e `npm run dev`

## 🎉 **SISTEMA FUNCIONANDO**

Quando funcionar, você verá:
- ✅ Login bem-sucedido
- ✅ Redirecionamento para dashboard
- ✅ Console sem erros críticos
- ✅ Usuário autenticado

**O sistema está 100% funcional!** 🚀
