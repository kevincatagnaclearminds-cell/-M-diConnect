/**
 * Ejemplo de componente dentro de una feature
 * Cada feature puede tener sus propios componentes, hooks, servicios, etc.
 */

import { Button } from '@components/ui/Button';

export const ExampleComponent = () => {
  return (
    <div>
      <h2>Componente de Ejemplo</h2>
      <p>Este es un componente dentro de una feature</p>
      <Button variant="primary">Botón de Ejemplo</Button>
    </div>
  );
};

