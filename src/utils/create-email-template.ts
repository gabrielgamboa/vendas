export const EmailTemplates = {
  subject: {
    welcome: 'Bem vindo ao Vendas Online!',
  },
  htmlTexts: {
    welcome: (name: string) => `<h1>Prezado ${name}</h1>
    <p>Seja bem-vindo(a) à nossa empresa! É uma satisfação tê-lo(a) como nosso(a) novo(a) cliente. </p>
    <p>Gostaríamos de aproveitar esta oportunidade para expressar nossa gratidão por escolher nossos serviços/produtos.</p>`,
  },
};
