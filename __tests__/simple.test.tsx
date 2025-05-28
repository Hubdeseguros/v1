import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('prueba simple', () => {
  render(<div>Hola Mundo</div>);
  expect(screen.getByText('Hola Mundo')).toBeInTheDocument();
});
