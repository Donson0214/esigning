export type NavItem = {
  label: string;
  path: string;
<<<<<<< HEAD
  icon: 'dashboard' | 'documents' | 'analytics' | 'sent' | 'received' | 'audit' | 'settings';
=======
  icon:
    | 'dashboard'
    | 'sign'
    | 'documents'
    | 'analytics'
    | 'sent'
    | 'received'
    | 'audit'
    | 'notifications'
    | 'settings';
>>>>>>> e054afa1 (Save 1)
};

export const navigation: NavItem[] = [
  { label: 'Dashboard', path: '/app/dashboard', icon: 'dashboard' },
<<<<<<< HEAD
=======
  { label: 'Sign', path: '/app/sign', icon: 'sign' },
>>>>>>> e054afa1 (Save 1)
  { label: 'Documents', path: '/app/documents', icon: 'documents' },
  { label: 'Analytics', path: '/app/analytics', icon: 'analytics' },
  { label: 'Sent', path: '/app/sent', icon: 'sent' },
  { label: 'Received', path: '/app/received', icon: 'received' },
  { label: 'Audit Trail', path: '/app/audit-trail', icon: 'audit' },
<<<<<<< HEAD
=======
  { label: 'Notifications', path: '/app/notifications', icon: 'notifications' },
>>>>>>> e054afa1 (Save 1)
  { label: 'Settings', path: '/app/settings', icon: 'settings' },
];
