import { useState, useMemo } from 'react';

export const useProductFilters = (products) => {
  // Состояния для фильтров
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]); // [min, max]
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Сама логика фильтрации (useMemo, чтобы не пересчитывать при каждом шорохе)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = category ? p.category === category : true;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchStock = onlyInStock ? p.stock > 0 : true;

      return matchCategory && matchPrice && matchStock;
    });
  }, [products, category, priceRange, onlyInStock]);

  // Функция сброса
  const resetFilters = () => {
    setCategory('');
    setPriceRange([0, 100000]);
    setOnlyInStock(false);
  };

  return {
    filters: { category, priceRange, onlyInStock },
    setCategory,
    setPriceRange,
    setOnlyInStock,
    filteredProducts,
    resetFilters
  };
};