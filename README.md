# App

Site para avaliação e recomendação de filmes.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível avaliar um filme;
- [ ] Deve ser possível escrever uma crítica sobre um filme;
- [ ] Deve ser possível salvar um filme para assistir depois;
- [ ] O usuário deve receber recomendações de filmes com base em suas avaliações;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário deve poder avaliar um filme apenas uma vez;
- [ ] O usuário deve poder salvar um filme para assistir depois apenas uma vez;
- [ ] Os filmes salvos para assistir depois devem ser recomendados com prioridade;

## RNFs (Requisitos não funcionais)

- [ ] A senha do usuário deve ser criptografada;
- [ ] Os dados da aplicação precisam estar persistido em um banco PostgreSQL;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
