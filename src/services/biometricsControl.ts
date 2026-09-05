class BiometricsControl {
  private shouldIgnore: boolean = false;

  public setIgnoreBiometrics(ignore: boolean) {
    this.shouldIgnore = ignore;
  }

  public getShouldIgnore(): boolean {
    return this.shouldIgnore;
  }
}

export const biometricsControl = new BiometricsControl();