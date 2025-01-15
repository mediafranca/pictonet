// Modo oscuro / claro (switch manual; puedes perfeccionarlo con un botón)
document.addEventListener("DOMContentLoaded", () => {
    // Ejemplo de switch de tema
    const body = document.querySelector("body");
    const toggleThemeBtn = document.createElement("button");
    toggleThemeBtn.textContent = "Modo Oscuro";
    toggleThemeBtn.style.marginLeft = "1rem";
    
    document.querySelector("header h1")?.appendChild(toggleThemeBtn);
    
    toggleThemeBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      body.classList.toggle("light-mode");
      toggleThemeBtn.textContent = body.classList.contains("dark-mode")
        ? "Modo Claro"
        : "Modo Oscuro";
    });
  });
  
  // Lógica del editor de SVG
  const generateBtn = document.getElementById('generateBtn');
  const svgContainer = document.getElementById('svgContainer');
  
  let svgVersions = [];
  let currentVersionIndex = 0;
  
  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      const promptInput = document.getElementById('promptInput');
      const lineSwitch = document.getElementById('lineSwitch');
      const bnSwitch = document.getElementById('bnSwitch');
      const animationSwitch = document.getElementById('animationSwitch');
      const widthInput = document.getElementById('widthInput');
      const heightInput = document.getElementById('heightInput');
  
      if (!promptInput.value) return;
  
      // Demo: Generamos un SVG de prueba con un rect y un text
      const mockSvg = `
        <svg width="${widthInput.value}" height="${heightInput.value}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bnSwitch.checked ? '#fff' : '#ff7700'}" />
          <text x="50%" y="50%"
            text-anchor="middle"
            fill="${bnSwitch.checked ? '#000' : '#fff'}"
            font-size="24"
          >
            ${promptInput.value}
          </text>
          ${
            animationSwitch.checked
              ? `<animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 150 150"
                  to="360 150 150"
                  dur="4s"
                  repeatCount="indefinite" />`
              : ''
          }
        </svg>
      `;
      svgVersions.push(mockSvg);
      currentVersionIndex = svgVersions.length - 1;
      updateSvgDisplay();
    });
  }
  
  // Mostrar la versión actual
  function updateSvgDisplay() {
    if (svgContainer) {
      svgContainer.innerHTML = svgVersions[currentVersionIndex] || '';
    }
  }
  
  // Botones de versión anterior/siguiente
  const prevVersionBtn = document.getElementById('prevVersionBtn');
  if (prevVersionBtn) {
    prevVersionBtn.addEventListener('click', () => {
      if (currentVersionIndex > 0) {
        currentVersionIndex--;
        updateSvgDisplay();
        reflectCurrentSvgCode();
      }
    });
  }
  
  const nextVersionBtn = document.getElementById('nextVersionBtn');
  if (nextVersionBtn) {
    nextVersionBtn.addEventListener('click', () => {
      if (currentVersionIndex < svgVersions.length - 1) {
        currentVersionIndex++;
        updateSvgDisplay();
        reflectCurrentSvgCode();
      }
    });
  }
  
  // Editor: mostrar/actualizar el código
  const svgCode = document.getElementById('svgCode');
  const editorSvgPreview = document.getElementById('editorSvgPreview');
  
  function reflectCurrentSvgCode() {
    if (svgCode) {
      svgCode.value = svgVersions[currentVersionIndex] || '';
    }
  }
  
  // Escuchar cambios en el contenedor principal, actualizar textarea
  if (svgContainer) {
    const observer = new MutationObserver(reflectCurrentSvgCode);
    observer.observe(svgContainer, { childList: true, subtree: true });
  }
  
  // Botón "Actualizar" previsualización
  const updateSvgBtn = document.getElementById('updateSvgBtn');
  if (updateSvgBtn) {
    updateSvgBtn.addEventListener('click', () => {
      if (editorSvgPreview && svgCode) {
        editorSvgPreview.innerHTML = svgCode.value;
      }
    });
  }
  
  // Guardar la edición en la lista de versiones
  const submitEditsBtn = document.getElementById('submitEditsBtn');
  if (submitEditsBtn) {
    submitEditsBtn.addEventListener('click', () => {
      if (svgCode && svgCode.value) {
        svgVersions[currentVersionIndex] = svgCode.value;
        updateSvgDisplay();
      }
    });
  }
  