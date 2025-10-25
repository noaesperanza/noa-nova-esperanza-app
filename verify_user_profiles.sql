-- VERIFICAR E AJUSTAR TABELA 'user_profiles'
-- Execute este script no SQL Editor do Supabase

-- 1. VERIFICAR ESTRUTURA ATUAL DA TABELA 'user_profiles'
SELECT 
    column_name as "Coluna",
    data_type as "Tipo",
    is_nullable as "Nullable",
    column_default as "Default"
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. VERIFICAR SE EXISTEM AS COLUNAS NECESSÁRIAS
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'email' AND table_schema = 'public')
        THEN '✅ Coluna email EXISTE'
        ELSE '❌ Coluna email NÃO EXISTE'
    END as "Status email",
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'name' AND table_schema = 'public')
        THEN '✅ Coluna name EXISTE'
        ELSE '❌ Coluna name NÃO EXISTE'
    END as "Status name",
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'type' AND table_schema = 'public')
        THEN '✅ Coluna type EXISTE'
        ELSE '❌ Coluna type NÃO EXISTE'
    END as "Status type";

-- 3. ADICIONAR COLUNAS FALTANTES SE NECESSÁRIO
-- (Execute apenas se as colunas não existirem)

-- Adicionar coluna 'email' se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'email' AND table_schema = 'public') THEN
        ALTER TABLE user_profiles ADD COLUMN email VARCHAR(255);
    END IF;
END $$;

-- Adicionar coluna 'name' se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'name' AND table_schema = 'public') THEN
        ALTER TABLE user_profiles ADD COLUMN name VARCHAR(255);
    END IF;
END $$;

-- Adicionar coluna 'type' se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'type' AND table_schema = 'public') THEN
        ALTER TABLE user_profiles ADD COLUMN type VARCHAR(20) DEFAULT 'patient';
    END IF;
END $$;

-- Adicionar coluna 'avatar' se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'avatar' AND table_schema = 'public') THEN
        ALTER TABLE user_profiles ADD COLUMN avatar TEXT;
    END IF;
END $$;

-- Adicionar coluna 'nft_soulbound' se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'nft_soulbound' AND table_schema = 'public') THEN
        ALTER TABLE user_profiles ADD COLUMN nft_soulbound TEXT;
    END IF;
END $$;

-- 4. VERIFICAR ESTRUTURA FINAL
SELECT 
    column_name as "Coluna",
    data_type as "Tipo",
    is_nullable as "Nullable",
    column_default as "Default"
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 5. VERIFICAR SE A TABELA TEM DADOS
SELECT 
    COUNT(*) as "Total de Registros em user_profiles"
FROM user_profiles;
