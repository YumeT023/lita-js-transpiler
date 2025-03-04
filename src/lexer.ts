import {isaVe, isWhitespaceLike, literaVe, tebokaVe} from "./util";

export enum TokenType {
  Nomerika = "Nomerika",
  Voambolana = "Voambolana",

  Marina = "marina",
  Diso = "diso",
  Raiso = "Raiso",
  Forony = "Forony",
  Raha = "Raha",
  Tapaho = "Tapaho",
  Ataovy = "Ataovy",
  Ka = "ka",
  Soloy = "soloy",
  Ho = "ho",
  Sy = "sy",
  Na = "na",
  Mbola = "mbola",
  Dia = "dia",
  Teboka = "Teboka",

  Ampidirina = "Ampidirina",
  Avoaka = "Avoaka",

  Ampiana = "Ampiana", // +
  Analana = "Analana", // -
  Zaraina = "Zaraina", // /
  Averina = "Averina", // *

  Mitovy = "Mitovy", // =
  Lehibe = "Lehibe", // >
  LehibeNaMitovy = "LehibeNaMitovy", // >=
  Latsaka = "Latsaka", // >
  LatsakaNaMitovy = "LatsakaNaMitovy", // <=

  Olana = "Olana",
}

const TENY_FANALAHIDY = new Set([
  TokenType.Marina,
  TokenType.Diso,
  TokenType.Raiso,
  TokenType.Forony,
  TokenType.Raha,
  TokenType.Tapaho,
  TokenType.Ataovy,
  TokenType.Ka,
  TokenType.Sy,
  TokenType.Na,
  TokenType.Soloy,
  TokenType.Ho,
  TokenType.Mbola,
  TokenType.Dia,
  TokenType.Ampidirina,
  TokenType.Avoaka,
]);

const VINA = new Set([TokenType.Marina, TokenType.Diso]);

export class Token {
  constructor(
    public readonly type: TokenType,
    public readonly start: number,
    public readonly end: number,
    public readonly strValue: string,
    public readonly numValue?: number
  ) {}

  static vina(
    start: number,
    end: number,
    value: TokenType.Marina | TokenType.Diso
  ): Token {
    const marinaVe = value === TokenType.Marina;
    return new Token(value, start, end, value, +marinaVe);
  }

  static nomerika(start: number, end: number, value: number): Token {
    return new Token(TokenType.Nomerika, start, end, String(value), value);
  }

  static voambolana(start: number, end: number, name: string): Token {
    return new Token(TokenType.Voambolana, start, end, name);
  }

  static olana(start: number, end: number, str: string): Token {
    return new Token(TokenType.Olana, start, end, str);
  }

  static tenyFanalahidy(start: number, end: number, type: TokenType): Token {
    return new Token(type, start, end, type);
  }

  static teboka(start: number): Token {
    return new Token(TokenType.Teboka, start, start + 1, ".");
  }

  static lehibe(start: number): Token {
    return new Token(TokenType.Lehibe, start, start + 1, ">");
  }

  static lehibeNaMitovy(start: number): Token {
    return new Token(TokenType.LehibeNaMitovy, start, start + 2, ">=");
  }

  static latsaka(start: number): Token {
    return new Token(TokenType.Latsaka, start, start + 1, "<");
  }

  static latsakaNaMitovy(start: number): Token {
    return new Token(TokenType.LatsakaNaMitovy, start, start + 2, "<=");
  }

  static mitovy(start: number): Token {
    return new Token(TokenType.Mitovy, start, start + 1, "=");
  }

  static ampiana(start: number) {
    return new Token(TokenType.Ampiana, start, start + 1, "+");
  }

  static analana(start: number) {
    return new Token(TokenType.Analana, start, start + 1, "-");
  }

  static zaraina(start: number) {
    return new Token(TokenType.Zaraina, start, start + 1, "/");
  }

  static averina(start: number) {
    return new Token(TokenType.Averina, start, start + 1, "*");
  }
}

