### Encapsulamento em Programação Orientada a Objetos (POO)

**Definição:**
Encapsulamento é um dos quatro pilares fundamentais da Programação Orientada a Objetos. Ele se refere à prática de esconder os detalhes internos de um objeto e expor apenas as funcionalidades necessárias para o uso externo. O encapsulamento ajuda a manter a integridade dos dados e permite a implementação de mudanças no código sem afetar o código que usa a classe.

**Objetivos do Encapsulamento:**

1. **Ocultar Detalhes Internos:** Esconder os detalhes internos da implementação do objeto, mostrando apenas a interface necessária para a interação com o objeto.
2. **Manter a Integridade dos Dados:** Garantir que os dados internos do objeto não sejam alterados de forma inadequada ou inesperada.
3. **Reduzir a Complexidade:** Simplificar o uso do objeto ao ocultar sua complexidade interna e oferecer métodos bem definidos para interação.
4. **Facilitar a Manutenção:** Permitir que mudanças na implementação interna da classe não afetem o código que usa a classe.

**Principais Conceitos:**

1. **Modificadores de Acesso:**

   - **`public`:** Membros marcados como `public` são acessíveis de qualquer lugar no código. São parte da interface pública da classe.
   - **`private`:** Membros marcados como `private` são acessíveis apenas dentro da própria classe. Eles não podem ser acessados diretamente de fora da classe ou por classes derivadas.
   - **`protected`:** Membros marcados como `protected` são acessíveis dentro da própria classe e por classes derivadas (subclasses), mas não de fora.

2. **Getters e Setters:**

   - **Getters:** Métodos que retornam o valor de um atributo privado. Permitem o acesso controlado aos dados.
   - **Setters:** Métodos que definem o valor de um atributo privado. Permitem a modificação controlada dos dados, geralmente com validação.

3. **Controle de Acesso:**

   - Através dos modificadores de acesso e métodos de acesso (getters e setters), o encapsulamento permite que você controle como os dados são acessados e modificados, garantindo que a lógica de negócios e a integridade dos dados sejam mantidas.

4. **Interface Pública:**

   - A interface pública de uma classe é composta pelos métodos e propriedades que são acessíveis para outras classes e componentes. O encapsulamento permite que você defina uma interface clara e bem definida, enquanto mantém a implementação oculta.

5. **Imutabilidade:**
   - O encapsulamento pode ser usado para criar objetos imutáveis, onde os atributos são definidos apenas uma vez e não podem ser alterados posteriormente. Isso pode ajudar a garantir a consistência e a segurança dos dados.

**Benefícios do Encapsulamento:**

1. **Modularidade:** Permite que você divida o código em partes modulares e independentes, facilitando o desenvolvimento e a manutenção.
2. **Segurança:** Protege o estado interno do objeto contra alterações inesperadas, o que pode prevenir bugs e comportamentos indesejados.
3. **Flexibilidade:** Permite que você altere a implementação interna da classe sem afetar o código que usa a classe, desde que a interface pública permaneça a mesma.
4. **Reusabilidade:** Facilita a reutilização do código, já que você pode criar objetos com comportamentos específicos e bem definidos, sem se preocupar com a implementação interna.

**Exemplo em Código:**

Vamos ilustrar o conceito de encapsulamento com um exemplo em JavaScript:

```javascript
class Carro {
  // Atributos privados (por convenção em JavaScript)
  #cor;
  #modelo;
  #marca;
  #ano;

  // Construtor para inicializar o carro
  constructor(cor, modelo, marca, ano) {
    this.#cor = cor;
    this.#modelo = modelo;
    this.#marca = marca;
    this.#ano = ano;
  }

  // Getter para obter a cor
  get cor() {
    return this.#cor;
  }

  // Setter para definir a cor com validação
  set cor(novaCor) {
    if (novaCor === 'vermelho' || novaCor === 'azul') {
      this.#cor = novaCor;
    } else {
      console.log('Cor inválida!');
    }
  }

  // Método público para acelerar o carro
  acelerar() {
    console.log('O carro está acelerando!');
  }
}

// Criando um objeto Carro
const carro = new Carro('verde', 'sedan', 'Toyota', 2022);
console.log(carro.cor); // verde
carro.cor = 'preto'; // Cor inválida!
console.log(carro.cor); // verde
```

**Resumo:**
Encapsulamento é uma técnica crucial em POO que ajuda a proteger e gerenciar dados, garantindo que a complexidade interna de um objeto seja ocultada e controlada. Usando modificadores de acesso, getters, setters, e uma interface pública bem definida, você pode criar sistemas mais seguros, modulares e flexíveis.
