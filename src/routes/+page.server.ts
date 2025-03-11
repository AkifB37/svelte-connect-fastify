// src/routes/+page.server.js
export const actions = {
  default: async ({ request }: any) => {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    
    const errors: any = {};
    
    if (!name || name.length < 3) {
      errors.name = 'İsim en az 3 karakter olmalıdır';
    }
    
    if (!email || !email.includes('@')) {
      errors.email = 'Geçerli bir e-posta adresi girin';
    }
    
    if (Object.keys(errors).length > 0) {
      return {
        name,
        email,
        errors
      };
    }
    
    // Başarılı işlem
    return { success: true };
  }
};
