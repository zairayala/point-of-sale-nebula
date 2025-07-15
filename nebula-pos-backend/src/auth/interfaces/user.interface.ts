export interface UserFromToken {
    userId: string;
    phone: string;
    role: 'superadmin' | 'admin' | 'seller';
}