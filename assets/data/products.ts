type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Ultimate Pepperoni',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png',
    price: parseFloat((12.99 * 80).toFixed(2)),
  },
  {
    id: 2,
    name: 'ExtravaganZZa',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png',
    price: parseFloat((14.99 * 80).toFixed(2)),
  },
  {
    id: 3,
    name: 'MeatZZa',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png',
    price: parseFloat((13.47 * 80).toFixed(2)),
  },
  {
    id: 4,
    name: 'Margarita',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/margarita.png',
    price: parseFloat((9.9 * 80).toFixed(2)),
  },
  {
    id: 5,
    name: 'Pacific Veggie',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png',
    price: parseFloat((12.99 * 80).toFixed(2)),
  },
  {
    id: 6,
    name: 'Hawaiian',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/hawaiin.png',
    price: parseFloat((10.49 * 80).toFixed(2)),
  },
  {
    id: 7,
    name: 'Deluxe',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/deluxe.png',
    price: parseFloat((16.99 * 80).toFixed(2)),
  },
  {
    id: 8,
    name: 'BBQ Chicken',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png',
    price: parseFloat((12.89 * 80).toFixed(2)),
  },
  {
    id: 9,
    name: 'Chicken Bacon Ranch',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png',
    price: parseFloat((13.99 * 80).toFixed(2)),
  },
  {
    id: 10,
    name: '6 Cheese',
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/6cheese.png',
    price: parseFloat((13.29 * 80).toFixed(2)),
  },
];

export default products;
