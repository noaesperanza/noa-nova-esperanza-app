-- =====================================================
-- VERIFICAR ESTRUTURA COMPLETA DO SUPABASE
-- Execute este script no SQL Editor do Supabase
-- =====================================================

-- 1. VERIFICAR EXTENSÕES INSTALADAS
SELECT 
    extname as "Extensão",
    extversion as "Versão"
FROM pg_extension 
WHERE extname IN ('uuid-ossp', 'pgcrypto');

-- 2. LISTAR TODAS AS TABELAS EXISTENTES
SELECT 
    schemaname as "Schema",
    tablename as "Tabela",
    tableowner as "Proprietário"
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 3. VERIFICAR COLUNAS DE CADA TABELA
SELECT 
    t.table_name as "Tabela",
    c.column_name as "Coluna",
    c.data_type as "Tipo",
    c.is_nullable as "Nullable",
    c.column_default as "Default"
FROM information_schema.tables t
JOIN information_schema.columns c ON t.table_name = c.table_name
WHERE t.table_schema = 'public'
ORDER BY t.table_name, c.ordinal_position;

-- 4. VERIFICAR CHAVES ESTRANGEIRAS
SELECT
    tc.table_name as "Tabela",
    kcu.column_name as "Coluna",
    ccu.table_name as "Tabela Referenciada",
    ccu.column_name as "Coluna Referenciada"
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
ORDER BY tc.table_name;

-- 5. VERIFICAR POLÍTICAS RLS (Row Level Security)
SELECT 
    schemaname as "Schema",
    tablename as "Tabela",
    rowsecurity as "RLS Ativo"
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 6. LISTAR POLÍTICAS DE SEGURANÇA
SELECT 
    schemaname as "Schema",
    tablename as "Tabela",
    policyname as "Política",
    permissive as "Permissiva",
    roles as "Roles",
    cmd as "Comando",
    qual as "Condição"
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 7. VERIFICAR ÍNDICES
SELECT 
    schemaname as "Schema",
    tablename as "Tabela",
    indexname as "Índice",
    indexdef as "Definição"
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 8. CONTAR REGISTROS EM CADA TABELA
SELECT 
    'users' as "Tabela",
    COUNT(*) as "Registros"
FROM users
UNION ALL
SELECT 
    'pacientes' as "Tabela",
    COUNT(*) as "Registros"
FROM pacientes
UNION ALL
SELECT 
    'chat_messages' as "Tabela",
    COUNT(*) as "Registros"
FROM chat_messages
UNION ALL
SELECT 
    'imre_assessments' as "Tabela",
    COUNT(*) as "Registros"
FROM imre_assessments
UNION ALL
SELECT 
    'courses' as "Tabela",
    COUNT(*) as "Registros"
FROM courses
UNION ALL
SELECT 
    'course_modules' as "Tabela",
    COUNT(*) as "Registros"
FROM course_modules;

-- 9. VERIFICAR USUÁRIOS AUTENTICADOS
SELECT 
    id,
    email,
    name,
    type,
    created_at
FROM users
ORDER BY created_at DESC;

-- 10. VERIFICAR CONFIGURAÇÕES DE AUTENTICAÇÃO
SELECT 
    key,
    value
FROM auth.config
WHERE key IN ('site_url', 'additional_redirect_urls', 'jwt_expiry');

-- 11. VERIFICAR FUNÇÕES E TRIGGERS
SELECT 
    routine_name as "Função",
    routine_type as "Tipo",
    data_type as "Retorno"
FROM information_schema.routines 
WHERE routine_schema = 'public'
ORDER BY routine_name;

-- 12. VERIFICAR TRIGGERS
SELECT 
    trigger_name as "Trigger",
    event_manipulation as "Evento",
    action_timing as "Timing",
    action_statement as "Ação"
FROM information_schema.triggers 
WHERE trigger_schema = 'public'
ORDER BY trigger_name;
