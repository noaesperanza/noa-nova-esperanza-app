import { TrendingUp, TrendingDown, Activity, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface Indicator {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  status?: 'success' | 'warning' | 'danger';
}

export const DashboardCidadeAmiga = () => {
  const indicadores: Indicator[] = [
    { label: 'Pacientes Triados', value: '1.247', change: 12, trend: 'up', status: 'success' },
    { label: 'Risco Alto DRC', value: '156', change: -8, trend: 'down', status: 'success' },
    { label: 'Em Acompanhamento', value: '892', change: 15, trend: 'up', status: 'success' },
    { label: 'Telemedicina Ativa', value: '234', change: 23, trend: 'up', status: 'success' },
    { label: 'eGFR Médio', value: '78 ml/min', trend: 'neutral', status: 'success' },
    { label: 'Alertas Pendentes', value: '12', trend: 'neutral', status: 'warning' }
  ];

  const estagiosDRC = [
    { estagio: 1, descricao: 'Normal ou Aumentado', egfr: '≥90', pacientes: 845, cor: 'bg-green-500' },
    { estagio: 2, descricao: 'Leve Redução', egfr: '60-89', pacientes: 287, cor: 'bg-blue-500' },
    { estagio: 3, descricao: 'Moderada Redução', egfr: '30-59', pacientes: 89, cor: 'bg-yellow-500' },
    { estagio: 4, descricao: 'Severa Redução', egfr: '15-29', pacientes: 21, cor: 'bg-orange-500' },
    { estagio: 5, descricao: 'Falência Renal', egfr: '<15', pacientes: 5, cor: 'bg-red-500' }
  ];

  const fatoresRisco = [
    { fator: 'Diabetes', prevalencia: 34, cor: 'bg-red-400' },
    { fator: 'Hipertensão', prevalencia: 56, cor: 'bg-orange-400' },
    { fator: 'Histórico Familiar', prevalencia: 23, cor: 'bg-yellow-400' },
    { fator: 'Idade >60 anos', prevalencia: 41, cor: 'bg-blue-400' },
    { fator: 'Obesidade', prevalencia: 28, cor: 'bg-purple-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Indicadores Principais */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Activity className="text-primary" size={20} />
          Indicadores em Tempo Real
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {indicadores.map((ind, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">{ind.value}</div>
              <div className="text-xs text-muted-foreground mb-2">{ind.label}</div>
              {ind.change !== undefined && (
                <div className={cn(
                  "flex items-center gap-1 text-xs font-semibold",
                  ind.trend === 'up' && ind.status === 'success' && "text-green-600",
                  ind.trend === 'down' && ind.status === 'success' && "text-green-600",
                  ind.status === 'warning' && "text-yellow-600"
                )}>
                  {ind.trend === 'up' && <TrendingUp size={12} />}
                  {ind.trend === 'down' && <TrendingDown size={12} />}
                  {ind.change > 0 && '+'}{ind.change}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Distribuição por Estágios DRC */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Users className="text-primary" size={20} />
          Distribuição por Estágios de DRC
        </h3>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="space-y-3">
            {estagiosDRC.map((est) => (
              <div key={est.estagio}>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs", est.cor)}>
                      {est.estagio}
                    </div>
                    <div>
                      <div className="font-semibold">{est.descricao}</div>
                      <div className="text-xs text-muted-foreground">eGFR: {est.egfr} ml/min</div>
                    </div>
                  </div>
                  <div className="font-bold">{est.pacientes}</div>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full", est.cor)}
                    style={{ width: `${(est.pacientes / 1247) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fatores de Risco */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-primary" size={20} />
          Fatores de Risco Prevalentes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {fatoresRisco.map((fator, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-1">{fator.prevalencia}%</div>
              <div className="text-xs text-muted-foreground mb-3">{fator.fator}</div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className={cn("h-full", fator.cor)} style={{ width: `${fator.prevalencia}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ações Recomendadas */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <CheckCircle2 className="text-primary" size={20} />
          Ações Recomendadas pela IA Residente
        </h3>
        <div className="space-y-3">
          {[
            { prioridade: 'Alta', acao: 'Convocar 12 pacientes com risco alto para reavaliação presencial', cor: 'border-red-500' },
            { prioridade: 'Média', acao: 'Intensificar telemedicina para 45 pacientes em estágio 3', cor: 'border-yellow-500' },
            { prioridade: 'Baixa', acao: 'Campanha educativa sobre hidratação adequada', cor: 'border-blue-500' }
          ].map((item, index) => (
            <div key={index} className={cn("bg-card border-l-4 rounded-lg p-4", item.cor)}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-muted-foreground mb-1">
                    Prioridade {item.prioridade}
                  </div>
                  <div className="text-sm">{item.acao}</div>
                </div>
                <button className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

