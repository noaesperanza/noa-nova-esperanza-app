-- CORRIGIR POLÍTICAS RLS PARA RESOLVER ERRO 406
-- Execute este script no SQL Editor do Supabase

-- 1. REMOVER TODAS AS POLÍTICAS EXISTENTES
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;

-- 2. CRIAR POLÍTICAS MAIS PERMISSIVAS PARA TESTE
-- Política para visualizar perfil (mais permissiva)
CREATE POLICY "Allow all users to view profiles" ON user_profiles
    FOR SELECT USING (true);

-- Política para atualizar perfil (mais permissiva)
CREATE POLICY "Allow all users to update profiles" ON user_profiles
    FOR UPDATE USING (true);

-- Política para inserir perfil (mais permissiva)
CREATE POLICY "Allow all users to insert profiles" ON user_profiles
    FOR INSERT WITH CHECK (true);

-- 3. VERIFICAR SE RLS ESTÁ ATIVO
SELECT 
    tablename as "Tabela",
    rowsecurity as "RLS Ativo"
FROM pg_tables 
WHERE tablename = 'user_profiles' 
AND schemaname = 'public';

-- 4. GARANTIR QUE RLS ESTÁ ATIVO
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 5. VERIFICAR POLÍTICAS CRIADAS
SELECT 
    policyname as "Política",
    permissive as "Permissiva",
    roles as "Roles",
    cmd as "Comando",
    qual as "Condição"
FROM pg_policies 
WHERE tablename = 'user_profiles' 
AND schemaname = 'public'
ORDER BY policyname;

-- 6. TESTAR ACESSO À TABELA
SELECT 
    COUNT(*) as "Total de Registros",
    'user_profiles' as "Tabela"
FROM user_profiles;
