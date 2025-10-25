-- =====================================================
-- SUPABASE SCHEMA COMPLETO - NÔA ESPERANZA
-- Base de Dados Semântica e Sistema IMRE
-- =====================================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- TABELAS PRINCIPAIS
-- =====================================================

-- Tabela de usuários do sistema
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('patient', 'professional', 'student', 'admin')) NOT NULL DEFAULT 'patient',
    avatar TEXT,
    nft_soulbound TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela principal de pacientes
CREATE TABLE pacientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    idade INTEGER NOT NULL,
    genero VARCHAR(20) CHECK (genero IN ('masculino', 'feminino', 'outro')) NOT NULL,
    contato VARCHAR(255),
    data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de mensagens de chat
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_user BOOLEAN NOT NULL DEFAULT true,
    analysis JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de avaliações IMRE
CREATE TABLE imre_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('in_progress', 'completed', 'pending')) NOT NULL DEFAULT 'in_progress',
    current_block INTEGER NOT NULL DEFAULT 1,
    total_blocks INTEGER NOT NULL DEFAULT 37,
    data JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de cursos
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_hours INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de módulos de curso
CREATE TABLE course_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 0,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de abertura exponencial (Eixo 1)
CREATE TABLE abertura_exponencial (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
    identificacao TEXT,
    motivo_consulta TEXT,
    queixas JSONB,
    queixa_principal TEXT,
    expectativas TEXT,
    contexto_emocional TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de desenvolvimento indiciário (Eixo 2)
CREATE TABLE desenvolvimento_indiciario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
    
    -- História da Doença Atual
    hda_inicio TEXT,
    hda_evolucao TEXT,
    hda_caracteristicas TEXT,
    hda_fatores_moduladores TEXT,
    hda_impacto_funcional TEXT,
    hda_tratamentos_anteriores JSONB,
    
    -- História Patológica
    historia_doencas_previas JSONB,
    historia_cirurgias JSONB,
    historia_hospitalizacoes JSONB,
    
    -- História Familiar
    historia_familiar_doencas JSONB,
    historia_familiar_padroes JSONB,
    
    -- Alergias
    alergias_medicamentos JSONB,
    alergias_alimentos JSONB,
    alergias_outras JSONB,
    
    -- Hábitos de Vida
    habitos_alimentacao TEXT,
    habitos_sono TEXT,
    habitos_exercicios TEXT,
    habitos_trabalho TEXT,
    habitos_contexto_social TEXT,
    
    -- Medicações
    medicamentos_atuais JSONB,
    medicamentos_anteriores JSONB,
    medicamentos_suplementos JSONB,
    
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de fechamento consensual (Eixo 3)
CREATE TABLE fechamento_consensual (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
    revisao_narrativa TEXT,
    complementacoes JSONB,
    exames_solicitados JSONB,
    proximos_passos TEXT,
    observacoes TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de contexto longitudinal
CREATE TABLE contexto_longitudinal (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
    
    -- Evolução de sintomas
    evolucao_sintomas JSONB,
    
    -- Evolução de medicamentos
    evolucao_medicamentos JSONB,
    
    -- Evolução de exames
    evolucao_exames JSONB,
    
    -- Consultas profissionais
    consultas_profissionais JSONB,
    
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de interações com IA
CREATE TABLE interacoes_ia (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
    data TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    pergunta TEXT NOT NULL,
    resposta TEXT NOT NULL,
    contexto_utilizado TEXT,
    satisfacao INTEGER CHECK (satisfacao >= 1 AND satisfacao <= 5),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de permissões de compartilhamento
CREATE TABLE permissoes_compartilhamento (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
    dados_basicos BOOLEAN DEFAULT TRUE,
    sintomas BOOLEAN DEFAULT FALSE,
    medicamentos BOOLEAN DEFAULT FALSE,
    exames BOOLEAN DEFAULT FALSE,
    consultas BOOLEAN DEFAULT FALSE,
    evolucao BOOLEAN DEFAULT FALSE,
    pesquisa BOOLEAN DEFAULT FALSE,
    validade TIMESTAMP WITH TIME ZONE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de dados IMRE coletados
CREATE TABLE dados_imre_coletados (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
    bloco_id INTEGER NOT NULL,
    pergunta TEXT NOT NULL,
    resposta TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de base de conhecimento
CREATE TABLE base_conhecimento (
    id VARCHAR(255) PRIMARY KEY,
    categoria VARCHAR(255) NOT NULL,
    titulo VARCHAR(500) NOT NULL,
    conteudo TEXT NOT NULL,
    tags JSONB,
    versao VARCHAR(50) NOT NULL,
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    autor VARCHAR(255) NOT NULL,
    prioridade VARCHAR(20) CHECK (prioridade IN ('alta', 'media', 'baixa')) DEFAULT 'media',
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de usuários do sistema
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    codigo JSONB,
    nivel VARCHAR(20) CHECK (nivel IN ('mestre', 'admin', 'profissional', 'pesquisador', 'estudante', 'paciente')) NOT NULL,
    api_key VARCHAR(255),
    permissoes JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de avaliações renais
CREATE TABLE avaliacoes_renais (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID REFERENCES pacientes(id) ON DELETE CASCADE,
    creatinina DECIMAL(5,2),
    egfr DECIMAL(5,2),
    acr DECIMAL(5,2),
    eletrolitos JSONB,
    glicose DECIMAL(5,2),
    ureia DECIMAL(5,2),
    acido_urico DECIMAL(5,2),
    ultrassom_renal TEXT,
    risco_drc VARCHAR(20) CHECK (risco_drc IN ('baixo', 'moderado', 'alto', 'muito_alto')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

CREATE INDEX idx_pacientes_data_cadastro ON pacientes(data_cadastro);
CREATE INDEX idx_pacientes_ativo ON pacientes(ativo);
CREATE INDEX idx_interacoes_ia_paciente ON interacoes_ia(paciente_id);
CREATE INDEX idx_interacoes_ia_data ON interacoes_ia(data);
CREATE INDEX idx_dados_imre_paciente ON dados_imre_coletados(paciente_id);
CREATE INDEX idx_base_conhecimento_categoria ON base_conhecimento(categoria);
CREATE INDEX idx_base_conhecimento_ativo ON base_conhecimento(ativo);

-- =====================================================
-- VIEWS PARA CONSULTAS COMUNS
-- =====================================================

-- View completa do paciente
CREATE VIEW v_paciente_completo AS
SELECT 
    p.*,
    ae.identificacao,
    ae.motivo_consulta,
    ae.queixas,
    ae.queixa_principal,
    ae.expectativas,
    di.hda_inicio,
    di.hda_evolucao,
    di.hda_caracteristicas,
    di.medicamentos_atuais,
    di.alergias_medicamentos,
    fc.revisao_narrativa,
    fc.exames_solicitados,
    fc.proximos_passos,
    pc.sintomas,
    pc.medicamentos,
    pc.exames,
    pc.consultas,
    pc.evolucao
FROM pacientes p
LEFT JOIN abertura_exponencial ae ON p.id = ae.paciente_id
LEFT JOIN desenvolvimento_indiciario di ON p.id = di.paciente_id
LEFT JOIN fechamento_consensual fc ON p.id = fc.paciente_id
LEFT JOIN permissoes_compartilhamento pc ON p.id = pc.paciente_id;

-- View de interações recentes
CREATE VIEW v_interacoes_recentes AS
SELECT 
    p.nome,
    p.id as paciente_id,
    ii.pergunta,
    ii.resposta,
    ii.data,
    ii.satisfacao
FROM pacientes p
JOIN interacoes_ia ii ON p.id = ii.paciente_id
WHERE ii.data >= NOW() - INTERVAL '7 days'
ORDER BY ii.data DESC;

-- View de contexto longitudinal
CREATE VIEW v_contexto_longitudinal AS
SELECT 
    p.id as paciente_id,
    p.nome,
    cl.evolucao_sintomas,
    cl.evolucao_medicamentos,
    cl.evolucao_exames,
    cl.consultas_profissionais,
    COUNT(ii.id) as total_interacoes,
    MAX(ii.data) as ultima_interacao
FROM pacientes p
LEFT JOIN contexto_longitudinal cl ON p.id = cl.paciente_id
LEFT JOIN interacoes_ia ii ON p.id = ii.paciente_id
GROUP BY p.id, p.nome, cl.evolucao_sintomas, cl.evolucao_medicamentos, 
         cl.evolucao_exames, cl.consultas_profissionais;

-- =====================================================
-- FUNÇÕES POSTGRESQL
-- =====================================================

-- Função para criar paciente completo
CREATE OR REPLACE FUNCTION criar_paciente_completo(
    p_nome VARCHAR(255),
    p_idade INTEGER,
    p_genero VARCHAR(20),
    p_contato VARCHAR(255)
) RETURNS UUID AS $$
DECLARE
    v_paciente_id UUID;
BEGIN
    -- Gerar ID único
    v_paciente_id := uuid_generate_v4();
    
    -- Inserir paciente
    INSERT INTO pacientes (id, nome, idade, genero, contato)
    VALUES (v_paciente_id, p_nome, p_idade, p_genero, p_contato);
    
    -- Inserir permissões padrão
    INSERT INTO permissoes_compartilhamento (paciente_id, dados_basicos, sintomas, medicamentos, exames, consultas, evolucao, pesquisa, validade)
    VALUES (v_paciente_id, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, NOW() + INTERVAL '1 year');
    
    RETURN v_paciente_id;
END;
$$ LANGUAGE plpgsql;

-- Função para obter contexto da IA
CREATE OR REPLACE FUNCTION obter_contexto_ia(p_paciente_id UUID)
RETURNS TABLE(
    nome VARCHAR(255),
    idade INTEGER,
    genero VARCHAR(20),
    motivo_consulta TEXT,
    queixas JSONB,
    queixa_principal TEXT,
    hda_inicio TEXT,
    hda_evolucao TEXT,
    hda_caracteristicas TEXT,
    medicamentos_atuais JSONB,
    alergias_medicamentos JSONB,
    habitos_alimentacao TEXT,
    habitos_contexto_social TEXT,
    revisao_narrativa TEXT,
    exames_solicitados JSONB,
    proximos_passos TEXT,
    sintomas BOOLEAN,
    medicamentos BOOLEAN,
    exames BOOLEAN,
    consultas BOOLEAN,
    evolucao BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.nome,
        p.idade,
        p.genero,
        ae.motivo_consulta,
        ae.queixas,
        ae.queixa_principal,
        di.hda_inicio,
        di.hda_evolucao,
        di.hda_caracteristicas,
        di.medicamentos_atuais,
        di.alergias_medicamentos,
        di.habitos_alimentacao,
        di.habitos_contexto_social,
        fc.revisao_narrativa,
        fc.exames_solicitados,
        fc.proximos_passos,
        pc.sintomas,
        pc.medicamentos,
        pc.exames,
        pc.consultas,
        pc.evolucao
    FROM pacientes p
    LEFT JOIN abertura_exponencial ae ON p.id = ae.paciente_id
    LEFT JOIN desenvolvimento_indiciario di ON p.id = di.paciente_id
    LEFT JOIN fechamento_consensual fc ON p.id = fc.paciente_id
    LEFT JOIN permissoes_compartilhamento pc ON p.id = pc.paciente_id
    WHERE p.id = p_paciente_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS POSTGRESQL
-- =====================================================

-- Trigger para atualizar última atualização do paciente
CREATE OR REPLACE FUNCTION atualizar_ultima_atualizacao()
RETURNS TRIGGER AS $$
BEGIN
    NEW.ultima_atualizacao = NOW();
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_atualizar_paciente
    BEFORE UPDATE ON pacientes
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_ultima_atualizacao();

-- =====================================================
-- DADOS INICIAIS
-- =====================================================

-- Inserir usuários padrão
INSERT INTO usuarios (id, nome, codigo, nivel, api_key, permissoes) VALUES
(uuid_generate_v4(), 'Dr. Ricardo Valença', '["mestre"]', 'mestre', 'api_key_mestre_001', '["admin", "write", "read"]'),
(uuid_generate_v4(), 'Nôa Esperanza', '["ia_residente"]', 'admin', 'api_key_ia_002', '["write", "read"]'),
(uuid_generate_v4(), 'Sistema', '["sistema"]', 'admin', 'api_key_sistema_003', '["read"]');

-- Inserir base de conhecimento inicial
INSERT INTO base_conhecimento (id, categoria, titulo, conteudo, tags, versao, autor, prioridade, ativo) VALUES
('noa_identidade', 'identidade', 'Identidade da Nôa Esperanza', 'Sou Nôa Esperanza, IA Residente especializada em Cannabis Medicinal e Saúde Renal. Trabalho com a metodologia AEC (Arte da Entrevista Clínica) e o sistema IMRE Triaxial para avaliações clínicas completas.', '["identidade", "ia", "residente"]', '1.0', 'Dr. Ricardo Valença', 'alta', TRUE),
('metodologia_aec', 'metodologia', 'Arte da Entrevista Clínica', 'A metodologia AEC é baseada na suspensão do decoder - uma escuta profunda que vai além das palavras. Desenvolvida pelo Dr. Ricardo Valença, permite compreender a história do paciente de forma humanizada e ética.', '["aec", "entrevista", "clinica"]', '1.0', 'Dr. Ricardo Valença', 'alta', TRUE),
('sistema_imre', 'metodologia', 'Sistema IMRE Triaxial', 'O Sistema IMRE possui 37 blocos estruturados em 3 eixos: Eixo 1 (Abertura e Lista Indiciária), Eixo 2 (Desenvolvimento Indiciário), Eixo 3 (Avaliação de Risco DRC). Permite coleta automática e estruturada de dados clínicos.', '["imre", "triaxial", "blocos"]', '1.0', 'Dr. Ricardo Valença', 'alta', TRUE),
('cannabis_medicinal', 'conhecimento', 'Cannabis Medicinal', 'A cannabis medicinal é uma ferramenta terapêutica com evidências científicas para diversas condições. Trabalhamos com protocolos de prescrição baseados em evidências e avaliação de risco renal.', '["cannabis", "medicinal", "terapia"]', '1.0', 'Dr. Ricardo Valença', 'alta', TRUE),
('saude_renal', 'conhecimento', 'Saúde Renal', 'A saúde renal é fundamental para o uso seguro da cannabis medicinal. Trabalhamos com as diretrizes KDIGO e avaliação de risco DRC para prescrição segura.', '["renal", "drc", "kdigo"]', '1.0', 'Dr. Ricardo Valença', 'alta', TRUE);

-- =====================================================
-- RLS (ROW LEVEL SECURITY) - SUPABASE
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE pacientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE abertura_exponencial ENABLE ROW LEVEL SECURITY;
ALTER TABLE desenvolvimento_indiciario ENABLE ROW LEVEL SECURITY;
ALTER TABLE fechamento_consensual ENABLE ROW LEVEL SECURITY;
ALTER TABLE contexto_longitudinal ENABLE ROW LEVEL SECURITY;
ALTER TABLE interacoes_ia ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissoes_compartilhamento ENABLE ROW LEVEL SECURITY;
ALTER TABLE dados_imre_coletados ENABLE ROW LEVEL SECURITY;
ALTER TABLE base_conhecimento ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE avaliacoes_renais ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para pacientes
CREATE POLICY "Pacientes podem ver seus próprios dados" ON pacientes
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Pacientes podem atualizar seus próprios dados" ON pacientes
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Políticas para interações IA
CREATE POLICY "Pacientes podem ver suas interações" ON interacoes_ia
    FOR SELECT USING (auth.uid()::text = paciente_id::text);

CREATE POLICY "Sistema pode inserir interações" ON interacoes_ia
    FOR INSERT WITH CHECK (true);

-- Políticas para base de conhecimento (pública)
CREATE POLICY "Base de conhecimento é pública" ON base_conhecimento
    FOR SELECT USING (ativo = true);

-- =====================================================
-- CONSULTAS ÚTEIS
-- =====================================================

-- Consulta para obter todos os pacientes com dados completos
-- SELECT * FROM v_paciente_completo WHERE ativo = TRUE;

-- Consulta para obter interações recentes
-- SELECT * FROM v_interacoes_recentes;

-- Consulta para obter contexto longitudinal
-- SELECT * FROM v_contexto_longitudinal WHERE paciente_id = 'uuid_especifico';

-- Consulta para obter base de conhecimento ativa
-- SELECT * FROM base_conhecimento WHERE ativo = TRUE ORDER BY prioridade DESC, data_atualizacao DESC;

-- =====================================================
-- CONFIGURAÇÕES SUPABASE
-- =====================================================

-- Configurar storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
('avatars', 'avatars', true),
('documents', 'documents', false),
('reports', 'reports', false);

-- Configurar políticas de storage
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Documents are private" ON storage.objects
    FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = owner::text);

-- =====================================================
-- FIM DO SCHEMA
-- =====================================================
