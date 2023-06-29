const mockProducts = [
  {
    id: 1,
    name: 'Machado do Thor Stormbreaker',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const mockSales = [
  {
    saleId: 1,
    date: '2022-08-17T23:41:17.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2022-08-17T23:41:17.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2022-08-17T23:41:17.000Z',
    productId: 3,
    quantity: 15,
  },
];

const mockNewProduct = {
  id: 50,
  name: 'Produto X',
};

const mockNewSale = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = {
  mockProducts,
  mockSales,
  mockNewProduct,
  mockNewSale,
};