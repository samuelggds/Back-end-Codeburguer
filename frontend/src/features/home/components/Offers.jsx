import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import ProductCard from './ProductCard.jsx';

export default function Offers({ products, resetSignal, onAdd }) {
  const [position, setPosition] = useState(0);
  useEffect(() => setPosition(0), [resetSignal]);
  const orderedProducts = [...products.slice(position), ...products.slice(0, position)];
  const move = (direction) => setPosition((current) => Math.max(0, Math.min(products.length - 1, current + direction)));

  return (
    <section className="offers" aria-labelledby="offers-heading">
      <h2 className="section-heading" id="offers-heading">OFERTAS DO DIA</h2>
      <div className="offer-carousel" role="region" aria-roledescription="carrossel" aria-label="Ofertas do dia">
        <button type="button" className="arrow previous" id="offers-previous" aria-label="Ofertas anteriores" aria-controls="product-track" disabled={position === 0} onClick={() => move(-1)}>
          <Icon name="left" />
        </button>
        <div className="product-window">
          <div className="product-track" id="product-track">
            {orderedProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}
          </div>
        </div>
        <button type="button" className="arrow next" id="offers-next" aria-label="Próximas ofertas" aria-controls="product-track" disabled={position >= products.length - 1} onClick={() => move(1)}>
          <Icon name="right" />
        </button>
      </div>
    </section>
  );
}
