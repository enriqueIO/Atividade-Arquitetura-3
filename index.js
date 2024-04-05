//Interface para estratégias de busca.
class SearchStrategy {

    //Método abstrato para ser implementado pelas estratégias de busca concretas.
    search(contactList, query) {
        throw new Error("O método 'search()' precisa ser implementado.");
    }
}

//Estratégia de busca por nome.
class SearchByName extends SearchStrategy {
    
    //Retorna uma lista de contatos cujos nomes correspondem à consulta.
    search(contactList, contactName) {
        return contactList.filter(contact => contact.contactName.includes(contactName));
    }
}

//Classe do tipo Model para armazenar as informações dos contatos.
class Contact {
    constructor(contactName, contactPhone, contactEmail) {
        this.contactName = contactName;
        this.contactPhone = contactPhone;
        this.contactEmail = contactEmail;
    }
}

//Classe utilizada para gerenciar os objetos instanciados pela classe Contatos
class contactManager {
    constructor() {
        this.contacts = [];
    }

    //Adiciona um novo contato à lista.
    addContact(contact) {
        this.contacts.push(contact);
    }

    //Remove um contato da lista.
    removeContact(contact) {
        const index = this.contacts.findIndex(c => c === contact);
        if (index > -1) {
            this.contacts.splice(index, 1);
        }
    }

    //Retorna a lista de contatos.
    listContacts() {
        return this.contacts;
    }

    // Busca contatos utilizando a estratégia e consulta fornecidas.
    searchContacts(strategy, query) {
        return strategy.search(this.contacts, query);
    }
}

//Interface de linha de comando para interação com o usuário.
class ContactsCLI {
    constructor(manager) {
        this.manager = manager;
        this.searchStrategy = new SearchByName();
    }

    //Método usado para o usuário adicionar um contato desejado
    addContact(name, phone, email) {
        const contact = new Contact(name, phone, email);
        this.manager.addContact(contact);
        console.log("Contato adicionado:", contact, "\n");
    }

    //Método utilizado para o usuário remover um contato desejado
    removeContact(name) {
        const contact = this.manager.listContacts().find(c => c.name === name);
        if (contact) {
            this.manager.removeContact(contact);
            console.log("Contato removido com sucesso:", contact);
        } else {
            console.log("Não foi possível encontrar o contato.");
        }
    }

    //Método utilizado para o usuário listar todos os contatos adicionados
    listContacts() {
        console.log("Contatos:");
        this.manager.listContacts().forEach(contact => {
            console.log(`Nome: ${contact.contactName}, Telefone: ${contact.contactPhone}, Email: ${contact.contactEmail}\n`);
        });
    }

    //Método utilizado para o usuário buscar um contato desejado
    searchContacts(name) {
        console.log("Retorno da busca:");
        const results = this.manager.searchContacts(this.searchStrategy, name);
        results.forEach(contact => {
            console.log(`Nome: ${contact.contactName}, Telefone: ${contact.contactPhone}, Email: ${contact.contactEmail}\n`);
        });
    }
}

const manager = new contactManager();
const cli = new ContactsCLI(manager);

cli.addContact("Enrique Marques", "12991894108", "enrique.marques.000@gmail.com");
cli.searchContacts("Enrique");
cli.addContact("Maria Fernanda Leonel Bertelli", "43988217277", "mfbertelli15@gmail.com");
cli.searchContacts("Maria");
cli.listContacts();
