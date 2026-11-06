import { formatMoney } from '../lib/money.js';
import Dialog from './Dialog.jsx';

export default function InfoDialog({ information, onClose, productsById }) {
  const category = information?.type === 'category' ? information.category : null;
  const title = category?.name || 'Contatos';

  return (
    <Dialog id="info-dialog" titleId="info-title" title={title} open={Boolean(information)} onClose={onClose}>
      <div id="info-content">
        {category ? (
          <>
            <img className="category-detail-photo" src={category.image} width={category.imageWidth} height={category.imageHeight} alt={category.name} />
            <p>{category.description}</p>
            {category.productIds.length > 0 && (
              <ul className="details-products">
                {category.productIds.map((id) => (
                  <li key={id}><span>{productsById[id].name}</span><strong>{formatMoney(productsById[id].priceCents)}</strong></li>
                ))}
              </ul>
            )}
          </>
        ) : 'Os dados de contato do restaurante ainda não foram cadastrados.'}
      </div>
    </Dialog>
  );
}
