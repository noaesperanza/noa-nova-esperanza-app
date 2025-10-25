import React, { useState, useEffect } from 'react'
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Globe,
  Database,
  FileText,
  User,
  Calendar,
  Hash,
  Link,
  Copy,
  ExternalLink,
  Heart,
  Star,
  Award,
  TrendingUp,
  BarChart3,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Edit,
  Save,
  X
} from 'lucide-react'
import { cn } from '../lib/utils'
import { supabase } from '../lib/supabase'

interface BlockchainSecurityProps {
  userId: string
  userType: 'patient' | 'professional' | 'student' | 'admin'
}

interface NFTSoulbound {
  id: string
  tokenId: string
  contractAddress: string
  network: string
  metadata: {
    name: string
    description: string
    image: string
    attributes: Array<{
      trait_type: string
      value: string
    }>
  }
  createdAt: string
  isActive: boolean
}

interface SecurityAudit {
  id: string
  type: 'data_access' | 'consent_given' | 'data_shared' | 'security_breach'
  description: string
  timestamp: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  resolved: boolean
  metadata: Record<string, any>
}

interface ConsentRecord {
  id: string
  userId: string
  dataType: string
  purpose: string
  consentGiven: boolean
  timestamp: string
  expiresAt?: string
  blockchainHash: string
  isRevoked: boolean
}

interface DataSharing {
  id: string
  fromUserId: string
  toUserId: string
  dataType: string
  purpose: string
  timestamp: string
  blockchainHash: string
  isActive: boolean
}

