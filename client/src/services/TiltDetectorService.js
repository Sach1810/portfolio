import Bowser from "bowser";
class TiltDetectorService {
  constructor(options = {}) {
    this.threshold = { x: 1, y: 3 };
    this.cooldown = options.cooldown || 700;
    this.onTilt =
      options.onTilt ||
      function (direction) {
        console.log(`Direction: ${direction}`);
      };

    this.lastTrigger = 0;
    this.lastDirection = null;

    this.handleMotion = this.handleMotion.bind(this);

    const result = Bowser.parse(window.navigator.userAgent);
    this.isMobile = result.platform.type === "mobile";
  }

  isSupported() {
    return (
      !!this.isMobile &&
      ((typeof DeviceMotionEvent !== "undefined" &&
        typeof DeviceMotionEvent.requestPermission === "function") ||
        (this.isMobile && window.DeviceMotionEvent))
    );
  }

  async start() {
    try {
      if (typeof DeviceMotionEvent.requestPermission === "function") {
        const response = await DeviceMotionEvent.requestPermission();
        if (response === "granted") {
          window.addEventListener("devicemotion", this.handleMotion);
          console.log("Hold phone pointing at screen to calibrate center...");
          return {};
        } else {
          return {
            error: "Permission not granted",
            type: "access-denied",
          };
        }
      } else {
        window.addEventListener("devicemotion", this.handleMotion);
        console.log("Hold phone pointing at screen to calibrate center...");
        return {};
      }
    } catch (e) {
      return {
        error: e.message || "Unknown error occurred",
        type: "error",
      };
    }
  }

  stop() {
    window.removeEventListener("devicemotion", this.handleMotion);
  }

  handleMotion(event) {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    const { x, y } = acc;

    const now = Date.now();
    if (now - this.lastTrigger < this.cooldown) return;

    let direction;
    if (Math.abs(x) < this.threshold.x && Math.abs(y) < this.threshold.y) {
      direction = null;
    } else if (Math.abs(y) > Math.abs(x)) {
      direction = y > 0 ? "down" : "up";
    } else {
      direction = x > 0 ? "right" : "left";
    }

    if (direction !== null) {
      this.lastDirection = direction;
      this.trigger(direction, x, y);
      this.lastTrigger = now;
    } else if (direction !== this.lastDirection) {
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
