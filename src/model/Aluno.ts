import { DatabaseModel } from "./DatabaseModel";

// armazenei o pool de conexões
const database = new DatabaseModel().pool;

/**
 * Classe que representa um aluno.
 */
export class Aluno {

    /* Atributos */
    /* Identificador do aluno */
    private idAluno: number = 0;
    /* Ra do aluno */
    private ra: string = "";
    /* nome do aluno */
    private nome: string;
    /* sobrenome do aluno */
    private sobrenome: string;
    /* data_nascimento do aluno */
    private data_nascimento: string;
    /* endereço do aluno */
    private endereço: string;
    private email: string;
    private celular: string;


    /**
     * Construtor da classe Aluno
     * 
     * @param nome nome do aluno
     * @param sobrenome sobrenome do aluno
     * @param data_nascimento data_nascimento do aluno
     * @param endereço endereço do aluno
     * @param email email no aluno
     * @param celular telefone do aluno
     */
    constructor(
        nome: string,
        sobrenome: string,
        data_nascimento: string,
        endereço: string,
        email: string,
        celular: string
    ) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.data_nascimento = data_nascimento;
        this.endereço = endereço;
        this.email = email;
        this.celular = celular;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do aluno
     * @returns o identificador do aluno
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Atribui um valor ao identificador do aluno
     * @param idAluno novo identificado do aluno
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
 * Recupera o identificador do aluno
 * @returns {string}
 */
    public getRa(): string {
        return this.ra;
    }

    /**
     * Atribui um valor ao identificador do aluno
     * @param ra novo identificado do aluno
     */
    public setRa(ra: string): void {
        this.ra = ra;
    }


    /**
     * Retorna a nome do aluno.
     *
     * @returns {string} A nome do aluno.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define a nome do aluno.
     * 
     * @param nome - A nome do aluno a ser definida.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o sobrenome do aluno.
     *
     * @returns {string} O sobrenome do aluno.
     */
    public getSobrenome(): string {
        return this.sobrenome;
    }

    /**
     * Define o sobrenome do aluno.
     *
     * @param sobrenome - O nome do sobrenome do aluno.
     */
    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    /**
     * Retorna o data_nascimento do aluno.
     *
     * @returns {Date}O data_nascimento do aluno.
     */
    public getData_nascimento(): string {
        return this.data_nascimento;
    }

    /**
     * Define o data_nascimento do aluno.
     * 
     * @param data_nascimento - O data_nascimento a ser definido para o aluno.
     */
    public setdata_nascimento(data_nascimento: string): void {
        this.data_nascimento = data_nascimento;
    }

    /**
     * Retorna a endereço do aluno.
     *
     * @returns {string} A endereço do aluno.
     */
    public getEndereço(): string {
        return this.endereço;
    }

    /**
     * Define a endereço do aluno.
     * 
     * @param endereço - A endereço do aluno.
     */
    public setEndereço(endereço: string): void {
        this.endereço = endereço;
    }

    /**
     * @returns {string}
     */
    public getEmail() {
        return this.email;
    }

    /**
     * @param email
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
    * @returns {string}
    */
    public getCelular(): string {
        return this.celular;
    }

    /**
     * @param email
     */
    public setCelular(celular: string): void {
        this.celular = celular;
    }



    /**
     * Busca e retorna uma lista de livros do banco de dados.
     * @returns Um array de objetos do tipo `Aluno` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todas as informações da tabela "aluno".
     * - Os dados retornados do banco de dados são usados para instanciar objetos da classe `Aluno`.
     * - Cada aluno é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */
    static async listagemAlunos(): Promise<Array<Aluno> | null> {
        // objeto para armazenar a lista de livros
        const listaDeAlunos: Array<Aluno> = [];

        try {
            // query de consulta ao banco de dados
            const querySelectAluno = `SELECT * FROM aluno;`;

            // fazendo a consulta e guardando a resposta
            const respostaBD = await database.query(querySelectAluno);

            // usando a resposta para instanciar um objeto do tipo aluno
            respostaBD.rows.forEach((linha) => {
                // instancia (cria) objeto aluno
                const novoAluno = new Aluno(
                    linha.nome,
                    linha.sobrenome,
                    linha.data_nascimento,
                    linha.endereço,
                    linha.email,
                    linha.celular
                );

                // atribui o ID objeto
                novoAluno.setIdAluno(linha.id_aluno);
                novoAluno.setRa(linha.ra);

                // adiciona o objeto na lista
                listaDeAlunos.push(novoAluno);
            });

            // retorna a lista de livros
            return listaDeAlunos;
        } catch (error) {
            console.log('Erro ao buscar lista de livros');
            return null;
        }
    }

    /**
     * Realiza o cadastro de um aluno no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Aluno` e insere seus dados (email, modelo, ano e cor)
     * na tabela `aluno` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Aluno} aluno - Objeto contendo os dados do aluno que será cadastrado. O objeto `Aluno`
     *                        deve conter os métodos `getTitulo()`, `getAutor()`, `getAnoPublicacao()` e `getIsbn()`
     *                        que retornam os respectivos valores do aluno.
     * @returns {Promise<boolean>} - Retorna `true` se o aluno foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
    static async cadastroAluno(aluno: Aluno): Promise<boolean> {
        try {
            // query para fazer insert de um aluno no banco de dados
            const querySelectAluno = `INSERT INTO aluno (nome, sobrenome, data_nascimento, endereco, email, celular)
                                        VALUES
                                        (
                                        '${aluno.getNome()}', 
                                        '${aluno.getSobrenome()}', 
                                        '${aluno.getData_nascimento()}', 
                                        '${aluno.getEndereço()}',
                                        '${aluno.getEmail()}',
                                        '${aluno.getCelular()}')
                                        RETURNING id_aluno;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(querySelectAluno);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Aluno cadastrado com sucesso! ID do aluno: ${respostaBD.rows[0].id_aluno}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o aluno. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}