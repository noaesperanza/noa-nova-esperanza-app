-- SINCRONIZAR USUÁRIOS REAIS DO SUPABASE AUTH
-- Execute este script no SQL Editor do Supabase

-- 1. VERIFICAR USUÁRIOS EXISTENTES NA TABELA auth.users
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at
FROM auth.users
WHERE email IN (
    'phpg69@gmail.com',
    'rrvalenca@gmail.com',
    'passosmir4@gmail.com',
    'iaianoaesperanza@gmail.com'
)
ORDER BY created_at DESC;

-- 2. CRIAR/ATUALIZAR PERFIS NA TABELA user_profiles
-- Usuário phpg69@gmail.com
INSERT INTO user_profiles (id, email, name, type, created_at, updated_at)
SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)) as name,
    'patient' as type,
    created_at,
    updated_at
FROM auth.users
WHERE email = 'phpg69@gmail.com'
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    updated_at = NOW();

-- Usuário rrvalenca@gmail.com
INSERT INTO user_profiles (id, email, name, type, created_at, updated_at)
SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)) as name,
    'professional' as type,
    created_at,
    updated_at
FROM auth.users
WHERE email = 'rrvalenca@gmail.com'
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    updated_at = NOW();

-- Usuário passosmir4@gmail.com
INSERT INTO user_profiles (id, email, name, type, created_at, updated_at)
SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)) as name,
    'student' as type,
    created_at,
    updated_at
FROM auth.users
WHERE email = 'passosmir4@gmail.com'
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    updated_at = NOW();

-- Usuário iaianoaesperanza@gmail.com
INSERT INTO user_profiles (id, email, name, type, created_at, updated_at)
SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)) as name,
    'admin' as type,
    created_at,
    updated_at
FROM auth.users
WHERE email = 'iaianoaesperanza@gmail.com'
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    updated_at = NOW();

-- 3. VERIFICAR PERFIS CRIADOS
SELECT 
    id,
    email,
    name,
    type,
    created_at
FROM user_profiles
WHERE email IN (
    'phpg69@gmail.com',
    'rrvalenca@gmail.com',
    'passosmir4@gmail.com',
    'iaianoaesperanza@gmail.com'
)
ORDER BY created_at DESC;

-- 4. VERIFICAR TOTAL DE USUÁRIOS
SELECT 
    COUNT(*) as "Total de Usuários",
    'user_profiles' as "Tabela"
FROM user_profiles;

-- 5. VERIFICAR TIPOS DE USUÁRIOS
SELECT 
    type as "Tipo",
    COUNT(*) as "Quantidade"
FROM user_profiles
GROUP BY type
ORDER BY type;
