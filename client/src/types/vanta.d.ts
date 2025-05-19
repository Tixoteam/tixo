declare module 'vanta/dist/vanta.net.min' {
  const NET: {
    (options: {
      el: HTMLElement;
      THREE: any;
      mouseControls: boolean;
      touchControls: boolean;
      gyroControls: boolean;
      minHeight: number;
      minWidth: number;
      scale: number;
      scaleMobile: number;
      color: number;
      backgroundColor: number;
      points: number;
      maxDistance: number;
      spacing: number;
      [key: string]: any;
    }): {
      destroy: () => void;
    };
  };
  export default NET;
}

declare module 'vanta/dist/vanta.waves.min' {
  const WAVES: {
    (options: {
      el: HTMLElement;
      THREE: any;
      mouseControls: boolean;
      touchControls: boolean;
      gyroControls: boolean;
      minHeight: number;
      minWidth: number;
      scale: number;
      scaleMobile: number;
      color: number | string;
      shininess: number;
      waveHeight: number;
      waveSpeed: number;
      zoom: number;
      [key: string]: any;
    }): {
      destroy: () => void;
    };
  };
  export default WAVES;
}

declare module 'vanta/dist/vanta.globe.min' {
  const GLOBE: {
    (options: {
      el: HTMLElement;
      THREE: any;
      mouseControls: boolean;
      touchControls: boolean;
      gyroControls: boolean;
      minHeight: number;
      minWidth: number;
      scale: number;
      scaleMobile: number;
      color: number | string;
      backgroundColor: number | string;
      size: number;
      [key: string]: any;
    }): {
      destroy: () => void;
    };
  };
  export default GLOBE;
}