
export const buttonMsg = (isLoading: boolean, isUpdate: boolean) => {
  if (isLoading) {
    return isUpdate ? 'Actualizando...' : 'Creando...';
  }
  return isUpdate ? 'Actualizar' : 'Crear';
}
