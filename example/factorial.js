const LITA_RAFITRISA_AMPIDIRINA = 5
var valiny = 1;
var mpanisa = 1;
do {
valiny = valiny * mpanisa;
mpanisa = mpanisa + 1;
} while (mpanisa <= LITA_RAFITRISA_AMPIDIRINA);
console.log(valiny);