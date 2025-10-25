-- CRIAR USUÁRIO DE TESTE NO SUPABASE
-- Execute este script no SQL Editor do Supabase

-- 1. CRIAR USUÁRIO DE TESTE NA TABELA user_profiles
INSERT INTO user_profiles (id, email, name, type, created_at, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'teste@noaesperanza.com',
    'Usuário Teste',
    'patient',
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- 2. VERIFICAR SE O USUÁRIO FOI CRIADO
SELECT 
    id,
    email,
    name,
    type,
    created_at
FROM user_profiles 
WHERE email = 'teste@noaesperanza.com';

-- 3. CRIAR USUÁRIO ADMIN DE TESTE
INSERT INTO user_profiles (id, email, name, type, created_at, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000002',
    'admin@noaesperanza.com',
    'Admin Teste',
    'admin',
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- 4. CRIAR USUÁRIO PROFISSIONAL DE TESTE
INSERT INTO user_profiles (id, email, name, type, created_at, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000003',
    'profissional@noaesperanza.com',
    'Profissional Teste',
    'professional',
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- 5. VERIFICAR TODOS OS USUÁRIOS CRIADOS
SELECT 
    id,
    email,
    name,
    type,
    created_at
FROM user_profiles 
ORDER BY created_at DESC;
