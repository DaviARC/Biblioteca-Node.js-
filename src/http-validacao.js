function extraiLinks(arrLinks){
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join())
}
 async function checaStatus(listaURLs){
  const arrStatus = await Promise.all(
      listaURLs.map(async (url) => {
      try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.status;
      } catch (erro){ 
        return manejaErros(erro);
      } 
   })
  )
  return arrStatus;
}
export default async function listaValidada(lista){
  
  const links = extraiLinks(lista);
  const status = await checaStatus(links);

  return lista.map((objeto, indice) => ({
    ...objeto,
    status: status[indice],
  }));
} 
function manejaErros(erro){
  if(erro.cause.code === 'ENOTFOUND'){
  return `link não encontrado`;
  } else {
  return 'ocorreu algum erro';
  }
}