import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Brain, Heart, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  currentSpecialty?: string;
  setCurrentSpecialty?: (specialty: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSpecialty = 'geral', setCurrentSpecialty }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const specialties = [
    { id: 'geral', label: 'Geral', icon: Brain },
    { id: 'cannabis', label: 'Cannabis Medicinal', icon: Heart },
    { id: 'nefrologia', label: 'Nefrologia', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            NE
          </div>
          <span className="font-bold text-lg hidden sm:inline-block">Nôa Esperanza</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {specialties.map((specialty) => {
            const Icon = specialty.icon;
            return (
              <button
                key={specialty.id}
                onClick={() => setCurrentSpecialty?.(specialty.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                  currentSpecialty === specialty.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{specialty.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/medcann-lab"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <Heart size={18} />
            MedCann Lab
          </Link>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="container px-4 py-4 flex flex-col gap-2">
            {specialties.map((specialty) => {
              const Icon = specialty.icon;
              return (
                <button
                  key={specialty.id}
                  onClick={() => {
                    setCurrentSpecialty?.(specialty.id);
                    setMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-lg transition-all text-left",
                    currentSpecialty === specialty.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon size={18} />
                  <span className="font-medium">{specialty.label}</span>
                </button>
              );
            })}
            <Link
              to="/medcann-lab"
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white font-medium"
              onClick={() => setMenuOpen(false)}
            >
              <Heart size={18} />
              MedCann Lab
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

