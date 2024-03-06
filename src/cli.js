import pegaArquivo from "./index.js";
import fs from 'fs';
import chalk, { Chalk } from "chalk";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

  async function imprimeLista(valida, resultado, identificador = ''){
  if(valida){
    console.log(chalk.yellow(`lista validada`),
    chalk.black.bgGreen(identificador),
    await listaValidada(resultado));
  } else {
    console.log(
      chalk.yellow('lista de links'),
      chalk.black.bgGreen(identificador),
      resultado);
  }
}

async function processaTexto(arquivo){
  const caminho = arquivo[2];
  const valida = arquivo[3] === '--valida';

  
  try{
    fs.lstatSync(caminho);
  } catch(erro) {
    if(erro.code === 'ENOENT'){
      console.log(chalk.red("Arquivo ou diretório não existe!"));
      return
    }
  }
  
  if(fs.lstatSync(caminho).isFile()){
    const resultado = await pegaArquivo(caminho); 
    imprimeLista(valida, resultado)
  } else if(fs.lstatSync(caminho).isDirectory()){
    const resultado = await fs.promises.readdir(caminho)
    resultado.forEach(async arquivo => {
      const lista = await pegaArquivo(`${caminho}/${arquivo}`);
      imprimeLista(valida, lista, arquivo);
    })
    
  }
}

processaTexto(caminho);