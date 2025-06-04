function orderWhatsApp(product) {
  const phone = "9928678907";
  const message = `Hi, I want to order ${product} from SNITCHX. Please assist me.`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
