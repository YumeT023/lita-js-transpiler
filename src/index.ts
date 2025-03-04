import {readFileSync as _r, writeFileSync as _w} from "node:fs";
import {Parser} from "./parser";
import {Lexer} from "./lexer";
import {LitaToJSVisitor} from "./lita_to_js_visitor";
import {Visitor} from "./visitor";

const input: string = _r("./factorial", {encoding: "utf-8"});

const lexer = new Lexer(input);
_w("./tokens.json", JSON.stringify(lexer.scan(), null, 2), {
  encoding: "utf-8",
});

const programa = new Parser(input).fakafakao();
_w("./famakafakana.json", JSON.stringify(programa, null, 2), {
  encoding: "utf-8",
});

const mpandikaLitaHoZavasikiripita: Visitor<string> = new LitaToJSVisitor();
const dikaTeny = mpandikaLitaHoZavasikiripita.visit(programa);

_w("factorial.js", dikaTeny, {encoding: "utf-8"});
