-- =====================================================
-- VERIFICAR USUÁRIOS DISPONÍVEIS PARA LOGIN
-- =====================================================

-- 1. Verificar usuários na tabela auth.users
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;

-- 2. Verificar perfis na tabela user_profiles
SELECT 
  id,
  email,
  name,
  type,
  created_at
FROM user_profiles
ORDER BY created_at DESC;

-- 3. Verificar se há usuários com email confirmado
SELECT 
  COUNT(*) as total_usuarios,
  COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as usuarios_confirmados,
  COUNT(CASE WHEN email_confirmed_at IS NULL THEN 1 END) as usuarios_nao_confirmados
FROM auth.users;

-- 4. Listar usuários que podem fazer login (email confirmado)
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  p.name,
  p.type
FROM auth.users u
LEFT JOIN user_profiles p ON u.id = p.id
WHERE u.email_confirmed_at IS NOT NULL
ORDER BY u.created_at DESC;
