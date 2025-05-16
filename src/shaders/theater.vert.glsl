varying vec2 vUv;
uniform float time;

void main() {
  // 시간에 따라 vUv 좌표를 약간씩 움직여서 지지직거리는 효과를 줍니다.
  vec2 displacedUV = uv + vec2(sin(time * 10.0 + uv.y * 50.0) * 0.01, cos(time * 15.0 + uv.x * 50.0) * 0.01);
  vUv = displacedUV;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}