/**
 * Known software renderer strings that indicate no hardware acceleration.
 */
const SOFTWARE_RENDERERS = [
  'swiftshader',
  'software',
  'llvmpipe',
  'virtualbox',
  'microsoft basic render'
];

/**
 * Checks if the renderer string indicates software rendering.
 * @param {string} renderer - The WebGL renderer string.
 * @returns {boolean} True if software rendering is detected.
 */
const isSoftwareRenderer = (renderer) => {
  const lowerRenderer = renderer.toLowerCase();
  return SOFTWARE_RENDERERS.some(sw => lowerRenderer.includes(sw));
};

/**
 * Performs a thorough check if WebGL is truly functional with hardware acceleration.
 * Tests context creation, shader compilation, and detects software rendering.
 * @returns {boolean} True if WebGL is hardware-accelerated and functional, false otherwise.
 */
const isWebGLSupported = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl || !(gl instanceof WebGLRenderingContext)) {
      return false;
    }

    // Check if context is lost
    if (gl.isContextLost()) {
      return false;
    }

    // Check for software rendering (no hardware acceleration)
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      console.log('WebGL Renderer:', renderer);

      if (isSoftwareRenderer(renderer)) {
        console.warn('Software WebGL renderer detected - hardware acceleration likely disabled');
        return false;
      }
    }

    // Try to compile a simple shader to verify WebGL actually works
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) {
      return false;
    }

    gl.shaderSource(vertexShader, 'void main() { gl_Position = vec4(0.0); }');
    gl.compileShader(vertexShader);

    const compiled = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    gl.deleteShader(vertexShader);

    if (!compiled) {
      return false;
    }

    // Check for WebGL errors
    const error = gl.getError();
    if (error !== gl.NO_ERROR) {
      return false;
    }

    // Additional check: verify we can create a framebuffer
    const framebuffer = gl.createFramebuffer();
    if (!framebuffer) {
      return false;
    }
    gl.deleteFramebuffer(framebuffer);

    return true;
  } catch (e) {
    console.warn('WebGL support check failed:', e);
    return false;
  }
};

/**
 * Checks if WebGL2 is supported in the current browser.
 * @returns {boolean} True if WebGL2 is supported, false otherwise.
 */
const isWebGL2Supported = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    return gl !== null && gl instanceof WebGL2RenderingContext && !gl.isContextLost();
  } catch (e) {
    return false;
  }
};

export { isWebGLSupported, isWebGL2Supported };
