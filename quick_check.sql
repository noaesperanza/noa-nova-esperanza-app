-- VERIFICAÇÃO RÁPIDA DO SUPABASE
-- Execute este script no SQL Editor do Supabase

-- 1. LISTAR TODAS AS TABELAS
SELECT 
    tablename as "Tabelas Existentes"
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. VERIFICAR SE A TABELA 'users' EXISTE
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users' AND table_schema = 'public')
        THEN '✅ Tabela users EXISTE'
        ELSE '❌ Tabela users NÃO EXISTE'
    END as "Status da Tabela users";

-- 3. VERIFICAR SE A TABELA 'pacientes' EXISTE
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'pacientes' AND table_schema = 'public')
        THEN '✅ Tabela pacientes EXISTE'
        ELSE '❌ Tabela pacientes NÃO EXISTE'
    END as "Status da Tabela pacientes";

-- 4. VERIFICAR SE A TABELA 'chat_messages' EXISTE
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'chat_messages' AND table_schema = 'public')
        THEN '✅ Tabela chat_messages EXISTE'
        ELSE '❌ Tabela chat_messages NÃO EXISTE'
    END as "Status da Tabela chat_messages";

-- 5. VERIFICAR SE A TABELA 'imre_assessments' EXISTE
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'imre_assessments' AND table_schema = 'public')
        THEN '✅ Tabela imre_assessments EXISTE'
        ELSE '❌ Tabela imre_assessments NÃO EXISTE'
    END as "Status da Tabela imre_assessments";

-- 6. VERIFICAR SE A TABELA 'courses' EXISTE
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'courses' AND table_schema = 'public')
        THEN '✅ Tabela courses EXISTE'
        ELSE '❌ Tabela courses NÃO EXISTE'
    END as "Status da Tabela courses";

-- 7. VERIFICAR SE A TABELA 'course_modules' EXISTE
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'course_modules' AND table_schema = 'public')
        THEN '✅ Tabela course_modules EXISTE'
        ELSE '❌ Tabela course_modules NÃO EXISTE'
    END as "Status da Tabela course_modules";

-- 8. CONTAR TOTAL DE TABELAS
SELECT 
    COUNT(*) as "Total de Tabelas no Schema Public"
FROM pg_tables 
WHERE schemaname = 'public';

-- 9. VERIFICAR EXTENSÕES
SELECT 
    extname as "Extensão",
    extversion as "Versão"
FROM pg_extension 
WHERE extname IN ('uuid-ossp', 'pgcrypto');
