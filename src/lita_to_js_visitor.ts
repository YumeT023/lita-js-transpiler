import {
  Ampidirina,
  AtaovyRahaMbola,
  Avoaka,
  Diso,
  EndrikaFapitahana,
  FamoronanaVoambolana,
  Fampitahana,
  FampitohizanaVina,
  FanolonaVoambolana,
  Fikajiana,
  Kajy,
  Marina,
  MpampitohyVina,
  Nomerika,
  Programa,
  RahaDia,
  Tapaho,
  Voambolana,
} from "./ast";
import {Visitor} from "./visitor";

export class LitaToJSVisitor extends Visitor<string> {
  visitPrograma(node: Programa): string {
    const lines: string[] = [];
    lines.push(this.visitAmpidirina(node.ampidirina));

    for (const baiko of node.baiko) {
      lines.push(this.visit(baiko));
    }

    lines.push(this.visit(node.avoaka));

    return lines.join("\n");
  }

  visitAmpidirina(node: Ampidirina): string {
    return "const LITA_RAFITRISA_AMPIDIRINA = " + this.visit(node.rafitrisa);
  }

  visitAvoaka(node: Avoaka): string {
    return "console.log(" + this.visit(node.rafitrisa) + ");";
  }

  visitVoambolana(node: Voambolana): string {
    return node.anarana;
  }

  visitNomerika(node: Nomerika): string {
    return String(node.isa);
  }

  visitKajy(node: Kajy): string {
    return (
      this.visit(node.avia) +
      " " +
      this.getJsOp(node.fikajiana) +
      " " +
      this.visit(node.avanana)
    );
  }

  visitDiso(_node: Diso): string {
    return "false";
  }

  visitMarina(_node: Marina): string {
    return "true";
  }

  visitRahaDia(node: RahaDia): string {
    return (
      "if (" + this.visit(node.vina) + ") {\n" + this.visit(node.baiko) + "\n}"
    );
  }

  visitAtaovyRahaMbola(node: AtaovyRahaMbola): string {
    return (
      "do {\n" +
      node.baiko.map(this.visit.bind(this)).join("\n") +
      "\n} " +
      "while (" +
      this.visit(node.vina) +
      ");"
    );
  }

  visitFampitahana(node: Fampitahana): string {
    return (
      this.visit(node.avia) +
      " " +
      this.getJsComparatorOp(node.endrika) +
      " " +
      this.visit(node.avanana)
    );
  }

  visitFampitohizanaVina(node: FampitohizanaVina): string {
    return (
      this.visit(node.avia) +
      " " +
      this.getJsBoolChainer(node.mpampitohy) +
      " " +
      this.visit(node.avanana)
    );
  }

  visitFamoronanaVoambolana(node: FamoronanaVoambolana): string {
    return (
      "var " +
      this.visitVoambolana(node.voambolana) +
      " = " +
      this.visit(node.rafitrisa) +
      ";"
    );
  }

  visitFanolonaVoambolana(node: FanolonaVoambolana): string {
    return (
      this.visitVoambolana(node.voambolana) +
      " = " +
      this.visit(node.rafitrisa) +
      ";"
    );
  }

  visitTapaho(_node: Tapaho): string {
    return "process.exit(0)";
  }

  private getJsOp(fikajiana: Fikajiana) {
    switch (fikajiana) {
      case Fikajiana.Ampiana:
        return "+";
      case Fikajiana.Analana:
        return "-";
      case Fikajiana.Averina:
        return "*";
      case Fikajiana.Zaraina:
        return "/";
    }
  }

  private getJsComparatorOp(endrikaFapitahana: EndrikaFapitahana) {
    switch (endrikaFapitahana) {
      case EndrikaFapitahana.Mitovy:
        return "===";
      case EndrikaFapitahana.Lehibe:
        return ">";
      case EndrikaFapitahana.LehibeNaMitovy:
        return ">=";
      case EndrikaFapitahana.Latsaka:
        return "<";
      case EndrikaFapitahana.LatsakaNaMitovy:
        return "<=";
    }
  }

  private getJsBoolChainer(mpampitohy: MpampitohyVina) {
    switch (mpampitohy) {
      case MpampitohyVina.Sy:
        return "&&";
      case MpampitohyVina.Na:
        return "||";
    }
  }
}
