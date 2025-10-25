-- VERIFICAR TABELA 'user_profiles' EXISTENTE
-- Execute este script no SQL Editor do Supabase

-- 1. VERIFICAR ESTRUTURA DA TABELA 'user_profiles'
SELECT 
    column_name as "Coluna",
    data_type as "Tipo",
    is_nullable as "Nullable",
    column_default as "Default"
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. VERIFICAR DADOS NA TABELA 'user_profiles'
SELECT 
    COUNT(*) as "Total de Registros"
FROM user_profiles;

-- 3. VERIFICAR PRIMEIROS REGISTROS (se existirem)
SELECT 
    id,
    email,
    name,
    type,
    created_at
FROM user_profiles
LIMIT 5;

-- 4. VERIFICAR SE EXISTE COLUNA 'email' NA 'user_profiles'
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'email' AND table_schema = 'public')
        THEN '✅ Coluna email EXISTE em user_profiles'
        ELSE '❌ Coluna email NÃO EXISTE em user_profiles'
    END as "Status da Coluna email";

-- 5. VERIFICAR SE EXISTE COLUNA 'name' NA 'user_profiles'
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'name' AND table_schema = 'public')
        THEN '✅ Coluna name EXISTE em user_profiles'
        ELSE '❌ Coluna name NÃO EXISTE em user_profiles'
    END as "Status da Coluna name";

-- 6. VERIFICAR SE EXISTE COLUNA 'type' NA 'user_profiles'
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'type' AND table_schema = 'public')
        THEN '✅ Coluna type EXISTE em user_profiles'
        ELSE '❌ Coluna type NÃO EXISTE em user_profiles'
    END as "Status da Coluna type";
