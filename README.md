# 📱 ExpenseControl - Frontend

Este repositorio contiene la interfaz de usuario de **ExpenseControl**, una aplicación web de alto rendimiento diseñada para la gestión y control de gastos corporativos. Construida con **React 18**, **TypeScript** y **Vite** para una experiencia de desarrollo y usuario ultra rápida.

## 🚀 Stack Tecnológico

* **Core:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (Build tool)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Tipado estricto para mayor robustez)
* **UI Framework:** [Material UI (MUI) v6](https://mui.com/) con **Emotion** y **tss-react**.
* **Autenticación:** [Google OAuth 2.0](https://www.npmjs.com/package/@react-oauth/google) mediante `@react-oauth/google`.
* **Seguridad:** Manejo de tokens con `jwt-decode`.
* **Calidad de Código:** ESLint v9 con configuraciones de hooks y refresh.

---

## ✨ Características Principales

* **Autenticación Segura:** Acceso integrado con cuentas corporativas de Google para proteger la información financiera.
* **Arquitectura de Componentes:** Interfaz basada en componentes de MUI, garantizando consistencia visual y accesibilidad.
* **Gestión de Inventario Dinámica:** Modales dedicados para crear, editar y eliminar artículos o grupos (categorías) en tiempo real.
* **Flujo de Negocio Guiado:** Sistema de selección secuencial: Cliente ➔ Método de Pago ➔ Carga de Artículos.
* **Carrito de Transacciones:** Resumen detallado del gasto total con opción de pre-visualización antes de la exportación final.
* **Integración con Google Sheets:** Interfaz diseñada para disparar exportaciones automáticas al historial de hojas de cálculo por cliente.

---

## 📸 Galería del Proyecto

| 🏠 Página de Inicio | 💳 Método de Pago | 🛒 Selección de Artículos |
| :---: | :---: | :---: |
| ![Start Page](/expense_control_frontend/public/01-Start-page.png) | ![Payment](/expense_control_frontend/public/02-Payment-method-page.png) | ![Articles](/expense_control_frontend/public/03-Articles-page.png) |

| ✍️ Edición de Artículos | 🧺 Vista Previa Carrito | 📊 Exportación Final |
| :---: | :---: | :---: |
| ![Edit](/expense_control_frontend/public/04-Edit-article.png) | ![Cart](/expense_control_frontend/public/05-Cart-page.png) | ![Export](/expense_control_frontend/public/06-Export-transaction.png) |
| *Modales de gestión* | *Cálculo de gastos* | *Google Sheets Sync* |

---

## 📱 Experiencia Multi-dispositivo

La aplicación cuenta con un **Full Responsiveness** nativo, adaptando los grids de Material UI para asegurar la operatividad en el campo de trabajo.

* **Tablet:** Optimizado para la visualización de listas largas de artículos y gestión de grupos.
* **Móvil:** Interfaz compacta con botones de acción (FAB) accesibles para el uso con una sola mano.

---

## 🛠️ Instalación y Configuración

### 1. Clonar y Dependencias
```bash
git clone [https://github.com/tu-usuario/expense_control_frontend.git](https://github.com/tu-usuario/expense_control_frontend.git)
cd expense_control_frontend
npm install