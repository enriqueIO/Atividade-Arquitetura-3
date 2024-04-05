Documentação do Sistema de Gerenciamento de Contatos

Visão Geral
O Sistema de Gerenciamento de Contatos é uma aplicação JavaScript destinada a facilitar o gerenciamento de contatos pessoais ou profissionais. Oferece funcionalidades para adicionar, remover, listar e buscar contatos utilizando uma interface de linha de comando simples (CLI). O sistema foi projetado com extensibilidade em mente, permitindo futuras adições e modificações sem alterar o código base existente.

Padrões de Projeto Utilizados
Composite
Motivação: O padrão Composite foi escolhido para estruturar a classe GerenciadorContatos de modo que futuras extensões, como a adição de grupos ou categorias de contatos, possam ser facilmente implementadas. Isso permite tratar contatos individuais e grupos de contatos de maneira uniforme, facilitando a adição ou remoção.

Implementação: Atualmente, a classe GerenciadorContatos mantém uma lista simples de contatos. No futuro, essa estrutura pode ser expandida para suportar composições hierárquicas, permitindo agrupar contatos em categorias ou grupos sem alterar a interface do gerenciador.

Strategy
Motivação: O padrão Strategy foi utilizado para implementar a funcionalidade de busca de contatos, permitindo a definição de múltiplas estratégias de busca (por exemplo, por nome, e-mail ou telefone). Isso facilita a adição de novas estratégias de busca sem necessidade de modificar o código cliente ou a lógica de gerenciamento de contatos.

Implementação: A classe abstrata SearchStrategy define a interface para as estratégias de busca. A classe SearchByName é uma implementação concreta que permite buscar contatos por nome. Este padrão permite alterar a estratégia de busca dinamicamente no contexto da CLI, oferecendo flexibilidade para diferentes necessidades de busca.

Classes e Métodos
class Contact
Representa um contato individual.

Atributos:

name: Nome do contato.
phone: Telefone do contato.
email: E-mail do contato.
class GerenciadorContatos
Mantém e gerencia uma lista de contatos.

Métodos:

addContact(contact): Adiciona um novo contato à lista.
removeContact(contact): Remove um contato da lista.
listContacts(): Retorna a lista de contatos.
searchContacts(strategy, query): Busca contatos utilizando a estratégia e consulta fornecidas.
class SearchStrategy
Interface para estratégias de busca.

Método:

search(contactList, query): Método abstrato para ser implementado pelas estratégias de busca concretas.
class SearchByName
Estratégia de busca por nome.

Método:

search(contactList, name): Retorna uma lista de contatos cujos nomes correspondem à consulta.
class ContactsCLI
Interface de linha de comando para interação com o usuário.

Métodos:

addContact(name, phone, email): Adiciona um contato.
removeContact(name): Remove um contato pelo nome.
listContacts(): Lista todos os contatos.
searchContacts(name): Busca contatos pelo nome.

Uso
Para utilizar o sistema, instancie um objeto GerenciadorContatos e passe-o para o construtor de ContactsCLI. Utilize os métodos da CLI para adicionar, remover, listar e buscar contatos.
