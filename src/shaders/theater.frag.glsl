varying vec2 vUv;
uniform float time;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  float noise = random(vUv + time);
  gl_FragColor = vec4(vec3(noise * 0.5), 1.0);
} 