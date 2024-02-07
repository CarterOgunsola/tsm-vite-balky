precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 planeTextureMatrix;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

uniform float uPlaneDeformation;

void main() {
    vec3 vertexPosition = aVertexPosition;
    
    // Apply deformation based on the x position and uPlaneDeformation uniform
    vertexPosition.y += sin(((vertexPosition.x + 1.0) / 2.0) * 3.141592) * (sin(uPlaneDeformation / 90.0));
    
    // Calculate the final position of the vertex
    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    
    // Pass the vertex position and texture coordinate to the fragment shader
    vVertexPosition = vertexPosition;
    vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
}
