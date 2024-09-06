## Abstração em Programação Orientada a Objetos

**Abstração** é um conceito fundamental na programação orientada a objetos (POO) que envolve ocultar os detalhes complexos de implementação e exibir apenas as funcionalidades essenciais para o usuário. A abstração permite que você se concentre no que um objeto faz, sem precisar se preocupar com como ele faz isso. Em POO, a abstração é frequentemente implementada através de classes abstratas e métodos abstratos.

### Classes Abstratas

**Classes Abstratas** são um tipo especial de classe que não pode ser instanciada diretamente. Elas servem como base para outras classes e permitem que você defina uma estrutura comum para um grupo de subclasses. As classes abstratas podem conter métodos abstratos, que são métodos sem implementação, e métodos concretos, que possuem implementação.

#### Características das Classes Abstratas

1. **Métodos Abstratos**:

   - São métodos declarados na classe abstrata sem uma implementação. As subclasses que herdam da classe abstrata devem fornecer uma implementação para esses métodos. Isso garante que todas as subclasses implementem um comportamento específico.

2. **Métodos Concretos**:

   - Métodos que têm uma implementação na classe abstrata. As subclasses podem usar esses métodos diretamente ou sobrescrevê-los para alterar seu comportamento. Métodos concretos fornecem funcionalidade comum que pode ser compartilhada entre as subclasses.

3. **Construtores**:

   - Classes abstratas podem ter construtores que são chamados quando as subclasses são instanciadas. Esses construtores podem inicializar atributos e realizar configurações necessárias para as subclasses.

4. **Não Instanciáveis**:

   - Não é possível criar instâncias diretamente de uma classe abstrata. Ela serve apenas como uma base para outras classes. Isso permite que você defina uma estrutura e comportamento comuns sem permitir que a classe abstrata seja usada por si só.

5. **Herança**:
   - As classes abstratas são projetadas para serem estendidas por outras classes. Isso permite que você crie uma hierarquia de classes onde classes mais específicas podem herdar comportamento e estrutura de classes mais gerais.

#### Exemplo com Classes Abstratas

```typescript
abstract class Veiculo {
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

  // Método abstrato
  abstract acelerar(): void;

  // Método concreto
  buzinar(): void {
    console.log('Bip bip!');
  }
}

class Carro extends Veiculo {
  acelerar(): void {
    console.log('O carro está acelerando!');
  }
}

class CarroEletrico extends Veiculo {
  acelerar(): void {
    console.log('O carro elétrico está acelerando silenciosamente!');
  }
}

// Instanciando as classes concretas
const carro = new Carro('vermelho', 'hatch', 'Fiat', 2021);
const carroEletrico = new CarroEletrico('preto', 'SUV', 'Tesla', 2022);

carro.acelerar(); // O carro está acelerando!
carroEletrico.acelerar(); // O carro elétrico está acelerando silenciosamente!
```

### Conceitos Adicionais sobre Abstração

1. **Encapsulamento**:

   - A abstração muitas vezes trabalha em conjunto com o encapsulamento, que é o conceito de esconder os detalhes internos de um objeto e expor apenas o necessário. Juntos, esses conceitos ajudam a criar sistemas mais modularizados e compreensíveis.

2. **Polimorfismo**:

   - A abstração também está relacionada ao polimorfismo, que permite que métodos com o mesmo nome se comportem de maneira diferente em diferentes classes. Classes abstratas podem definir métodos abstratos que são implementados de maneira diferente por suas subclasses, facilitando a flexibilidade e a reutilização de código.

3. **Contratos e Implementações**:

   - Classes abstratas definem um contrato para suas subclasses, especificando quais métodos devem ser implementados. Isso garante que todas as subclasses sigam um padrão específico, enquanto permitem diferentes implementações para esses métodos.

4. **Design Orientado a Objetos**:

   - O uso de classes abstratas é uma prática comum em design orientado a objetos para criar hierarquias de classes e garantir que as classes derivadas implementem funcionalidades específicas. Isso contribui para um design mais coeso e escalável.

5. **Hierarquia de Classes**:
   - Em uma hierarquia de classes, a classe abstrata pode fornecer uma base sólida para as classes derivadas. As classes abstratas ajudam a definir a estrutura básica e os comportamentos compartilhados, enquanto as classes derivadas adicionam funcionalidades específicas.

### Quando Usar Classes Abstratas

- **Código Comum**: Use classes abstratas quando você precisar compartilhar código comum entre várias classes. Defina métodos concretos na classe abstrata para evitar a duplicação de código.

- **Estrutura e Contratos**: Use classes abstratas para definir uma estrutura e um contrato que as subclasses devem seguir. Isso ajuda a garantir consistência e conformidade com um padrão específico.

- **Design Hierárquico**: Use classes abstratas para criar hierarquias de classes, onde uma classe base abstrata define a estrutura comum e as classes derivadas fornecem implementações específicas.
