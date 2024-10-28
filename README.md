6. Jogo de Simulação Comunitária

- Tema Social: Empreendedorismo social e comunidade.
- Narrativa: O jogador assume o papel de um líder comunitário, responsável por desenvolver soluções para melhorar a qualidade de vida de uma pequena comunidade. O jogo envolve tomar decisões sobre como alocar recursos limitados, equilibrando as necessidades de saúde, educação, e emprego dos habitantes.
- Conexão com Games for Change: Enfatiza o impacto das decisões de liderança e empreendedorismo social na melhoria das condições de vida de uma comunidade.

Ponderei criar um city manager
Por exemplo:
    - Uma pequena vila, cerca de 10 habitantes.

O objetivo do jogo é sobreviver.
Os habitantes têm de coletar recursos:
    - Madeira
    - Pedra
    - Minérios
  
Existem várias classes para os habitantes que são sorteadas à nascença.
Para aumentar o número de habitantes podemos constituir familia ou construir mais casas.
Dessa maneira o número limite de habitantes irá subir.
Existe diferenças entre número de habitantes e número limite de habitantes. A vila pode ter capacidade para 15 habitantes mas apenas estarem lá a morar 7.

Classe habitante = {
    nome,
    dataNascimento,
    profissao,
    genero, (M/F)
    inventario (Terá um limite, que pode ser aumentado com a idade/items)
    ...
}

Class vila = {
    nomeVila,
    listaHabitantes,
    numeroHabitantes,
    limiteHabitantes,
    recursos[] recursos
}