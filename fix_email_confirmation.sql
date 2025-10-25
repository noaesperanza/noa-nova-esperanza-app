-- CORRIGIR CONFIRMAÇÃO DE EMAIL NO SUPABASE
-- Execute este script no SQL Editor do Supabase

-- 1. VERIFICAR USUÁRIOS NA TABELA auth.users
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at
FROM auth.users
ORDER BY created_at DESC;

-- 2. CONFIRMAR EMAIL DOS USUÁRIOS DE TESTE
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email IN (
    'teste@noaesperanza.com',
    'admin@noaesperanza.com',
    'profissional@noaesperanza.com'
);

-- 3. VERIFICAR SE OS EMAILS FORAM CONFIRMADOS
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at
FROM auth.users
WHERE email IN (
    'teste@noaesperanza.com',
    'admin@noaesperanza.com',
    'profissional@noaesperanza.com'
);

-- 4. CRIAR USUÁRIOS DE AUTENTICAÇÃO SE NÃO EXISTIREM
-- (Execute apenas se os usuários não existirem na tabela auth.users)

-- Criar usuário paciente
INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'teste@noaesperanza.com',
    crypt('123456', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
) ON CONFLICT (id) DO UPDATE SET
    email_confirmed_at = NOW();

-- Criar usuário admin
INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'admin@noaesperanza.com',
    crypt('123456', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
) ON CONFLICT (id) DO UPDATE SET
    email_confirmed_at = NOW();

-- Criar usuário profissional
INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'profissional@noaesperanza.com',
    crypt('123456', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
) ON CONFLICT (id) DO UPDATE SET
    email_confirmed_at = NOW();

-- 5. VERIFICAR USUÁRIOS FINAIS
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at
FROM auth.users
WHERE email IN (
    'teste@noaesperanza.com',
    'admin@noaesperanza.com',
    'profissional@noaesperanza.com'
);
