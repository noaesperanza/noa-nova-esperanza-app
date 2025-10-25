-- CORRIGIR TABELA USERS NO SUPABASE
-- Execute este script no SQL Editor do Supabase

-- 1. VERIFICAR SE EXISTE TABELA 'user_profiles' (que pode ser a tabela de usuários)
SELECT 
    column_name as "Coluna",
    data_type as "Tipo",
    is_nullable as "Nullable"
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. VERIFICAR DADOS NA TABELA 'user_profiles'
SELECT 
    COUNT(*) as "Total de Registros",
    COUNT(DISTINCT id) as "IDs Únicos"
FROM user_profiles;

-- 3. VERIFICAR ESTRUTURA DA TABELA 'user_profiles'
SELECT 
    'user_profiles' as "Tabela",
    column_name as "Coluna",
    data_type as "Tipo",
    is_nullable as "Nullable",
    column_default as "Default"
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. CRIAR TABELA 'users' SE NÃO EXISTIR
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('patient', 'professional', 'student', 'admin')) NOT NULL DEFAULT 'patient',
    avatar TEXT,
    nft_soulbound TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. HABILITAR RLS NA TABELA 'users'
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 6. CRIAR POLÍTICAS PARA A TABELA 'users'
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 7. VERIFICAR SE A TABELA 'users' FOI CRIADA
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users' AND table_schema = 'public')
        THEN '✅ Tabela users CRIADA com sucesso'
        ELSE '❌ Erro ao criar tabela users'
    END as "Status da Criação";

-- 8. VERIFICAR ESTRUTURA DA NOVA TABELA 'users'
SELECT 
    column_name as "Coluna",
    data_type as "Tipo",
    is_nullable as "Nullable"
FROM information_schema.columns 
WHERE table_name = 'users' 
AND table_schema = 'public'
ORDER BY ordinal_position;
