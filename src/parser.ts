import {Lexer, Token, TokenType} from "./lexer";
import {
  Ampidirina,
  ASTNodeType,
  AtaovyRahaMbola,
  Avoaka,
  Baiko,
  EndrikaFapitahana,
  FamoronanaVoambolana,
  Fampitahana,
  FanolonaVoambolana,
  Fikajiana,
  MpampitohyVina,
  Programa,
  Rafitrisa,
  RahaDia,
  Tapaho,
  Vina,
  Voambolana,
} from "./ast";

export class Parser {
  private readonly length: number;
  private readonly tokens: Token[] = [];
  private index = -1;
  private peek: Token | null = null;

  constructor(private readonly input: string) {
    let tokens = new Lexer(this.input).scan();
    this.tokens = tokens;
    this.length = tokens.length;
    this.next();
  }

  private next() {
    this.index++;
    this.peek = this.index >= this.length ? null : this.tokens[this.index];
  }

  private expectOptionalToken(type: TokenType) {
    return this.peek && this.peek.type === type;
  }

  private consumeOptionalToken(type: TokenType) {
    if (this.expectOptionalToken(type)) {
      this.next();
      return true;
    } else {
      return null;
    }
  }

  private consumeToken(type: TokenType) {
    const peek = this.peek;
    if (this.consumeOptionalToken(type)) return peek;
    throw new Error(`Missing expected ${type}`);
  }

  private _parseRafitrisa(): Rafitrisa {
    let rafitrisa: Rafitrisa;
    if (this.expectOptionalToken(TokenType.Voambolana)) {
      rafitrisa = {
        type: ASTNodeType.Voambolana,
        anarana: this.peek.strValue,
      };
    } else if (this.expectOptionalToken(TokenType.Nomerika)) {
      rafitrisa = {
        type: ASTNodeType.Nomerika,
        isa: this.peek.numValue!,
      };
    } else {
      throw new Error("Missing Rafitrisa: Voambolana | Nomerika | Kajy");
    }

    this.next();
    if (
      this.peek &&
      (this.expectOptionalToken(TokenType.Ampiana) ||
        this.expectOptionalToken(TokenType.Averina) ||
        this.expectOptionalToken(TokenType.Zaraina) ||
        this.expectOptionalToken(TokenType.Analana))
    ) {
      const fikajiana = this.peek.type as string as Fikajiana;
      this.next();
      return {
        type: ASTNodeType.Kajy,
        avia: rafitrisa,
        fikajiana,
        avanana: this._parseRafitrisa(),
      };
    }
    return rafitrisa;
  }

  private _parseAvoaka(): Avoaka {
    this.consumeToken(TokenType.Avoaka);
    const rafitrisa = this._parseRafitrisa();
    this.consumeToken(TokenType.Teboka);
    return {
      type: ASTNodeType.Avoaka,
      rafitrisa,
    };
  }

  private _parseAmpidirina(): Ampidirina {
    this.consumeToken(TokenType.Ampidirina);
    const rafitrisa = this._parseRafitrisa();
    this.consumeToken(TokenType.Teboka);
    return {
      type: ASTNodeType.Ampidirina,
      rafitrisa,
    };
  }

  private _parseFamoronanaVoambolana(): FamoronanaVoambolana {
    this.consumeToken(TokenType.Forony);
    const voambolana: Voambolana = {
      type: ASTNodeType.Voambolana,
      anarana: this.consumeToken(TokenType.Voambolana).strValue,
    };
    this.consumeToken(TokenType.Ho);
    const rafitrisa = this._parseRafitrisa();
    this.consumeToken(TokenType.Teboka);

    return {
      type: ASTNodeType.FamoronanaVoambolana,
      voambolana,
      rafitrisa,
    };
  }

  private _parseFanolonaVoambolana(): FanolonaVoambolana {
    this.consumeToken(TokenType.Raiso);
    const voambolana: Voambolana = {
      type: ASTNodeType.Voambolana,
      anarana: this.consumeToken(TokenType.Voambolana).strValue,
    };
    this.consumeToken(TokenType.Ka);
    this.consumeToken(TokenType.Soloy);
    const rafitrisa = this._parseRafitrisa();
    this.consumeToken(TokenType.Teboka);

    return {
      type: ASTNodeType.FanolonaVoambolana,
      voambolana,
      rafitrisa,
    };
  }

