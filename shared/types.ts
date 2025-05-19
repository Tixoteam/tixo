// Bot rental types
export interface BotRental {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  priceUnit: string;
  badge: {
    text: string;
    type: 'primary' | 'secondary';
  };
}

// Services types
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconBackground: 'primary' | 'secondary';
  priceText: string;
}

// Group types
export interface Group {
  id: number;
  name: string;
  description: string;
  icon: string;
  iconBackground: 'primary' | 'secondary';
  memberCount: string;
  language: string;
  url: string;
}

export interface wame {
  wame: string;
}