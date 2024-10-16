
export const getSubmitMsg = (isLoading: boolean, isUpdate: boolean = true) => {
  if (isLoading) {
    return isUpdate ? 'Actualizando...' : 'Creando...';
  }
  return isUpdate ? 'Actualizar' : 'Crear';
}
