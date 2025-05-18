varying vec2 vUv;
uniform float time;
uniform float scratchSpeed;
uniform float scratchThickness;
uniform float spotSize;
uniform float spotCount;
uniform float scratchCount;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// spot 함수 (더 작고, 더 산발적)
float spot(vec2 uv, vec2 center, float radius, float edge) {
    float d = length(uv - center);
    return smoothstep(radius, radius - edge, d);
}

// 세로 스크래치 라인 함수
float scratchLine(vec2 uv, float x, float width) {
    return smoothstep(x - width, x, uv.x) - smoothstep(x, x + width, uv.x);
}

void main() {
    float grain = random(vUv * 100.0 + time * 0.5) * 0.08;

    // spot: 더 작고, 더 많이, 각 spot이 나올 확률도 랜덤하게
    float burn = 0.0;
    for (int i = 0; i < 10; i++) {
        if (float(i) >= spotCount) break;
        
        float t = time * (0.15 + float(i) * 0.05);
        vec2 center = vec2(
            random(vec2(i, t)),
            random(vec2(i * 10, t + 10.0))
        );
        float radius = spotSize * (0.8 + 0.4 * random(vec2(i * 20, t + 20.0)));
        float edge = radius * 0.5;
        float appear = step(0.85, random(vec2(i * 40, t + 40.0)));
        burn += spot(vUv, center, radius, edge) * appear * (0.3 + 0.3 * random(vec2(i * 30, t + 30.0)));
    }

    // 랜덤 세로 스크래치 라인: 더 많이, 더 얇게, 산발적으로
    float scratch = 0.0;
    for (int i = 0; i < 12; i++) {
        if (float(i) >= scratchCount) break;
        
        float t = time * scratchSpeed * (0.18 + float(i) * 0.07);
        float x = random(vec2(i * 100, t + 50.0));
        float width = scratchThickness * (0.8 + 0.4 * random(vec2(i * 200, t + 100.0)));
        float appear = step(0.92, random(vec2(i * 300, t + 150.0)));
        scratch += scratchLine(vUv, x, width) * appear * (0.2 + 0.3 * random(vec2(i * 400, t + 200.0)));
    }

    // burn spot과 scratch line을 합침
    float effect = clamp(burn + scratch, 0.0, 1.0);

    // 흰색 바탕 + grain 위에 spot/scratch가 검은색으로 산발적으로 나타남
    vec3 color = vec3(1.0) * (1.0 - effect) + vec3(grain) * (1.0 - effect);
    color = mix(vec3(1.0), color, 1.0 - effect); // spot/scratch는 검게

    gl_FragColor = vec4(0.0, 0.0, 0.0, effect);
} 