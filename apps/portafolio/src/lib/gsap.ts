import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Register GSAP plugins once, app-wide. */
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
