const prompt = require('prompt-sync')();

const nomes = [];
const salariosBrutos = [];
const faltas = [];

const validarSalario = (salario) => salario >= 0;

for (let i = 0; i < 5; i++) {
  console.log(`\nCadastro do funcionário ${i + 1}:`);

  const nome = prompt('Nome: ');
  let salarioBruto = parseFloat(prompt('Salário base: '));
  let qtdFaltas = parseInt(prompt('Quantidade de faltas: '));

  while (!validarSalario(salarioBruto)) {
    console.log('Erro: o salário base não pode ser negativo. Digite novamente.');
    salarioBruto = parseFloat(prompt('Salário base: '));
  }

  nomes.push(nome);
  salariosBrutos.push(salarioBruto);
  faltas.push(qtdFaltas);
}

const calcularDescontoFaltas = (salarioBruto, qtdFaltas) => {
  const descontoPorFalta = 0.02 * salarioBruto;
  return descontoPorFalta * qtdFaltas;
};

const calcularInss = (salarioBruto) => {
  if (salarioBruto <= 2500) {
    return salarioBruto * 0.09;
  } else {
    return salarioBruto * 0.12;
  }
};

const gerarFolhaLiquida = (listaNomes, listaBrutos, listaFaltas) => {
  const salariosLiquidos = [];

  for (let i = 0; i < listaNomes.length; i++) {
    const bruto = listaBrutos[i];
    const qtdFaltas = listaFaltas[i];

    const descontoFaltas = calcularDescontoFaltas(bruto, qtdFaltas);
    const inss = calcularInss(bruto);

    const liquido = bruto - descontoFaltas - inss;
    salariosLiquidos.push(liquido);
  }

  return salariosLiquidos;
};

const imprimirRelatorio = (listaNomes, listaLiquidos) => {
  console.log('\n==================================================');
  console.log('          RELATÓRIO DE FOLHA DE PAGAMENTO         ');
  console.log('==================================================');

  let totalGeral = 0;

  for (let i = 0; i < listaNomes.length; i++) {
    const nome = listaNomes[i];
    const salarioLiquido = listaLiquidos[i];
    totalGeral += salarioLiquido;

    console.log(
      `Funcionário: ${nome.padEnd(15, ' ')} | Salário Líquido: R$ ${salarioLiquido.toFixed(2)}`
    );
  }

  console.log('--------------------------------------------------');
  console.log(`Total Geral a ser Pago: R$ ${totalGeral.toFixed(2)}`);
  console.log('==================================================');
};

const salariosLiquidos = gerarFolhaLiquida(nomes, salariosBrutos, faltas);
imprimirRelatorio(nomes, salariosLiquidos);