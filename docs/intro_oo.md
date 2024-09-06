### O que é Orientação a Objetos?

Orientação a Objetos (OO) é um **paradigma de programação** que organiza o código em **objetos** que representam coisas do mundo real ou conceitos específicos. Esses objetos possuem **propriedades** (atributos) e **ações** (métodos) que definem seu comportamento.

### 1. Conceitos Básicos de Orientação a Objetos

Vamos entender alguns conceitos fundamentais para começar a trabalhar com Orientação a Objetos.

#### 1.1. Objetos

Um **objeto** é uma instância de uma **classe**. Ele representa algo concreto, uma entidade com características específicas que pode realizar ações. Por exemplo, um "Carro" é um objeto.

- **Propriedades/Atributos**: São as características que descrevem o objeto, como cor, modelo, marca, e ano para um carro.
- **Métodos**: São as ações que o objeto pode realizar, como acelerar, frear ou buzinar.

#### 1.2. Classes

Uma **classe** é como um molde ou uma "receita" para criar objetos. Ela define quais atributos o objeto terá e quais métodos ele poderá executar.

- Pense numa classe como a receita de um bolo: a receita especifica os ingredientes (atributos) e os passos (métodos) para fazer o bolo. Cada bolo feito com essa receita é um objeto criado a partir da classe.

### Exemplo Didático

Para entender melhor, vamos criar um exemplo simples:

1. **Classe `Carro`:**

   - **Atributos:** `cor`, `modelo`, `marca`, `ano`.
   - **Métodos:** `acelerar()`, `frear()`, `buzinar()`.

2. **Objetos:**
   - O carro do João: `Carro do João` (cor: vermelho, modelo: sedan, marca: Toyota, ano: 2022).
   - O carro da Maria: `Carro da Maria` (cor: azul, modelo: hatch, marca: Ford, ano: 2020).

#### Código Simples em JavaScript

```javascript
class Carro {
  constructor(cor, modelo, marca, ano) {
    this.cor = cor;
    this.modelo = modelo;
    this.marca = marca;
    this.ano = ano;
  }

  acelerar() {
    console.log('O carro está acelerando!');
  }

  frear() {
    console.log('O carro está freando!');
  }

  buzinar() {
    console.log('Bip bip!');
  }
}

const carroDoJoao = new Carro('vermelho', 'sedan', 'Toyota', 2022);
const carroDaMaria = new Carro('azul', 'hatch', 'Ford', 2020);

carroDoJoao.acelerar();
carroDaMaria.buzinar();
```

### 2. Quatro Pilares da Orientação a Objetos

Os conceitos fundamentais da Orientação a Objetos são conhecidos como os **quatro pilares**:

1. **Encapsulamento**
2. **Herança**
3. **Polimorfismo**
4. **Abstração**

Vamos explorar cada um deles:

#### 2.1. Encapsulamento

O **encapsulamento** é a ideia de proteger os dados de um objeto, permitindo que eles sejam acessados apenas por métodos definidos na classe. Isso ajuda a manter o controle sobre como os atributos do objeto são alterados e evita que partes externas do código modifiquem o estado do objeto de forma indesejada.

##### Exemplo

Vamos adicionar **encapsulamento** ao nosso exemplo de `Carro`:

```javascript
class Carro {
  constructor(cor, modelo, marca, ano) {
    this._cor = cor;
    this._modelo = modelo;
    this._marca = marca;
    this._ano = ano;
  }

  get cor() {
    return this._cor;
  }

  set cor(novaCor) {
    if (novaCor === 'vermelho' || novaCor === 'azul') {
      this._cor = novaCor;
    } else {
      console.log('Cor inválida!');
    }
  }

  acelerar() {
    console.log('O carro está acelerando!');
  }

  frear() {
    console.log('O carro está freando!');
  }

  buzinar() {
    console.log('Bip bip!');
  }
}

const carro = new Carro('verde', 'sedan', 'Toyota', 2022);
carro.cor = 'preto'; // Cor inválida!
console.log(carro.cor); // verde
```

#### 2.2. Herança

A **herança** permite que uma classe herde atributos e métodos de outra classe, promovendo o reuso de código e a criação de hierarquias.

##### Exemplo