export class Lexer {
  private readonly length: number;
  private index = -1;
  private peek: string | null = null;

  constructor(private readonly input: string) {
    this.length = input.length;
    this.next();
  }

  private next() {
    this.index++;
    this.peek = this.index >= this.length ? null : this.input[this.index];
  }

  scan(): Token[] {
    const tokens: Token[] = [];
    let token: Token | null;
    while ((token = this.scanToken()) !== null) {
      tokens.push(token);
    }
    return tokens;
  }

  private scanNomerika(start: number): Token {
    this.next();
    let simple = true;

    while (true) {
      if (isaVe(this.peek)) {
        this.next();
      } else if (tebokaVe(this.peek)) {
        // look ahead in case its not part of the nomerika anymore
        this.next();
        if (!isaVe(this.peek) && !tebokaVe(this.peek)) {
          this.peek = this.input[--this.index];
          break;
        }

        if (!simple) {
          const str = this.input.substring(start, this.index);
          return Token.olana(
            start,
            this.index,
            `Fanora-diso: ${str} <---- Tsy tokony misy teboka roa anaty isa iray`
          );
        }
        simple = false;
      } else {
        break;
      }
    }

    const str = this.input.substring(start, this.index);
    return Token.nomerika(
      start,
      this.index,
      simple ? parseInt(str, 10) : parseFloat(str)
    );
  }

  private scanVoambolana(start: number): Token {
    this.next();
    while (literaVe(this.peek) || this.peek === "_" || isaVe(this.peek)) {
      this.next();
    }
    const str = this.input.substring(start, this.index);

    if (VINA.has(str as TokenType)) {
      return Token.vina(
        start,
        this.index,
        str as TokenType.Marina | TokenType.Diso
      );
    }

    if (TENY_FANALAHIDY.has(str as TokenType)) {
      return Token.tenyFanalahidy(start, this.index, str as TokenType);
    }

    return Token.voambolana(start, this.index, str);
  }

  private scanTeboka(start: number) {
    this.next();
    return Token.teboka(start);
  }

  private scanLehibe(start: number) {
    this.next();
    if (this.peek !== "=") {
      return Token.lehibe(start);
    }
    this.next();
    return Token.lehibeNaMitovy(start);
  }

  private scanLatsaka(start: number) {
    this.next();
    if (this.peek !== "=") {
      return Token.latsaka(start);
    }
    this.next();
    return Token.latsakaNaMitovy(start);
  }

  private scanMitovy(start: number): Token {
    this.next();
    return Token.mitovy(start);
  }

  private scanAmpiana(start: number): Token {
    this.next();
    return Token.ampiana(start);
  }

  private scanAnalana(start: number): Token {
    this.next();
    return Token.analana(start);
  }

  private scanAverina(start: number): Token {
    this.next();
    return Token.averina(start);
  }

  private scanZaraina(start: number): Token {
    this.next();
    return Token.zaraina(start);
  }

  private scanToken(): Token | null {
    let peek = this.peek;
    let index = this.index;

    while (peek !== null && isWhitespaceLike(peek)) {
      this.next();
      peek = this.peek;
      index = this.index;
    }

    if (peek === null) {
      return null;
    }

    const start = index;
    if (isaVe(peek)) {
      return this.scanNomerika(start);
    }

    if (literaVe(peek)) {
      return this.scanVoambolana(start);
    }

    switch (peek) {
      case "+":
        return this.scanAmpiana(start);
      case "-":
        return this.scanAnalana(start);
      case "/":
        return this.scanZaraina(start);
      case "*":
        return this.scanAverina(start);
      case ".":
        return this.scanTeboka(start);
      case ">":
        return this.scanLehibe(start);
      case "<":
        return this.scanLatsaka(start);
      case "=":
        return this.scanMitovy(start);
    }

    throw new Error(`Tsy nampoizina: ${peek}`);
    // return Token.olana(start, index, `Tsy nampoizina: ${peek}`);
  }
}
