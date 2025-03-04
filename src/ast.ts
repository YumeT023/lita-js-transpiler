export enum ASTNodeType {
  Programa = "Programa",

  FanolonaVoambolana = "FanolonaVoambolana",
  FamoronanaVoambolana = "FamoronanaVoambolana",
  Fampitahana = "Fampitahana",
  Kajy = "Kajy",
  RahaDia = "RahaDia",
  AtaovyRahaMbola = "AtaovyRahaMbola",
  Tapaho = "Tapaho",
  Ampidirina = "Ampidirina",
  Avoaka = "Avoaka",
  FampitohizanaVina = "FampitohizanaVina",

  Voambolana = "Voambolana",
  Marina = "Marina",
  Diso = "Diso",
  Nomerika = "Nomerika",
}

export type ASTNode = Programa | Avoaka | Ampidirina | Rafitrisa | Baiko | Vina;

export interface BaseNode {
  type: ASTNodeType;
}

export interface Programa extends BaseNode {
  type: ASTNodeType.Programa;
  avoaka: Avoaka;
  ampidirina: Ampidirina;
  baiko: Baiko[];
}

export interface Avoaka extends BaseNode {
  type: ASTNodeType.Avoaka;
  rafitrisa: Rafitrisa;
}

export interface Ampidirina extends BaseNode {
  type: ASTNodeType.Ampidirina;
  rafitrisa: Rafitrisa;
}

export interface Voambolana extends BaseNode {
  type: ASTNodeType.Voambolana;
  anarana: string;
}

export interface Nomerika extends BaseNode {
  type: ASTNodeType.Nomerika;
  isa: number;
}

export interface FamoronanaVoambolana extends BaseNode {
  type: ASTNodeType.FamoronanaVoambolana;
  voambolana: Voambolana;
  rafitrisa: Rafitrisa;
}

export interface FanolonaVoambolana extends BaseNode {
  type: ASTNodeType.FanolonaVoambolana;
  voambolana: Voambolana;
  rafitrisa: Rafitrisa;
}

export interface RahaDia extends BaseNode {
  type: ASTNodeType.RahaDia;
  vina: Vina;
  baiko: Baiko;
}

export interface AtaovyRahaMbola extends BaseNode {
  type: ASTNodeType.AtaovyRahaMbola;
  baiko: Baiko[];
  vina: Vina;
}

export interface Tapaho extends BaseNode {
  type: ASTNodeType.Tapaho;
}

export type Baiko =
  | FamoronanaVoambolana
  | FanolonaVoambolana
  | RahaDia
  | AtaovyRahaMbola
  | Tapaho;

export interface Marina extends BaseNode {
  type: ASTNodeType.Marina;
}

export interface Diso extends BaseNode {
  type: ASTNodeType.Diso;
}

export enum Fikajiana {
  Ampiana = "Ampiana",
  Analana = "Analana",
  Averina = "Averina",
  Zaraina = "Zaraina",
}

export interface Kajy extends BaseNode {
  type: ASTNodeType.Kajy;
  avia: Rafitrisa;
  fikajiana: Fikajiana;
  avanana: Rafitrisa;
}

export type Rafitrisa = Voambolana | Nomerika | Kajy;

export enum EndrikaFapitahana {
  Mitovy = "Mitovy",
  Lehibe = "Lehibe",
  LehibeNaMitovy = "LehibeNaMitovy",
  Latsaka = "Latsaka",
  LatsakaNaMitovy = "LatsakaNaMitovy",
}

export interface Fampitahana extends BaseNode {
  type: ASTNodeType.Fampitahana;
  avia: Rafitrisa;
  endrika: EndrikaFapitahana;
  avanana: Rafitrisa;
}

export enum MpampitohyVina {
  Sy = "sy",
  Na = "na",
}

export interface FampitohizanaVina extends BaseNode {
  type: ASTNodeType.FampitohizanaVina;
  avia: Vina;
  mpampitohy: MpampitohyVina;
  avanana: Vina;
}

export type Vina = Marina | Diso | Fampitahana | FampitohizanaVina;
