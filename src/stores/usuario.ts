import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const usuarioStore = defineStore('usuario', () => {
  const nomeUsuario = ref<string>()
  const token = ref<string>()
  const erro = ref<string>()

  async function login(nome:string, senha:string) {
    try {
        let response = (await axios.post('login', 
                {
                    nome: nome,
                    senha: senha
                }
            ));
        nomeUsuario.value = nome;
        erro.value = '';
        token.value = response.data.token;
    }
    catch(ex) {
        erro.value = (ex as Error).message;
    }
  }

  return { nomeUsuario, token, erro, login }},
{
    persist: true
}
)
