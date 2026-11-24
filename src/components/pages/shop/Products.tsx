import { SHOP_PRODUCTS } from "./items";

export function Products() {
  return (
    <section
      className="shop-body"
      data-framer-name="§ Products @0.05"
      data-keep-background="true"
      style={{ backgroundColor: "#19191c" }}
    >
      <div className="shop-body-inner">
        <h2 className="shop-title">Shop</h2>
        <div className="shop-grid">
          {SHOP_PRODUCTS.map((product) => (
            <article className="shop-card" key={product.title}>
              <div className="shop-card-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.img} alt={product.title} loading="lazy" />
              </div>
              <div className="shop-card-meta">
                <span className="shop-card-title">{product.title}</span>
                <span className="shop-card-note">{product.note}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
