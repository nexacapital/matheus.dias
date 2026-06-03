exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyIlXNBRpIs3BBtuRw81iMnEvCpBmUXmlKaXj9IQ4tkd0f4SrR3erXLk-YcZFGadjRaxQ/exec';
    
    if (event.httpMethod === 'POST') {
      const client = JSON.parse(event.body);
      const params = new URLSearchParams({
        action: 'save',
        id: client.id || 'c_'+Date.now(),
        nome: client.nome || '',
        cpf: client.cpf || '',
        nascimento: client.nascimento || '',
        estadoCivil: client.estadoCivil || '',
        telefone: client.telefone || '',
        conjuge_nome: client.conjuge?.nome || '',
        conjuge_cpf: client.conjuge?.cpf || '',
        conjuge_nasc: client.conjuge?.nascimento || '',
        valorImovel: client.valorImovel || 0,
        valorFinanciamento: client.valorFinanciamento || 0
      });
      const resp = await fetch(SCRIPT_URL + '?' + params.toString());
      const data = await resp.json();
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }
    
    if (event.httpMethod === 'GET') {
      const resp = await fetch(SCRIPT_URL);
      const data = await resp.json();
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
