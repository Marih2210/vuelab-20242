<template>
    <div class="about">
      <h1 id="hello">Usuários</h1>
      <p>
        <label for="nome" id="labelNome">Nome: </label>
        <input id="nome" type="text" v-model="nome"/>
      </p>
      <p>
        <label for="senha" id="labelSenha">Senha: </label>
        <input id="senha" type="password" v-model="senha"/>
      </p>
      <button @click="cadastrarUsuario">Incluir</button>
      <button @click="buscarUsuarios">Atualizar</button>
      <p v-if="erro">{{ erro }}</p>
      <table>
        <thead>
          <th>Id</th>
          <th>Nome</th>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios">
            <td>{{ usuario.id }}</td>
            <td>{{ usuario.nome }}</td>
          </tr>
        </tbody>
      </table>
  
    </div>
  </template>
  
  <script setup lang="ts">
  
  import { ref } from 'vue';
  import axios from 'axios';
  import { onMounted } from 'vue';
  
  const nome = ref<string>("Aluno");
  const senha = ref<string>("123456");
  const erro = ref<string>();
  
  const usuarios = ref([{ id: 1, nome: "Adamastor", senha: "123456" }, 
      { id: 2, nome: "Florinda", senha: "4b4c4x1"}]);
  
  function alteraNome(e: any) {
    nome.value = e.target.value;
  }

  async function buscarUsuarios() {
    try {
        usuarios.value = (await axios.get('usuario')).data;
    }
    catch(ex) {
        erro.value = (ex as Error).message;
    }
  }

  async function cadastrarUsuario() {
    try {
        await axios.post('usuario', 
                {
                    nome: nome.value,
                    senha: senha.value
                }
            );
    }
    catch(ex) {
        erro.value = (ex as Error).message;
    }
    buscarUsuarios();
  }

  onMounted(() => {
    buscarUsuarios();
  });
  
  </script>