export const BlockchainSecurity: React.FC<BlockchainSecurityProps> = ({ 
  userId, 
  userType 
}) => {
  const [activeTab, setActiveTab] = useState<'nft' | 'consent' | 'sharing' | 'audit' | 'settings'>('nft')
  const [nftSoulbound, setNftSoulbound] = useState<NFTSoulbound | null>(null)
  const [consentRecords, setConsentRecords] = useState<ConsentRecord[]>([])
  const [dataSharing, setDataSharing] = useState<DataSharing[]>([])
  const [securityAudits, setSecurityAudits] = useState<SecurityAudit[]>([])
  const [loading, setLoading] = useState(false)
  const [showPrivateKey, setShowPrivateKey] = useState(false)

  // Carregar dados de segurança
  useEffect(() => {
    loadSecurityData()
  }, [userId])

  const loadSecurityData = async () => {
    setLoading(true)
    try {
      // Carregar NFT Soulbound
      const { data: nftData } = await supabase
        .from('nft_soulbound')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      setNftSoulbound(nftData)

      // Carregar registros de consentimento
      const { data: consentData } = await supabase
        .from('consent_records')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
      
      setConsentRecords(consentData || [])

      // Carregar compartilhamento de dados
      const { data: sharingData } = await supabase
        .from('data_sharing')
        .select('*')
        .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
        .order('timestamp', { ascending: false })
      
      setDataSharing(sharingData || [])

      // Carregar auditorias de segurança
      const { data: auditData } = await supabase
        .from('security_audits')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
      
      setSecurityAudits(auditData || [])
    } catch (error) {
      console.error('Erro ao carregar dados de segurança:', error)
    } finally {
      setLoading(false)
    }
  }

  // Gerar NFT Soulbound
  const generateNFTSoulbound = async () => {
    try {
      const { data, error } = await supabase
        .from('nft_soulbound')
        .insert({
          user_id: userId,
          token_id: `NOA-${Date.now()}`,
          contract_address: '0x1234567890abcdef',
          network: 'polygon',
          metadata: {
            name: 'Escute-se NFT',
            description: 'Selo simbólico de escuta ativa e pertencimento à Nôa Esperanza',
            image: '/noa-nft.png',
            attributes: [
              { trait_type: 'Tipo', value: 'Soulbound' },
              { trait_type: 'Rede', value: 'Polygon' },
              { trait_type: 'Raridade', value: 'Único' },
              { trait_type: 'Propósito', value: 'Escuta Ativa' }
            ]
          },
          is_active: true
        })
        .select()
        .single()

      if (error) throw error
      setNftSoulbound(data)
    } catch (error) {
      console.error('Erro ao gerar NFT Soulbound:', error)
    }
  }

  // Renderizar NFT Soulbound
  const renderNFTSoulbound = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">NFT Soulbound - Escute-se</h2>
        {!nftSoulbound && (
          <button
            onClick={generateNFTSoulbound}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            <Zap className="w-4 h-4 inline mr-2" />
            Gerar NFT
          </button>
        )}
      </div>

      {nftSoulbound ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Heart className="w-16 h-16 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900">{nftSoulbound.metadata.name}</h3>
                <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  Ativo
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{nftSoulbound.metadata.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-500">Token ID</span>
                  <p className="font-mono text-sm">{nftSoulbound.tokenId}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Rede</span>
                  <p className="text-sm">{nftSoulbound.network}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Contrato</span>
                  <p className="font-mono text-sm">{nftSoulbound.contractAddress}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Criado em</span>
                  <p className="text-sm">{new Date(nftSoulbound.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-all">
                  <Copy className="w-4 h-4 inline mr-1" />
                  Copiar
                </button>
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-all">
                  <ExternalLink className="w-4 h-4 inline mr-1" />
                  Ver na Blockchain
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold text-gray-900 mb-3">Atributos</h4>
            <div className="grid grid-cols-2 gap-3">
              {nftSoulbound.metadata.attributes.map((attr, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <span className="text-sm text-gray-500">{attr.trait_type}</span>
                  <p className="font-medium text-gray-900">{attr.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">NFT Soulbound não encontrado</h3>
          <p className="text-gray-600 mb-4">
            Gere seu NFT "Escute-se" para ter acesso completo à plataforma e participar da cadeia de valor simbólica.
          </p>
          <button
            onClick={generateNFTSoulbound}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            <Zap className="w-5 h-5 inline mr-2" />
            Gerar NFT Soulbound
          </button>
        </div>
      )}
    </div>
  )

  // Renderizar consentimento
  const renderConsent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Registros de Consentimento</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
          <FileText className="w-4 h-4 inline mr-2" />
          Novo Consentimento
        </button>
      </div>

      <div className="space-y-4">
        {consentRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  record.consentGiven ? "bg-green-100" : "bg-red-100"
                )}>
                  {record.consentGiven ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <X className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{record.dataType}</h3>
                  <p className="text-sm text-gray-600">{record.purpose}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(record.timestamp).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Hash className="w-3 h-3" />
                  <span>{record.blockchainHash.slice(0, 8)}...</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Status: {record.consentGiven ? 'Consentido' : 'Negado'}</span>
                {record.expiresAt && (
                  <span>Expira: {new Date(record.expiresAt).toLocaleDateString()}</span>
                )}
                {record.isRevoked && (
                  <span className="text-red-600">Revogado</span>
                )}
              </div>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-all">
                <Eye className="w-4 h-4 inline mr-1" />
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Renderizar compartilhamento
  const renderSharing = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Compartilhamento de Dados</h2>
      
      <div className="space-y-4">
        {dataSharing.map((sharing) => (
          <div key={sharing.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Link className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{sharing.dataType}</h3>
                  <p className="text-sm text-gray-600">{sharing.purpose}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(sharing.timestamp).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Hash className="w-3 h-3" />
                  <span>{sharing.blockchainHash.slice(0, 8)}...</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Status: {sharing.isActive ? 'Ativo' : 'Inativo'}</span>
                <span>De: {sharing.fromUserId}</span>
                <span>Para: {sharing.toUserId}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-all">
                  <Eye className="w-4 h-4 inline mr-1" />
                  Ver
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-all">
                  <Trash2 className="w-4 h-4 inline mr-1" />
                  Revogar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Renderizar auditoria
  const renderAudit = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Auditoria de Segurança</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Total de Eventos</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{securityAudits.length}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-gray-700">Críticos</span>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {securityAudits.filter(a => a.severity === 'critical').length}
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Resolvidos</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {securityAudits.filter(a => a.resolved).length}
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Últimos 30 dias</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {securityAudits.filter(a => 
              new Date(a.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            ).length}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {securityAudits.map((audit) => (
          <div key={audit.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  audit.severity === 'critical' && "bg-red-100",
                  audit.severity === 'high' && "bg-orange-100",
                  audit.severity === 'medium' && "bg-yellow-100",
                  audit.severity === 'low' && "bg-green-100"
                )}>
                  <AlertTriangle className={cn(
                    "w-5 h-5",
                    audit.severity === 'critical' && "text-red-600",
                    audit.severity === 'high' && "text-orange-600",
                    audit.severity === 'medium' && "text-yellow-600",
                    audit.severity === 'low' && "text-green-600"
                  )} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{audit.description}</h3>
                  <p className="text-sm text-gray-600">{audit.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(audit.timestamp).toLocaleDateString()}
                </p>
                <div className={cn(
                  "px-2 py-1 rounded-full text-xs",
                  audit.severity === 'critical' && "bg-red-100 text-red-700",
                  audit.severity === 'high' && "bg-orange-100 text-orange-700",
                  audit.severity === 'medium' && "bg-yellow-100 text-yellow-700",
                  audit.severity === 'low' && "bg-green-100 text-green-700"
                )}>
                  {audit.severity}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Status: {audit.resolved ? 'Resolvido' : 'Pendente'}</span>
                <span>Tipo: {audit.type}</span>
              </div>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-all">
                <Eye className="w-4 h-4 inline mr-1" />
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Renderizar configurações
  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Configurações de Segurança</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacidade</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Compartilhamento de dados</span>
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-all">
                <Settings className="w-4 h-4 inline mr-1" />
                Configurar
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Notificações de segurança</span>
              <button className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-all">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Ativo
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Auditoria automática</span>
              <button className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-all">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Ativo
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blockchain</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Rede principal</span>
              <span className="text-sm text-gray-600">Polygon</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Contrato NFT</span>
              <span className="text-sm text-gray-600 font-mono">0x1234...abcd</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Última sincronização</span>
              <span className="text-sm text-gray-600">Há 2 minutos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Shield className="w-12 h-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Carregando sistema de segurança...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Segurança Blockchain</h1>
        <p className="text-gray-600">Proteção de dados com tecnologia blockchain e LGPD</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'nft', label: 'NFT Soulbound', icon: Star },
            { id: 'consent', label: 'Consentimento', icon: FileText },
            { id: 'sharing', label: 'Compartilhamento', icon: Link },
            { id: 'audit', label: 'Auditoria', icon: Shield },
            { id: 'settings', label: 'Configurações', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all",
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'nft' && renderNFTSoulbound()}
      {activeTab === 'consent' && renderConsent()}
      {activeTab === 'sharing' && renderSharing()}
      {activeTab === 'audit' && renderAudit()}
      {activeTab === 'settings' && renderSettings()}
    </div>
  )
}
