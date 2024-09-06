## Polimorfismo em Programação Orientada a Objetos

**Polimorfismo** é um princípio fundamental da programação orientada a objetos que permite que uma única interface ou método seja usado para representar diferentes tipos de objetos. Em outras palavras, polimorfismo permite que o mesmo método tenha comportamentos diferentes dependendo do tipo do objeto que o invoca. Isso promove flexibilidade e extensibilidade no código.

### Conceitos Principais

1. **Definição**:

   - Polimorfismo vem do grego, onde "poli" significa muitos e "morph" significa formas. Portanto, polimorfismo se refere a "muitas formas".

2. **Tipos de Polimorfismo**:

   - **Polimorfismo de Sobrecarga**: Permite que diferentes métodos tenham o mesmo nome, mas com diferentes assinaturas (número e tipo de parâmetros). Em linguagens como Java e C#, isso é possível, mas em TypeScript não há suporte direto para sobrecarga de métodos como em outras linguagens.
   - **Polimorfismo de Subtipo (ou Inclusivo)**: Permite que objetos de classes derivadas sejam tratados como objetos da classe base. Esse tipo é mais comum em linguagens de POO e é suportado por herança e interfaces.

3. **Interfaces e Classes Abstratas**:

   - **Interfaces**: Definem um contrato que as classes devem seguir. Qualquer classe que implemente uma interface deve fornecer uma implementação para os métodos definidos na interface.
   - **Classes Abstratas**: Podem definir métodos que devem ser implementados pelas classes derivadas e métodos que têm uma implementação padrão.

4. **Métodos Sobrescritos**:

   - Em uma classe derivada, é possível sobrescrever um método da classe base para fornecer uma implementação específica. Isso permite que o mesmo método tenha comportamentos diferentes em diferentes classes.

5. **Binding Dinâmico**:
   - O polimorfismo geralmente usa o conceito de binding dinâmico ou late binding, onde a decisão sobre qual método será chamado é feita em tempo de execução, com base no tipo real do objeto.

### Exemplos em TypeScript

#### Polimorfismo com Classes e Herança

Vamos usar um exemplo com classes e herança para ilustrar o polimorfismo.

##### Classe Base `Animal`

```typescript
class Animal {
  public emitirSom(): void {
    console.log('O animal emitiu um som.');
  }
}
```

##### Classe Derivada `Cachorro`

```typescript
class Cachorro extends Animal {
  public emitirSom(): void {
    console.log('O cachorro faz: Au au!');
  }
}
```

##### Classe Derivada `Gato`

```typescript
class Gato extends Animal {
  public emitirSom(): void {
    console.log('O gato faz: Miau!');
  }
}
```

##### Função que Usa Polimorfismo

```typescript
function fazerEmitirSom(animal: Animal): void {
  animal.emitirSom();
}

const cachorro = new Cachorro();
const gato = new Gato();

fazerEmitirSom(cachorro); // O cachorro faz: Au au!
fazerEmitirSom(gato); // O gato faz: Miau!
```

#### Polimorfismo com Interfaces

Interfaces também suportam polimorfismo ao permitir que diferentes classes implementem o mesmo contrato.

##### Interface `Forma`

```typescript
interface Forma {
  desenhar(): void;
}
```

##### Classe `Circulo`

```typescript
class Circulo implements Forma {
  public desenhar(): void {
    console.log('Desenhando um círculo.');
  }
}
```

##### Classe `Quadrado`

```typescript
class Quadrado implements Forma {
  public desenhar(): void {
    console.log('Desenhando um quadrado.');
  }
}
```

##### Função que Usa Polimorfismo com Interfaces

```typescript
function desenharForma(forma: Forma): void {
  forma.desenhar();
}

const circulo = new Circulo();
const quadrado = new Quadrado();

desenharForma(circulo); // Desenhando um círculo.
desenharForma(quadrado); // Desenhando um quadrado.
```

### Pontos Importantes

1. **Flexibilidade**:

   - Polimorfismo permite que você escreva código que pode operar sobre objetos de diferentes tipos de maneira uniforme. Isso facilita a extensibilidade e manutenção do código.

2. **Substituição de Tipo**:

   - Objetos de classes derivadas podem substituir objetos da classe base sem alterar o comportamento do sistema. Isso é fundamental para o princípio de substituição de Liskov (LSP), que afirma que objetos de uma classe derivada devem poder substituir objetos da classe base sem alterar as propriedades desejáveis do programa.

3. **Abstração**:

   - Polimorfismo é frequentemente utilizado em conjunto com a abstração para permitir que os detalhes de implementação sejam ocultados, enquanto a interface pública permanece consistente.

4. **Design Orientado a Objetos**:
   - O polimorfismo é um dos pilares do design orientado a objetos, ajudando a criar sistemas mais modularizados e desacoplados.

### Conclusão

O polimorfismo é um conceito poderoso em programação orientada a objetos que permite que o mesmo método ou interface seja usado de diferentes maneiras, dependendo do tipo do objeto. Em TypeScript, você pode implementar polimorfismo usando herança de classes e interfaces, permitindo que o mesmo código funcione de maneira flexível com diferentes tipos de objetos.
