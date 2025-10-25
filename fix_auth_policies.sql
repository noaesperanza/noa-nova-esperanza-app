-- CORRIGIR POLÍTICAS DE AUTENTICAÇÃO
-- Execute este script no SQL Editor do Supabase

-- 1. VERIFICAR POLÍTICAS ATUAIS DA TABELA user_profiles
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

-- 2. REMOVER POLÍTICAS EXISTENTES (se houver)
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;

-- 3. CRIAR POLÍTICAS CORRETAS PARA user_profiles
-- Política para visualizar próprio perfil
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid()::text = id::text);

-- Política para atualizar próprio perfil
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Política para inserir próprio perfil
CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- 4. VERIFICAR SE RLS ESTÁ ATIVO
SELECT 
    tablename as "Tabela",
    rowsecurity as "RLS Ativo"
FROM pg_tables 
WHERE tablename = 'user_profiles' 
AND schemaname = 'public';

-- 5. GARANTIR QUE RLS ESTÁ ATIVO
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 6. VERIFICAR POLÍTICAS CRIADAS
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
