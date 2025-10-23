-- =====================================================
-- SCHEMA DO BANCO DE DADOS - NÔA ESPERANZA
-- Base de Dados Semântica e Sistema IMRE
-- =====================================================

-- Tabela principal de pacientes
CREATE TABLE pacientes (
    id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INTEGER NOT NULL,
    genero VARCHAR(20) CHECK (genero IN ('masculino', 'feminino', 'outro')) NOT NULL,
    contato VARCHAR(255),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de abertura exponencial (Eixo 1)
CREATE TABLE abertura_exponencial (
    id SERIAL PRIMARY KEY,
    paciente_id VARCHAR(255),
    identificacao TEXT,
    motivo_consulta TEXT,
    queixas JSONB,
    queixa_principal TEXT,
    expectativas TEXT,
    contexto_emocional TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- Tabela de desenvolvimento indiciário (Eixo 2)
CREATE TABLE desenvolvimento_indiciario (
    id SERIAL PRIMARY KEY,
    paciente_id VARCHAR(255),
    
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
    
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- Tabela de fechamento consensual (Eixo 3)
CREATE TABLE fechamento_consensual (
    id SERIAL PRIMARY KEY,
    paciente_id VARCHAR(255),
    revisao_narrativa TEXT,
    complementacoes JSONB,
    exames_solicitados JSONB,
    proximos_passos TEXT,
    observacoes TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- Tabela de contexto longitudinal
CREATE TABLE contexto_longitudinal (
    id SERIAL PRIMARY KEY,
    paciente_id VARCHAR(255),
    
    -- Evolução de sintomas
    evolucao_sintomas JSONB,
    
    -- Evolução de medicamentos
    evolucao_medicamentos JSONB,
    
    -- Evolução de exames
    evolucao_exames JSONB,
    
    -- Consultas profissionais
    consultas_profissionais JSONB,
    
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- Tabela de interações com IA
CREATE TABLE interacoes_ia (
    id SERIAL PRIMARY KEY,
    paciente_id VARCHAR(255),
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pergunta TEXT NOT NULL,
    resposta TEXT NOT NULL,
    contexto_utilizado TEXT,
    satisfacao INTEGER CHECK (satisfacao >= 1 AND satisfacao <= 5),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- Tabela de permissões de compartilhamento
CREATE TABLE permissoes_compartilhamento (
    id SERIAL PRIMARY KEY,
    paciente_id VARCHAR(255),
    dados_basicos BOOLEAN DEFAULT TRUE,
    sintomas BOOLEAN DEFAULT FALSE,
    medicamentos BOOLEAN DEFAULT FALSE,
    exames BOOLEAN DEFAULT FALSE,
    consultas BOOLEAN DEFAULT FALSE,
    evolucao BOOLEAN DEFAULT FALSE,
    pesquisa BOOLEAN DEFAULT FALSE,
    validade TIMESTAMP,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- Tabela de dados IMRE coletados
CREATE TABLE dados_imre_coletados (
    id SERIAL PRIMARY KEY,
    paciente_id VARCHAR(255),
    bloco_id INTEGER NOT NULL,
    pergunta TEXT NOT NULL,
    resposta TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- Tabela de base de conhecimento
CREATE TABLE base_conhecimento (
    id VARCHAR(255) PRIMARY KEY,
    categoria VARCHAR(255) NOT NULL,
    titulo VARCHAR(500) NOT NULL,
    conteudo TEXT NOT NULL,
    tags JSONB,
    versao VARCHAR(50) NOT NULL,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    autor VARCHAR(255) NOT NULL,
    prioridade VARCHAR(20) CHECK (prioridade IN ('alta', 'media', 'baixa')) DEFAULT 'media',
    ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de usuários do sistema
CREATE TABLE usuarios (
    id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    codigo JSONB,
    nivel VARCHAR(20) CHECK (nivel IN ('mestre', 'admin', 'profissional', 'pesquisador', 'estudante', 'paciente')) NOT NULL,
    api_key VARCHAR(255),
    permissoes JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de avaliações renais
CREATE TABLE avaliacoes_renais (
    id SERIAL PRIMARY KEY,
    paciente_id VARCHAR(255),
    creatinina DECIMAL(5,2),
    egfr DECIMAL(5,2),
    acr DECIMAL(5,2),
    eletrolitos JSONB,
    glicose DECIMAL(5,2),
    ureia DECIMAL(5,2),
    acido_urico DECIMAL(5,2),
    ultrassom_renal TEXT,
    risco_drc VARCHAR(20) CHECK (risco_drc IN ('baixo', 'moderado', 'alto', 'muito_alto')),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- Índices para performance
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
) RETURNS VARCHAR(255) AS $$
DECLARE
    v_paciente_id VARCHAR(255);
BEGIN
    -- Gerar ID único
    v_paciente_id := 'paciente_' || EXTRACT(EPOCH FROM NOW())::TEXT || '_' || FLOOR(RANDOM() * 1000)::TEXT;
    
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
CREATE OR REPLACE FUNCTION obter_contexto_ia(p_paciente_id VARCHAR(255))
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
    NEW.ultima_atualizacao = CURRENT_TIMESTAMP;
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
('admin_001', 'Dr. Ricardo Valença', '["mestre"]', 'mestre', 'api_key_mestre_001', '["admin", "write", "read"]'),
('admin_002', 'Nôa Esperanza', '["ia_residente"]', 'admin', 'api_key_ia_002', '["write", "read"]'),
('admin_003', 'Sistema', '["sistema"]', 'admin', 'api_key_sistema_003', '["read"]');

-- Inserir base de conhecimento inicial
INSERT INTO base_conhecimento (id, categoria, titulo, conteudo, tags, versao, autor, prioridade, ativo) VALUES
('noa_identidade', 'identidade', 'Identidade da Nôa Esperanza', 'Sou Nôa Esperanza, IA Residente especializada em Cannabis Medicinal e Saúde Renal...', '["identidade", "ia", "residente"]', '1.0', 'Dr. Ricardo Valença', 'alta', TRUE),
('metodologia_aec', 'metodologia', 'Arte da Entrevista Clínica', 'A metodologia AEC é baseada na suspensão do decoder...', '["aec", "entrevista", "clinica"]', '1.0', 'Dr. Ricardo Valença', 'alta', TRUE),
('sistema_imre', 'metodologia', 'Sistema IMRE Triaxial', 'O Sistema IMRE possui 37 blocos estruturados em 3 eixos...', '["imre", "triaxial", "blocos"]', '1.0', 'Dr. Ricardo Valença', 'alta', TRUE);

-- =====================================================
-- CONSULTAS ÚTEIS
-- =====================================================

-- Consulta para obter todos os pacientes com dados completos
-- SELECT * FROM v_paciente_completo WHERE ativo = TRUE;

-- Consulta para obter interações recentes
-- SELECT * FROM v_interacoes_recentes;

-- Consulta para obter contexto longitudinal
-- SELECT * FROM v_contexto_longitudinal WHERE paciente_id = 'paciente_id_especifico';

-- Consulta para obter base de conhecimento ativa
-- SELECT * FROM base_conhecimento WHERE ativo = TRUE ORDER BY prioridade DESC, data_atualizacao DESC;
