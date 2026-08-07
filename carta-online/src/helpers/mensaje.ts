import Swal from 'sweetalert2';

export const mensaje = (msj: string, iconType: 'success' | 'error' | 'warning' | 'info') => {
  Swal.fire({
    position: 'top-start',
    icon: iconType,
    title: msj,
    showConfirmButton: false,
    timer: 2000,
    toast: true,
    background: '#fff',
    color: '#333',
  });
};