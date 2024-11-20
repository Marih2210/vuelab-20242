<template>
  <div class="about">
    <h1 id="hello">Hello world {{ nome }}</h1>
    <p>
      <label for="nome" id="labelNome">Nome: </label>
      <input id="nome" type="text" v-model="nome"/>
      <input type="text" :value="nome" @input="alteraNome"/>
    </p>
    <p>
      <label for="senha" id="labelSenha">Senha: </label>
      <input id="senha" type="password" v-model="senha"/>
    </p>
    <button @click="incluirUsuario">Incluir</button>
    <p v-if="nome.length > 5">Nome comprido</p>
    <p v-else>Nome ok</p>
    <table>
      <thead>
        <th>Nome</th>
        <th>Senha</th>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios">
          <td>{{ usuario.nome }}</td>
          <td>{{ usuario.senha }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

const nome = ref<string>("Aluno");
const senha = ref<string>("123456");

const usuarios = ref([{ nome: "Adamastor", senha: "123456" }, 
    { nome: "Florinda", senha: "4b4c4x1"}]);

function alteraNome(e: any) {
  nome.value = e.target.value;
}

function incluirUsuario() {
  usuarios.value.push({ nome: nome.value, senha: senha.value});
}

</script>