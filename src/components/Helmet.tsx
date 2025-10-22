import { useEffect } from 'react';

interface HelmetProps {
  children: React.ReactNode;
}

export const Helmet: React.FC<HelmetProps> = ({ children }) => {
  useEffect(() => {
    const elements = Array.isArray(children) ? children : [children];
    
    elements.forEach((child: any) => {
      if (!child || !child.props) return;

      const { type, props } = child;
      
      if (type === 'title') {
        document.title = props.children;
      } else if (type === 'meta') {
        let element = document.querySelector(`meta[name="${props.name}"]`) as HTMLMetaElement;
        if (!element && props.property) {
          element = document.querySelector(`meta[property="${props.property}"]`) as HTMLMetaElement;
        }
        
        if (element) {
          if (props.content) element.content = props.content;
        } else {
          const meta = document.createElement('meta');
          if (props.name) meta.name = props.name;
          if (props.property) meta.setAttribute('property', props.property);
          if (props.content) meta.content = props.content;
          document.head.appendChild(meta);
        }
      } else if (type === 'link') {
        let element = document.querySelector(`link[rel="${props.rel}"]`) as HTMLLinkElement;
        
        if (element) {
          if (props.href) element.href = props.href;
        } else {
          const link = document.createElement('link');
          if (props.rel) link.rel = props.rel;
          if (props.href) link.href = props.href;
          if (props.type) link.type = props.type;
          document.head.appendChild(link);
        }
      }
    });
  }, [children]);

  return null;
};

