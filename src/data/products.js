// Sample products data for DrinkShop
export const products = [
  {
    id: 1,
    name: "Trà Sữa Trân Châu Đường Đen",
    description: "Trà sữa thơm ngon với trân châu đường đen dai mềm, ngọt ngào",
    price: 45000,
    category: "tra-sua",
    categoryName: "Trà Sữa",
    image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=400",
    rating: 4.8,
    reviews: 256,
    isNew: true,
    isBestSeller: true,
    sizes: [
      { name: 'S', price: -5000 },
      { name: 'M', price: 0 },
      { name: 'L', price: 10000 }
    ],
    toppings: [
      { id: 1, name: 'Trân châu đen', price: 8000 },
      { id: 2, name: 'Trân châu trắng', price: 8000 },
      { id: 3, name: 'Thạch dừa', price: 6000 },
      { id: 4, name: 'Pudding', price: 10000 }
    ]
  },
  {
    id: 2,
    name: "Cà Phê Sữa Đá",
    description: "Cà phê Việt Nam đậm đà kết hợp sữa đặc béo ngậy",
    price: 35000,
    category: "ca-phe",
    categoryName: "Cà Phê",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
    rating: 4.9,
    reviews: 189,
    isNew: false,
    isBestSeller: true,
    sizes: [
      { name: 'S', price: -5000 },
      { name: 'M', price: 0 },
      { name: 'L', price: 10000 }
    ],
    toppings: [
      { id: 5, name: 'Shot espresso', price: 12000 },
      { id: 6, name: 'Whipped cream', price: 8000 }
    ]
  },
  {
    id: 3,
    name: "Sinh Tố Bơ",
    description: "Sinh tố bơ béo ngậy, thơm lừng, bổ dưỡng",
    price: 55000,
    category: "sinh-to",
    categoryName: "Sinh Tố",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400",
    rating: 4.7,
    reviews: 142,
    isNew: false,
    isBestSeller: false,
    sizes: [
      { name: 'S', price: -5000 },
      { name: 'M', price: 0 },
      { name: 'L', price: 10000 }
    ],
    toppings: [
      { id: 7, name: 'Kem tươi', price: 10000 },
      { id: 8, name: 'Hạt chia', price: 5000 }
    ]
  },
  {
    id: 4,
    name: "Nước Ép Cam Tươi",
    description: "Nước ép cam tươi 100%, giàu vitamin C, không đường",
    price: 40000,
    category: "nuoc-ep",
    categoryName: "Nước Ép",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400",
    rating: 4.6,
    reviews: 98,
    isNew: true,
    isBestSeller: false,
    sizes: [
      { name: 'S', price: -5000 },
      { name: 'M', price: 0 },
      { name: 'L', price: 10000 }
    ],
    toppings: [
      { id: 9, name: 'Mật ong', price: 5000 }
    ]
  },
  {
    id: 5,
    name: "Trà Đào Cam Sả",
    description: "Trà đào thơm mát với cam tươi và sả, giải khát tuyệt vời",
    price: 42000,
    category: "tra-sua",
    categoryName: "Trà Sữa",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
    rating: 4.8,
    reviews: 178,
    isNew: false,
    isBestSeller: true,
    sizes: [
      { name: 'S', price: -5000 },
      { name: 'M', price: 0 },
      { name: 'L', price: 10000 }
    ],
    toppings: [
      { id: 10, name: 'Đào miếng', price: 8000 },
      { id: 3, name: 'Thạch dừa', price: 6000 }
    ]
  },
  {
    id: 6,
    name: "Cappuccino",
    description: "Cappuccino Ý chuẩn vị, bọt sữa mịn màng",
    price: 48000,
    category: "ca-phe",
    categoryName: "Cà Phê",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
    rating: 4.7,
    reviews: 156,
    isNew: false,
    isBestSeller: false,
    sizes: [
      { name: 'S', price: -5000 },
      { name: 'M', price: 0 },
      { name: 'L', price: 10000 }
    ],
    toppings: [
      { id: 5, name: 'Shot espresso', price: 12000 },
      { id: 11, name: 'Syrup caramel', price: 6000 },
      { id: 12, name: 'Syrup vanilla', price: 6000 }
    ]
  },
  {
    id: 7,
    name: "Sinh Tố Xoài",
    description: "Sinh tố xoài chín ngọt, thơm ngát hương nhiệt đới",
    price: 50000,
    category: "sinh-to",
    categoryName: "Sinh Tố",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400",
    rating: 4.9,
    reviews: 203,
    isNew: true,
    isBestSeller: true,
    sizes: [
      { name: 'S', price: -5000 },
      { name: 'M', price: 0 },
      { name: 'L', price: 10000 }
    ],
    toppings: [
      { id: 7, name: 'Kem tươi', price: 10000 },
      { id: 13, name: 'Sữa chua', price: 8000 }
    ]
  },
  {
    id: 8,
    name: "Nước Ép Dưa Hấu",
    description: "Nước ép dưa hấu mát lạnh, thanh mát ngày hè",
    price: 38000,
    category: "nuoc-ep",
    categoryName: "Nước Ép",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400",
    rating: 4.5,
    reviews: 87,
    isNew: false,
    isBestSeller: false,
    sizes: [
      { name: 'S', price: -5000 },
      { name: 'M', price: 0 },
      { name: 'L', price: 10000 }
    ],
    toppings: [
      { id: 14, name: 'Bạc hà', price: 3000 }
    ]
  },
  {
    id: 9,
    name: "Matcha Latte",
    description: "Matcha Nhật Bản đậm đà với sữa tươi béo ngậy",
    price: 52000,
    category: "tra-sua",
    categoryName: "Trà Sữa",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400",
    rating: 4.8,
    reviews: 167,
    isNew: true,
    isBestSeller: false,
    sizes: [
      { name: 'S', price: -5000 },
      { name: 'M', price: 0 },
      { name: 'L', price: 10000 }
    ],
    toppings: [
      { id: 1, name: 'Trân châu đen', price: 8000 },
      { id: 15, name: 'Red bean', price: 10000 }
    ]
  },
  {
    id: 10,
    name: "Americano",
    description: "Americano đậm đà, thức tỉnh giác quan",
    price: 40000,
    category: "ca-phe",
    categoryName: "Cà Phê",
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400",
    rating: 4.6,
    reviews: 134,
    isNew: false,
    isBestSeller: false,
    sizes: [
      { name: 'S', price: -5000 },
      { name: 'M', price: 0 },
      { name: 'L', price: 10000 }
    ],
    toppings: [
      { id: 5, name: 'Shot espresso', price: 12000 }
    ]
  },
  {
    id: 11,
    name: "Sinh Tố Dâu",
    description: "Sinh tố dâu tây tươi, chua ngọt hài hòa",
    price: 52000,
    category: "sinh-to",
    categoryName: "Sinh Tố",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400",
    rating: 4.7,
    reviews: 145,
    isNew: false,
    isBestSeller: true,
    sizes: [
      { name: 'S', price: -5000 },
      { name: 'M', price: 0 },
      { name: 'L', price: 10000 }
    ],
    toppings: [
      { id: 7, name: 'Kem tươi', price: 10000 },
      { id: 13, name: 'Sữa chua', price: 8000 }
    ]
  },
  {
    id: 12,
    name: "Nước Ép Táo Xanh",
    description: "Nước ép táo xanh tươi, thanh mát, tốt cho sức khỏe",
    price: 45000,
    category: "nuoc-ep",
    categoryName: "Nước Ép",
    image: "https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=400",
    rating: 4.4,
    reviews: 76,
    isNew: true,
    isBestSeller: false,
    sizes: [
      { name: 'S', price: -5000 },
      { name: 'M', price: 0 },
      { name: 'L', price: 10000 }
    ],
    toppings: [
      { id: 9, name: 'Mật ong', price: 5000 },
      { id: 16, name: 'Gừng', price: 3000 }
    ]
  }
];

export const categories = [
  {
    id: 'tra-sua',
    name: 'Trà Sữa',
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600',
    count: products.filter(p => p.category === 'tra-sua').length
  },
  {
    id: 'ca-phe',
    name: 'Cà Phê',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
    count: products.filter(p => p.category === 'ca-phe').length
  },
  {
    id: 'sinh-to',
    name: 'Sinh Tố',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600',
    count: products.filter(p => p.category === 'sinh-to').length
  },
  {
    id: 'nuoc-ep',
    name: 'Nước Ép',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600',
    count: products.filter(p => p.category === 'nuoc-ep').length
  }
];

export const getProductById = (id) => {
  return products.find(p => p.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  if (!category || category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const getBestSellers = () => {
  return products.filter(p => p.isBestSeller);
};

export const getNewProducts = () => {
  return products.filter(p => p.isNew);
};

export const formatPrice = (price) => {
  const numericPrice = Number(price) || 0;
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(numericPrice);
};
