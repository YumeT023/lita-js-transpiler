import {checkProject} from "../index";

describe("lita-js", () => {
  test("Lita to JS transpiler", () => {
    expect("lita-js works").toBe(checkProject());
  });
});
