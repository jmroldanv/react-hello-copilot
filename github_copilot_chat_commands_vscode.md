# 🧠 GitHub Copilot Chat — Comandos y Referencia (Visual Studio Code)

**Fecha:** 2025-11-06  
**Fuente:** [docs.github.com – Copilot Chat Cheat Sheet](https://docs.github.com/en/copilot/reference/github-copilot-chat-cheat-sheet)

---

## 🔹 1. Menciones (`@`)

Los “mentions” permiten a Copilot Chat usar distintos contextos o participantes especializados.

| Mention | Descripción |
|----------|-------------|
| **@workspace** | Analiza todo tu espacio de trabajo (proyecto, dependencias, archivos relacionados). |
| **@vscode** | Contexto relacionado con Visual Studio Code (atajos, comandos, configuración). |
| **@terminal** | Ayuda con comandos de terminal, scripts y tareas CLI. |
| **@github** | Interactúa con funciones de GitHub (repos, PRs, issues, etc.). |
| **@tests** | Se enfoca en generar o analizar código de pruebas. |
| **@editor** | Contexto específico del archivo y selección actual en el editor. |

**Ejemplo:**
```text
@workspace Describe how the src/components folder interacts with the rest of the project
```

---

## 🔹 2. Slash Commands (`/`)

Comandos rápidos que ejecutan acciones comunes en Copilot Chat.

| Comando | Acción |
|----------|--------|
| `/new` | Inicia una nueva conversación. |
| `/clear` | Limpia el historial del chat actual. |
| `/help` | Muestra la lista de comandos y descripciones disponibles. |
| `/explain` | Explica el código seleccionado o la función actual. |
| `/fix` | Propone una solución a errores o problemas en el código actual. |
| `/tests` | Genera pruebas para el fragmento o función actual. |
| `/doc` | Agrega comentarios de documentación (JSDoc, docstring, etc.). |
| `/generate` | Crea código nuevo basado en una descripción. |
| `/optimize` | Sugiere mejoras de rendimiento o legibilidad. |
| `/comment` | Agrega comentarios explicativos al código. |
| `/rename` | Sugiere un mejor nombre para una variable, función o componente. |
| `/review` | Revisa y comenta el código para detectar problemas potenciales. |
| `/explain-diff` | Explica los cambios entre dos versiones de código. |
| `/explain-errors` | Interpreta errores en consola o stacktraces. |
| `/unit-test` | Crea pruebas unitarias para el código actual. |
| `/integration-test` | Crea pruebas de integración para módulos o componentes. |
| `/security-check` | Revisa vulnerabilidades o prácticas inseguras. |
| `/generate-readme` | Crea o mejora un archivo README.md. |

**Ejemplo:**
```text
/explain this code #selection
```

---

## 🔹 3. Variables de Contexto (`#`)

Permiten especificar qué parte del código o proyecto debe analizar Copilot.

| Variable | Descripción |
|-----------|-------------|
| **#file** | Incluye el contenido del archivo activo. |
| **#selection** | Usa solo el código actualmente seleccionado. |
| **#function** | Se centra en la función actual. |
| **#line** | Considera la línea actual. |
| **#path** | Indica la ruta del archivo activo. |
| **#project** | Analiza todo el proyecto abierto. |
| **#sym** | Se enfoca en el símbolo actual (clase, variable, método). |
| **#problem** | Contexto del problema o error detectado por VS Code. |
| **#terminal** | Incluye la salida actual de la terminal. |
| **#diff** | Usa los cambios entre versiones de código. |
| **#editor** | Se enfoca en el contenido abierto en el editor. |

**Ejemplo:**
```text
/fix potential bug in #selection
```

---

## 🔹 4. Combinaciones útiles

Puedes combinar `@`, `/` y `#` para crear prompts más potentes.

**Ejemplos:**
```text
@workspace /explain how #function handles API errors
@vscode /help list all keyboard shortcuts
@terminal /fix bash script error in #selection
/github /generate-readme summarize the current project
```

---

## 🔹 5. Atajos útiles en VS Code

| Acción | Atajo |
|--------|--------|
| Abrir Copilot Chat | `Ctrl + Shift + I` (Windows/Linux) / `Cmd + Shift + I` (Mac) |
| Chat Inline (en el editor) | `Ctrl + I` / `Cmd + I` |
| Mostrar sugerencia Copilot | `Alt + \` (Windows/Linux) / `Option + \` (Mac) |
| Aceptar sugerencia | `Tab` |
| Ver más sugerencias | `Ctrl + ]` / `Cmd + ]` |
| Cancelar sugerencia | `Esc` |

---

## 🧠 Consejos finales

- Usa `@workspace` para consultas amplias y `/explain` o `/fix` para acciones locales.  
- Escribe `/` en Copilot Chat para ver la lista actual de comandos disponibles en tu versión.  
- Actualiza la extensión de **GitHub Copilot Chat** regularmente para mantener soporte de nuevos comandos.  
- Combina `#selection` o `#file` con comandos para obtener respuestas más precisas.  
- Los comandos pueden variar según el lenguaje, contexto o tipo de archivo.  

---

📘 **Referencia oficial:**  
👉 [GitHub Copilot Chat Cheat Sheet](https://docs.github.com/en/copilot/reference/github-copilot-chat-cheat-sheet)  
👉 [VS Code Copilot Docs](https://code.visualstudio.com/docs/copilot/overview)
