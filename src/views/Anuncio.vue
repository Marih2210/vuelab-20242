<template>
  <div class="anuncios">
    <h1>Gerenciamento de Anúncios</h1>

    <form @submit.prevent="cadastrarAnuncio">
      <p>
        <label for="nome">Nome do Produto:</label>
        <input id="nome" type="text" v-model="novoAnuncio.nomeProduto" required />
      </p>
      <p>
        <label for="descricao">Descrição (opcional):</label>
        <input id="descricao" type="text" v-model="novoAnuncio.descricao" />
      </p>
      <p>
        <label for="preco">Preço:</label>
        <input id="preco" type="float" v-model="novoAnuncio.preco" required />
      </p>
      <p>
        <label for="peso">Peso (opcional):</label>
        <input id="peso" type="float" v-model="novoAnuncio.peso" />
      </p>
      <button type="submit">Cadastrar Anúncio</button>
    </form>

    <p v-if="erro" class="erro">{{ erro }}</p>

    <!-- Formulário de Consulta -->
    <div>
      <h2>Consultar Anúncios</h2>
      <p>
        <label for="consulta-data">Data de Cadastro:</label>
        <input id="consulta-data" type="datetime-local" v-model="consultaData" />
      </p>
      <p>
        <label for="consulta-descricao">Descrição:</label>
        <input id="consulta-descricao" type="text" v-model="consultaDescricao" />
      </p>
      <button @click="consultarAnuncios">Consultar</button>
    </div>

    <!-- Lista de Anúncios -->
    <h2>Lista de Anúncios</h2>
    <p v-if="mensagem">{{ mensagem }}</p>
    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Situação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="anuncio in anuncios" :key="anuncio.id">
          <td>{{ anuncio.id }}</td>
          <td>{{ anuncio.nomeProduto }}</td>
          <td>{{ anuncio.preco }}</td>
          <td>{{ anuncio.situacao }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const anuncios = ref([]);
const novoAnuncio = ref({
  nomeProduto: '',
  descricao: '',
  preco: null,
  peso: null,
});
const consultaData = ref('');
const consultaDescricao = ref('');
const erro = ref('');
const mensagem = ref('');

async function buscarAnuncios() {
  try {
    const response = await axios.get('/anuncio');
    anuncios.value = response.data.map((anuncio) => ({
      id: anuncio.id,
      nomeProduto: anuncio.nomeProduto,
      preco: anuncio.preco,
      situacao: anuncio.peso ? 'aferido' : 'pendente',
    }));
    mensagem.value = '';
  } catch (ex) {
    erro.value = 'Erro ao buscar anúncios: ' + (ex as Error).message;
  }
}

async function cadastrarAnuncio() {
  const { nomeProduto, descricao, preco } = novoAnuncio.value;
  if (!nomeProduto || !preco) {
    erro.value = 'Por favor, preencha todos os campos obrigatórios.';
    return;
  }

  try {
    await axios.post('/anuncio', novoAnuncio.value);
    novoAnuncio.value = { nomeProduto: '', descricao: '', preco: null, peso: null };
    erro.value = '';
    buscarAnuncios();
  } catch (ex) {
    erro.value = 'Erro ao cadastrar anúncio: ' + (ex as Error).message;
  }
}

async function consultarAnuncios() {
  try {
    const response = await axios.get(`/anuncio/buscaDescricao/${consultaData.value || 'null'}/${consultaDescricao.value || 'null'}`);
    if (response.data.length > 0) {
      anuncios.value = response.data.map((anuncio) => ({
        id: anuncio.id,
        nomeProduto: anuncio.nomeProduto,
        preco: anuncio.preco,
        situacao: anuncio.peso ? 'aferido' : 'pendente',
      }));
      mensagem.value = '';
    } else {
      anuncios.value = [];
      mensagem.value = 'Nenhum anúncio foi encontrado para os critérios fornecidos.';
    }
  } catch (ex) {
    erro.value = 'Erro ao consultar anúncios: ' + (ex as Error).message;
  }
}

onMounted(() => {
  buscarAnuncios();
});
</script>

<style scoped>
.anuncios {
  font-family: Arial, sans-serif;
  padding: 1rem;
}

.erro {
  color: red;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
</style>
