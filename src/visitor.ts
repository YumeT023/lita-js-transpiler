import {
  Ampidirina,
  ASTNode,
  ASTNodeType,
  AtaovyRahaMbola,
  Avoaka,
  Diso,
  FamoronanaVoambolana,
  Fampitahana,
  FampitohizanaVina,
  FanolonaVoambolana,
  Kajy,
  Marina,
  Nomerika,
  Programa,
  RahaDia,
  Tapaho,
  Voambolana,
} from "./ast";

export abstract class Visitor<Result = any> {
  visit(node: ASTNode): Result {
    switch (node.type) {
      case ASTNodeType.Programa:
        return this.visitPrograma(node);
      case ASTNodeType.Ampidirina:
        return this.visitAmpidirina(node);
      case ASTNodeType.Avoaka:
        return this.visitAvoaka(node);
      case ASTNodeType.Voambolana:
        return this.visitVoambolana(node);
      case ASTNodeType.Nomerika:
        return this.visitNomerika(node);
      case ASTNodeType.Kajy:
        return this.visitKajy(node);
      case ASTNodeType.Diso:
        return this.visitDiso(node);
      case ASTNodeType.Marina:
        return this.visitMarina(node);
      case ASTNodeType.RahaDia:
        return this.visitRahaDia(node);
      case ASTNodeType.AtaovyRahaMbola:
        return this.visitAtaovyRahaMbola(node);
      case ASTNodeType.Tapaho:
        return this.visitTapaho(node);
      case ASTNodeType.Fampitahana:
        return this.visitFampitahana(node);
      case ASTNodeType.FampitohizanaVina:
        return this.visitFampitohizanaVina(node);
      case ASTNodeType.FamoronanaVoambolana:
        return this.visitFamoronanaVoambolana(node);
      case ASTNodeType.FanolonaVoambolana:
        return this.visitFanolonaVoambolana(node);
    }
  }

  abstract visitPrograma(node: Programa): Result;

  abstract visitAmpidirina(node: Ampidirina): Result;

  abstract visitAvoaka(node: Avoaka): Result;

  abstract visitVoambolana(node: Voambolana): Result;

  abstract visitNomerika(node: Nomerika): Result;

  abstract visitKajy(node: Kajy): Result;

  abstract visitDiso(node: Diso): Result;

  abstract visitMarina(node: Marina): Result;

  abstract visitRahaDia(node: RahaDia): Result;

  abstract visitAtaovyRahaMbola(node: AtaovyRahaMbola): Result;

  abstract visitTapaho(node: Tapaho): Result;

  abstract visitFampitahana(node: Fampitahana): Result;

  abstract visitFampitohizanaVina(node: FampitohizanaVina): Result;

  abstract visitFamoronanaVoambolana(node: FamoronanaVoambolana): Result;

  abstract visitFanolonaVoambolana(node: FanolonaVoambolana): Result;
}
