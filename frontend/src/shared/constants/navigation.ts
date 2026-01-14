export type NavItem = {
  label: string;
  path: string;
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
};

export const navigation: NavItem[] = [
  { label: 'Dashboard', path: '/app/dashboard', icon: 'dashboard' },
  { label: 'Sign', path: '/app/sign', icon: 'sign' },
  { label: 'Documents', path: '/app/documents', icon: 'documents' },
  { label: 'Analytics', path: '/app/analytics', icon: 'analytics' },
  { label: 'Sent', path: '/app/sent', icon: 'sent' },
  { label: 'Received', path: '/app/received', icon: 'received' },
  { label: 'Audit Trail', path: '/app/audit-trail', icon: 'audit' },
  { label: 'Notifications', path: '/app/notifications', icon: 'notifications' },
  { label: 'Settings', path: '/app/settings', icon: 'settings' },
];