  private _parseEndrikaFampitahana(): EndrikaFapitahana {
    if (this.consumeOptionalToken(TokenType.Mitovy)) {
      return EndrikaFapitahana.Mitovy;
    }
    if (this.consumeOptionalToken(TokenType.Lehibe)) {
      return EndrikaFapitahana.Lehibe;
    }
    if (this.consumeOptionalToken(TokenType.LehibeNaMitovy)) {
      return EndrikaFapitahana.LehibeNaMitovy;
    }
    if (this.consumeOptionalToken(TokenType.Latsaka)) {
      return EndrikaFapitahana.Latsaka;
    }
    if (this.consumeOptionalToken(TokenType.LatsakaNaMitovy)) {
      return EndrikaFapitahana.LatsakaNaMitovy;
    }

    throw new Error("Missing endrika fampitahana.");
  }

  private _parseFampitahana(): Fampitahana {
    const avia = this._parseRafitrisa();
    const endrika = this._parseEndrikaFampitahana();
    const avanana = this._parseRafitrisa();
    return {
      type: ASTNodeType.Fampitahana,
      avia,
      endrika,
      avanana,
    };
  }

  private _parseVina(): Vina {
    let vina: Vina;
    switch (this.peek.type) {
      case TokenType.Marina:
        vina = {type: ASTNodeType.Marina};
        this.next();
        break;
      case TokenType.Diso:
        vina = {type: ASTNodeType.Diso};
        this.next();
        break;
      case TokenType.Voambolana:
      case TokenType.Nomerika:
        vina = this._parseFampitahana();
        break;
    }

    if (this.peek.type === TokenType.Sy || this.peek.type === TokenType.Na) {
      const avia = vina;
      const mpampitohy = this.peek.type as string as MpampitohyVina;
      this.next();
      const avanana = this._parseVina();
      return {
        type: ASTNodeType.FampitohizanaVina,
        avia,
        mpampitohy,
        avanana,
      };
    }
    return vina;
  }

  private _parseAtaovyRahaMbola(): AtaovyRahaMbola {
    this.consumeToken(TokenType.Ataovy);
    const baiko: Baiko[] = [];
    while (
      this.peek &&
      !(
        this.peek.type === TokenType.Raha &&
        this.tokens[this.index + 1]?.type === TokenType.Mbola
      )
    ) {
      baiko.push(this._parseBaiko());
    }
    this.consumeToken(TokenType.Raha);
    this.consumeToken(TokenType.Mbola);
    const vina = this._parseVina();
    this.consumeToken(TokenType.Teboka);
    return {
      type: ASTNodeType.AtaovyRahaMbola,
      baiko,
      vina,
    };
  }

  private _parseRahaDia(): RahaDia {
    this.consumeToken(TokenType.Raha);
    const vina = this._parseVina();
    this.consumeToken(TokenType.Dia);
    const baiko = this._parseBaiko();
    return {
      type: ASTNodeType.RahaDia,
      vina,
      baiko,
    };
  }

  private _parseTapaho(): Tapaho {
    this.consumeToken(TokenType.Tapaho);
    this.consumeToken(TokenType.Teboka);
    return {
      type: ASTNodeType.Tapaho,
    };
  }

  private _parseBaiko(): Baiko {
    switch (this.peek.type) {
      case TokenType.Forony:
        return this._parseFamoronanaVoambolana();
      case TokenType.Raiso:
        return this._parseFanolonaVoambolana();
      case TokenType.Ataovy:
        return this._parseAtaovyRahaMbola();
      case TokenType.Raha:
        return this._parseRahaDia();
      case TokenType.Tapaho:
        return this._parseTapaho();
    }
    throw new Error("Missing expected Baiko");
  }

  private _parseBaikoRehetra(): Baiko[] {
    const baiko: Baiko[] = [];
    while (this.peek && this.peek.type !== TokenType.Avoaka) {
      baiko.push(this._parseBaiko());
    }
    return baiko;
  }

  // for convenience!!!
  fakafakao() {
    return this.parse();
  }

  parse(): Programa {
    return {
      type: ASTNodeType.Programa,
      ampidirina: this._parseAmpidirina(),
      baiko: this._parseBaikoRehetra(),
      avoaka: this._parseAvoaka(),
    };
  }
}
