import heroImage from '../assets/images/hero.png';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="welcome">
      <img className="hero-photo" src={heroImage} width="2880" height="914" alt="Hambúrguer artesanal com queijo derretido e batatas fritas" fetchpriority="high" />
      <h1 id="welcome">Bem-vindo!</h1>
    </section>
  );
}
