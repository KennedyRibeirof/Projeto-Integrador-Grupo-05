import { Product } from '@/types';
import cookieNutella from '@/assets/cookie-nutella.jpg';
import cookieNinho from '@/assets/cookie-ninho.jpg';
import cookieMaracuja from '@/assets/cookie-maracuja.jpg';
import cookieBeijinho from '@/assets/cookie-beijinho.jpg';
import cookieRedVelvet from '@/assets/cookie-red-velvet.jpg';
import cookieDoceDeLeite from '@/assets/cookie-doce-de-leite.jpg';
import cookieBaunilha from '@/assets/cookie-baunilha.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Cookie de Chocolate com Nutella',
    dough: 'chocolate',
    filling: 'nutella',
    description: 'Delicioso cookie de massa de chocolate recheado com cremoso Nutella',
    price: 3.00,
    image: cookieNutella,
  },
  {
    id: '2',
    name: 'Cookie Red Velvet com Ninho',
    dough: 'red-velvet',
    filling: 'ninho',
    description: 'Cookie de massa red velvet com recheio de leite Ninho',
    price: 3.00,
    image: cookieRedVelvet,
  },
  {
    id: '3',
    name: 'Cookie Tradicional',
    dough: 'baunilha',
    filling: 'tradicional',
    description: 'Cookie tradicional de massa de baunilha',
    price: 3.00,
    image: cookieBaunilha,
  },
];