Vamos criar uma classe `CarroEletrico` que herda da classe `Carro`:

```javascript
class CarroEletrico extends Carro {
  constructor(cor, modelo, marca, ano, bateria) {
    super(cor, modelo, marca, ano);
    this._bateria = bateria;
  }

  recarregar() {
    console.log('O carro está recarregando!');
  }
}

const tesla = new CarroEletrico('branco', 'sedan', 'Tesla', 2023, '100%');
tesla.acelerar();
tesla.recarregar();
```

#### 2.3. Polimorfismo

**Polimorfismo** significa "muitas formas". Ele permite que classes diferentes usem o mesmo método de maneiras diferentes.

##### Exemplo

Vamos ver o polimorfismo com `Carro` e `CarroEletrico`:

```javascript
class Carro {
  acelerar() {
    console.log('O carro comum está acelerando!');
  }
}

class CarroEletrico extends Carro {
  acelerar() {
    console.log('O carro elétrico está acelerando silenciosamente!');
  }
}

const carroComum = new Carro();
const carroEletrico = new CarroEletrico();

function dirigirCarro(carro) {
  carro.acelerar();
}

dirigirCarro(carroComum);
dirigirCarro(carroEletrico);
```

#### 2.4. Abstração

**Abstração** é o conceito de ocultar detalhes complexos e mostrar apenas o essencial. Em programação orientada a objetos, abstração é usada para criar uma estrutura simplificada para interagir com um objeto, enquanto esconde a complexidade interna.

##### Classes Abstratas e Métodos Abstratos

- **Classe Abstrata**: Uma classe que não pode ser instanciada diretamente e serve como base para outras classes. Pode conter métodos e propriedades comuns, mas não fornecer uma implementação completa para todos os métodos. As subclasses são obrigadas a implementar os métodos abstratos definidos na classe abstrata.

- **Método Abstrato**: Um método sem implementação na classe abstrata, que deve ser implementado pelas subclasses. Garante que todas as subclasses sigam um contrato específico.

##### Exemplo com Classes Abstratas e Métodos Abstratos

```typescript
// Classe abstrata
abstract class Veiculo {
  protected cor: string;
  protected modelo: string;
  protected marca: string;
  protected ano: number;

  constructor(cor: string, modelo: string, marca: string, ano: number) {
    if (new.target === Veiculo) {
      throw new Error(
        'Não é possível instanciar a classe abstrata Veiculo diretamente.'
      );
    }
    this.cor = cor;
    this.modelo = modelo;
    this.marca = marca;
    this.ano = ano;
  }

  // Método abstrato
  abstract acelerar(): void;
}

// Classe Carro
class Carro extends Veiculo {
  acelerar(): void {
    console.log('O carro está acelerando!');
  }
}

// Classe CarroEletrico
class CarroEletrico extends Veiculo {
  acelerar(): void {
    console.log('O carro elétrico está acelerando silenciosamente!');
  }
}

// Criando objetos
const carro = new Carro('vermelho', 'hatch', 'Fiat', 2021);
const carroEletrico = new CarroEletrico('preto', 'SUV', 'Tesla', 2022);

// Usando os métodos
carro.acelerar(); // O carro está acelerando!
carroEletrico.acelerar(); // O carro elétrico está acelerando silenciosamente!
```

### 3. Interfaces e `implements`

As **interfaces** são usadas para definir um contrato que uma classe deve seguir. Elas especificam métodos que uma classe precisa implementar, mas sem fornecer a implementação desses métodos.

O operador **`implements`** é usado quando uma classe se compromete a implementar os métodos de uma interface. Em linguagens como TypeScript, isso é muito comum para garantir que certas classes sigam um conjunto específico de métodos.

#### Exemplo de Interface

```typescript
interface Veiculo {
  acelerar(): void;
  frear(): void;
}

class Carro implements Veiculo {
  acelerar() {
    console.log('O carro está acelerando!');
  }

  frear() {
    console.log('O carro está freando!');
  }
}
```

#### Quando Usar Interfaces?

Use **interfaces** quando você quiser garantir que um grupo de classes siga um conjunto específico de métodos ou comportamentos, especialmente quando estiver trabalhando com dependências que requerem consistência.
