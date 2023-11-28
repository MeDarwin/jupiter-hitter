/* -------------------------- BASE CLASS FOR SCENE -------------------------- */
export class BaseScene {
  draw() {}
  update() {}
}

export class BasePLayer extends BaseScene {
  health = 3;
  direction = "left";
}
