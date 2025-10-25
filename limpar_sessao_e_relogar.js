// =====================================================
// SCRIPT PARA LIMPAR SESSÃO E FORÇAR NOVO LOGIN
// =====================================================

// Execute este script no console do navegador (F12)

console.log('🧹 Limpando sessão e forçando novo login...');

// 1. Limpar localStorage
localStorage.clear();
console.log('✅ localStorage limpo');

// 2. Limpar sessionStorage
sessionStorage.clear();
console.log('✅ sessionStorage limpo');

// 3. Limpar cookies
document.cookie.split(";").forEach(function(c) { 
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
});
console.log('✅ Cookies limpos');

// 4. Recarregar a página
console.log('🔄 Recarregando página...');
window.location.reload();
