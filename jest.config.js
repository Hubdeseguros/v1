const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Ruta a tu aplicación Next.js para cargar next.config.js y archivos .env en el entorno de prueba
  dir: './',
});

// Configuración personalizada para Jest
const customJestConfig = {
  // Configuración de módulos
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  // Directorios a ignorar en las pruebas
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/cypress/',
  ],
  
  // Configuración de transformación de archivos
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // Directorios donde buscar módulos
  moduleDirectories: ['node_modules', '<rootDir>/'],
  
  // Entorno de prueba
  testEnvironment: 'jsdom',
  
  // Archivos de configuración que se ejecutarán antes de configurar el entorno de prueba
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Extensión de archivos de prueba
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  
  // Configuración de cobertura
  collectCoverage: false, // Desactivar cobertura temporalmente para depuración
  
  // Extensión de archivos a incluir en las pruebas
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
  // Configuración de transformación de archivos estáticos
  transformIgnorePatterns: [
    '/node_modules/(?!(react-syntax-highlighter|@babel/runtime)/)',
  ],
  
  // Configuración de globals
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
};

// Exportar la configuración de Jest
module.exports = createJestConfig(customJestConfig);
