const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatMoney(cents, { compact = false } = {}) {
  const formatted = brlFormatter.format(cents / 100);
  return compact ? formatted.replace(/\s/g, '') : formatted;
}
