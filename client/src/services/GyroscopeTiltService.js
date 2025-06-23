class GyroscopeTiltService {
  constructor({
    onDirectionDetected,
    betaThreshold = 10,
    gammaThreshold = 10,
    centerTolerance = 10, // new: how close is “center enough”
    resetDelay = 500,
  }) {
    this.onDirectionDetected = onDirectionDetected;
    this.betaThreshold = betaThreshold;
    this.gammaThreshold = gammaThreshold;
    this.centerTolerance = centerTolerance;
    this.resetDelay = resetDelay;

    this.center = { beta: null, gamma: null };
    this.ready = true;

    this.handleOrientation = this.handleOrientation.bind(this);
  }

  start() {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission().then((state) => {
        if (state === "granted") {
          window.addEventListener("deviceorientation", this.handleOrientation);
        }
      });
    } else {
      window.addEventListener("deviceorientation", this.handleOrientation);
    }
  }

  stop() {
    window.removeEventListener("deviceorientation", this.handleOrientation);
  }

  setCenter(beta, gamma) {
    this.center.beta = beta;
    this.center.gamma = gamma;
  }

  isBackToCenter(beta, gamma) {
    return (
      Math.abs(beta - this.center.beta) < this.centerTolerance &&
      Math.abs(gamma - this.center.gamma) < this.centerTolerance
    );
  }

  handleOrientation(event) {
    const { beta, gamma } = event;

    if (this.center.beta === null || this.center.gamma === null) {
      this.setCenter(beta, gamma);
      return;
    }

    if (!this.ready) {
      if (this.isBackToCenter(beta, gamma)) {
        console.log("Back to center");
        this.ready = true;
        this.setCenter(beta, gamma);
      }
      return;
    }

    const dBeta = beta - this.center.beta;
    const dGamma = gamma - this.center.gamma;

    let direction = null;

    if (Math.abs(dBeta) > Math.abs(dGamma)) {
      if (dBeta > this.betaThreshold) direction = "up";
      else if (dBeta < -this.betaThreshold) direction = "down";
    } else {
      if (dGamma > this.gammaThreshold) direction = "right";
      else if (dGamma < -this.gammaThreshold) direction = "left";
    }

    if (direction) {
      this.onDirectionDetected(direction);
      this.ready = false;
    }
  }
}

export default GyroscopeTiltService;
