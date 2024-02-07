precision mediump float;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

uniform sampler2D planeTexture;

uniform float uTime; 
uniform float uDistortionAmount; 

void main() {
    float rOffset = uDistortionAmount * cos(uTime + 0.0);
    float gOffset = uDistortionAmount * sin(uTime + 2.0);
    float bOffset = uDistortionAmount * cos(uTime + 4.0);

    float r = texture2D(planeTexture, vTextureCoord + vec2(rOffset, 0.0)).r;
    float g = texture2D(planeTexture, vTextureCoord + vec2(gOffset, 0.0)).g;
    float b = texture2D(planeTexture, vTextureCoord + vec2(bOffset, 0.0)).b;

    gl_FragColor = vec4(r, g, b, 1.0);
}
