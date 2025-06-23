class TiltDetectorService {
  constructor(options = {}) {
    this.threshold = { x: 1, y: 3 };
    this.cooldown = options.cooldown || 700;
    this.onTilt =
      options.onTilt ||
      function (direction) {
        console.log(`Direction: ${direction}`);
      };

    this.isReady = false;
    this.lastTrigger = 0;
    this.lastDirection = null;

    this.handleMotion = this.handleMotion.bind(this);
  }

  start() {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission().then((response) => {
        if (response === "granted") {
          window.addEventListener("devicemotion", this.handleMotion);
        }
      });
    } else {
      window.addEventListener("devicemotion", this.handleMotion);
    }

    console.log("Hold phone pointing at screen to calibrate center...");
  }

  stop() {
    window.removeEventListener("devicemotion", this.handleMotion);
  }

  handleMotion(event) {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    const { x, y } = acc;

    if (!this.isReady) {
      return;
    }

    const now = Date.now();
    if (now - this.lastTrigger < this.cooldown) return;

    let direction = this.lastDirection;
    if (Math.abs(x) < this.threshold.x && Math.abs(y) < this.threshold.y) {
      direction = null;
    }

    if (direction !== null) {
      direction = null;
      this.lastDirection = direction;
      this.trigger(direction, x, y);
      this.lastTrigger = now;
      return;
    }

    if (Math.abs(y) > Math.abs(x)) {
      direction = y > 0 ? "down" : "up";
    } else {
      direction = x > 0 ? "right" : "left";
    }

    if (direction !== this.lastDirection) {
      this.lastDirection = direction;
      this.trigger(direction, x, y);
      this.lastTrigger = now;
    }
  }

  trigger(direction, x, y) {
    this.onTilt(direction, x, y);
  }
}

export default TiltDetectorService;
