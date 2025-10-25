-- DEBUG DOS ERROS DO SUPABASE
-- Execute este script no SQL Editor do Supabase

-- 1. VERIFICAR SE EXISTEM TABELAS RELACIONADAS A USUÁRIOS
SELECT 
    tablename as "Tabelas com 'user' no nome"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE '%user%'
ORDER BY tablename;

-- 2. VERIFICAR SE EXISTEM TABELAS RELACIONADAS A AUTH
SELECT 
    tablename as "Tabelas de Autenticação"
FROM pg_tables 
WHERE schemaname = 'public' 
AND (tablename LIKE '%auth%' OR tablename LIKE '%session%' OR tablename LIKE '%login%')
ORDER BY tablename;

-- 3. VERIFICAR TABELAS DO SCHEMA 'auth' (Supabase Auth)
SELECT 
    tablename as "Tabelas do Schema Auth"
FROM pg_tables 
WHERE schemaname = 'auth'
ORDER BY tablename;

-- 4. VERIFICAR SE EXISTE TABELA 'user_mutes' (mencionada no erro)
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_mutes' AND table_schema = 'public')
        THEN '✅ Tabela user_mutes EXISTE'
        ELSE '❌ Tabela user_mutes NÃO EXISTE'
    END as "Status da Tabela user_mutes";

-- 5. VERIFICAR TODAS AS TABELAS DO SCHEMA PUBLIC
SELECT 
    tablename as "Todas as Tabelas Public",
    schemaname as "Schema"
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 6. VERIFICAR SE EXISTEM TABELAS COM NOMES SIMILARES
SELECT 
    tablename as "Tabelas Similares"
FROM pg_tables 
WHERE schemaname = 'public' 
AND (tablename LIKE '%user%' OR tablename LIKE '%patient%' OR tablename LIKE '%chat%' OR tablename LIKE '%message%')
ORDER BY tablename;

-- 7. VERIFICAR PERMISSÕES DO USUÁRIO ANÔNIMO
SELECT 
    grantee as "Usuário",
    table_name as "Tabela",
    privilege_type as "Privilégio"
FROM information_schema.table_privileges 
WHERE grantee = 'anon'
ORDER BY table_name, privilege_type;

-- 8. VERIFICAR SE RLS ESTÁ ATIVO EM ALGUMAS TABELAS
SELECT 
    tablename as "Tabela",
    rowsecurity as "RLS Ativo"
FROM pg_tables 
WHERE schemaname = 'public'
AND rowsecurity = true
ORDER BY tablename;
