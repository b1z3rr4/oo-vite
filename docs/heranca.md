## Herança em Programação Orientada a Objetos

A **herança** é um conceito fundamental em programação orientada a objetos que permite que uma classe (chamada de classe derivada ou filha) herde atributos e métodos de outra classe (chamada de classe base ou pai). Isso promove a reutilização de código, facilita a extensão de funcionalidades e cria uma hierarquia entre classes.

### Conceitos Principais

1. **Classe Base (ou Pai)**:

   - É a classe que fornece os atributos e métodos que serão herdados pelas classes derivadas.
   - Pode ser uma classe concreta (implementada) ou abstrata (definida para ser estendida, não instanciada diretamente).

2. **Classe Derivada (ou Filha)**:

   - É a classe que herda os atributos e métodos da classe base.
   - Pode adicionar novos atributos e métodos, além de sobrescrever os métodos da classe base, se necessário.

3. **Modificadores de Acesso**:

   - **`public`**: Membros que são `public` podem ser acessados de qualquer lugar.
   - **`protected`**: Membros que são `protected` podem ser acessados dentro da própria classe e por classes que herdam dela.
   - **`private`**: Membros que são `private` só podem ser acessados dentro da própria classe, não são visíveis para classes derivadas.

4. **Métodos Sobrescritos**:

   - Em uma classe derivada, é possível modificar o comportamento de um método herdado da classe base, usando o mesmo nome de método.

5. **Chamada ao Construtor da Classe Base**:
   - Em TypeScript, o construtor da classe base pode ser chamado usando a palavra-chave `super()` dentro do construtor da classe derivada.

### Exemplo em TypeScript

Vamos ver como isso funciona com um exemplo simples que usa a herança para criar uma classe `CarroEletrico` que estende a classe `Carro`.

##### Classe Base `Carro`

```typescript
class Carro {
  protected cor: string;
  protected modelo: string;
  protected marca: string;
  protected ano: number;

  constructor(cor: string, modelo: string, marca: string, ano: number) {
    this.cor = cor;
    this.modelo = modelo;
    this.marca = marca;
    this.ano = ano;
  }

  public acelerar(): void {
    console.log('O carro está acelerando!');
  }

  public frear(): void {
    console.log('O carro está freando!');
  }
}
```

##### Classe Derivada `CarroEletrico`

```typescript
class CarroEletrico extends Carro {
  private bateria: string;

  constructor(
    cor: string,
    modelo: string,
    marca: string,
    ano: number,
    bateria: string
  ) {
    super(cor, modelo, marca, ano); // Chama o construtor da classe base
    this.bateria = bateria;
  }

  public recarregar(): void {
    console.log('O carro está recarregando!');
  }

  // Sobrescrevendo o método acelerar
  public acelerar(): void {
    console.log('O carro elétrico está acelerando silenciosamente!');
  }
}
```

##### Utilização das Classes

```typescript
// Criando um objeto da classe CarroEletrico
const tesla = new CarroEletrico('branco', 'sedan', 'Tesla', 2023, '100%');

// Chamando métodos da classe base
tesla.acelerar(); // O carro elétrico está acelerando silenciosamente!
tesla.frear(); // O carro está freando!

// Chamando método da classe derivada
tesla.recarregar(); // O carro está recarregando!
```

### Pontos Importantes

1. **Reutilização de Código**:

   - A classe `CarroEletrico` reutiliza os métodos `acelerar` e `frear` da classe `Carro`, evitando duplicação de código.

2. **Extensão de Funcionalidade**:

   - A classe `CarroEletrico` adiciona um novo método `recarregar` que não está presente na classe `Carro`.

3. **Sobrescrita de Métodos**:

   - O método `acelerar` é sobrescrito na classe `CarroEletrico` para oferecer um comportamento específico para carros elétricos.

4. **Visibilidade de Membros**:

   - Atributos e métodos marcados como `protected` em `Carro` podem ser acessados diretamente dentro de `CarroEletrico`, enquanto membros `private` são ocultos.

5. **Construtores e `super()`**:
   - O construtor de `CarroEletrico` chama `super()` para garantir que os atributos definidos na classe base sejam inicializados corretamente.

### Conclusão

A herança é uma ferramenta poderosa na programação orientada a objetos que permite criar novas classes baseadas em classes existentes, promovendo a reutilização de código e a organização hierárquica. Em TypeScript, você pode usar herança para estender classes, sobrescrever métodos e adicionar funcionalidades adicionais, mantendo um design limpo e modular.
